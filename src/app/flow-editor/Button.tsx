import clsx from "clsx";
import type { LinkProps } from "next/link";
import Link from "next/link";

const BASE_CLASSES = [
	"ml-3 first:ml-0",
	"py-2 px-4 inline-flex justify-center items-center rounded-md text-sm font-medium",
	"border shadow-sm",
	"focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
	"disabled:bg-gray-400",
];

const COLORS_PLAIN = [
	"bg-white",
	"hover:bg-gray-50",
	"border-gray-300",
	"text-gray-700",
];
const COLORS_PRIMARY = [
	"bg-primary-600",
	"hover:bg-primary-700",
	"border-transparent",
	"text-white",
];
const COLORS_DANGER = [
	"bg-danger-600",
	"hover:bg-danger-700",
	"border-transparent",
	"text-white",
];

export const Button = ({
	children,
	className,
	variant = "plain",
	...props
}: React.DetailedHTMLProps<
	React.ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
> & { variant?: "plain" | "primary" | "danger" }) => (
	<button
		className={clsx(
			BASE_CLASSES,
			variant === "primary"
				? COLORS_PRIMARY
				: variant === "danger"
				? COLORS_DANGER
				: COLORS_PLAIN,
			className
		)}
		{...props}
	>
		{children}
	</button>
);

export const ButtonLink = ({
	children,
	className,
	variant = "plain",
	...props
}: LinkProps & {
	children?: React.ReactNode;
	className?: string;
	variant?: "plain" | "primary" | "danger";
}) => (
	<Link
		className={clsx(
			BASE_CLASSES,
			variant === "primary"
				? COLORS_PRIMARY
				: variant === "danger"
				? COLORS_DANGER
				: COLORS_PLAIN,
			className
		)}
		{...props}
	>
		{children}
	</Link>
);

export default Button;
