import EditorJS, { OutputBlockData } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import ImageTool from "@editorjs/image";
import Paragraph from "@editorjs/paragraph";
import React, { useEffect, useState } from "react";
import { FormEditorComponent } from "./types";

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
	const [editorReady, setEditorReady] = useState(false);

	const onChange = async () => {
		// TODO: implement data storage
		if (!editor) return;
		const content = await editor.save();
		setBlocks(content.blocks);
		EDITORJS_DEV_DISPLAY_OUTPUT(content);
	};

	useEffect(() => {
		if (!editor) {
			const e = new EditorJS({
				holder: EDITORJS_HOLDER_ID,
				data: {
					time: -1,
					blocks: components.map(({ type, data }) => ({ type, data })),
					version: "2.26.5",
				},
				onReady: async () => setEditorReady(true),
				onChange,
				autofocus: true,
				tools: {
					header: Header,
					paragraph: Paragraph,
					image: ImageTool,
				},
			});
			setEditor(e);
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
				className="relative z-20 flex flex-col justify-between items-center bg-white rounded-lg p-5 shadow-lg gap-3"
			/>
		</>
	);
};

export default ScreenEditor;
