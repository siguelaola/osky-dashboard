export enum FormComponentType {
	Heading = "heading",
	Text = "text",
	Paragraph = "paragraph",
	Image = "image",
	TextInput = "input-text",
	PhoneInput = "input-phone",
	Checkboxes = "checkboxes",
	YesNoInput = "input-yes-no",
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

export interface FormEditorComponent {
	id: string,
	type: string,
	data: object
}
