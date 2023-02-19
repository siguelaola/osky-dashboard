"use client";
import EditorJS, { OutputBlockData } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import ImageTool from "@editorjs/image";
import InputText from "./components/InputText";
import { useEffect, useState } from "react";

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
					paragraph: Paragraph,
					image: ImageTool,
					input: InputText,
				},
				minHeight: 0,
				onChange: async () => {
					const content = await editorInstance.save();
					setBlocks(content.blocks);
					EDITORJS_DEV_DISPLAY_OUTPUT(content);
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

	return (
		<div
			id={EDITORJS_ROOT_ID}
			className="prose relative z-20 flex flex-col justify-between items-center bg-white gap-3 min-h-[300px]"
		/>
	);
};

export default BlockEditor;
