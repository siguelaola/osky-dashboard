import { OutputBlockData, API } from "@editorjs/editorjs";
import { AsYouType } from "libphonenumber-js";

export default class InputPhone {
	static get toolbox () {
		return {
			title: "Phone Input",
			icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>`,
		};
	}

	data;
	api;

	constructor ({ data, api }: { data: OutputBlockData; api: API }) {
		this.data = data;
		this.api = api;
	}

	render () {
		// TODO: add support for providing input with initial data
		const renderHTML = (html: string) =>
			document.createRange().createContextualFragment(html);
		const element = renderHTML(
			`<fieldset class="my-2 pr-2 flex">
				<div class="flex flex-col">
					<label class="leading-none">Code</label>
					<select class="w-20 border border-current px-1 py-1 m-0 mt-1 leading-none" name="code">
						<option value="ca">+1</option>
						<option value="us" selected>+1</option>
						<option value="nl">+31</option>
						<option value="be">+32</option>
						<option value="fr">+33</option>
						<option value="uk">+44</option>
						<option value="mx">+52</option>
					</select>
				</div>
				<div class="flex flex-col ml-2 w-full">
					<label class="leading-none">Number</label>
					<input data-field="phone-number" class="w-full border border-current px-1 py-0.5 m-0 mt-1 leading-none">
				</div>
			</fieldset>`
		);

		const countryCodeSelect = element.querySelector("[name='code']") as HTMLSelectElement;
		const numberInput = element.querySelector("[data-field='phone-number']") as HTMLInputElement;

		this.api.listeners.on(numberInput, "input", () => {
			const formatter = new AsYouType();
			const countryCode = countryCodeSelect.selectedOptions[0].label;

			const numberWithoutCountryCode = numberInput.value;
			const numberBeforeFormatting = countryCode + numberWithoutCountryCode;
			const numberFormatted = formatter.input(numberBeforeFormatting);

			const regex = /\+\d+? /g;

			numberInput.value = numberFormatted.replace(regex, "");
		});

		return element;
	}

	save (contents: HTMLFieldSetElement) {
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
