import { PlusSmallIcon, TrashIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { Edge } from "reactflow";
import Button from "./Button";

interface Condition {
	operation: "" | "eq" | "neq" | "gt" | "lt" | "in" | "nin";
	input: string;
	inputType: "string" | "number";
	value: string;
}

const ConditionEntry: React.FC<{
	condition: Condition;
	setCondition: (condition: Condition | null) => void;
}> = ({ condition, setCondition }) => (
	<li className="flex justify-between items-center border-b border-gray-300 py-2">
		<div className="flex items-center">
			<input className="w-24 mr-2" type="text" placeholder="Input" />
			<select className="mr-2">
				<option value="eq">equals</option>
				<option value="neq">does not equal</option>

				{condition.inputType === "number" && (
					<>
						<option value="gt">is more than</option>
						<option value="lt">is less than</option>
					</>
				)}

				<option value="in">is in</option>
				<option value="nin">is not in</option>
			</select>
			<input className="w-24" type="text" placeholder="Value" />
		</div>
		<button className="p-1" onClick={() => setCondition(null)}>
			<TrashIcon className="w-5 h-5 ml-3 text-danger-600" />
		</button>
	</li>
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
			<div className="bg-white rounded-md min-w-[18rem] min-h-72 opacity-100 z-10 p-5 flex flex-col justify-between">
				<h1 className="text-xl font-semibold">Add conditions</h1>

				<ul>
					{conditions.map((condition, index) => (
						<ConditionEntry
							key={index}
							condition={condition}
							setCondition={(newCondition) => {
								setConditions(
									conditions
										.map((c, i) => (i === index ? newCondition : c))
										.filter((c): c is Condition => c !== null)
								);
								const newConditions = [...conditions];
								if (newCondition) {
									newConditions[index] = newCondition;
								} else {
									delete newConditions[index];
								}
							}}
						/>
					))}
				</ul>

				<div>
					<Button
						variant="plain"
						className="w-full my-3"
						onClick={() =>
							setConditions([
								...conditions,
								{ operation: "", input: "", inputType: "number", value: "" },
							])
						}
					>
						<PlusSmallIcon className="w-6 h-6 mr-1" />
						New condition
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
