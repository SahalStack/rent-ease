import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AlertTriangle, X } from "lucide-react";

const ConfirmDialog = ({
	isOpen,
	title,
	message,
	confirmLabel = "Confirm",
	cancelLabel = "Cancel",
	isLoading = false,
	onConfirm,
	onClose,
}) => {
	useEffect(() => {
		if (!isOpen) return undefined;

		const handleKeyDown = (event) => {
			if (event.key === "Escape" && !isLoading) onClose();
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [isOpen, isLoading, onClose]);

	if (!isOpen) return null;

	const handleBackdropClick = (event) => {
		if (event.target === event.currentTarget && !isLoading) onClose();
	};

	return createPortal(
		<div
			className="fixed inset-0 z-9999 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
			onMouseDown={handleBackdropClick}
		>
			<div
				role="dialog"
				aria-modal="true"
				aria-labelledby="confirm-dialog-title"
				className="bg-surface-container-lowest rounded-xl w-full max-w-md p-6 shadow-xl"
			>
				<div className="flex items-start justify-between gap-4">
					<div className="flex items-center gap-3">
						<span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-error-container text-error shrink-0">
							<AlertTriangle size={22} />
						</span>
						<h2
							id="confirm-dialog-title"
							className="font-headline-sm text-headline-sm text-on-surface"
						>
							{title}
						</h2>
					</div>

					<button
						type="button"
						onClick={onClose}
						disabled={isLoading}
						aria-label="Close dialog"
						className="text-on-surface-variant hover:text-on-surface transition-colors disabled:opacity-50"
					>
						<X size={20} />
					</button>
				</div>

				<p className="mt-4 text-body-md text-on-surface-variant">{message}</p>

				<div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
					<button
						type="button"
						onClick={onClose}
						disabled={isLoading}
						className="px-6 py-3 rounded-lg font-label-md text-label-md border border-outline-variant text-on-surface hover:bg-surface-container transition-colors disabled:opacity-50"
					>
						{cancelLabel}
					</button>

					<button
						type="button"
						onClick={onConfirm}
						disabled={isLoading}
						className="px-6 py-3 rounded-lg font-label-md text-label-md bg-error text-on-error hover:opacity-95 transition-all active:scale-95 disabled:opacity-60 flex items-center justify-center gap-2"
					>
						{isLoading && (
							<span className="w-4 h-4 rounded-full border-2 border-on-error/40 border-t-on-error animate-spin" />
						)}
						{confirmLabel}
					</button>
				</div>
			</div>
		</div>,
		document.body
	);
};

export default ConfirmDialog;
