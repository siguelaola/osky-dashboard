"use client";
import Button from "../../flow-editor/Button";

const NewFlow = () => {
	return (
		<>
			<h1 className="font-semibold text-3xl mb-5">Create a new flow</h1>

			<div className="w-full flex justify-center">
				<Button
					onClick={() => (window.location.pathname = "/flows/1")}
					className="px-5 py-10 text-xl"
				>
					Blank flow
				</Button>
			</div>

			<h2 className="text-3xl font-semibold mb-5 mt-10">
				Or start from a template
			</h2>

			<div className="grid grid-cols-2 gap-3 max-w-lg">
				<Button
					onClick={() => (window.location.pathname = "/flows/1")}
					className="px-5 py-10 text-xl"
				>
					Simple onboarding
				</Button>

				<Button
					onClick={() => (window.location.pathname = "/flows/1")}
					className="px-5 py-10 text-xl"
				>
					FinTech onboarding
				</Button>
			</div>
		</>
	);
};

export default NewFlow;
