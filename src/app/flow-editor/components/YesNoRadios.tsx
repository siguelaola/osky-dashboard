import {
	BlockAPI,
	BlockTool,
	BlockToolConstructable,
	BlockToolData,
} from "@editorjs/editorjs";
import clsx from "clsx";
import { Dispatch, SetStateAction, useState } from "react";
import ContentEditable from "react-contenteditable";
import { createRoot } from "react-dom/client";

interface YesNoLabels {
	label: string;
	true: string;
	false: string;
}

const RadioOption: React.FC<{
	id: string;
	value: string;
	label: string;
	setLabel: Dispatch<SetStateAction<string>>;
}> = ({ id, value, label, setLabel }) => {
	const radioLabelClassName = [
		"p-2 rounded-2xl border border-gray-600 min-w-[4rem] text-center text-black leading-none cursor-text",
		"peer-checked:bg-primary-600 peer-checked:text-white peer-checked:font-semibold",
	].join(" ");

	const inputID = id + "-" + label.toLowerCase();
	const placeholder = value === "true" ? "Yes" : "No";

	return (
		<div className="flex">
			<input
				type="radio"
				id={inputID}
				value={value}
				// prevent interactivity during editing
				// TODO: enable during preview
				disabled
				className="hidden peer"
				name={id}
			/>
			<label htmlFor={inputID} className={radioLabelClassName}>
				<ContentEditable
					html={label}
					onChange={(event) => setLabel(event.currentTarget.innerText)}
					className={clsx([
						"text-gray-800 w-full",
						"cursor-text outline-none",
						value === "true"
							? "empty:before:content-['Yes'] before:text-gray-400 focus:before:content-['']"
							: "empty:before:content-['No'] before:text-gray-400 focus:before:content-['']",
					])}
				/>
			</label>
		</div>
	);
};

const YesNoElement: React.FC<{
	id: string;
	onDataChange: (data: any) => void;
	data: YesNoLabels;
}> = ({ id, onDataChange, data }) => {
	const [labelForComponent, setLabelForComponent] = useState(data.label || "");
	const [labelForTrue, setLabelForTrue] = useState(data.true || "Yes");
	const [labelForFalse, setLabelForFalse] = useState(data.false || "No");

	onDataChange({
		label: labelForComponent,
		true: labelForTrue,
		false: labelForFalse,
	});

	return (
		<div className="mt-2">
			<ContentEditable
				html={labelForComponent}
				onChange={(event) =>
					setLabelForComponent(event.currentTarget.innerText)
				}
				className={clsx([
					"text-gray-800 w-full",
					"cursor-text outline-none",
					"empty:before:content-['Label_for_binary_component...'] before:text-gray-400 focus:before:content-['']",
				])}
			/>
			<div className="flex w-full gap-x-2 mt-1">
				<RadioOption
					id={id}
					value={"false"}
					label={labelForFalse}
					setLabel={setLabelForFalse}
				/>
				<RadioOption
					id={id}
					value={"true"}
					label={labelForTrue}
					setLabel={setLabelForTrue}
				/>
			</div>
		</div>
	);
};

export default class YesNoRadios implements BlockTool {
	static get toolbox(): BlockToolConstructable["toolbox"] {
		return {
			title: "Yes/No Choice",
			icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M17 7H7a5 5 0 0 0 0 10h10a5 5 0 0 0 0-10Zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3Z"/></svg>`,
		};
	}

	data;
	_id;

	constructor({ data, block }: { data: BlockToolData<any>; block: BlockAPI }) {
		this.data = data || {};
		this._id = block.id;
	}

	render() {
		const rootNode = document.createElement("fieldset");
		const root = createRoot(rootNode);

		const onDataChange = (data: YesNoLabels) => {
			this.data = { ...data };
		};

		root.render(
			<YesNoElement
				id={this._id}
				onDataChange={onDataChange}
				data={this.data}
			/>
		);

		return rootNode;
	}

	save() {
		return this.data;
	}
}
