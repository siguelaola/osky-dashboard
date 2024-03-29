import {
	BlockTool,
	BlockToolConstructable,
	OutputBlockData,
} from "@editorjs/editorjs";
import clsx from "clsx";
import { AsYouType } from "libphonenumber-js";
import { ChangeEvent, useState } from "react";
import ContentEditable from "react-contenteditable";
import { createRoot } from "react-dom/client";

const formatNumber = (number: string) => {
	const asYouType = new AsYouType();
	const formatted = asYouType.input(number);

	return {
		formatted,
		number: asYouType.getNumberValue(),
		country: asYouType.getCountry(),
	};
};

const PhoneInputElement: React.FC<{
	onDataChange: (data: any) => void;
	componentLabel?: string;
}> = ({ onDataChange, componentLabel = "Phone number" }) => {
	const [country, setCountry] = useState("");
	const [number, setNumber] = useState("");
	const [formatted, setFormatted] = useState("");
	const [label, setLabel] = useState(componentLabel);

	onDataChange({ label, country, number });

	const onChange = (event: ChangeEvent) => {
		const input = event.currentTarget as HTMLInputElement;
		const value = input.value;
		const { country, formatted, number } = formatNumber(value);

		setCountry(country || "");
		setNumber(number || "");
		setFormatted(formatted || "");
	};

	return (
		<fieldset className="w-96 flex flex-col mt-2">
			<ContentEditable
				html={label}
				onChange={(event) => setLabel(event.currentTarget.innerText)}
				className={clsx([
					"text-gray-800 w-full",
					"cursor-text outline-none",
					"empty:before:content-['Label_for_phone_input...'] before:text-gray-400 focus:before:content-['']",
				])}
			/>
			<div className="flex items-center">
				{/* TODO: add country flag based on country provided by AsYouType */}
				{/* NOTE: AsYouType may withhold country if more than one country uses the same country code */}
				{/*       e.g. +1 for Canada and US */}
				{/*       until it knows for a fact (from the full number) which country it is */}
				<input
					value={formatted}
					onChange={onChange}
					className="w-full border border-gray-400 rounded px-1.5 py-1 pt-0.5 leading-none"
				/>
			</div>
		</fieldset>
	);
};

export default class InputPhone implements BlockTool {
	static get toolbox(): BlockToolConstructable["toolbox"] {
		return {
			title: "Phone Input",
			icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>`,
		};
	}

	data;

	constructor({ data }: { data: OutputBlockData["data"] }) {
		this.data = data || {};
	}

	render() {
		const onDataChange = (data: OutputBlockData["data"]) => {
			this.data = { ...data };
		};

		const rootNode = document.createElement("div");
		const root = createRoot(rootNode);

		const label = this.data.label || "";

		root.render(
			<PhoneInputElement componentLabel={label} onDataChange={onDataChange} />
		);

		return rootNode;
	}

	save() {
		return this.data;
	}
}
