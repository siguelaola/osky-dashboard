import "../styles/tailwind.css";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang="en">
			<head />
			<body>
				<Sidebar />
				<main>{children}</main>
				<Footer />
			</body>
		</html>
	);
};

export default RootLayout;
