import "../styles/tailwind.css";
import Footer from "./Footer";
import Head from "./head";
import Sidebar from "./Sidebar";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang="en">
			<Head />
			<body>
				<Sidebar />
				<main className="ml-64">{children}</main>
				<Footer />
			</body>
		</html>
	);
};

export default RootLayout;
