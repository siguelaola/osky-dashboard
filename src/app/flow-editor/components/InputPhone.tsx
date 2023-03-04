import { API, OutputBlockData } from "@editorjs/editorjs";
import { useState } from "react";
import { createRoot } from "react-dom/client";

const PhoneInputElement: React.FC<{
	onDataChange: (data: any) => void;
}> = ({ onDataChange }) => {
	const [defaultCountry, setDefaultCountry] = useState("us");
	const [label, setLabel] = useState("Phone number");

	onDataChange({ defaultCountry });

	return (
		<fieldset className="my-2 pr-2 flex">
			<input
				className="w-full border-none p-0 text-sm leading-none mb-0.5 outline-none"
				placeholder="Label"
				value={label}
				onChange={(e) => setLabel(e.currentTarget.value)}
			/>
			<div className="flex flex-col">
				<select
					className="w-20 border border-current px-1 py-1 m-0 mt-1 leading-none"
					name="code"
					defaultValue={defaultCountry}
					onChange={(e) => setDefaultCountry(e.currentTarget.value)}
				>
					<option value="ca">+1</option>
					<option value="us">+1</option>
					<option value="nl">+31</option>
					<option value="be">+32</option>
					<option value="fr">+33</option>
					<option value="uk">+44</option>
					<option value="mx">+52</option>
				</select>
			</div>
			<div className="flex flex-col ml-2 w-full">
				<input
					data-field="phone-number"
					className="w-full border border-current px-1 py-0.5 m-0 mt-1 leading-none"
				/>
			</div>
		</fieldset>
	);
};

export default class InputPhone {
	static get toolbox() {
		return {
			title: "Phone Input",
			icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>`,
		};
	}

	data;
	api;

	constructor({ data, api }: { data: OutputBlockData; api: API }) {
		this.data = data;
		this.api = api;
	}

	render() {
		const rootNode = document.createElement("div");
		const onDataChange = (newData: any) => {
			this.data = { ...newData };
		};

		const root = createRoot(rootNode);
		root.render(<PhoneInputElement onDataChange={onDataChange} />);

		return rootNode;
	}

	save(contents: HTMLFieldSetElement) {
		const listOfCountryCodes = contents.querySelector(
			"[name='code']"
		) as HTMLSelectElement;
		const code = listOfCountryCodes.selectedOptions[0].label;
		const number = contents.querySelector(
			"[data-field='phone-number']"
		) as HTMLInputElement;

		return {
			number: code + number.value,
		};
	}
}
