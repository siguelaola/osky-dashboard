import Image from "next/image";
import React from "react";
import {
	applyEdgeChanges,
	applyNodeChanges,
	EdgeAddChange,
	useReactFlow,
} from "reactflow";
import { integrations } from "../../integrations";
import Button from "./Button";

const IntegrationListItem: React.FC<{
	name: string;
	description: string;
	icon: JSX.Element;
}> = ({ name, description, icon }) => {
	const { project, setEdges, setNodes } = useReactFlow();

	return (
		<li
			className="border p-3 mb-2 shadow-sm cursor-grab flex items-center justify-between"
			draggable
			onDragEnd={(e) => {
				const nodeTarget = document
					.elementFromPoint(e.clientX, e.clientY)
					?.closest(".react-flow__node");
				if (!nodeTarget) return;
				const dropTargetCoords = nodeTarget.getBoundingClientRect();
				const dropTargetId = nodeTarget.getAttribute("data-id") || "";

				const edgeChanges: EdgeAddChange[] = [];
				setNodes((nodes) => {
					const newId = `node-${nodes.length}`;
					edgeChanges.push({
						type: "add",
						item: {
							id: `edge-${dropTargetId}-${newId}`,
							source: dropTargetId,
							target: newId,
						},
					});

					return applyNodeChanges(
						[
							{
								type: "add",
								item: {
									id: newId,
									position: project({
										x: dropTargetCoords.x - 200,
										y: dropTargetCoords.y + 100,
									}),
									data: {
										label: name,
									},
									type: "integration",
								},
							},
						],
						nodes
					);
				});
				setEdges((edges) => applyEdgeChanges(edgeChanges, edges));
			}}
		>
			<div className="flex items-center">
				{icon}
				<div className="ml-4">
					<div className="text-sm font-medium text-gray-900">{name}</div>
					<div className="text-sm text-gray-500">{description}</div>
				</div>
			</div>
		</li>
	);
};

export const IntegrationList = () => (
	<div className="bg-white self-end h-full z-10 shadow-md m-3 p-3 w-64 flex flex-col justify-between">
		<ul>
			{integrations.map(({ id, name, description, icon: Icon, image }) => (
				<IntegrationListItem
					key={id}
					name={name}
					description={description}
					icon={
						Icon ? (
							<Icon className="h-10 w-10 text-primary-600" />
						) : (
							<Image
								src={image}
								className="h-10 w-10"
								alt="Integration logo"
								draggable={false}
							/>
						)
					}
				/>
			))}
		</ul>
		<ExportJSONButton />
	</div>
);

const ExportJSONButton = () => {
	const { getNodes, getEdges } = useReactFlow();
	return (
		<Button
			variant="plain"
			onClick={() => {
				const state = JSON.stringify(
					{ nodes: getNodes(), edges: getEdges() },
					null,
					2
				);
				console.log(state);
				prompt("State has been logged to the console as well", state);
			}}
		>
			Export JSON
		</Button>
	);
};

export default IntegrationList;
