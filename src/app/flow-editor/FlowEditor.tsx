"use client";
import { SupabaseClient } from "@supabase/supabase-js";
import throttle from "lodash.throttle";
import { useEffect, useState } from "react";
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
import { useSupabase } from "../(components)/supabase/SupabaseProvider";
import { Database, Json } from "../../supabase/types";
import EdgeEditor from "./EdgeEditor";
import FlowPreview from "./FlowPreview";
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

// interval in milliseconds of the frequency of saving an edited flow to the database
const SAVE_INTERVAL = 2500;

const save = throttle(
	async (
		supabase: SupabaseClient<Database>,
		id: string,
		nodes: Node[],
		edges: Edge[]
	) => {
		const { data, error } = await supabase
			.from("flows")
			.update({
				data: { nodes, edges } as unknown as Json,
				updated_at: "now()",
			})
			.eq("id", id)
			.select("updated_at")
			.single();
		if (error) {
			console.error("Save error", error);
		}
		console.log("Saved", data);
	},
	SAVE_INTERVAL,
	{
		leading: false,
	}
);

const FlowEditor: React.FC<{ id?: string; nodes?: Node[]; edges?: Edge[] }> = (
	props
) => {
	const [nodes, setNodes, onNodesChange] = useNodesState(
		props.nodes ?? defaultNodes
	);
	const [edges, setEdges, onEdgesChange] = useEdgesState(
		props.edges ?? defaultEdges
	);
	const [editingEdge, setEditingEdge] = useState<Edge | null>(null);
	const [isPreviewing, setIsPreviewing] = useState(false);
	const { supabase } = useSupabase();

	if (props.id) {
		useEffect(() => {
			save(supabase, props.id as string, nodes, edges);
		}, [nodes, edges]);
	}

	return (
		<div className="h-screen">
			<ReactFlow
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onConnect={(params) => setEdges((els) => addEdge(params, els))}
				onEdgeClick={(_, edge) => setEditingEdge(edge)}
				nodeTypes={nodeTypes}
				fitView={true}
				fitViewOptions={{ maxZoom: 1 }}
				className="flex flex-row justify-end p-3 pb-6"
			>
				{/* background color === Tailwind `bg-gray-50` */}
				<Background style={{ backgroundColor: "#f9fafb" }} />
				{editingEdge ? (
					<EdgeEditor
						edge={editingEdge}
						onClose={() => setEditingEdge(null)}
						nodes={nodes}
					/>
				) : null}
				{isPreviewing ? <FlowPreview /> : null}
				<SidePanel togglePreview={() => setIsPreviewing(!isPreviewing)} />
			</ReactFlow>
		</div>
	);
};

export default FlowEditor;
