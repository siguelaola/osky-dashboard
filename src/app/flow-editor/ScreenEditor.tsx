import {
	ComputerDesktopIcon,
	DevicePhoneMobileIcon,
	PencilSquareIcon,
	PlusCircleIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import React, { useState, useEffect, useRef } from "react";
import Button from "./Button";
import ComponentEditor from "./ComponentEditor";
import ComponentPreview from "./ComponentPreview";
import DeleteComponentButton from "./DeleteComponentButton";
import DragHandle from "./DragHandle";
import { FormComponent, FormComponentType, FormEditorComponent } from "./types";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import ImageTool from "@editorjs/image";

const EDITORJS_DATA_SCAFFOLDING: OutputData = {
	time: -1,
	blocks: [],
	version: "2.26.5",
};

const EDITORJS_HOLDER_ID = "editorJsHolder";

const EDITORJS_DEV_DISPLAY_OUTPUT = (data: OutputData) => {
	return console.log(data);
};

const Editor: React.FC<{
	components: FormEditorComponent[];
	setComponents: (value: FormEditorComponent[]) => void;
}> = ({ components, setComponents }) => {
	const editorJsInstance = useRef<EditorJS | null>(null);
	const [editorData, setEditorData] = React.useState(EDITORJS_DATA_SCAFFOLDING);

	useEffect(() => {
		if (!editorJsInstance.current) initEditor();

		return () => {
			editorJsInstance.current?.destroy();
			editorJsInstance.current = null;
		};
	}, []);

	const exitScreenEditor = () => {
		editorJsInstance.current?.save();
		// TODO: empty out modal contents / close the modal
	};

	const initEditor = () => {
		const editor = new EditorJS({
			holder: EDITORJS_HOLDER_ID,
			data: editorData,
			onReady: () => {
				editorJsInstance.current = editor;
				components.length ? editorJsInstance.current.configuration.data.blocks = components : null;
				console.log(editorJsInstance.current)
			},
			onChange: async () => {
				// TODO: implement data storage
				let content = await editor.save();
				setEditorData(content);
				EDITORJS_DEV_DISPLAY_OUTPUT(content);
			},
			autofocus: true,
			tools: {
				header: Header,
				paragraph: Paragraph,
				image: ImageTool,
			},
		});
	};

	return (
		<>
			<div
				className="fixed z-10 inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
				onClick={() => exitScreenEditor()}
			/>
			<div
				id={EDITORJS_HOLDER_ID}
				className="relative z-20 flex flex-col justify-between items-center bg-white rounded-lg p-5 shadow-lg gap-3"
			/>
		</>
	);
};

const AddComponentChoice: React.FC<{
	addComponent: () => void;
	children: string;
}> = ({ addComponent, children }) => (
	<li className="flex w-full">
		<button
			className="flex w-full p-2 hover:bg-gray-100"
			onClick={() => addComponent()}
		>
			{children}
		</button>
	</li>
);

const AddComponentButton: React.FC<{
	addComponent: (value: FormComponent) => void;
}> = ({ addComponent }) => {
	const [menuOpen, setMenuOpen] = useState(false);
	return (
		<>
			<button
				className={clsx(
					"flex border py-1 px-3 rounded-lg hover:bg-gray-50 relative items-center",
					menuOpen ? "bg-gray-50" : "bg-white"
				)}
				onClick={() => setMenuOpen(!menuOpen)}
				onBlur={(e) => {
					if (e.relatedTarget === null) {
						setMenuOpen(false);
					}
				}}
				onKeyDown={(e) => {
					if (e.key === "Escape") {
						setMenuOpen(false);
					}
				}}
			>
				<PlusCircleIcon className="w-7 h-7 bottom-0 rounded-full mr-2" />
				Add component
				{menuOpen ? (
					<ul className="z-10 bg-white divide-y divide-gray-100 rounded-lg w-44 absolute top-12 shadow-lg py-2 border">
						<AddComponentChoice
							addComponent={() =>
								addComponent({
									type: FormComponentType.Heading,
									label: "New heading",
								})
							}
						>
							Heading
						</AddComponentChoice>
						<AddComponentChoice
							addComponent={() =>
								addComponent({
									type: FormComponentType.Text,
									label: "New text",
								})
							}
						>
							Text
						</AddComponentChoice>
						<AddComponentChoice
							addComponent={() =>
								addComponent({
									type: FormComponentType.TextInput,
									label: "New text input",
								})
							}
						>
							Text input
						</AddComponentChoice>
						<AddComponentChoice
							addComponent={() =>
								addComponent({
									type: FormComponentType.PhoneInput,
									label: "",
								})
							}
						>
							Phone input
						</AddComponentChoice>
						<AddComponentChoice
							addComponent={() =>
								addComponent({
									type: FormComponentType.YesNoInput,
									label: "Yes/No input",
								})
							}
						>
							Yes/No Prompt
						</AddComponentChoice>
						<AddComponentChoice
							addComponent={() =>
								addComponent({
									type: FormComponentType.Checkboxes,
									label: "(edit label)",
									choices: [
										{
											label: "Choice 1",
											value: "Choice 1",
											defaultChecked: false,
										},
										{
											label: "Choice 2",
											value: "Choice 2",
											defaultChecked: false,
										},
									],
								})
							}
						>
							Choices (Checkboxes)
						</AddComponentChoice>
					</ul>
				) : null}
			</button>
		</>
	);
};
const FormComponentRow: React.FC<{
	component: FormComponent;
	index: number;
	isEditing: boolean;
	onDelete: () => void;
	onEdit: (value: Record<string, any>) => void;
}> = ({ component, index, isEditing, onDelete, onEdit }) => {
	const [canDrag, setCanDrag] = useState(false);

	if (isEditing) {
		return (
			<div
				className="flex w-full p-2 my-1 border-2 border-gray-100 cursor-text hover:bg-gray-100"
				draggable={isEditing && canDrag}
				onDragEnd={(e) => {
					console.log("TODO - drag & drop", e);
					setCanDrag(false);
				}}
			>
				<DragHandle setDragging={setCanDrag} />
				<ComponentEditor component={component} onEdit={onEdit} />
				{component.type !== FormComponentType.Continue ? (
					<DeleteComponentButton onClick={onDelete} />
				) : null}
			</div>
		);
	}

	return (
		<div className="flex w-full p-2 my-1">
			<ComponentPreview component={component} />
		</div>
	);
};

const ScreenEditor: React.FC<{
	components: FormComponent[];
	setComponents: (value: FormComponent[]) => void;
	name: string;
	setName: (value: string) => void;
	save: () => void;
}> = ({ components, setComponents, name, setName, save }) => {
	const [isEditing, setEditing] = useState(false);

	return (
		<>
			<div
				className="fixed z-10 inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
				onClick={() => save()}
			/>
			<div className="relative z-20 flex flex-col justify-between items-center bg-white rounded-lg p-5 shadow-lg gap-3">
				<div className="flex w-full justify-between items-center">
					{isEditing ? (
						<input
							type="text"
							value={name}
							placeholder="Enter a name for this screen"
							onChange={(e) => setName(e.currentTarget.value)}
						/>
					) : (
						<h1 className="font-semibold text-xl text-gray-800">{name}</h1>
					)}
					<div className="flex mb-3 gap-2">
						<DevicePhoneMobileIcon
							className="text-gray-500 w-8 h-8 p-1 hover:text-gray-800 cursor-pointer"
							onClick={() => setEditing(false)}
						/>
						<ComputerDesktopIcon
							className="text-gray-500 w-8 h-8 p-1 hover:text-gray-800 cursor-pointer"
							onClick={() => setEditing(false)}
						/>
						<PencilSquareIcon
							className={clsx(
								"text-gray-500 w-8 h-8 p-1 hover:text-gray-800 cursor-pointer",
								isEditing ? "bg-gray-200 rounded-md text-gray-800" : ""
							)}
							onClick={() => setEditing(true)}
						/>
					</div>
				</div>
				<div className="flex flex-col p-3 border-2 border-gray-300 border-dashed w-full">
					{components.map((component, index) => (
						<FormComponentRow
							key={index}
							index={index}
							component={component}
							isEditing={isEditing}
							onEdit={(value) =>
								setComponents(
									components.map((c, i) =>
										i === index ? { ...c, ...value } : c
									)
								)
							}
							onDelete={() =>
								setComponents(components.filter((c, i) => i !== index))
							}
						/>
					))}
				</div>
				{isEditing ? (
					<AddComponentButton
						addComponent={(component) =>
							setComponents([...components, component])
						}
					/>
				) : null}
				<div className="flex justify-between">
					<Button variant="plain" onClick={save}>
						Cancel
					</Button>
					<Button variant="primary" onClick={save}>
						Save
					</Button>
				</div>
			</div>
		</>
	);
};

export default Editor;
