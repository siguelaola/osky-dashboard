export default class SeparatorComponent {
	static get toolbox () {
		return {
			title: "Separator",
			icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" /></svg>`,
		};
	}

	// TODO: make selectable with click and EditorJS selection box

	constructor () {}

	render () {
		const renderHTML = (html: string) =>
			document.createRange().createContextualFragment(html);
		const element = renderHTML(
			`<hr class="my-4">`
		);

		return element;
	}

	save () {
		return {};
	}
}
