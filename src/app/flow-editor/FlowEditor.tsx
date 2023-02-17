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
import IntegrationList from "./IntegrationsList";
import ScreenNode from "./ScreenNode";
import { FormComponentType } from "./types";

const defaultNodes: Node[] = [
	{
		id: "node-0",
		type: "screen",
		data: {
			label: "Initial Screen",
			components: [
				{
					type: FormComponentType.Heading,
					data: {
						text: "Welcome!",
						level: 1,
					}
				},
				{
					type: FormComponentType.Paragraph,
					data: {
						text: "This is the first screen of the flow. Add some components...",
					}
				},
			],
		},
		position: { x: 250, y: 250 },
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
		<div className="pl-64 h-screen">
			<ReactFlow
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onConnect={(params) => setEdges((els) => addEdge(params, els))}
				onEdgeClick={(e, edge) => setEditingEdge(edge)}
				nodeTypes={nodeTypes}
				className="flex flex-col"
			>
				<Background />
				<div
					id="modal-portal-root"
					className="fixed w-full h-full z-10 empty:hidden flex justify-center items-center -ml-64"
				/>
				{editingEdge ? (
					<EdgeEditor edge={editingEdge} onClose={() => setEditingEdge(null)} />
				) : null}
				<IntegrationList />
			</ReactFlow>
		</div>
	);
};

export default FlowEditor;
