import {
	BlockAPI,
	BlockToolConstructable,
	OutputBlockData,
} from "@editorjs/editorjs";
import clsx from "clsx";
import { useState } from "react";
import ContentEditable from "react-contenteditable";
import { createRoot } from "react-dom/client";
import ComboBox from "../../(components)/forms/ComboBox";

const toSnakeCase = (value: string) =>
	value.trim().toLowerCase().replaceAll(" ", "_");

const ComboBoxElement: React.FC<{
	onDataChange: (data: any) => void;
	componentLabel?: string;
}> = ({ onDataChange, componentLabel = "Select an option" }) => {
	const [defaultValue, setDefaultValue] = useState("");
	const [label, setLabel] = useState(componentLabel);
	const [entries, setEntries] = useState<{ value: string; label: string }[]>(
		[]
	);

	onDataChange({ label, defaultValue, entries });

	return (
		<div className="flex flex-col w-96 mt-2">
			<ContentEditable
				html={label}
				onChange={(event) => setLabel(event.currentTarget.innerText)}
				className={clsx([
					"text-gray-800 w-full",
					"cursor-text outline-none",
					"empty:before:content-['Label_for_select...'] before:text-gray-400 focus:before:content-['']",
				])}
			/>
			<ComboBox
				entries={entries}
				label="Label"
				placeholder="Type to add options..."
				onChange={() => null}
				onAddOption={(optionLabel: string) => {
					const value = toSnakeCase(optionLabel);
					if (!value) return;
					setEntries((entries) => [...entries, { value, label: optionLabel }]);
					setDefaultValue(value);
					return value;
				}}
			/>
		</div>
	);
};

export default class ComboBoxComponent {
	static get toolbox(): BlockToolConstructable["toolbox"] {
		return {
			title: "Custom Select",
			icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" /></svg>`,
		};
	}

	data;
	block;

	constructor({
		data,
		block,
	}: {
		data: OutputBlockData["data"];
		block: BlockAPI;
	}) {
		this.data = data || {};
		this.block = block;
	}

	render() {
		const rootNode = document.createElement("div");
		const root = createRoot(rootNode);

		const onDataChange = (data: OutputBlockData["data"]) => {
			this.data = { ...data };
			this.block.dispatchChange();
		};

		const label = this.data.label || "";

		root.render(
			<ComboBoxElement componentLabel={label} onDataChange={onDataChange} />
		);

		return rootNode;
	}

	save() {
		return this.data;
	}
}
