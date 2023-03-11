import { IconChecklist } from "@codexteam/icons";
import {
	BlockTool,
	BlockToolConstructable,
	BlockToolConstructorOptions,
	BlockToolData,
} from "@editorjs/editorjs";
import { BlockAPI } from "@editorjs/editorjs/types/api";
import { nanoid } from "nanoid";
import React, { useState } from "react";
import ContentEditable from "react-contenteditable";
import { createRoot, Root } from "react-dom/client";
import clsx from "clsx";

type ChecklistData = {
	items: ChecklistItem[];
};

type ChecklistItem = {
	id: string;
	text: string;
	checked: boolean;
};

const ChecklistItem: React.FC<{
	item: ChecklistItem;
	onDataChange: Function;
	readOnly: boolean;
	component: any;
}> = ({ item, onDataChange, readOnly, component }) => {
	const [text, setText] = useState(item.text);
	const [checked, setChecked] = useState(item.checked);

	const id = item.id;

	// runs on every render
	onDataChange({
		id,
		text,
		checked,
	});

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
				onKeyDown={(event) => component._events.handler(event)}
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

const ChecklistComponent: React.FC<{
	items: ChecklistItem[];
	onDataChange: Function;
	readOnly: boolean;
	component: any;
}> = ({ items, onDataChange, readOnly, component }) => {
	const checklist = items.map((item: ChecklistItem) => (
		<ChecklistItem
			item={item}
			onDataChange={onDataChange}
			readOnly={readOnly}
			component={component}
			key={item.id}
		/>
	));

	return <>{checklist}</>;
};

export default class Checklist implements BlockTool {
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
			title: "Checklist",
		};
	}

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

	constructor({ data, block, api, readOnly }: BlockToolConstructorOptions) {
		const component = this;

		this.block = block!;
		this._id = this.block.id;

		this._events = {
			handler(event: KeyboardEvent) {
				const key = event.key;
				const target = event.target as Element;

				if (target && target.matches("[type='checkbox']")) return;

				const action: { [key: string]: Function } = {
					Enter: (event: KeyboardEvent) => {
						return this.enter(event);
					},
					Backspace: (event: KeyboardEvent) => {
						return this.backspace(event);
					},
				};

				if (!(key in action)) return;

				event.preventDefault();

				return action[key](event);
			},
			enter(event: KeyboardEvent) {
				event.preventDefault();

				const items = component.data.items;
				const currentItem = items.find(
					(item: ChecklistItem) =>
						item.id === document.activeElement?.parentElement?.id
				);

				if (!currentItem) return;

				const currentItemIndex = items.indexOf(currentItem);
				const isLastItem = currentItemIndex === items.length - 1;

				const currentInput = event.target as Element;

				// Circumvent item generation if focus is on the last item
				if (isLastItem && currentItem.text.length === 0) {
					const isFirstItem = currentItemIndex === 0;
					const currentBlockIndex = component.api.blocks.getCurrentBlockIndex();

					// If the last item is the only item of the list, remove component
					if (isFirstItem) {
						component.api.blocks.delete(currentBlockIndex);
					} else {
						// remove `currentItem` from block data
						items.splice(currentItemIndex, 1);
						component.render();
						// ! STRICT MODE: currently does twice
						component.api.blocks.insert();
					}

					return;
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
				items.splice(currentItemIndex + 1, 0, newItem);

				// call `.render()` to re-render the component based on new data
				component.render();

				// TODO: Move caret to <ContentEditable /> of the new checklist item
				// right now, despite being called after `.render()` this ↓
				// is unable to focus the new sibling, supposedly because the sibling
				// is not yet there during the call (right now, if it exists, the sibling
				// after the new one gets focused instead)
				// @ts-ignore
				currentInput.parentElement?.nextElementSibling?.children[1].focus();
			},
			backspace(event: KeyboardEvent) {
				const items = component.data.items;

				const currentInput = event.target as Element;
				const currentItem = items.find(
					(item: ChecklistItem) => item.id === currentInput.parentElement!.id
				);
				if (!currentItem) return;
				const currentIndex = items.indexOf(currentItem);
				const previousItem = items[currentIndex - 1];

				const currentBlockIndex = component.api.blocks.getCurrentBlockIndex();

				if (!previousItem) {
					if (currentIndex === items.length - 1) {
						if (currentBlockIndex > 0) {
							if (currentItem.text.trim().length === 0) {
								return component.api.blocks.delete(currentBlockIndex);
							} else {
								// TODO: move text to the previous editor component's text property
								// filter out components that don't have text

								return;
							}
						}
						// if nowhere to attach/move text to (i.e. if first block, no previous checklist items)
						return;
					}
					return;
				}

				const selection = window.getSelection();

				if (!selection) return;

				const isCaretAtStart = selection.focusOffset === 0;

				if (!isCaretAtStart) return;

				event.preventDefault();

				// Append content after caret to the previous item
				// and remove the current one
				const currentItemText = extractContentAfterCaret();

				previousItem.text += currentItemText;

				items.splice(currentIndex, 1);

				if (items.length === 0) {
					component.api.blocks.delete(currentBlockIndex);
				} else {
					const previousSibling =
						currentInput.parentElement!.previousElementSibling;
					// TODO: actually focus previous item's `<ContentEditable />`
					// currently skips it if its parent is the first element of the component
					// (does not skip [n+1]th child)
					// ! STRICT MODE ?
					// @ts-ignore
					previousSibling?.children[1].focus();
					component.render();
				}
			},
		};

		this.readOnly = readOnly;
		this.api = api;
		this.data = data || {};
	}

	render(): HTMLElement {
		const component = this;

		if (!this.data.items) {
			this.data.items = [
				{
					id: nanoid(8),
					text: "",
					checked: false,
				},
			];
		}

		const onDataChange = (updatedItem: ChecklistItem) => {
			const target = this.data.items.find(
				(item: ChecklistItem) => item.id === updatedItem.id
			);
			if (!target) return;
			Object.assign(target, updatedItem);

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
			<ChecklistComponent
				items={this.data.items}
				onDataChange={onDataChange}
				readOnly={this.readOnly}
				component={component}
			/>
		);

		return rootNode;
	}

	save() {
		// TODO: skip empty lines (`item.text.trim().length`)
		return this.data;
	}

	validate(savedData: BlockToolData<ChecklistData>): boolean {
		return !!savedData.items.length;
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
