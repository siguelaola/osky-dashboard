import React, { useState } from "react";
import { Handle, NodeProps, Position } from "reactflow";

export const IntegrationNode: React.FC<NodeProps> = ({
	data,
	isConnectable,
}) => {
	const [editorVisible, setEditorVisible] = useState(false);

	const modalRoot = document.getElementById("modal-portal-root");
	if (!modalRoot) throw new Error("Missing modal portal root");

	return (
		<div
			className="flex flex-col bg-red-500 border border-black p-5 rounded-full text-white shadow-md font-semibold group text-center"
			onClick={() => setEditorVisible(true)}
		>
			<Handle
				type="target"
				position={Position.Top}
				isConnectable={isConnectable}
				style={{ visibility: "hidden" }}
			/>
			{data?.label}
			<Handle
				type="source"
				position={Position.Bottom}
				isConnectable={isConnectable}
				style={{ visibility: "hidden" }}
			/>
		</div>
	);
};

IntegrationNode.displayName = "IntegrationNode";

export default IntegrationNode;
