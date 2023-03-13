import {
	BlockAPI,
	BlockTool,
	BlockToolConstructable,
	BlockToolData,
} from "@editorjs/editorjs";
import clsx from "clsx";
import { useState } from "react";
import ContentEditable from "react-contenteditable";
import { createRoot } from "react-dom/client";

interface YesNoLabels {
	component: string;
	true: string;
	false: string;
};

const RadioOption: React.FC<{
	id: string;
	value: string;
	label: string;
	setLabel: Function;
}> = ({ id, value, label, setLabel }) => {
	const radioLabelClassName = clsx([
		"p-2 rounded-2xl border border-gray-600 min-w-[4rem] text-center text-black leading-none cursor-pointer",
		"peer-checked:bg-primary-600 peer-checked:text-white peer-checked:font-semibold",
	]);

	const inputID = id + "-" + label.toLowerCase();

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
					onChange={(event) => setLabel(event.currentTarget.innetText)}
				/>
			</label>
		</div>
	);
};

const YesNoElement: React.FC<{
	id: string;
	onDataChange: Function;
	data: { label: YesNoLabels; };
}> = ({ id, onDataChange, data }) => {
	const [labelForComponent, setLabelForComponent] = useState(data.label.component || "");
	const [labelForTrue, setLabelForTrue] = useState(data.label.true || "Yes");
	const [labelForFalse, setLabelForFalse] = useState(data.label.false || "No");

	onDataChange({
		label: {
			component: labelForComponent,
			true: labelForTrue,
			false: labelForFalse,
		},
	});

	return (
		<>
			<ContentEditable
				html={labelForComponent}
				onChange={(event) => setLabelForComponent(event.target.value)}
				className={clsx([
					"text-gray-800 w-full py-0.5 my-1",
					"cursor-text outline-none",
					"empty:before:content-['Question_for_the_consumer...'] before:text-gray-400 focus:before:content-['']",
				])}
			/>
			<div className="flex w-full gap-x-2">
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
		</>
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

		const onDataChange = (newData: {}) => {
			this.data = { ...newData };
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
