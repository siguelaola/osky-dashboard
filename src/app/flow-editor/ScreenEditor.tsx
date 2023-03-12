import type { OutputBlockData } from "@editorjs/editorjs";
import {
	Cog6ToothIcon,
	ComputerDesktopIcon,
	DevicePhoneMobileIcon,
	PencilSquareIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useState } from "react";
import Button from "./Button";

const ScreenEditor: React.FC<{
	blocks: OutputBlockData[];
	setBlocks: (value: OutputBlockData[]) => void;
	name: string;
	setName: (value: string) => void;
	save: () => void;
}> = ({ blocks, setBlocks, name, setName, save }) => {
	const [isEditing, setEditing] = useState(false);

	// BlockEditor depends on EditorJS which is not SSR compatible (refs window)
	// lazy-load to prevent error noise
	const BlockEditor = require("./BlockEditor").default;

	return (
		<>
			<div
				className="absolute z-10 inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
				onClick={() => save()}
			/>
			<div className="relative z-20 w-[80%] flex flex-col justify-between items-center bg-white rounded-lg p-5 shadow-lg gap-3">
				<div className="flex w-full justify-between items-center">
					<input
						className="font-semibold text-xl text-gray-800 p-3 border-2 border-dashed border-gray-300"
						type="text"
						value={name}
						placeholder="Enter a name for this screen"
						onChange={(event) => setName(event.currentTarget.value)}
					/>
					<div className="flex gap-2">
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
						<Cog6ToothIcon
							className={clsx(
								"text-gray-500 w-8 h-8 p-1 hover:text-gray-800 cursor-pointer"
							)}
							onClick={() => setEditing(true)}
						/>
					</div>
				</div>
				<div
					className="flex flex-col border-2 border-gray-300 border-dashed focus-within:border-gray-900 focus-within:border-solid w-full"
					onClick={() => {}}
				>
					<BlockEditor blocks={blocks} setBlocks={setBlocks} />
				</div>
				<div className="flex justify-between gap-3">
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
