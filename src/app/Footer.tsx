const navigation = {
	main: [
		{ name: "Features", href: "#" },
		{ name: "Contact", href: "mailto:contact@siguelaola.com" },
	],
};

const Footer = () => (
	<footer className="bg-white">
		<p className="mt-8 text-center text-base text-gray-400">
			&copy; {new Date().getFullYear()} Ola Financial Technologies, Inc.
		</p>
	</footer>
);

export default Footer;
