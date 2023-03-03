import clsx from "clsx";

const Select: React.FC<
	React.DetailedHTMLProps<
		React.SelectHTMLAttributes<HTMLSelectElement>,
		HTMLSelectElement
	> & { options: Array<{ value: string; label: string }> }
> = ({ options, className, ...props }) => (
	<select
		className={clsx(
			"block w-full max-w-lg",
			"rounded-md border-gray-300 shadow-sm",
			"focus:border-indigo-500 focus:ring-indigo-500",
			"sm:max-w-xs sm:text-sm",
			className
		)}
		onChange={props.onChange}
		value={props.value}
	>
		{options.map(({ value, label }) => (
			<option key={value} value={value}>
				{label}
			</option>
		))}
	</select>
);
export default Select;
