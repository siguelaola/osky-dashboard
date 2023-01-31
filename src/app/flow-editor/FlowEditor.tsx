"use client";
import {
	addEdge,
	Background,
	Edge,
	Node,
	ReactFlow,
	useEdgesState,
	useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";
import CustomNode from "./CustomNode";
import { FormComponentType } from "./types";

const defaultNodes: Node[] = [
	{
		id: "node-0",
		type: "custom",
		data: {
			label: "Initial Screen",
			components: [
				{
					type: FormComponentType.Heading,
					label: "Welcome",
				},
				{
					type: FormComponentType.Text,
					label: "This is the first screen of the flow. Add some components...",
				},
				{
					type: FormComponentType.Continue,
					label: "Continue",
				},
			],
		},
		position: { x: 250, y: 250 },
	},
];
const defaultEdges: Edge[] = [];

const nodeTypes = {
	custom: CustomNode,
};

const FlowEditor = () => {
	const [nodes, setNodes, onNodesChange] = useNodesState(defaultNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState(defaultEdges);

	return (
		<div style={{ height: "600px" }} className="pl-64">
			<ReactFlow
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onConnect={(params) => setEdges((els) => addEdge(params, els))}
				nodeTypes={nodeTypes}
			>
				<Background />
				<div
					id="modal-portal-root"
					className="fixed w-full h-full z-10 empty:hidden flex justify-center items-center -ml-64"
				/>
			</ReactFlow>
		</div>
	);
};

export default FlowEditor;
