import Select from "./Select";

const COUNTRIES = [
	{ value: "be", label: "Belgium" },
	{ value: "ca", label: "Canada" },
	{ value: "fr", label: "France" },
	{ value: "us", label: "United States" },
	{ value: "xx", label: "Other" },
];

const CountrySelect: React.FC<
	React.DetailedHTMLProps<
		React.SelectHTMLAttributes<HTMLSelectElement>,
		HTMLSelectElement
	>
> = ({ value, onChange, ...props }) => (
	<Select
		autoComplete="country"
		className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
		value={value}
		options={COUNTRIES}
		onChange={onChange}
		{...props}
	></Select>
);
export default CountrySelect;
