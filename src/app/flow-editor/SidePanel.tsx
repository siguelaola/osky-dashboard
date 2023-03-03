import clsx from "clsx";
import Image from "next/image";
import React, { useState } from "react";
import {
	applyEdgeChanges,
	applyNodeChanges,
	EdgeAddChange,
	useReactFlow,
} from "reactflow";
import { integrations, IntegrationSettings } from "../../integrations";
import Button from "./Button";

const IntegrationListItem: React.FC<{
	name: string;
	description: string;
	icon: JSX.Element;
	settings: IntegrationSettings[];
}> = ({ name, description, icon, settings }) => {
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
										settings,
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

const IntegrationsList = () => (
	<ul>
		{integrations.map(
			({ id, name, description, icon: Icon, image, settings }) => (
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
					settings={settings}
				/>
			)
		)}
	</ul>
);

const tabs = ["Integrations", "Settings"];

const Settings = () => {
	const [redirect, setRedirect] = useState(false);
	const [poweredBy, setPoweredBy] = useState(true);

	return (
		<div className="flex flex-col space-y-4">
			<label>
				<div className="flex justify-between">
					<p>Redirect on completion</p>
					<input
						type="checkbox"
						checked={redirect}
						onChange={(e) => setRedirect(e.target.checked)}
					/>
				</div>
				<p className="text-sm text-gray-500">
					Redirect to a custom URL when the form is submitted.
				</p>
			</label>

			{redirect ? (
				<input
					type="text"
					placeholder="https://example.com/"
					className="border p-2 rounded-md"
					required
				/>
			) : null}
			<hr />

			<label>
				<div className="flex justify-between">
					<p>Ola branding</p>
					<input
						type="checkbox"
						checked={poweredBy}
						onChange={(e) => setPoweredBy(e.target.checked)}
					/>
				</div>
				<p className="text-sm text-gray-500">
					Show "Powered by Ola" at the bottom of your screens.
				</p>
			</label>
		</div>
	);
};

export const SidePanel = () => {
	const [activeTab, setActiveTab] = useState("Integrations");
	return (
		<aside className="bg-white self-end h-full z-10 shadow-md m-3 p-3 w-64 flex flex-col justify-between mb-10">
			<div>
				<nav className="flex space-x-4 mb-3" aria-label="Tabs">
					{tabs.map((tab) => (
						<button
							key={tab}
							className={clsx(
								tab === activeTab
									? "bg-indigo-100 text-indigo-700"
									: "text-gray-500 hover:text-gray-700",
								"rounded-md px-3 py-2 text-sm font-medium"
							)}
							onClick={() => setActiveTab(tab)}
						>
							{tab}
						</button>
					))}
				</nav>
				{activeTab === "Integrations" && <IntegrationsList />}
				{activeTab === "Settings" && <Settings />}
			</div>
			<ExportJSONButton />
		</aside>
	);
};

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

export default SidePanel;
