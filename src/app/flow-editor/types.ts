export enum FormComponentType {
	Heading,
	Text,
	Continue,
}

export interface FormComponent {
	label: string;
	type: FormComponentType;
}
