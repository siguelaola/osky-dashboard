"use client";
import CountrySelect from "../../../(components)/forms/CountrySelect";
import LabelledArea from "../../../(components)/forms/LabelledArea";

const inputClass =
	"block w-full max-w-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm rounded-md mb-3";

const BillingAddressInput = () => {
	return (
		<div>
			<textarea
				name="street-address"
				id="street-address"
				autoComplete="street-address"
				placeholder="Street Address"
				className={inputClass}
			/>
			<input
				type="text"
				name="postal-code"
				id="postal-code"
				autoComplete="postal-code"
				placeholder="Postal Code"
				required
				className={inputClass}
			/>
			<input
				type="text"
				name="address-level1"
				id="address-level1"
				autoComplete="address-level1"
				placeholder="State / Region"
				className={inputClass}
			/>
			<CountrySelect id="country" name="country" />
		</div>
	);
};

export const BillingDetailsForm = () => (
	<form>
		<LabelledArea id="billing-email" label="Billing email">
			<input
				type="text"
				name="billing-email"
				id="billing-email"
				autoComplete="email"
				className={inputClass}
				placeholder="billing@example.com"
				required
			/>
		</LabelledArea>
		<LabelledArea id="street-address" label="Billing address">
			<BillingAddressInput />
		</LabelledArea>
	</form>
);

export default BillingDetailsForm;
