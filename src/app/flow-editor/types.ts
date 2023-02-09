export enum FormComponentType {
	Heading = "heading",
	Text = "text",
	TextInput = "input-text",
	Checkboxes = "checkboxes",
	Continue = "continue",
}

export interface FormInputChoice {
	label: string;
	value: string;
	defaultChecked?: boolean;
}

export interface FormComponent {
	label: string;
	type: FormComponentType;
	choices?: FormInputChoice[];
}
