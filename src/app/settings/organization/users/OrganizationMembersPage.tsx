"use client";
import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import { NextPage } from "next";
import React, { useState } from "react";
import LabelledArea from "../../../(components)/forms/LabelledArea";
import Button from "../../../flow-editor/Button";

const InviteUserButton: React.FC<{ organization: { name: string } }> = ({
	organization,
}) => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [role, setRole] = useState<"user" | "admin">("user");
	const [modalOpen, setModalOpen] = useState(false);

	return (
		<div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
			<Button
				type="button"
				variant="primary"
				onClick={(e) => setModalOpen(true)}
			>
				Invite user
			</Button>

			<Transition.Root show={modalOpen} as={React.Fragment}>
				<Dialog
					as="div"
					className="relative z-10"
					onClose={() => setModalOpen(false)}
				>
					<Transition.Child
						as={React.Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
					</Transition.Child>

					<div className="fixed inset-0 z-10 overflow-y-auto">
						<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
							<Transition.Child
								as={React.Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
								enterTo="opacity-100 translate-y-0 sm:scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 translate-y-0 sm:scale-100"
								leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							>
								<Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
									<div className="sm:flex sm:items-start mb-5">
										<div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
											<Dialog.Title
												as="h3"
												className="text-lg font-medium leading-6 text-gray-900"
											>
												Invite user to {organization.name}
											</Dialog.Title>
										</div>
									</div>
									<LabelledArea id="name" label="Name">
										<input
											type="text"
											name="name"
											id="name"
											className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
											placeholder="Jane Doe"
											onChange={(e) => setName(e.currentTarget.value)}
										/>
									</LabelledArea>
									<LabelledArea id="email" label="Email">
										<input
											type="email"
											name="email"
											id="email"
											className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
											placeholder="jane.doe@example.com"
											onChange={(e) => setEmail(e.currentTarget.value)}
										/>
									</LabelledArea>

									<div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
										<Button
											type="button"
											variant="primary"
											onClick={async () => {
												setModalOpen(false);
											}}
										>
											Send invite
										</Button>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition.Root>
		</div>
	);
};

const OrganizationMembersPage: NextPage<{}> = ({}) => {
	const organization = { name: "ACME Inc." };
	const members = [{ full_name: "Jane Doe", email: "", id: "1", role: "user" }];
	const userCount = members.length;

	return (
		<div className="px-4 sm:px-6 lg:px-8">
			<div className="sm:flex sm:items-center">
				<div className="sm:flex-auto">
					<h1 className="text-xl font-semibold text-gray-900">
						Members of {organization.name}
					</h1>
					<p className="mt-2 text-sm text-gray-700">
						These users have access to the company.
					</p>
				</div>
				<InviteUserButton organization={organization} />
			</div>
			<div className="mt-8 flex flex-col">
				<div className="-my-2 -mx-4 sm:-mx-6 lg:-mx-8">
					<div className="inline-block min-w-full py-2 align-middle">
						<div className="shadow-sm ring-1 ring-black ring-opacity-5">
							<table
								className="min-w-full border-separate"
								style={{ borderSpacing: 0 }}
							>
								<thead className="bg-gray-50">
									<tr>
										<th
											scope="col"
											className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
										>
											User
										</th>
										<th
											scope="col"
											className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
										>
											Role
										</th>
										<th
											scope="col"
											className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter hidden lg:table-cell"
										>
											Last active
										</th>
										<th
											scope="col"
											className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pr-4 pl-3 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8"
										>
											<span className="sr-only">Edit</span>
										</th>
									</tr>
								</thead>
								<tbody className="bg-white">
									{members.map((member, personIdx) => (
										<tr key={member.id}>
											<td
												className={clsx(
													personIdx !== userCount - 1
														? "border-b border-gray-200"
														: "",
													"whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8"
												)}
											>
												{member.full_name}
												<br />
												<a
													href={`mailto:${member.email}`}
													target="_blank"
													rel="noreferrer"
													className="text-gray-500 font-normal"
												>
													{member.email}
												</a>
											</td>
											<td
												className={clsx(
													personIdx !== userCount - 1
														? "border-b border-gray-200"
														: "",
													"whitespace-nowrap px-3 py-4 text-sm text-gray-500"
												)}
											>
												{member.role}
											</td>
											<td
												className={clsx(
													personIdx !== userCount - 1
														? "border-b border-gray-200"
														: "",
													"whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden lg:table-cell"
												)}
											>
												unknown
											</td>
											<td
												className={clsx(
													personIdx !== userCount - 1
														? "border-b border-gray-200"
														: "",
													"relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-6 lg:pr-8"
												)}
											>
												<Button
													onClick={async () => {
														if (
															confirm(
																`Are you sure you want to remove ${member.full_name} (${member.email}) from ${organization.name}?`
															)
														) {
															// TODO
														}
													}}
													variant="danger"
												>
													Remove
												</Button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrganizationMembersPage;
