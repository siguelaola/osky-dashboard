import { API, BlockToolData } from "@editorjs/editorjs";
import { useState } from "react";
import { render } from "react-dom";

const TextInputElement = () => {
	const [isRegex, setIsRegex] = useState(false);

	return (
		<fieldset className="my-2 pr-2">
			<label>
				<input
					className="w-full border-none p-0 text-sm leading-none mb-0.5 outline-none"
					placeholder="Label"
					data-setting="label"
				/>
				<input
					className="w-full border border-current px-1 py-0.5 m-0 leading-none"
					placeholder="Placeholder text"
					data-setting="placeholder"
				/>
			</label>
			<details>
				<summary>Parameters</summary>
				<fieldset className="grid grid-cols-2 gap-y-0.5">
					<div className="flex flex-col gap-y-0.5 pl-3">
						<label>
							<input
								type="checkbox"
								className="align-middle"
								data-setting="required"
							/>
							required
						</label>
						<label>
							<input
								type="checkbox"
								className="align-middle"
								data-setting="secure"
							/>
							secure
						</label>
					</div>
					<div className="flex flex-col gap-y-0.5">
						<label>
							<input
								type="checkbox"
								className="align-middle"
								data-setting="validated"
							/>
							validated
						</label>
						<div>
							Type of validation:
							<div className="flex flex-col gap-y-0.5 pl-3">
								<label>
									<input
										type="radio"
										className="align-middle"
										name="validationType"
										data-setting="validationType"
										value="ssn"
										checked
									/>
									SSN
								</label>
								<label>
									<input
										type="radio"
										className="align-middle"
										name="validationType"
										data-setting="validationType"
										value="email"
									/>
									Email
								</label>
								<label>
									<input
										type="radio"
										className="align-middle"
										name="validationType"
										data-setting="validationType"
										value="custom"
										checked={isRegex}
										onChange={(e) => setIsRegex(e.currentTarget.checked)}
									/>
									Custom...
								</label>
							</div>
						</div>
						{isRegex ? (
							<div>
								<label>
									Custom validation pattern:
									<input
										className="w-full border border-current px-1 py-0.5 m-0 leading-none"
										data-setting="validationPattern"
										placeholder="RegEx"
									/>
								</label>
								<div>
									<div className="flex flex-col gap-y-0.5 pl-3">
										<label>
											<input
												type="checkbox"
												className="align-middle"
												data-setting="validationPatternFlags"
												value="ignoreCase"
											/>
											case insensitive
										</label>
									</div>
								</div>
							</div>
						) : null}
					</div>
				</fieldset>
			</details>
		</fieldset>
	);
};

export default class InputText {
	static get toolbox() {
		return {
			title: "Text Input",
			icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>`,
		};
	}

	data;
	api;
	state;
	nodes: {
		holder: HTMLElement | null;
	};

	constructor({ data, api }: { data: BlockToolData<any>; api: API }) {
		console.log("const", data);

		this.data = {
			required: data.required || false,
			secure: data.secure || false,
		};
		this.api = api;
		this.state = {
			validated: false,
			validation: {
				type: "ssn",
				pattern: {
					string: "",
					flags: ["global"],
				},
			},
		};
		this.nodes = {
			holder: null,
		};
	}

	render() {
		const rootNode = document.createElement("div");
		// rootNode.setAttribute("class", this.CSS.wrapper);
		// this.nodes.holder = rootNode;

		render(<TextInputElement />, rootNode);

		// this.api.listeners.on(element.children[0], "change", this.api.saver.save);

		return rootNode;
	}

	save(contents: HTMLFieldSetElement) {
		const labelInput = contents.querySelector(
			"[data-setting='label']"
		) as HTMLInputElement;
		const label = labelInput.value;

		const placeholderInput = contents.querySelector(
			"[data-setting='placeholder']"
		) as HTMLInputElement;
		const placeholder = placeholderInput.value;

		const requiredCheckbox = contents.querySelector(
			"[data-setting='required']"
		) as HTMLInputElement;
		const required = requiredCheckbox.checked;

		const secureCheckbox = contents.querySelector(
			"[data-setting='secure']"
		) as HTMLInputElement;
		const secure = secureCheckbox.checked;

		const validatedCheckbox = contents.querySelector(
			"[data-setting='validated']"
		) as HTMLInputElement;
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
