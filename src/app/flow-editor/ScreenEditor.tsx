import {
	ComputerDesktopIcon,
	DevicePhoneMobileIcon,
	PencilSquareIcon,
	PlusCircleIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import React, { useState } from "react";
import Button from "./Button";
import DragHandle from "./DragHandle";
import { FormComponent, FormComponentType } from "./types";

const AddComponentChoice: React.FC<{
	type: FormComponentType;
	addComponent: (value: FormComponent) => void;
	children: string;
}> = ({ type, addComponent, children }) => (
	<li className="flex w-full">
		<button
			className="flex w-full p-2 hover:bg-gray-100"
			onClick={() => addComponent({ label: "(click to edit)", type })}
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
			>
				<PlusCircleIcon className="w-7 h-7 bottom-0 rounded-full mr-2" /> Add
				component
				{menuOpen ? (
					<ul className="z-10 bg-white divide-y divide-gray-100 rounded-lg w-44 absolute top-12 shadow-lg py-2 border">
						<AddComponentChoice
							type={FormComponentType.Heading}
							addComponent={addComponent}
						>
							Heading
						</AddComponentChoice>
						<AddComponentChoice
							type={FormComponentType.Text}
							addComponent={addComponent}
						>
							Text
						</AddComponentChoice>
					</ul>
				) : null}
			</button>
		</>
	);
};

export const ScreenEditor: React.FC<{
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
						<div
							key={index}
							className={clsx(
								"flex w-full p-2 my-1",
								isEditing
									? "border-2 border-gray-100 cursor-text hover:bg-gray-100"
									: ""
							)}
							draggable={isEditing}
							onDragEnd={(e) => {
								console.log("TODO - drag & drop", e);
							}}
						>
							{isEditing ? <DragHandle /> : null}
							{component.type === FormComponentType.Heading ? (
								<h1 className="font-bold text-xl w-full">
									{isEditing ? (
										<input
											type="text"
											value={component.label}
											className="w-full bg-none border-none text-xl"
											placeholder="Click to edit"
											onChange={(e) =>
												setComponents(
													components.map((c, i) =>
														i === index
															? { ...c, label: e.currentTarget.value }
															: c
													)
												)
											}
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
											onChange={(e) =>
												setComponents(
													components.map((c, i) =>
														i === index
															? { ...c, label: e.currentTarget.value }
															: c
													)
												)
											}
										/>
									) : (
										component.label
									)}
								</p>
							) : component.type === FormComponentType.Continue ? (
								<Button variant="primary">
									{isEditing ? (
										<input
											type="text"
											value={component.label}
											className="w-full bg-transparent border-none text-xl"
											placeholder="Click to edit"
											onChange={(e) =>
												setComponents(
													components.map((c, i) =>
														i === index
															? { ...c, label: e.currentTarget.value }
															: c
													)
												)
											}
										/>
									) : (
										component.label
									)}
								</Button>
							) : null}
						</div>
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
