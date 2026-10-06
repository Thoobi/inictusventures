"use client";

import { useEffect, useRef } from "react";
import { IoCloseOutline } from "react-icons/io5";

interface ModalProps {
	open: boolean;
	onClose: () => void;
	/** id of the element that names the dialog (usually its heading). */
	labelledBy?: string;
	className?: string;
	children: React.ReactNode;
}

/**
 * Accessible modal built on the native <dialog> element: showModal() traps
 * focus, makes the rest of the page inert, closes on Escape and returns focus
 * to the element that opened it.
 */
export default function Modal({
	open,
	onClose,
	labelledBy,
	className = "",
	children,
}: ModalProps) {
	const dialogRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) {
			return;
		}

		if (open && !dialog.open) {
			dialog.showModal();
		} else if (!open && dialog.open) {
			dialog.close();
		}
	}, [open]);

	useEffect(() => {
		if (!open) {
			return;
		}

		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";

		return () => {
			document.body.style.overflow = previousOverflow;
		};
	}, [open]);

	return (
		<dialog
			ref={dialogRef}
			aria-labelledby={labelledBy}
			// Escape fires "cancel"; keep React state as the source of truth.
			onCancel={(event) => {
				event.preventDefault();
				onClose();
			}}
			className="m-0 h-full max-h-none w-full max-w-none bg-transparent p-0 backdrop:bg-black/40 backdrop:backdrop-blur-xl"
		>
			{/* Clicking the area around the panel closes the modal. */}
			<div
				className="flex min-h-full items-center justify-center p-4"
				onClick={(event) => {
					if (event.target === event.currentTarget) {
						onClose();
					}
				}}
			>
				<div className={`relative w-full rounded-2xl bg-white ${className}`}>
					<button
						type="button"
						onClick={onClose}
						aria-label="Close"
						className="absolute top-4 right-4 z-20 cursor-pointer text-gray-600 transition-colors hover:text-black"
					>
						<IoCloseOutline aria-hidden="true" className="text-3xl" />
					</button>
					{open && children}
				</div>
			</div>
		</dialog>
	);
}
