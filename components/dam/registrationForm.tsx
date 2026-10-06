"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import Modal from "@/components/shared/modal";

type DropdownOption = {
	label: string;
	value: string;
};

interface CustomDropdownProps {
	label: string;
	placeholder: string;
	options: DropdownOption[];
	value: string;
	onChange: (value: string) => void;
	required?: boolean;
}

function CustomDropdown({
	label,
	placeholder,
	options,
	value,
	onChange,
	required,
}: CustomDropdownProps) {
	const [isOpen, setIsOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const id = useId();
	const labelId = `${id}-label`;
	const buttonId = `${id}-button`;
	const listId = `${id}-list`;

	useEffect(() => {
		const onClickOutside = (event: MouseEvent) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", onClickOutside);
		return () => {
			document.removeEventListener("mousedown", onClickOutside);
		};
	}, []);

	const selectedOption = useMemo(
		() => options.find((option) => option.value === value),
		[options, value],
	);

	return (
		<div
			className="w-full"
			ref={containerRef}
			onKeyDown={(event) => {
				if (event.key === "Escape" && isOpen) {
					setIsOpen(false);
					document.getElementById(buttonId)?.focus();
				}
			}}
		>
			<span id={labelId} className="mb-2 block text-sm font-semibold text-black">
				{label}
			</span>
			<button
				type="button"
				id={buttonId}
				aria-labelledby={`${labelId} ${buttonId}`}
				aria-expanded={isOpen}
				aria-controls={listId}
				onClick={() => setIsOpen((prev) => !prev)}
				className="flex w-full cursor-pointer items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-3 text-left text-sm text-black transition-colors hover:border-red-700"
			>
				<span
					className={selectedOption ? "text-black" : "text-gray-500"}
				>
					{selectedOption?.label || placeholder}
				</span>
				<span
					aria-hidden="true"
					className={`text-xl transition-transform ${isOpen ? "rotate-180" : ""}`}
				>
					<IoMdArrowDropdown />
				</span>
			</button>

			{isOpen && (
				<div className="relative">
					<ul id={listId} className="absolute z-30 mt-2 max-h-56 w-full overflow-y-auto rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
						{options.map((option) => (
							<li key={option.value}>
								<button
									type="button"
									aria-pressed={value === option.value}
									onClick={() => {
										onChange(option.value);
										setIsOpen(false);
										document.getElementById(buttonId)?.focus();
									}}
									className={`w-full px-4 py-2 text-left text-sm transition-colors ${
										value === option.value
											? "bg-red-50 text-red-700"
											: "text-black hover:bg-gray-100"
									}`}
								>
									{option.label}
								</button>
							</li>
						))}
					</ul>
				</div>
			)}

			{required && !value && (
				<input
					required
					aria-label={label}
					className="sr-only"
					value={value}
					onChange={() => undefined}
					tabIndex={-1}
					aria-hidden="true"
				/>
			)}
		</div>
	);
}

const discoveryOptions: DropdownOption[] = [
	{ label: "Facebook", value: "facebook" },
	{ label: "TikTok", value: "tiktok" },
	{ label: "IG", value: "ig" },
	{ label: "Other", value: "other" },
];

const categoryOptions: DropdownOption[] = [
	{ label: "Dance", value: "dance" },
	{ label: "Music", value: "music" },
	{ label: "Art", value: "art" },
];

const musicTypeOptions: DropdownOption[] = [
	{ label: "Solo (1 person)", value: "solo" },
	{ label: "Team (3 - 4 persons)", value: "team" },
];

const INSTAGRAM_URL = "https://www.instagram.com/dam.talent?stkn=MWlyOTEyN3pnMHJ5OA==";
const QR_CODE_URL = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(INSTAGRAM_URL)}`;

export default function RegistrationForm() {
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [address, setAddress] = useState("");
	const [source, setSource] = useState("");
	const [phone, setPhone] = useState("");
	const [category, setCategory] = useState("");
	const [whyJoin, setWhyJoin] = useState("");
	const [musicType, setMusicType] = useState("");
	const [hasReadGuidelines, setHasReadGuidelines] = useState(false);
	const [isGuidelinesModalOpen, setIsGuidelinesModalOpen] = useState(false);
	const formId = useId();
	const [status, setStatus] = useState<
		"idle" | "submitting" | "success" | "error"
	>("idle");
	const [errorMessage, setErrorMessage] = useState("");

	const isMusicCategory = category === "music";

	const handleCategoryChange = (value: string) => {
		setCategory(value);
		if (value !== "music") {
			setMusicType("");
		}
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!hasReadGuidelines) {
			setIsGuidelinesModalOpen(true);
			return;
		}

		setStatus("submitting");
		setErrorMessage("");

		try {
			const response = await fetch("/api/dam/registration", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					fullName,
					email,
					phone,
					address,
					source,
					category,
					musicType,
					whyJoin,
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
			<div
				role="status"
				className="w-full rounded-xl border border-gray-200 bg-white p-5 md:p-8"
			>
				<p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-700">
					Registration received
				</p>
				<h2 className="mt-2 text-2xl font-bold font-mono text-black">
					You&apos;re in, {fullName.split(" ").slice(-1)[0] || fullName}!
				</h2>
				<p className="mt-3 text-sm text-gray-700">
					Thanks for registering for the DAM Street Battle. We&apos;ll
					reach out to you at {email} with the next steps.
				</p>
			</div>
		);
	}

	const handleGuidelinesClick = () => {
		setHasReadGuidelines(true);
		setIsGuidelinesModalOpen(false);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="w-full rounded-xl border border-gray-200 bg-white p-5 md:p-8"
		>
			<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
				<div className="md:col-span-2">
					<label
						htmlFor={`${formId}-fullName`}
						className="mb-2 block text-sm font-semibold text-black"
					>
						Full Name (Surname first)
					</label>
					<input
						id={`${formId}-fullName`}
						autoComplete="name"
						type="text"
						value={fullName}
						onChange={(event) => setFullName(event.target.value)}
						placeholder="Surname Firstname"
						required
						className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-black outline-none transition-colors focus:border-red-700"
					/>
				</div>

				<div>
					<label
						htmlFor={`${formId}-email`}
						className="mb-2 block text-sm font-semibold text-black"
					>
						Email
					</label>
					<input
						id={`${formId}-email`}
						autoComplete="email"
						type="email"
						value={email}
						onChange={(event) => setEmail(event.target.value)}
						placeholder="you@example.com"
						required
						className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-black outline-none transition-colors focus:border-red-700"
					/>
				</div>

				<div>
					<label
						htmlFor={`${formId}-phone`}
						className="mb-2 block text-sm font-semibold text-black"
					>
						Phone
					</label>
					<input
						id={`${formId}-phone`}
						autoComplete="tel"
						type="tel"
						value={phone}
						onChange={(event) => setPhone(event.target.value)}
						placeholder="+234..."
						required
						className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-black outline-none transition-colors focus:border-red-700"
					/>
				</div>

				<div className="md:col-span-2">
					<label
						htmlFor={`${formId}-address`}
						className="mb-2 block text-sm font-semibold text-black"
					>
						Address
					</label>
					<input
						id={`${formId}-address`}
						autoComplete="street-address"
						type="text"
						value={address}
						onChange={(event) => setAddress(event.target.value)}
						placeholder="Your address"
						required
						className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-black outline-none transition-colors focus:border-red-700"
					/>
				</div>

				<CustomDropdown
					label="Where did you get to know about DAM?"
					placeholder="Select one"
					options={discoveryOptions}
					value={source}
					onChange={setSource}
					required
				/>

				<CustomDropdown
					label="Category to compete in"
					placeholder="Select category"
					options={categoryOptions}
					value={category}
					onChange={handleCategoryChange}
					required
				/>

				{isMusicCategory && (
					<div className="md:col-span-2">
						<CustomDropdown
							label="For Music: solo or team?"
							placeholder="Select one"
							options={musicTypeOptions}
							value={musicType}
							onChange={setMusicType}
							required
						/>
					</div>
				)}

				<div className="md:col-span-2">
					<label
						htmlFor={`${formId}-whyJoin`}
						className="mb-2 block text-sm font-semibold text-black"
					>
						Why do you want to be a part of DAM?
					</label>
					<textarea
						id={`${formId}-whyJoin`}
						value={whyJoin}
						onChange={(event) => setWhyJoin(event.target.value)}
						required
						rows={5}
						className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-black outline-none transition-colors focus:border-red-700"
					/>
				</div>

				<div id="dam-guidelines" className="md:col-span-2 mt-2">
					<button
						type="button"
						onClick={() => setIsGuidelinesModalOpen(true)}
						aria-haspopup="dialog"
						className="text-sm font-semibold text-red-700 underline underline-offset-2 transition-colors hover:text-black"
					>
						Read the DAM registration guidelines
					</button>
					{!hasReadGuidelines && (
						<p className="mt-2 text-xs text-gray-700">
							Please click the link in the modal before submitting
							your form.
						</p>
					)}
				</div>
			</div>

			{status === "error" && (
				<p role="alert" className="mt-4 text-sm text-red-700">
					{errorMessage}
				</p>
			)}

			<button
				type="submit"
				disabled={status === "submitting"}
				className="mt-6 w-full rounded-lg bg-red-800 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
			>
				{status === "submitting" ? "Submitting..." : "Submit"}
			</button>

			<Modal
				open={isGuidelinesModalOpen}
				onClose={() => setIsGuidelinesModalOpen(false)}
				labelledBy="guidelines-modal-title"
				className="max-w-lg p-6 shadow-2xl"
			>
				<div className="pr-8">
					<p className="mb-2 text-xs font-semibold uppercase tracking-widest text-red-700">
						Before you continue
					</p>
					<h2
						id="guidelines-modal-title"
						className="text-2xl font-bold text-black"
					>
						Please follow our Instagram
					</h2>
				</div>

				<div className="mt-6 flex flex-col items-center gap-5 md:flex-row md:items-center md:justify-between">
					<div className="flex flex-col items-center gap-4">
						{/* eslint-disable-next-line @next/next/no-img-element -- external QR service, not worth routing through the image optimizer */}
						<img
							src={QR_CODE_URL}
							alt="QR code linking to the DAM Instagram page"
							width={144}
							height={144}
							className="h-36 w-36 rounded-lg border border-gray-200 bg-white p-2"
						/>
					</div>

					<div className="flex-1 text-center md:text-left">
						<p className="text-sm leading-6 text-gray-700">
							Please follow our page before continuing. Click the
							link below to open our Instagram, then return here
							and continue with your registration.
						</p>

						<a
							href={INSTAGRAM_URL}
							target="_blank"
							rel="noreferrer noopener"
							onClick={handleGuidelinesClick}
							className="mt-4 inline-flex items-center justify-center rounded-lg bg-red-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-black"
						>
							Follow our page on Instagram
							<span className="sr-only"> (opens in a new tab)</span>
						</a>
					</div>
				</div>
			</Modal>
		</form>
	);
}
