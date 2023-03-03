export const FormCheckbox: React.FC<
	{
		name: string;
		description: string;
		label: string;
	} & React.InputHTMLAttributes<HTMLInputElement>
> = ({ name, description, label, ...props }) => (
	<div className="relative flex items-start">
		<div className="flex h-5 items-center">
			<input
				id={name}
				name={name}
				type="checkbox"
				className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
				{...props}
			/>
		</div>
		<div className="ml-3 text-sm">
			<label htmlFor={name} className="font-medium text-gray-700">
				{label}
			</label>
			<p className="text-gray-500">{description}</p>
		</div>
	</div>
);
