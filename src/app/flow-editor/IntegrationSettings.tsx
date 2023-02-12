import React, { useState } from "react";
import Button from "./Button";

export const IntegrationSettings: React.FC<{
	name: string;
	save: () => void;
}> = ({ name, save }) => {
	const [isEditing, setEditing] = useState(false);

	return (
		<>
			<div
				className="fixed z-10 inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
				onClick={() => save()}
			/>
			<div className="relative z-20 flex flex-col justify-between items-center bg-white rounded-lg p-5 shadow-lg gap-3">
				<div className="flex w-full justify-between items-center">
					<h1 className="font-semibold text-xl text-gray-800">
						{name} integration
					</h1>
				</div>
				<div className="flex justify-between">
					<Button variant="plain" onClick={save}>
						Cancel
					</Button>
					<Button variant="primary" onClick={save}>
						Save
					</Button>
				</div>
			</div>
		</>
	);
};

export default IntegrationSettings;
