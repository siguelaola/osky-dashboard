import {
	ComputerDesktopIcon,
	DevicePhoneMobileIcon,
	PencilSquareIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useState } from "react";
import Button from "./Button";
import { FormComponent, FormComponentType } from "./types";

export const ScreenEditor: React.FC<{
	components: FormComponent[];
	name: string;
	save: () => void;
}> = ({ components, name, save }) => {
	const [isEditing, setEditing] = useState(false);

	return (
		<>
			<div
				className="fixed z-10 inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
				onClick={() => save()}
			/>
			<div className="relative z-20 flex flex-col justify-between items-center bg-white rounded-lg p-5 shadow-lg">
				<div className="flex w-full justify-between mb-3 items-center">
					<h1 className="font-semibold text-xl text-gray-800">{name}</h1>
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
				<div className="flex flex-col gap-5 p-3 border-2 border-gray-300 border-dashed">
					{components.map((component, index) => {
						switch (component.type) {
							case FormComponentType.Continue:
								return (
									<Button key={index} variant="primary">
										{component.label}
									</Button>
								);
							case FormComponentType.Text:
								return <p key={index}>{component.label}</p>;
							case FormComponentType.Heading:
								return (
									<h1 key={index} className="font-bold text-xl">
										{component.label}
									</h1>
								);
						}
					})}
				</div>
				<div className="flex justify-between mt-3">
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
