"use client";

import { useEffect, useRef, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";

const supportTypes = [
	{ label: "Inistic Meets the Needy", value: "inistic-meets-the-needy" },
	{ label: "DAM", value: "dam" },
] as const;

type SupportTypeValue = (typeof supportTypes)[number]["value"];

const sponsorshipTiers: Record<
	SupportTypeValue,
	readonly { label: string; value: string }[]
> = {
	dam: [
		{ label: "Platinum — ₦100M – ₦200M", value: "platinum" },
		{ label: "Gold — ₦5M – ₦20M", value: "gold" },
		{ label: "Silver — ₦1M – ₦5M", value: "silver" },
		{ label: "Bronze — ₦100K – ₦500K", value: "bronze" },
	],
	"inistic-meets-the-needy": [
		{ label: "Gold — ₦5M – ₦20M", value: "gold" },
		{ label: "Silver — ₦500K – ₦1M", value: "silver" },
		{ label: "Bronze — ₦100K – ₦500K", value: "bronze" },
	],
};

function SelectCard({
	label,
	selectedValue,
	options,
	onChange,
	placeholder,
	hasError,
}: {
	label: string;
	selectedValue: string;
	options: readonly { label: string; value: string }[];
	onChange: (value: string) => void;
	placeholder?: string;
	hasError?: boolean;
}) {
	const [isOpen, setIsOpen] = useState(false);
	const selectedOption = options.find(
		(option) => option.value === selectedValue,
	);

	return (
		<div className="relative">
			<label className="mb-2 block text-sm font-semibold text-black">
				{label}
			</label>

			<button
				type="button"
				onClick={() => setIsOpen((prev) => !prev)}
				className={`flex w-full items-center justify-between rounded-xl border bg-white px-4 py-3 text-left text-sm text-black transition-colors hover:border-red-300 ${
					hasError ? "border-red-600" : "border-gray-300"
				}`}
			>
				<span
					className={
						selectedOption ? "font-medium" : "font-medium text-gray-500"
					}
				>
					{selectedOption?.label ?? placeholder ?? "Select an option"}
				</span>
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

type FormStatus = "idle" | "submitting" | "success" | "error";

const inputClassName =
	"w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-black outline-none transition-colors focus:border-red-700";

function SupportForm({ onClose }: { onClose: () => void }) {
	const [supportType, setSupportType] = useState<SupportTypeValue>(
		supportTypes[0].value,
	);
	const [tier, setTier] = useState("");
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [organisation, setOrganisation] = useState("");
	const [message, setMessage] = useState("");
	const [status, setStatus] = useState<FormStatus>("idle");
	const [errorMessage, setErrorMessage] = useState("");
	const [showTierError, setShowTierError] = useState(false);

	const tierOptions = sponsorshipTiers[supportType];

	const handleSupportTypeChange = (value: string) => {
		setSupportType(value as SupportTypeValue);
		setTier("");
	};

	const handleTierChange = (value: string) => {
		setTier(value);
		setShowTierError(false);
	};

	const resetForm = () => {
		setSupportType(supportTypes[0].value);
		setTier("");
		setFullName("");
		setEmail("");
		setPhone("");
		setOrganisation("");
		setMessage("");
		setErrorMessage("");
		setStatus("idle");
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!tier) {
			setShowTierError(true);
			return;
		}

		const selectedSupportType =
			supportTypes.find((option) => option.value === supportType) ??
			supportTypes[0];
		const selectedTier = tierOptions.find((option) => option.value === tier);

		setStatus("submitting");
		setErrorMessage("");

		try {
			const response = await fetch("/api/support", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					fullName,
					email,
					phone,
					organisation,
					message,
					supportType: selectedSupportType.label,
					tier: selectedTier?.label ?? tier,
				}),
			});

			if (!response.ok) {
				const data = await response.json().catch(() => null);
				throw new Error(
					data?.error || "Something went wrong. Please try again.",
				);
			}

			setStatus("success");
		} catch (error) {
			setErrorMessage(
				error instanceof Error
					? error.message
					: "Something went wrong. Please try again.",
			);
			setStatus("error");
		}
	};

	if (status === "success") {
		return (
			<div>
				<p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-700">
					Thank you
				</p>
				<h2 className="mt-2 text-2xl font-bold font-mono text-black max-md:text-xl">
					We&apos;ve received your request
				</h2>
				<p className="mt-3 text-sm text-gray-700 font-mono">
					Thanks for reaching out, {fullName.split(" ")[0]}. Our team will
					get back to you at {email} shortly.
				</p>
				<div className="mt-6 flex flex-wrap items-center gap-4">
					<button
						type="button"
						onClick={onClose}
						className="rounded-lg bg-red-800 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-black cursor-pointer"
					>
						Close
					</button>
					<button
						type="button"
						onClick={resetForm}
						className="text-sm font-semibold text-red-700 underline underline-offset-2 transition-colors hover:text-black cursor-pointer"
					>
						Send another request
					</button>
				</div>
			</div>
		);
	}

	return (
		<form onSubmit={handleSubmit}>
			<div className="mb-5">
				<p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-700">
					Support Us
				</p>
				<h2 className="mt-2 text-2xl font-bold font-mono text-black max-md:text-xl">
					Choose the cause you want to support
				</h2>
				<p className="mt-2 text-sm text-gray-700 font-mono">
					Fill in your details and we&apos;ll get back to you.
				</p>
			</div>

			<div className="grid gap-5 md:grid-cols-2">
				<SelectCard
					label="Support type"
					selectedValue={supportType}
					options={supportTypes}
					onChange={handleSupportTypeChange}
				/>

				<div>
					<SelectCard
						label="Sponsorship tier"
						selectedValue={tier}
						options={tierOptions}
						onChange={handleTierChange}
						placeholder="Select an amount"
						hasError={showTierError}
					/>
					{showTierError && (
						<p className="mt-2 text-xs text-red-600">
							Please select a sponsorship tier.
						</p>
					)}
				</div>

				<div>
					<label className="mb-2 block text-sm font-semibold text-black">
						Full name *
					</label>
					<input
						type="text"
						required
						value={fullName}
						onChange={(e) => setFullName(e.target.value)}
						className={inputClassName}
					/>
				</div>

				<div>
					<label className="mb-2 block text-sm font-semibold text-black">
						Email *
					</label>
					<input
						type="email"
						required
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className={inputClassName}
					/>
				</div>

				<div>
					<label className="mb-2 block text-sm font-semibold text-black">
						Phone number
					</label>
					<input
						type="tel"
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
						className={inputClassName}
					/>
				</div>

				<div>
					<label className="mb-2 block text-sm font-semibold text-black">
						Organisation
					</label>
					<input
						type="text"
						value={organisation}
						onChange={(e) => setOrganisation(e.target.value)}
						className={inputClassName}
					/>
				</div>

				<div className="md:col-span-2">
					<label className="mb-2 block text-sm font-semibold text-black">
						Message
					</label>
					<textarea
						rows={4}
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						placeholder="Tell us a bit about how you'd like to support"
						className={`${inputClassName} resize-y`}
					/>
				</div>
			</div>

			{status === "error" && (
				<p className="mt-4 text-sm text-red-600">{errorMessage}</p>
			)}

			<button
				type="submit"
				disabled={status === "submitting"}
				className="mt-6 w-full rounded-lg bg-red-800 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
			>
				{status === "submitting" ? "Sending..." : "Submit"}
			</button>
		</form>
	);
}

