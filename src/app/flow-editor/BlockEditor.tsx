"use client";
import EditorJS, { OutputBlockData } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import ImageTool from "@editorjs/image";
import List from "@editorjs/list";
import Paragraph from "@editorjs/paragraph";
import DragDrop from "editorjs-drag-drop";
import { useEffect, useState } from "react";
import AddressBlock from "./components/AddressBlock";
import Checklist from "./components/ChecklistComponent";
import InputDate from "./components/InputDate";
import InputPhone from "./components/InputPhone";
import InputText from "./components/InputText";
import SeparatorComponent from "./components/SeparatorComponent";
import YesNoRadios from "./components/YesNoRadios";

const EDITORJS_ROOT_ID = "editorjs-root";

const EDITORJS_DEV_DISPLAY_OUTPUT = (data: any) => {
	return console.log(data);
};

const BlockEditor: React.FC<{
	blocks: OutputBlockData[];
	setBlocks: (value: OutputBlockData[]) => void;
	onExit: () => void;
}> = ({ blocks, setBlocks, onExit }) => {
	const [editor, setEditor] = useState<EditorJS | null>(null);

	useEffect(() => {
		if (!editor) {
			const holder = document.getElementById(EDITORJS_ROOT_ID);
			if (!holder) {
				console.warn("EditorJS holder not found", EDITORJS_ROOT_ID);
				return;
			}

			// Something is causing the Editor to be initialized twice in rapid succession
			// From investigation (2023-02-18), it seems to originate from NextJS itself.
			// Possibly a bug related to appDir? No idea. This workaround prevents the
			// double render from causing a double initialization, by using the DOM as a lock.
			if (holder.hasAttribute("editorjs-locked")) {
				console.warn("EditorJS holder already initialized");
				return;
			}

			holder.setAttribute("editorjs-locked", "");

			const editorInstance = new EditorJS({
				holder,
				data: {
					time: -1,
					blocks,
					version: "2.26.5",
				},
				autofocus: true,
				tools: {
					header: Header,
					paragraph: {
						class: Paragraph,
						inlineToolbar: true,
					},
					image: ImageTool,
					list: {
						class: List,
						config: {
							defaultStyle: "unordered",
						},
					},
					separator: SeparatorComponent,
					yesno: YesNoRadios,
					checklist: {
						// @ts-ignore Something's broken with EditorJS's types
						class: Checklist,
						inlineToolbar: true,
					},
					"input-text": InputText,
					"input-date": InputDate,
					"input-address": AddressBlock,
					"input-phone": InputPhone,
				},
				minHeight: 0,
				onChange: async () => {
					const content = await editorInstance.save();
					setBlocks(content.blocks);
					EDITORJS_DEV_DISPLAY_OUTPUT(content);
				},
				onReady: () => {
					new DragDrop(editorInstance);
				},
			});
			setEditor(editorInstance);
		}

		return () => {
			if (editor) {
				editor.destroy();
				setEditor(null);
			}
		};
	}, [editor]);

	// TODO trigger editor.save when parent exits modal

	// TODO store screen name during editing as state
	// TODO on modal close, if screen has no name (value.trim() === ""), reset to existing name
	// TODO else, use name stored in state

	return (
		<div
			id={EDITORJS_ROOT_ID}
			className="px-3 py-2 prose relative z-20 bg-white min-h-[300px] max-w-[100%]"
			onMouseDown={(e) => {
				if ((e.target as any).id === EDITORJS_ROOT_ID) editor?.focus();
			}}
		/>
	);
};

export default BlockEditor;
