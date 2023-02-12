import React from "react";
import { IntegrationSettings } from "../../integrations";
import Button from "./Button";

export const IntegrationSettingsScreen: React.FC<{
	name: string;
	save: () => void;
	settings: IntegrationSettings[];
}> = ({ name, save, settings }) => {
	return (
		<>
			<div
				className="fixed z-10 inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
				onClick={() => save()}
			/>
			<div className="relative z-20 flex flex-col justify-between items-center bg-white rounded-lg p-5 shadow-lg gap-3">
				<div className="flex w-full justify-between items-center">
					<h1 className="font-semibold text-xl text-gray-800">{name}</h1>
				</div>
				<ul>
					{settings.map(({ id, label, type }) => (
						<li key={id} className="flex flex-col mb-2">
							<label className="text-gray-800 font-semibold">{label}</label>
							{type === "text" ? (
								<input
									name={id}
									type="text"
									className="border border-gray-300 rounded-md p-2"
								/>
							) : type === "textarea" ? (
								<textarea
									name={id}
									className="border border-gray-300 rounded-md p-2"
								/>
							) : null}
						</li>
					))}
				</ul>
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

export default IntegrationSettingsScreen;
