import { X } from "lucide-react";

const Modal = ({
	isOpen,
	onClose,
	title,
	description,
	children,
	size = "md",
}) => {
	if (!isOpen) return null;

	const sizes = {
		sm: "max-w-sm",
		md: "max-w-md",
		lg: "max-w-lg",
		xl: "max-w-xl",
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
			<div
				className="absolute inset-0 bg-black/50 backdrop-blur-sm"
				onClick={onClose}
			/>
			<div
				className={`
					relative z-10 flex max-h-[90vh] w-full flex-col
					${sizes[size]}
					overflow-hidden rounded-xl bg-white shadow-xl
				`}
			>
				<div className="flex shrink-0 items-start justify-between border-b border-gray-200 px-6 py-4">
					<div className="pr-4">
						<h2 className="text-lg font-semibold text-gray-900">
							{title}
						</h2>

						{description && (
							<p className="mt-1 text-sm text-gray-500">
								{description}
							</p>
						)}
					</div>

					<button
						type="button"
						onClick={onClose}
						className="shrink-0 rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
						aria-label="Close modal"
					>
						<X size={20} />
					</button>
				</div>
				<div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
					{children}
				</div>
			</div>
		</div>
	);
};

export default Modal;