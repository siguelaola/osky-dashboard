import {
	ComputerDesktopIcon,
	DevicePhoneMobileIcon,
	PencilSquareIcon,
	PlusCircleIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import React, { useState } from "react";
import Button from "./Button";
import DeleteComponentButton from "./DeleteComponentButton";
import DragHandle from "./DragHandle";
import { FormComponent as FormComponentRow, FormComponentType } from "./types";

const AddComponentChoice: React.FC<{
	label: string;
	type: FormComponentType;
	addComponent: (value: FormComponentRow) => void;
	children: string;
}> = ({ label, type, addComponent, children }) => (
	<li className="flex w-full">
		<button
			className="flex w-full p-2 hover:bg-gray-100"
			onClick={() => addComponent({ label, type })}
		>
			{children}
		</button>
	</li>
);

const AddComponentButton: React.FC<{
	addComponent: (value: FormComponentRow) => void;
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
							type={FormComponentType.Heading}
							addComponent={addComponent}
							label="New heading"
						>
							Heading
						</AddComponentChoice>
						<AddComponentChoice
							type={FormComponentType.Text}
							addComponent={addComponent}
							label="Click to edit text"
						>
							Text
						</AddComponentChoice>
						<AddComponentChoice
							type={FormComponentType.TextInput}
							addComponent={addComponent}
							label="(default value)"
						>
							Text input
						</AddComponentChoice>
					</ul>
				) : null}
			</button>
		</>
	);
};

const FormComponentRow: React.FC<{
	component: FormComponentRow;
	index: number;
	isEditing: boolean;
	onDelete: () => void;
	onEdit: (value: Record<string, any>) => void;
}> = ({ component, index, isEditing, onDelete, onEdit }) => {
	const [canDrag, setCanDrag] = useState(false);

	return (
		<div
			key={index}
			className={clsx(
				"flex w-full p-2 my-1",
				isEditing
					? "border-2 border-gray-100 cursor-text hover:bg-gray-100"
					: ""
			)}
			draggable={isEditing && canDrag}
			onDragEnd={(e) => {
				console.log("TODO - drag & drop", e);
				setCanDrag(false);
			}}
		>
			{isEditing ? <DragHandle setDragging={setCanDrag} /> : null}
			{component.type === FormComponentType.Heading ? (
				<h1 className="font-bold text-xl w-full">
					{isEditing ? (
						<input
							type="text"
							value={component.label}
							className="w-full bg-none border-none text-xl"
							placeholder="Click to edit"
							onChange={(e) => onEdit({ label: e.currentTarget.value)}
						/>
					) : (
						component.label
					)}
				</h1>
			) : component.type === FormComponentType.Text ? (
				<p className="w-full">
					{isEditing ? (
						<textarea
							value={component.label}
							cols={60}
							className="w-full bg-transparent border-none"
							onChange={(e) => onEdit({ label: e.currentTarget.value)}
						/>
					) : (
						component.label
					)}
				</p>
			) : component.type === FormComponentType.TextInput ? (
				<div className="flex flex-col w-full">
					<input
						type="text"
						className="w-full"
						value={component.label}
						onChange={(e) => {
							if (isEditing) onEdit({ label: e.currentTarget.value});
						}}
					/>
				</div>
			) : component.type === FormComponentType.Continue ? (
				<Button variant="primary">
					{isEditing ? (
						<input
							type="text"
							value={component.label}
							className="bg-transparent border-none p-0"
							placeholder="Click to edit"
							onChange={(e) => onEdit({ label: e.currentTarget.value})}
							size={component.label.length}
						/>
					) : (
						component.label
					)}
				</Button>
			) : null}
			{isEditing && component.type !== FormComponentType.Continue ? (
				<DeleteComponentButton onClick={onDelete} />
			) : null}
		</div>
	);
};

export const ScreenEditor: React.FC<{
	components: FormComponentRow[];
	setComponents: (value: FormComponentRow[]) => void;
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

export default ScreenEditor;
