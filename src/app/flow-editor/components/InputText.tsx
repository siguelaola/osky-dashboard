import {
	BlockAPI,
	BlockTool,
	BlockToolConstructable,
	BlockToolData,
} from "@editorjs/editorjs";
import clsx from "clsx";
import React, { useState } from "react";
import ContentEditable from "react-contenteditable";
import { createRoot } from "react-dom/client";

const InputComponent: React.FC<{
	onDataChange: (data: BlockToolData) => void;
	componentLabel: string;
}> = ({ onDataChange, componentLabel }) => {
	const [required, setRequired] = useState(false);
	const [label, setLabel] = useState(componentLabel);
	const [placeholder, setPlaceholder] = useState("");

	// Triggers on every render
	onDataChange({
		required,
		label,
		placeholder,
	});

	return (
		<>
			<div>
				<ContentEditable
					html={label}
					onChange={(event) => setLabel(event.currentTarget.innerText)}
					className={clsx([
						"text-gray-800 w-full",
						"cursor-text outline-none",
						"empty:before:content-['Label_for_text_input...'] before:text-gray-400 focus:before:content-['']",
					])}
				/>
				<input
					className="w-96 border border-gray-400 rounded px-1 py-0.5 m-0 leading-none"
					placeholder="Placeholder for rendered input"
					value={placeholder}
					onChange={(event) => setPlaceholder(event.currentTarget.value)}
				/>
			</div>
			<details>
				<summary>Input settings</summary>
				<fieldset className="grid grid-cols-2 gap-y-0.5">
					<div className="flex flex-col gap-y-0.5 pl-3">
						<label>
							<input
								type="checkbox"
								className="align-middle mr-1"
								checked={required}
								onChange={(event) => setRequired(event.currentTarget.checked)}
							/>
							required
						</label>
					</div>
				</fieldset>
			</details>
		</>
	);
};

export default class InputText implements BlockTool {
	static get toolbox(): BlockToolConstructable["toolbox"] {
		return {
			title: "Text Input",
			icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>`,
		};
	}

	data;
	block;

	constructor({ data, block }: { data: BlockToolData; block: BlockAPI }) {
		this.data = data || {};
		this.block = block;
	}

	render() {
		const rootNode = document.createElement("fieldset");

		const onDataChange = (data: BlockToolData) => {
			this.data = { ...data };
		};

		const label = this.data.label;

		const root = createRoot(rootNode);
		root.render(
			<InputComponent onDataChange={onDataChange} componentLabel={label} />
		);

		return rootNode;
	}

	save() {
		return this.data;
	}
}
