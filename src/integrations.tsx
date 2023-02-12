import { EnvelopeIcon } from "@heroicons/react/24/outline";
import AlpacaLogo from "./public/logos/third-party/alpaca.svg";
import SalesForceLogo from "./public/logos/third-party/salesforce.svg";

export const integrations = [
	{
		id: "email",
		name: "Send Email",
		description: "Send an email to a user",
		icon: EnvelopeIcon,
	},
	{
		id: "salesforce",
		name: "Salesforce",
		description: "Send data to Salesforce",
		image: SalesForceLogo,
	},
	{
		id: "alpaca",
		name: "Alpaca",
		description: "Verify user on Alpaca",
		image: AlpacaLogo,
	},
];
