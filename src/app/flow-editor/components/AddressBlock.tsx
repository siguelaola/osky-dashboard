import { OutputBlockData } from "@editorjs/editorjs";

export default class AddressBlock {
	static get toolbox() {
		return {
			title: "Address Block",
			icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>`,
		};
	}

	data = undefined;

	constructor ({ data }: OutputBlockData) {
		this.data = data;
	}

	render () {
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

	save (contents: HTMLFieldSetElement) {
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
