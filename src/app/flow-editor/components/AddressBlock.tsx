import {
	BlockAPI,
	BlockToolConstructable,
	OutputBlockData,
} from "@editorjs/editorjs";
import { useState } from "react";
import { createRoot } from "react-dom/client";
import clsx from "clsx";

const AddressBlockElement: React.FC<{ onDataChange: Function }> = ({
	onDataChange,
}) => {
	const [addressLineOne, setAddressLineOne] = useState("");
	const [addressLineTwo, setAddressLineTwo] = useState("");
	const [postalCode, setPostalCode] = useState("");
	const [city, setCity] = useState("");

	onDataChange({
		address: [addressLineOne, addressLineTwo],
		postalCode,
		city,
	});

	const InputClassList =
		"border border-gray-400 rounded px-1.5 py-1 pt-0.5 m-0 mt-1 leading-none";

	return (
		<>
			<div className="flex flex-col mt-2">
				<label className="leading-none">Address</label>
				<input
					value={addressLineOne}
					onChange={(event) => setAddressLineOne(event.target.value)}
					className={clsx(["w-96", InputClassList])}
					placeholder="Address line 1"
				/>
				<input
					value={addressLineTwo}
					onChange={(event) => setAddressLineTwo(event.target.value)}
					className={clsx(["w-96", InputClassList])}
					placeholder="Address line 2"
				/>
			</div>
			<div
				className={clsx([
					"flex flex-col flex-wrap-reverse gap-y-2 mt-2 justify-between w-96",
					"md:flex-row md:flex-nowrap md:gap-x-1 md:gap-y-0",
				])}
			>
				<div className="flex flex-col">
					<label className="leading-none">Postal code</label>
					<input
						value={postalCode}
						onChange={(event) => setPostalCode(event.target.value)}
						className={clsx([
							// Make postal code input take full width on smaller devices
							// and collapse into a side input on larger ones
							"w-auto md:w-24",
							InputClassList,
						])}
						placeholder="Code"
					/>
				</div>
				<div className="flex flex-col w-full">
					<label className="leading-none">City</label>
					<input
						value={city}
						onChange={(event) => setCity(event.target.value)}
						className={InputClassList}
						placeholder="City"
					/>
				</div>
			</div>
		</>
	);
};

export default class AddressBlock {
	static get toolbox(): BlockToolConstructable["toolbox"] {
		return {
			title: "Address Block",
			icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>`,
		};
	}

	data;
	block;

	constructor({ data, block }: { data: OutputBlockData; block: BlockAPI }) {
		this.data = data || {};
		this.block = block;
	}

	render() {
		const rootNode = document.createElement("fieldset");
		const root = createRoot(rootNode);

		const onDataChange = (data: OutputBlockData) => {
			this.data = { ...data };
			this.block.dispatchChange();
		};

		root.render(<AddressBlockElement onDataChange={onDataChange} />);

		return rootNode;
	}

	save() {
		return this.data;
	}
}
