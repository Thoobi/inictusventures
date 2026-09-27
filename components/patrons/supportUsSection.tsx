"use client";

import { useState } from "react";

const supportTypes = [
	{ label: "Inistic Meets the Needy", value: "inistic-meets-the-needy" },
	{ label: "DAM", value: "dam" },
] as const;

const sponsorshipTiers = [
	{ label: "Gold — ₦100,000+", value: "gold" },
	{ label: "Silver — ₦50,000+", value: "silver" },
	{ label: "Bronze — ₦20,000+", value: "bronze" },
] as const;

function SelectCard({
	label,
	selectedValue,
	options,
	onChange,
}: {
	label: string;
	selectedValue: string;
	options: readonly { label: string; value: string }[];
	onChange: (value: string) => void;
}) {
	const [isOpen, setIsOpen] = useState(false);
	const selectedOption =
		options.find((option) => option.value === selectedValue) ?? options[0];

	return (
		<div className="relative">
			<label className="mb-2 block text-sm font-semibold text-black">
				{label}
			</label>

			<button
				type="button"
				onClick={() => setIsOpen((prev) => !prev)}
				className="flex w-full items-center justify-between rounded-xl border border-gray-300 bg-white px-4 py-3 text-left text-sm text-black transition-colors hover:border-red-300"
			>
				<span className="font-medium">{selectedOption.label}</span>
				<span className="text-lg text-gray-600">▾</span>
			</button>

			{isOpen && (
				<div className="absolute left-0 right-0 z-20 mt-2 rounded-2xl border border-red-100 bg-white p-3 shadow-xl">
					<div className="grid gap-3">
						{options.map((option) => {
							const isSelected = option.value === selectedValue;

							return (
								<button
									type="button"
									key={option.value}
									onClick={() => {
										onChange(option.value);
										setIsOpen(false);
									}}
									className={`flex items-center justify-between rounded-xl border border-transparent px-4 py-3 text-left text-sm transition-colors ${
										isSelected
											? "bg-gray-50 text-black"
											: "bg-white text-black hover:bg-gray-50"
									}`}
								>
									<span className="font-medium">
										{option.label}
									</span>
									{isSelected ? (
										<span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-700 text-xs font-bold text-white">
											✓
										</span>
									) : null}
								</button>
							);
						})}
					</div>
				</div>
			)}
		</div>
	);
}

export default function SupportUsSection() {
	const [supportType, setSupportType] = useState<string>(
		supportTypes[0].value,
	);
	const [tier, setTier] = useState<string>(sponsorshipTiers[0].value);

	const selectedSupportType =
		supportTypes.find((option) => option.value === supportType) ??
		supportTypes[0];
	const selectedTier =
		sponsorshipTiers.find((option) => option.value === tier) ??
		sponsorshipTiers[0];

	return (
		<div className="mb-12 rounded-2xl border border-red-100 bg-white p-6 shadow-sm">
			<div className="mb-5">
				<p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-700">
					Support Us
				</p>
				<h2 className="mt-2 text-2xl font-bold font-mono text-black max-md:text-xl">
					Choose the cause you want to support
				</h2>
			</div>

			<div className="grid gap-5 md:grid-cols-2">
				<SelectCard
					label="Support type"
					selectedValue={supportType}
					options={supportTypes}
					onChange={setSupportType}
				/>

				<SelectCard
					label="Sponsorship tier"
					selectedValue={tier}
					options={sponsorshipTiers}
					onChange={setTier}
				/>
			</div>

			<p className="mt-4 text-sm font-medium text-gray-700 font-mono">
				Selected: {selectedSupportType.label} · {selectedTier.label}
			</p>
		</div>
	);
}
