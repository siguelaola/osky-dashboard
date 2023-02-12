import { useState } from "react";
import Button from "./Button";
import YesNoRadios from "./components/YesNoRadios";
import { FormComponent, FormComponentType, FormInputChoice } from "./types";

const CheckboxesChoiceEdit: React.FC<{
	choice: FormInputChoice;
	onEdit: (label: string, checked: boolean) => void;
	onBackspace: (e: React.KeyboardEvent<HTMLInputElement>) => void;
	onEnter: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}> = ({ choice, onEdit, onBackspace, onEnter }) => {
	const [label, setLabel] = useState(choice.label);
	const [checked, setChecked] = useState(choice.defaultChecked || false);

	return (
		<li className="flex items-center">
			<input
				type="checkbox"
				checked={choice.defaultChecked}
				onChange={(e) => {
					setChecked(e.currentTarget.checked);
					onEdit(label, e.currentTarget.checked);
				}}
				className="mr-2"
			/>
			<input
				type="text"
				value={label}
				onChange={(e) => {
					setLabel(e.currentTarget.value);
					onEdit(e.currentTarget.value, checked);
				}}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						onEnter(e);
					} else if (e.key === "Backspace" && label === "") {
						onBackspace(e);
					}
				}}
				className="bg-transparent border-none p-0"
			/>
		</li>
	);
};

export const ComponentEditor: React.FC<{
	component: FormComponent;
	onEdit: (value: Record<string, any>) => void;
}> = ({ component, onEdit }) => {
	switch (component.type) {
		case FormComponentType.Heading:
			return (
				<h2 className="font-bold text-xl w-full">
					<input
						type="text"
						value={component.label}
						className="w-full bg-transparent border-none text-xl"
						placeholder="Click to edit"
						onChange={(e) => onEdit({ label: e.target.value })}
					/>
				</h2>
			);
		case FormComponentType.Text:
			return (
				<textarea
					value={component.label}
					cols={60}
					className="w-full bg-transparent border-none"
					onChange={(e) => onEdit({ label: e.currentTarget.value })}
				/>
			);
		case FormComponentType.TextInput:
			return <input type="text" value={component.label} className="w-full" />;
		case FormComponentType.Checkboxes:
			return (
				<ul className="w-full">
					{component.choices?.map((choice, index) => (
						<CheckboxesChoiceEdit
							key={index}
							choice={choice}
							onEdit={(label, checked) => {
								const newChoices = [...component.choices!];
								newChoices[index] = {
									...newChoices[index],
									label,
									defaultChecked: checked,
								};
								onEdit({ choices: newChoices });
							}}
							onBackspace={(e) => {
								if (!component.choices || component.choices.length <= 1) return;
								const newChoices = [...component.choices];
								newChoices.splice(index, 1);
								onEdit({ choices: newChoices });
							}}
							onEnter={(e) => {
								const newChoices = [...component.choices!];
								newChoices.splice(index + 1, 0, {
									label: "Click to edit label",
									defaultChecked: false,
									value: "",
								});
								onEdit({ choices: newChoices });

								// wait for re-render and focus the new input
								const ul = e.currentTarget.parentElement?.parentElement;
								setTimeout(
									() =>
										ul
											?.querySelector<HTMLInputElement>(
												":last-child>input[type='text']"
											)
											?.focus(),
									1
								);
							}}
						/>
					))}
				</ul>
			);
		case FormComponentType.YesNoInput:
			return (
				<div className="flex flex-col w-full">
					<input
						type="text"
						value={component.label}
						className="w-full bg-transparent border-none p-0 mb-2"
						onChange={(e) => onEdit({ label: e.currentTarget.value })}
					/>
					<YesNoRadios />
				</div>
			);

		case FormComponentType.Continue:
			return (
				<Button variant="primary">
					<input
						type="text"
						value={component.label}
						className="bg-transparent border-none p-0"
						placeholder="Click to edit"
						onChange={(e) => onEdit({ label: e.currentTarget.value })}
						size={component.label.length}
					/>
				</Button>
			);
	}
};

export default ComponentEditor;
