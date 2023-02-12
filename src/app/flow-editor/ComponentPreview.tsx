import Button from "./Button";
import YesNoRadios from "./components/YesNoRadios";
import { FormComponent, FormComponentType } from "./types";

export const ComponentPreview: React.FC<{
	component: FormComponent;
}> = ({ component }) => {
	switch (component.type) {
		case FormComponentType.Heading:
			return <h1 className="font-bold text-xl w-full">{component.label}</h1>;
		case FormComponentType.Text:
			return <p>{component.label}</p>;
		case FormComponentType.TextInput:
			return <input type="text" value={component.label} className="w-full" />;
		case FormComponentType.YesNoInput:
			return (
				<div className="flex flex-col w-full">
					<p className="mb-2">{component.label}</p>
					<YesNoRadios />
				</div>
			);
		case FormComponentType.Checkboxes:
			return (
				<ul className="divide-y divide-gray-100">
					{component.choices?.map((choice, index) => (
						<li key={index} className="flex">
							<input
								type="checkbox"
								className="mr-2"
								checked={choice.defaultChecked}
							/>
							<span>{choice.label}</span>
						</li>
					))}
				</ul>
			);
		case FormComponentType.Continue:
			return <Button variant="primary">{component.label}</Button>;
	}
};

export default ComponentPreview;
