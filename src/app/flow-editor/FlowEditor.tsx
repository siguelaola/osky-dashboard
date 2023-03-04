"use client";
import { useState } from "react";
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
import EdgeEditor from "./EdgeEditor";
import IntegrationNode from "./IntegrationNode";
import ScreenNode from "./ScreenNode";
import SidePanel from "./SidePanel";
import { FormComponentType } from "./types";

const defaultNodes: Node[] = [
	{
		id: "node-0",
		type: "screen",
		data: {
			label: "Initial Screen",
			blocks: [
				{
					type: FormComponentType.Heading,
					data: {
						text: "Welcome!",
						level: 1,
					},
				},
				{
					type: FormComponentType.Paragraph,
					data: {
						text: "This is the first screen of the flow.",
					},
				},
				{
					type: FormComponentType.Paragraph,
					data: {
						text: "This editor works similarly to other block editors you might be familiar with, such as Notion.",
					},
				},
				{
					type: FormComponentType.Paragraph,
					data: {
						text: "You can add new blocks, special components, and reorder components using the + and ⋮⋮ buttons on the right-hand side.",
					},
				},
			],
		},
		position: { x: 0, y: 0 },
	},
];
const defaultEdges: Edge[] = [];

const nodeTypes = {
	screen: ScreenNode,
	integration: IntegrationNode,
};

const FlowEditor = () => {
	const [nodes, setNodes, onNodesChange] = useNodesState(defaultNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState(defaultEdges);
	const [editingEdge, setEditingEdge] = useState<Edge | null>(null);

	return (
		<div className="h-screen">
			<ReactFlow
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onConnect={(params) => setEdges((els) => addEdge(params, els))}
				onEdgeClick={(e, edge) => setEditingEdge(edge)}
				nodeTypes={nodeTypes}
				fitView={true}
				fitViewOptions={{ maxZoom: 1 }}
				className="flex flex-col"
			>
				<Background />
				{editingEdge ? (
					<EdgeEditor
						edge={editingEdge}
						onClose={() => setEditingEdge(null)}
						nodes={nodes}
					/>
				) : null}
				<SidePanel />
			</ReactFlow>
		</div>
	);
};

export default FlowEditor;
