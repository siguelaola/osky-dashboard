import { BlockToolConstructable, OutputBlockData } from "@editorjs/editorjs";

export default class AddressBlock {
	static get toolbox(): BlockToolConstructable["toolbox"] {
		return {
			title: "Address Block",
			icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>`,
		};
	}

	data = undefined;

	constructor({ data }: OutputBlockData) {
		this.data = data;
	}

	render() {
		const renderHTML = (html: string) =>
			document.createRange().createContextualFragment(html);
		const element = renderHTML(
			`<fieldset class="my-1 pr-2">
				<div>
					<label class="leading-none">Address</label>
					<input data-field="address-line-one" class="w-full border border-current px-1 py-0.5 m-0 mt-1 leading-none">
					<input data-field="address-line-two" class="w-full border border-current px-1 py-0.5 m-0 mt-1 leading-none">
				</div>
				<div class="flex mt-2 justify-between">
					<div class="flex flex-col">
						<label class="leading-none">Postal code</label>
						<input data-field="postal-code" class="w-24 border border-current px-1 py-0.5 m-0 mt-1 leading-none">
					</div>
					<div class="flex flex-col w-full ml-2">
						<label class="leading-none">City</label>
						<input data-field="city" class="w-full border border-current px-1 py-0.5 m-0 mt-1 leading-none">
					</div>
				</div>
				<select class="mt-2" name="country">
					<option value="">Select country...</option>
					<option value="be">Belgium</option>
					<option value="ca">Canada</option>
					<option value="fr">France</option>
					<option value="mx">Mexico</option>
					<option value="nl">Netherlands</option>
					<option value="uk">United Kingdom</option>
					<option value="us">United States of America</option>
				</select>
			</fieldset>`
		);

		return element;
	}

	save(contents: HTMLFieldSetElement) {
		const addressLineOne = contents.querySelector(
			"[data-field='address-line-one']"
		) as HTMLInputElement;
		const addressLineTwo = contents.querySelector(
			"[data-field='address-line-two']"
		) as HTMLInputElement;
		const postalCode = contents.querySelector(
			"[data-field='postal-code']"
		) as HTMLInputElement;
		const city = contents.querySelector(
			"[data-field='city']"
		) as HTMLInputElement;
		const country = contents.querySelector(
			"[name='country']"
		) as HTMLSelectElement;

		return {
			addressLine: [addressLineOne!.value, addressLineTwo!.value],
			postalCode: postalCode!.value,
			city: city!.value,
			country: country!.value,
		};
	}
}