export default function SupportUsSection() {
	const [isOpen, setIsOpen] = useState(false);
	const originalBodyOverflow = useRef<string | null>(null);

	useEffect(() => {
		if (!isOpen) {
			return;
		}

		originalBodyOverflow.current = document.body.style.overflow;
		document.body.style.overflow = "hidden";

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setIsOpen(false);
			}
		};
		window.addEventListener("keydown", handleKeyDown);

		return () => {
			document.body.style.overflow = originalBodyOverflow.current ?? "";
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [isOpen]);

	return (
		<>
			<div className="mb-12">
				<button
					type="button"
					onClick={() => setIsOpen(true)}
					className="bg-linear-to-r from-red-700 to-black text-lg text-white font-bold py-4 max-md:py-3 max-md:px-5 px-8 rounded-lg hover:from-black hover:to-red-700 hover:scale-105 transition-all duration-300 ease-out max-md:text-sm cursor-pointer"
				>
					Sponsor us
				</button>
			</div>

			{isOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
					<button
						type="button"
						aria-label="Close modal"
						onClick={() => setIsOpen(false)}
						className="absolute inset-0 bg-black/40 backdrop-blur-xl"
					/>
					<div
						role="dialog"
						aria-modal="true"
						className="relative z-10 w-full max-w-2xl rounded-2xl bg-white px-6 pt-12 pb-6 max-md:px-4"
					>
						<button
							type="button"
							onClick={() => setIsOpen(false)}
							aria-label="Close"
							className="absolute top-4 right-4 z-20 cursor-pointer text-gray-500 hover:text-gray-700 transition-colors"
						>
							<IoCloseOutline className="text-3xl" />
						</button>
						<div className="max-h-[80vh] overflow-y-auto pr-1">
							<SupportForm onClose={() => setIsOpen(false)} />
						</div>
					</div>
				</div>
			)}
		</>
	);
}
