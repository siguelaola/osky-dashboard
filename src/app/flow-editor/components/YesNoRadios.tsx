import { createRoot } from "react-dom/client";
import { BlockAPI, BlockToolData } from "@editorjs/editorjs";

export default class YesNoRadios {
	static get toolbox() {
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
		// TODO: generalize radio+label as its own element

		const rootNode = document.createElement("div");
		const root = createRoot(rootNode);
		root.render(
			<fieldset className="mb-2">
				<input
					data-value="label"
					className="text-gray-800 w-full py-0.5 px-1 mb-1 -ml-1"
					placeholder="Question for the consumer..."
				/>
				<div className="flex w-full gap-x-2">
					<div className="flex">
						<input
							type="radio"
							id={this._id + "-no"}
							value="false"
							className="hidden peer"
							name={this._id + "-yes-no"}
							defaultChecked
						/>
						<label
							htmlFor={this._id + "-no"}
							className="p-2 rounded-2xl border border-gray-600 min-w-[4rem] text-center text-black leading-none cursor-pointer peer-checked:bg-primary-600 peer-checked:text-white peer-checked:font-semibold"
						>
							No
						</label>
					</div>
					<div className="flex">
						<input
							type="radio"
							id={this._id + "-yes"}
							value="true"
							name={this._id + "-yes-no"}
							className="hidden peer"
						/>
						<label
							htmlFor={this._id + "-yes"}
							className="p-2 rounded-3xl border border-gray-600 min-w-[4rem] text-center font-semibold text-black leading-none cursor-pointer peer-checked:bg-primary-600 peer-checked:text-white peer-checked:font-semibold"
						>
							Yes
						</label>
					</div>
				</div>
			</fieldset>
		);

		return rootNode;
	}

	save(contents: HTMLDivElement) {
		return this.data;
	}
}
