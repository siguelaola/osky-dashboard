const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["src/**/*.tsx"],
	theme: {
		extend: {},
		colors: {
			...colors,
			primary: {
				50: "#f1f8fe",
				100: "#b5d3f2",
				300: "#77a1d4",
				500: "#5082c3",
				600: "#3e679e",
				700: "#2b486e",
				900: "#293c52",
			},
			accent: {
				50: "#edfefe",
				100: "#bbecea",
				300: "#90d5d2",
				500: "#66aca3",
				600: "#528f87",
				700: "#37645e",
				900: "#254444",
			},
			success: {
				50: "#e9fbed",
				100: "#bbecc4",
				300: "#93d6a3",
				500: "#6cbe79",
				600: "#559b5e",
				700: "#3f7546",
				900: "#2b513b",
			},
			warning: {
				50: "#fefcf5",
				100: "#faf3da",
				300: "#f4e3a7",
				500: "#eacb73",
				600: "#c2a64f",
				700: "#856e2e",
				900: "#58491d",
			},
			danger: {
				50: "#f8e9e8",
				100: "#e6adac",
				300: "#cf6b68",
				500: "#c54039",
				600: "#a43029",
				700: "#7a2520",
				900: "#561d1b",
			},
		},
	},
	plugins: [require("@tailwindcss/typography")],
};
