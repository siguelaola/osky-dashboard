import Button from "./Button";
import { FormComponent, FormComponentType } from "./types";

export const ScreenEditor: React.FC<{
	components: FormComponent[];
	save: () => void;
}> = ({ components, save }) => {
	return (
		<>
			<div
				className="fixed z-10 inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
				onClick={() => save()}
			/>
			<div className="relative z-20 flex flex-col justify-between items-center bg-white rounded-lg p-5 shadow-lg">
				<div className="flex flex-col gap-5 p-3 border-2 border-gray-300 border-dashed">
					{components.map((component, index) => {
						switch (component.type) {
							case FormComponentType.Continue:
								return (
									<Button key={index} variant="primary">
										{component.label}
									</Button>
								);
							case FormComponentType.Text:
								return <p key={index}>{component.label}</p>;
							case FormComponentType.Heading:
								return (
									<h1 key={index} className="font-bold text-xl">
										{component.label}
									</h1>
								);
						}
					})}
				</div>
				<div className="flex justify-between mt-3">
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

export default ScreenEditor;
