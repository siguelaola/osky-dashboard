import type { FormEditorComponent } from "./types";

const ScreenEditor: React.FC<{
	components: FormEditorComponent[];
	setComponents: (value: FormEditorComponent[]) => void;
	name: string;
	setName: (value: string) => void;
	save: () => void;
}> = ({ components, setComponents }) => {
	// BlockEditor depends on EditorJS which is not SSR compatible (refs window)
	// lazy-load to prevent error noise
	const BlockEditor = require("./BlockEditor").default;

	return (
		<div>
			<BlockEditor
				blocks={components.map(({ type, data }) => ({ type, data }))}
				setBlocks={setComponents}
			/>
		</div>
	);
};

export default ScreenEditor;
