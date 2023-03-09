import type { OutputBlockData } from "@editorjs/editorjs";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { createPortal } from "react-dom";
import {
	applyEdgeChanges,
	applyNodeChanges,
	EdgeAddChange,
	Handle,
	NodeProps,
	Position,
	useReactFlow,
} from "reactflow";
import ScreenEditor from "./ScreenEditor";
import { FormComponentType } from "./types";

const AddNodeButton: React.FC<{ id: string; xPos: number; yPos: number }> = ({
	id,
	xPos,
	yPos,
}) => {
	const { setNodes, setEdges } = useReactFlow();

	return (
		<button
			type="button"
			className="relative w-7 h-7"
			onClick={(e) => {
				e.stopPropagation();
				const edgeChanges: EdgeAddChange[] = [];

				setNodes((nodes) => {
					const newId = `node-${nodes.length}`;
					edgeChanges.push({
						type: "add",
						item: {
							id: `edge-${id}-${newId}`,
							source: id,
							target: newId,
						},
					});

					return applyNodeChanges(
						[
							{
								type: "add",
								item: {
									id: newId,
									position: { x: xPos, y: yPos + 100 },
									data: {
										label: "New Screen",
										components: [
											{ type: FormComponentType.Continue, label: "Continue" },
										],
									},
									type: "screen",
								},
							},
						],
						nodes
					);
				});

				setEdges((edges) => applyEdgeChanges(edgeChanges, edges));
			}}
		>
			<PlusCircleIcon className="w-7 h-7 bottom-0 bg-white hover:bg-gray-100 rounded-full absolute" />
		</button>
	);
};

const CustomNode: React.FC<NodeProps> = ({
	id,
	data,
	isConnectable,
	xPos,
	yPos,
}) => {
	const [editorVisible, setEditorVisible] = useState(false);
	const [nodeName, setNodeName] = useState(data?.label ?? "New Screen");
	const [blocks, setBlocks] = useState<OutputBlockData[]>(data?.blocks ?? []);
	const { setNodes } = useReactFlow();

	const modalRoot = document.getElementById("modal-portal-root");
	if (!modalRoot) throw new Error("Missing modal portal root");

	const editorModal = () =>
		createPortal(
			<ScreenEditor
				blocks={blocks}
				setBlocks={(value) => {
					setBlocks(value);
					setNodes((nodes) =>
						nodes.map((node) =>
							node.id === id
								? { ...node, data: { ...node.data, blocks: value } }
								: node
						)
					);
				}}
				name={nodeName}
				setName={(value) => {
					setNodeName(value);
					setNodes((nodes) =>
						nodes.map((node) =>
							node.id === id
								? { ...node, data: { ...node.data, label: value } }
								: node
						)
					);
				}}
				save={() => setEditorVisible(false)}
			/>,
			modalRoot
		);

	return (
		<>
			{editorVisible ? editorModal() : null}
			<div
				className="flex flex-col bg-white border border-black p-5 rounded-md shadow-md font-semibold group text-center"
				onClick={() => setEditorVisible(true)}
			>
				<Handle
					type="target"
					position={Position.Top}
					isConnectable={isConnectable}
					className="invisible"
				/>
				{data?.label}
				<Handle
					type="source"
					position={Position.Bottom}
					isConnectable={isConnectable}
					className="invisible"
				/>
				<div className="mx-auto h-0 hidden group-hover:block">
					<AddNodeButton id={id} xPos={xPos} yPos={yPos} />
				</div>
			</div>
		</>
	);
};

export default CustomNode;
