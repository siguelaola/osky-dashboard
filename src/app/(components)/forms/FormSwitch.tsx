"use client";
import { Switch } from "@headlessui/react";
import clsx from "clsx";

const FormSwitch: React.FC<{ label: string; value: boolean }> = ({
	label,
	value,
}) => {
	return (
		<Switch.Group as="div" className="flex items-center">
			<Switch
				checked={value}
				className={clsx(
					value ? "bg-orange-500" : "bg-gray-200",
					"relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
				)}
			>
				<span
					aria-hidden="true"
					className={clsx(
						value ? "translate-x-5" : "translate-x-0",
						"inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
					)}
				/>
			</Switch>
			<Switch.Label as="span" className="ml-3">
				<span className="text-sm font-medium text-gray-900">{label}</span>
			</Switch.Label>
		</Switch.Group>
	);
};

export default FormSwitch;
