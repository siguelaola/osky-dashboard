import { ReactNode } from "react";
import OrgSettingsNavigation from "./OrgSettingsNavigation";

export default function OrganizationSettingsLayout({
	children,
}: {
	children: ReactNode[];
}) {
	return (
		<div className="p-3">
			<OrgSettingsNavigation />
			{children}
		</div>
	);
}
