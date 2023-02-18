import EditorJS, { OutputData } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import ImageTool from "@editorjs/image";
import Paragraph from "@editorjs/paragraph";
import React, { useEffect, useRef, useState } from "react";
import { FormEditorComponent } from "./types";

const EDITORJS_DATA_SCAFFOLDING: OutputData = {
	time: -1,
	blocks: [],
	version: "2.26.5",
};

const EDITORJS_HOLDER_ID = "editorJsHolder";

const EDITORJS_DEV_DISPLAY_OUTPUT = (data: OutputData) => {
	return console.log(data);
};

const ScreenEditor: React.FC<{
	components: FormEditorComponent[];
	setComponents: (value: FormEditorComponent[]) => void;
}> = ({ components, setComponents }) => {
	const editorJsInstance = useRef<EditorJS | null>(null);
	const [editorData, setEditorData] = React.useState(EDITORJS_DATA_SCAFFOLDING);
	const [initializing, setInitializing] = useState(false);

	useEffect(() => {
		if (!editorJsInstance.current && !initializing) {
			setInitializing(true);
			initEditor();
		}

		return () => {
			editorJsInstance.current?.destroy();
			editorJsInstance.current = null;
		};
	}, []);

	const exitScreenEditor = () => {
		editorJsInstance.current?.save();
		// TODO: empty out modal contents / close the modal
	};

	const initEditor = () => {
		const editor = new EditorJS({
			holder: EDITORJS_HOLDER_ID,
			data: editorData,
			onReady: () => {
				editorJsInstance.current = editor;
				components.map(({ type, data }) => {
					editorJsInstance.current!.blocks.insert(type, data);
				});
			},
			onChange: async () => {
				// TODO: implement data storage
				let content = await editor.save();
				setEditorData(content);
				EDITORJS_DEV_DISPLAY_OUTPUT(content);
			},
			autofocus: true,
			tools: {
				header: Header,
				paragraph: Paragraph,
				image: ImageTool,
			},
		});
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
