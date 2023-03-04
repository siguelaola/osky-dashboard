import "../styles/tailwind.css";
import Footer from "./Footer";
import Head from "./head";
import Sidebar from "./Sidebar";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang="en">
			<Head />
			<body className="flex">
				<Sidebar />
				<main className="w-full pl-64">{children}</main>
				<div
					id="modal-portal-root"
					className="absolute w-full h-full z-10 empty:hidden flex justify-center items-center"
				/>
				<Footer />
			</body>
		</html>
	);
};

export default RootLayout;
