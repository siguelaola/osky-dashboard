export enum FormComponentType {
	Heading = "heading",
	Text = "text",
	TextInput = "input-text",
	Continue = "continue",
}

export interface FormComponent {
	label: string;
	type: FormComponentType;
}
