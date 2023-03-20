"use client";
import { Combobox } from "@headlessui/react";
import { ChevronUpDownIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import React, { useState } from "react";

interface ComboBoxEntry {
	label: string;
	value: string;
}

const ComboBox: React.FC<{
	entries: ComboBoxEntry[];
	label: string;
	placeholder: string;
	onChange: (entry: ComboBoxEntry | null) => void;
	onAddOption: (value: string) => string | undefined;
}> = ({ entries, label, placeholder, onChange, onAddOption }) => {
	const [query, setQuery] = useState("");
	const [selection, setSelection] = useState<ComboBoxEntry | null>(null);

	const cleanQuery = query.trim();

	const filtered =
		cleanQuery === ""
			? entries
			: entries.filter((entry) =>
					entry.label.toLowerCase().includes(cleanQuery.toLowerCase())
			  );

	return (
		<Combobox<ComboBoxEntry | undefined>
			// @ts-expect-error: typings don't like strings here?
			as="div"
			// @ts-expect-error: Bug in Combobox's expected value in headlessui
			value={selection}
			// @ts-expect-error: Bug in Combobox's expected value in headlessui
			onChange={(value: ComboBoxEntry | "_" | undefined) => {
				if (value === "_") {
					const newOption = onAddOption(cleanQuery);
					if (newOption) {
						setSelection({ label: cleanQuery, value: newOption });
						onChange({ label: cleanQuery, value: newOption });
					}
				} else {
					setSelection(value || null);
					onChange(value || null);
				}
			}}
			className="flex flex-auto"
		>
			<div className="relative mt-1 flex flex-grow">
				<Combobox.Input<any, any>
					className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
					onChange={(event) => setQuery(event.target.value)}
					placeholder={placeholder}
					displayValue={(entry) => entry?.label}
				/>
				<Combobox.Button
					className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
					onClick={() => setQuery("")}
				>
					<ChevronUpDownIcon
						className="h-5 w-5 text-gray-400"
						aria-hidden="true"
					/>
				</Combobox.Button>

				<Combobox.Options
					className={
						// FIXME - is there a better way to fix the top of the menu to the input than mt-10?
						"absolute z-10 max-h-60 w-full overflow-auto mt-10 " +
						"bg-white rounded-md text-base shadow-lg focus:outline-none sm:text-sm " +
						"ring-1 ring-black ring-opacity-5 " +
						"list-none p-0"
					}
				>
					{filtered.length
						? filtered.map((entry) => (
								<Combobox.Option
									key={entry.value}
									value={entry}
									className={({ active }) =>
										clsx(
											"relative cursor-default select-none py-2 pl-3 pr-9",
											active ? "bg-indigo-600 text-white" : "text-gray-900"
										)
									}
								>
									{({ active, selected }) => (
										<div
											className={clsx("flex items-center", {
												"font-semibold": selected,
											})}
										>
											<span className="ml-3 truncate">{entry.label}</span>
										</div>
									)}
								</Combobox.Option>
						  ))
						: null}

					{cleanQuery ? (
						<Combobox.Option
							value="_"
							className={({ active }) =>
								clsx(
									"flex items-center cursor-pointer py-2 pl-1.5 pr-9",
									"relative cursor-default select-none",
									active ? "bg-indigo-600 text-white" : "text-gray-900"
								)
							}
						>
							<PlusCircleIcon className="w-5 h-5" />
							<span className="pl-1.5">
								Add option <span className="font-semibold">{cleanQuery}</span>
							</span>
						</Combobox.Option>
					) : null}
				</Combobox.Options>
			</div>
		</Combobox>
	);
};

export default ComboBox;
