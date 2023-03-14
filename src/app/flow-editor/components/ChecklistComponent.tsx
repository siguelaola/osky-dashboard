import { IconChecklist } from "@codexteam/icons";
import {
	BlockTool,
	BlockToolConstructable,
	BlockToolConstructorOptions,
	BlockToolData,
} from "@editorjs/editorjs";
import { BlockAPI } from "@editorjs/editorjs/types/api";
import clsx from "clsx";
import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import ContentEditable from "react-contenteditable";
import { createRoot, Root } from "react-dom/client";

type CheckboxItem = {
	id: string;
	text: string;
	checked: boolean;
};

const CheckboxComponent: React.FC<{
	item: CheckboxItem;
	onDataChange: Function;
	readOnly: boolean;
	events: any;
}> = ({ item, onDataChange, readOnly, events }) => {
	const [text, setText] = useState(item.text);
	const [checked, setChecked] = useState(item.checked);

	const id = item.id;

	// runs on every render
	onDataChange({
		id,
		text,
		checked,
	});

	// Trigger focus on the newest input box created.
	// useEffect will run on the very first render of the element; ie. when the element is created.
	useEffect(
		() => document.getElementById(id)?.querySelector("div")?.focus(),
		[]
	);

	return (
		<div id={id} className="flex items-center">
			<input
				type="checkbox"
				name="checklist"
				className="mt-1"
				disabled={readOnly}
				checked={checked}
				onChange={(event) => setChecked(event.target.checked)}
			/>
			<ContentEditable
				html={text}
				onChange={(event) => setText(event.currentTarget.innerHTML)}
				onKeyDown={(event) => events.handler(event)}
				disabled={readOnly}
				className={clsx([
					"w-full leading-tight cursor-text outline-none ml-1",
					// ↓ pseudo-placeholder for a `contentEditable` item
					"empty:before:content-['New_checklist_item...'] before:text-gray-400 focus:before:content-['']",
				])}
			/>
		</div>
	);
};

export default class Checkbox implements BlockTool {
	static get isReadOnlySupported(): boolean {
		return true;
	}

	// Allow to use native Enter behaviour
	static get enableLineBreaks(): boolean {
		return true;
	}

	static get toolbox(): BlockToolConstructable["toolbox"] {
		return {
			icon: IconChecklist,
			title: "Checkbox",
		};
	}

	// TODO: fix conflicts below and allow conversion
	// Allow Checkbox Tool to be converted to/from other block
	/* static get conversionConfig(): { export: Function; import: Function } {
		return {
			// To create exported string from the checkbox, concatenate items by dot-symbol.
			export: (data: ChecklistData): string => {
				return data.items.map(({ text }: { text: string }) => text).join(". ");
			},

			// To create a checklist from other block's string, just put it at the first item
			import: (string: string): ChecklistData => {
				return {
					items: [
						{
							id: nanoid(8),
							text: string,
							checked: false,
						},
					],
				};
			},
		};
	} */

	api: BlockToolConstructorOptions["api"];
	readOnly: BlockToolConstructorOptions["readOnly"];
	data: BlockToolData;
	block: BlockAPI;
	_id;
	_events;
	root?: Root;

	constructor({
		data,
		block,
		api,
		readOnly,
	}: {
		data: BlockToolData;
		block: BlockAPI;
		api: BlockToolConstructorOptions["api"];
		readOnly: BlockToolConstructorOptions["readOnly"];
	}) {
		const component = this;

		this.block = block;
		this._id = this.block.id;

		this._events = {
			handler(event: Event) {
				const { key } = event as KeyboardEvent;
				const action: { [key: string]: Function } = {
					Enter: this.enter,
					Backspace: this.backspace,
				};

				if (!(key in action)) return;

				return action[key](event);
			},
			enter(event: Event) {
				event.preventDefault();

				const item = component.data as CheckboxItem;
				const currentBlockIndex = component.api.blocks.getCurrentBlockIndex();

				// If component is empty, remove component
				if (item.text.length === 0) {
					return component.api.blocks.insert(
						"paragraph",
						{},
						{},
						currentBlockIndex,
						true,
						true
					);
				}

				// Cut content after caret
				const separatedText = extractContentAfterCaret();

				// Create new checklist item
				const newItem = {
					id: nanoid(8),
					text: separatedText,
					checked: false,
				};

				// Insert new checklist item as sibling to currently selected item
				component.api.blocks.insert(
					"checklist",
					newItem,
					{},
					currentBlockIndex + 1,
					true
				);
			},

			backspace(event: Event) {
				const item = component.data as CheckboxItem;
				const selection = window.getSelection();

				if (!selection) return;

				const isCaretAtStart = selection.focusOffset === 0;

				if (!isCaretAtStart) return;

				event.preventDefault();

				if (item.text.length === 0) component.api.blocks.delete();

				return;
			},
		};

		this.readOnly = readOnly;
		this.api = api;
		this.data = data || {};
	}

	render(): HTMLElement {
		if (!this.data.items) {
			this.data.items = [
				{
					id: nanoid(8),
					text: "",
					checked: false,
				},
			];
		}

		const onDataChange = (data: CheckboxItem) => {
			this.data = { ...data };
			this.block.dispatchChange();
		};

		const rootNode = document.createElement("fieldset");

		if (!this.root) {
			this.root = createRoot(rootNode);

			// If read-only mode is on, do not bind events
			// TODO: make sure this renders as expected in preview mode
			// aka read-only mode (EditorJS terminology)
			// NOTE: inputs are disabled on render in read-only mode
			if (this.readOnly) return rootNode;
		}

		this.root.render(
			<CheckboxComponent
				item={this.data}
				onDataChange={onDataChange}
				readOnly={this.readOnly}
				events={this._events}
			/>
		);

		return rootNode;
	}

	save() {
		// TODO: skip empty lines (`item.text.trim().length`)
		return this.data;
	}

	validate(data: BlockToolData<CheckboxItem>): boolean {
		const itemHasValidID = "id" in data && typeof data.id === "string";
		const itemHasValidStatus =
			"checked" in data && typeof data.checked === "boolean";
		const itemHasValidLabel = "text" in data && typeof data.text === "string";

		return itemHasValidID && itemHasValidStatus && itemHasValidLabel;
	}
}

// Remove and return HTML content after carer position in current input
export function extractContentAfterCaret(): string {
	const input = document.activeElement as Element;
	const selection = window.getSelection();

	if (!selection) return "";

	const selectRange = selection.getRangeAt(0);
	const range = selectRange.cloneRange();

	range.selectNodeContents(input);
	range.setStart(selectRange.endContainer, selectRange.endOffset);

	const contents = range.extractContents();
	const holder = document.createElement("div");

	// Append `DocumentFragment` to an actual `Node` and
	// extract the `Node`'s contents (extracting from `DocumentFragment`
	// does not appear to work)
	holder.append(contents);

	return holder.innerHTML;
}
