import { Edge } from "reactflow";
import Button from "./Button";

const EdgeEditor: React.FC<{ edge: Edge; onClose: () => void }> = ({
	edge,
	onClose,
}) => {
	return (
		<div className="fixed w-full h-full flex justify-center items-center -ml-64 z-[1000]">
			<div
				className=" bg-gray-600 opacity-50 w-full h-full fixed"
				onClick={onClose}
			></div>
			<div className="bg-white rounded-md w-64 h-72 opacity-100 z-10 p-5 flex flex-col justify-between">
				<h1 className="text-xl font-semibold">Add conditions</h1>

				<div className="flex justify-between">
					<Button variant="plain" onClick={onClose}>
						Cancel
					</Button>
					<Button variant="primary" onClick={onClose}>
						Save
					</Button>
				</div>
			</div>
		</div>
	);
};

export default EdgeEditor;
