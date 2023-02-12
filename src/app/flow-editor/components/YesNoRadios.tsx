export const YesNoRadios: React.FC<{}> = () => {
	return (
		<div className="flex items-center justify-around w-full">
			<label className="bg-primary-600 p-2 rounded-3xl w-16 text-center font-semibold text-white cursor-pointer">
				Yes
				<input type="radio" name="yes" className="hidden" />
			</label>
			<label className="bg-primary-600 p-2 rounded-3xl w-16 text-center font-semibold text-white cursor-pointer">
				No
				<input type="radio" name="no" className="hidden" />
			</label>
		</div>
	);
};

export default YesNoRadios;
