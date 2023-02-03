export enum FormComponentType {
	Heading,
	Text,
	TextInput,
	Continue,
}

export interface FormComponent {
	label: string;
	type: FormComponentType;
}
