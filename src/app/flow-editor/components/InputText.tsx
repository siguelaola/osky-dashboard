import { OutputBlockData, API } from "@editorjs/editorjs";

export default class InputText {
	static get toolbox () {
		return {
			title: "Text Input",
			icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>`,
		};
	}

	data;
	api;
	state;

	constructor ({ data, api }: { data: OutputBlockData; api: API }) {
		this.data = data;
		this.api = api;
		this.state = {
			required: false,
			secure: false,
			validated: false,
			validation: {
				type: "ssn",
				pattern: {
					string: "",
					flags: ["global"]
				}
			}
		};
	}

	render () {
		// TODO: add support for providing input with initial text
		const renderHTML = (html: string) =>
			document.createRange().createContextualFragment(html);

		const parameters = `
			<fieldset class="grid grid-cols-2 gap-y-0.5">
				<div class="flex flex-col gap-y-0.5 pl-3">
					<label>
						<input type="checkbox" class="align-middle" data-setting="required">
						required
					</label>
					<label>
						<input type="checkbox" class="align-middle" data-setting="secure">
						secure
					</label>
				</div>
				<div class="flex flex-col gap-y-0.5">
					<label>
						<input type="checkbox" class="align-middle" data-setting="validated">
						validated
					</label>
					<div>
						Type of validation:

						<div class="flex flex-col gap-y-0.5 pl-3">
							<label>
								<input type="radio" class="align-middle" name="validationType" data-setting="validationType" value="ssn" checked>
								SSN
							</label>
							<label>
								<input type="radio" class="align-middle" name="validationType" data-setting="validationType" value="email">
								Email
							</label>
							<label>
								<input type="radio" class="align-middle" name="validationType" data-setting="validationType" value="custom">
								Custom...
							</label>
						</div>
					</div>
					<div>
						<label>
							Custom validation pattern:
							<input class="w-full border border-current px-1 py-0.5 m-0 leading-none" data-setting="validationPattern" placeholder="RegEx">
						</label>
						<div>
							RegEx flags:
							<div class="flex flex-col gap-y-0.5 pl-3">
								<label>
									<input type="checkbox" class="align-middle" data-setting="validationPatternFlags" value="global">
									<code>g</code> (global)
								</label>
								<label>
									<input type="checkbox" class="align-middle" data-setting="validationPatternFlags" value="ignoreCase">
									<code>i</code> (ignore case)
								</label>
								<label>
									<input type="checkbox" class="align-middle" data-setting="validationPatternFlags" value="unicode">
									<code>u</code> (Unicode)
								</label>
							</div>
						</div>
					</div>
				</div>
			</fieldset>
		`;
		const element = renderHTML(
			`<fieldset class="my-2 pr-2">
				<label>
					<input class="w-full border-none p-0 text-sm leading-none mb-0.5 outline-none" placeholder="Label for text input" data-setting="label">
					<input class="w-full border border-current px-1 py-0.5 m-0 leading-none" placeholder="Text put here will appear as placeholder for the user" data-setting="placeholder">
				</label>
				<details>
					<summary>Parameters</summary>
					${parameters}
				</details>
			</fieldset>`
		);

		this.api.listeners.on(element.children[0], "change", this.api.saver.save);

		return element;
	}

	save (contents: HTMLFieldSetElement) {
		const labelInput = contents.querySelector("[data-setting='label']") as HTMLInputElement;
		const label = labelInput.value;

		const placeholderInput = contents.querySelector("[data-setting='placeholder']") as HTMLInputElement;
		const placeholder = placeholderInput.value;

		const requiredCheckbox = contents.querySelector("[data-setting='required']") as HTMLInputElement;
		const required = requiredCheckbox.checked;

		const secureCheckbox = contents.querySelector("[data-setting='secure']") as HTMLInputElement;
		const secure = secureCheckbox.checked;

		const validatedCheckbox = contents.querySelector("[data-setting='validated']") as HTMLInputElement;
		const validated = validatedCheckbox.checked;

		return {
			label,
			placeholder,
			required,
			secure,
			validated,
			// ...(validated && validation)
		};
	}
}
