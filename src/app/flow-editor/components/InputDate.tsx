import {
	BlockAPI,
	BlockToolConstructable,
	OutputBlockData,
} from "@editorjs/editorjs";
import clsx from "clsx";
import { useState } from "react";
import ContentEditable from "react-contenteditable";
import { createRoot } from "react-dom/client";

const DateComponent: React.FC<{
	onDataChange: (data: OutputBlockData["data"]) => void;
	componentLabel: string;
}> = ({ onDataChange, componentLabel = "" }) => {
	const [date, setDate] = useState("");
	const [label, setLabel] = useState(componentLabel);

	onDataChange({
		date,
		label,
	});

	return (
		<>
			<ContentEditable
				html={label}
				onChange={(event) => setLabel(event.currentTarget.innerText)}
				className={clsx([
					"text-gray-800 w-full",
					"cursor-text outline-none",
					"empty:before:content-['Label_for_select...'] before:text-gray-400 focus:before:content-['']",
				])}
			/>
			<input
				type="date"
				value={date}
				onChange={(event) => setDate(event.currentTarget.value)}
				className="border px-1 py-0.5 m-0 mt-1 leading-none"
			/>
		</>
	);
};

export default class InputDate {
	static get toolbox(): BlockToolConstructable["toolbox"] {
		return {
			title: "Date Input",
			icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" /></svg>`,
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
		const rootNode = document.createElement("fieldset");
		const root = createRoot(rootNode);

		const onDataChange = (data: OutputBlockData["data"]) => {
			this.data = { ...data };
			this.block.dispatchChange();
		};

		const label = this.data.label || "";

		root.render(
			<DateComponent onDataChange={onDataChange} componentLabel={label} />
		);

		return rootNode;
	}

	save() {
		return this.data;
	}
}
