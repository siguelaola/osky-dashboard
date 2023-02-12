import { EnvelopeIcon } from "@heroicons/react/24/outline";
import AlpacaLogo from "./public/logos/third-party/alpaca.svg";
import SalesForceLogo from "./public/logos/third-party/salesforce.svg";

export interface IntegrationSettings {
	id: string;
	label: string;
	type: string;
}

export const integrations = [
	{
		id: "email",
		name: "Send Email",
		description: "Send an email to a user",
		icon: EnvelopeIcon,
		settings: [
			{ id: "to", label: "To", type: "text" },
			{ id: "subject", label: "Subject", type: "text" },
			{ id: "body", label: "Body", type: "textarea" },
		],
	},
	{
		id: "salesforce",
		name: "Salesforce",
		description: "Send data to Salesforce",
		image: SalesForceLogo,
		settings: [],
	},
	{
		id: "alpaca",
		name: "Alpaca",
		description: "Verify user on Alpaca",
		image: AlpacaLogo,
		settings: [],
	},
];
