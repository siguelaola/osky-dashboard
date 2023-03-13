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

const normalize = (value: string) =>
	value.trim().toLowerCase().replaceAll(" ", "_");

const ComboBoxElement: React.FC<{ onDataChange: (data: any) => void }> = ({
	onDataChange,
}) => {
	const [defaultValue, setDefaultValue] = useState("");
	const [label, setLabel] = useState("Select an option");
	const [entries, setEntries] = useState<{ value: string; label: string }[]>(
		[]
	);

	onDataChange({ label, defaultValue, entries });

	return (
		<div className="flex flex-col">
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
				placeholder="Type to add options"
				onChange={() => null}
				onAddOption={(label: string) => {
					const value = normalize(label);
					if (!value) return;
					setEntries((entries) => [...entries, { value, label: label }]);
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
			title: "Select Picker",
			icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M20.893 13.393l-1.135-1.135a2.252 2.252 0 01-.421-.585l-1.08-2.16a.414.414 0 00-.663-.107.827.827 0 01-.812.21l-1.273-.363a.89.89 0 00-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 01-1.81 1.025 1.055 1.055 0 01-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 01-1.383-2.46l.007-.042a2.25 2.25 0 01.29-.787l.09-.15a2.25 2.25 0 012.37-1.048l1.178.236a1.125 1.125 0 001.302-.795l.208-.73a1.125 1.125 0 00-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 01-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 01-1.458-1.137l1.411-2.353a2.25 2.25 0 00.286-.76m11.928 9.869A9 9 0 008.965 3.525m11.928 9.868A9 9 0 118.965 3.525" /></svg>`,
		};
	}

	data;
	block;

	constructor({ data, block }: { data: OutputBlockData; block: BlockAPI }) {
		this.data = data || {};
		this.block = block;
	}

	render() {
		const rootNode = document.createElement("div");
		const root = createRoot(rootNode);

		const onDataChange = (data: OutputBlockData) => {
			this.data = { ...data };
			this.block.dispatchChange();
		};

		root.render(<ComboBoxElement onDataChange={onDataChange} />);

		return rootNode;
	}

	save() {
		return this.data;
	}
}
