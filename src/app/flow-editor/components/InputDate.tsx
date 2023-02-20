import { OutputBlockData } from "@editorjs/editorjs";

export default class InputDate {
	static get toolbox () {
		return {
			title: "Date Input",
			icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" /></svg>`,
		};
	}

	data = undefined;

	constructor ({ data }: OutputBlockData) {
		this.data = data;
	}

	render () {
		// TODO: add support for providing input with initial date
		const renderHTML = (html: string) =>
			document.createRange().createContextualFragment(html);
		const element = renderHTML(
			`<fieldset class="my-2 pr-2">
				<input type="date" class="border border-current px-1 py-0.5 m-0 leading-none">
			</fieldset>`
		);

		return element;
	}

	save (contents: HTMLFieldSetElement) {
		const input = contents.querySelector("input");

		return {
			date: input!.value,
		};
	}
}
