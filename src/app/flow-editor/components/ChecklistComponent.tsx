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
}> = ({ item, onDataChange, readOnly }) => {
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
				disabled={readOnly}
				className="ml-1 w-full leading-tight cursor-text outline-none empty:before:content-['New_checklist_item...'] before:text-gray-400 focus:before:content-['']"
			/>
		</div>
	);
};

const ChecklistComponent: React.FC<{
	items: ChecklistItem[];
	onDataChange: Function;
	readOnly: boolean;
}> = ({ items, onDataChange, readOnly }) => {
	const checklist = items.map((item: ChecklistItem) => (
		<ChecklistItem
			item={item}
			readOnly={readOnly}
			onDataChange={onDataChange}
			key={item.id}
		/>
	));
	return <>{checklist}</>;
};

export default class Checklist implements BlockTool {
	/**
	 * Notify core that read-only mode is supported
	 *
	 * @returns {boolean}
	 */
	static get isReadOnlySupported(): boolean {
		return true;
	}

	/**
	 * Allow to use native Enter behaviour
	 *
	 * @returns {boolean}
	 * @public
	 */
	static get enableLineBreaks(): boolean {
		return true;
	}

	/**
	 * Get Tool toolbox settings
	 * icon - Tool icon's SVG
	 * title - title to show in toolbox
	 *
	 * @returns {{icon: string, title: string}}
	 */
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
			enter(event: KeyboardEvent) {
				event.preventDefault();

				const items = component.data.items;
				const currentItem = items.find(
					(item: ChecklistItem) =>
						item.id === document.activeElement?.parentElement?.id
				);
				const currentItemIndex = items.indexOf(currentItem);
				const isLastItem = currentItemIndex === items.length - 1;

				const currentBlockIndex = component.api.blocks.getCurrentBlockIndex();

				// Prevent checklist item generation if it's the last item and it's empty
				// and get out of checklist
				if (isLastItem && items.length === 1 && currentItem.text.length === 0) {
					return component.api.blocks.delete(currentBlockIndex);
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

				// TODO: Move caret to <ContentEditable /> of the new checklist item
				// component.api.caret.setToBlock(currentBlockIndex + 1);

				component.render();
			},
			backspace(event: KeyboardEvent) {
				const items = component.data.items;
				const currentItem = items.find(
					(item: ChecklistItem) =>
						item.id === document.activeElement?.parentElement?.id
				);
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
					component.render();
				}
			},
		};

		this.readOnly = readOnly;
		this.api = api;
		this.data = data || {};
	}

	render() {
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

			Object.assign(target, updatedItem);

			this.block.dispatchChange();
		};

		const rootNode = document.createElement("fieldset");

		if (!this.root) {
			this.root = createRoot(rootNode);

			// If read-only mode is on, do not bind events
			if (this.readOnly) return rootNode;

			this.api.listeners.on(rootNode, "keydown", (eventOriginal) => {
				const event = eventOriginal as KeyboardEvent;
				const key = event.key;

				const target = event.target as Element;

				if (target && target.matches("[type='checkbox']")) return;

				const action: { [key: string]: Function } = {
					Enter: () => {
						return this._events.enter(event);
					},
					Backspace: () => {
						return this._events.backspace(event);
					},
				};

				return key in action ? action[key]() : null;
			});
		}

		this.root.render(
			<ChecklistComponent
				items={this.data.items}
				onDataChange={onDataChange}
				readOnly={this.readOnly}
			/>
		);

		return rootNode;
	}

	save(): [] {
		// TODO: skip empty lines (`item.text.trim().length`)
		return this.data;
	}

	validate(savedData: BlockToolData): boolean {
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

	holder.append(contents);

	const html = holder.innerHTML;

	return html;
}
