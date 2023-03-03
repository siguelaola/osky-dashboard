const LabelledArea: React.FC<{
	id: string;
	label: string;
	children: React.ReactNode;
}> = ({ id, label, children }) => (
	<div className="sm:grid sm:grid-cols-3 sm:items-center sm:gap-4 sm:pt-5">
		<label htmlFor={id} className="block text-sm font-medium text-gray-700">
			{label}
		</label>
		<div className="mt-1 sm:col-span-2 sm:mt-0">{children}</div>
	</div>
);

export default LabelledArea;
