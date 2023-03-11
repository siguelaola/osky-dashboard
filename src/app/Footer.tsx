const navigation = {
	main: [
		{ name: "Features", href: "#" },
		{ name: "Contact", href: "mailto:contact@siguelaola.com" },
	],
};

const Footer = () => (
	<footer className="absolute w-full bottom-0">
		<p className="text-center text-base text-gray-400">
			&copy; {new Date().getFullYear()} Ola Financial Technologies, Inc.
		</p>
	</footer>
);

export default Footer;
