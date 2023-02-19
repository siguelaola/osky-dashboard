"use client";
import EditorJS, { OutputBlockData } from "@editorjs/editorjs";
import { useEffect, useState } from "react";
import type { FormEditorComponent } from "./types";

const EDITORJS_HOLDER_ID = "editorJsHolder";

const EDITORJS_DEV_DISPLAY_OUTPUT = (data: any) => {
	return console.log(data);
};

const ScreenEditor: React.FC<{
	components: FormEditorComponent[];
	setComponents: (value: FormEditorComponent[]) => void;
}> = ({ components, setComponents }) => {
	const [editor, setEditor] = useState<EditorJS | null>(null);
	const [blocks, setBlocks] = useState<OutputBlockData[]>([]);

	const onChange = async () => {
		// TODO: implement data storage
		if (!editor) return;
		const content = await editor.save();
		setBlocks(content.blocks);
		EDITORJS_DEV_DISPLAY_OUTPUT(content);
	};

	useEffect(() => {
		if (!editor) {
			const holder = document.getElementById(EDITORJS_HOLDER_ID);
			if (!holder) {
				console.warn("EditorJS holder not found", EDITORJS_HOLDER_ID);
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
					blocks: components.map(({ type, data }) => ({ type, data })),
					version: "2.26.5",
				},
				onChange,
				autofocus: true,
				tools: {
					header: require("@editorjs/header"),
					paragraph: require("@editorjs/paragraph"),
					image: require("@editorjs/image"),
				},
				minHeight: 0,
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

	const exitScreenEditor = () => {
		editor?.save();
		// TODO: empty out modal contents / close the modal
	};

	return (
		<>
			<div
				className="fixed z-10 inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
				onClick={() => exitScreenEditor()}
			/>
			<div
				id={EDITORJS_HOLDER_ID}
				className="prose relative z-20 flex flex-col justify-between items-center bg-white rounded-lg p-5 shadow-lg gap-3"
			/>
		</>
	);
};

export default ScreenEditor;
