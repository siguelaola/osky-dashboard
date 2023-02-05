import { PlusSmallIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { Edge } from "reactflow";
import Button from "./Button";

interface Condition {}

const ConditionEntry: React.FC<{ condition: Condition }> = ({ condition }) => (
	<li>Condition</li>
);

const EdgeEditor: React.FC<{ edge: Edge; onClose: () => void }> = ({
	edge,
	onClose,
}) => {
	const [conditions, setConditions] = useState<Condition[]>([]);

	return (
		<div className="fixed w-full h-full flex justify-center items-center -ml-64 z-[1000]">
			<div
				className="bg-gray-600 opacity-50 w-full h-full fixed"
				onClick={onClose}
			></div>
			<div className="bg-white rounded-md w-64 min-h-72 opacity-100 z-10 p-5 flex flex-col justify-between">
				<h1 className="text-xl font-semibold">Add conditions</h1>

				<ul>
					{conditions.map((condition, index) => (
						<ConditionEntry key={index} condition={condition} />
					))}
				</ul>

				<div>
					<Button
						variant="plain"
						className="w-full my-3"
						onClick={() => setConditions([...conditions, {}])}
					>
						<PlusSmallIcon className="w-6 h-6 mr-1" />
						Add condition
					</Button>

					<div className="flex justify-between">
						<Button variant="plain" onClick={onClose}>
							Cancel
						</Button>
						<Button variant="primary" onClick={onClose}>
							Save
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EdgeEditor;
