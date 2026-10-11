import { X } from "lucide-react";
import { createPortal } from "react-dom";

const Modal = ({ isOpen, onClose, title, children }) => {
	if (!isOpen) return null;

	return createPortal(
		<div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/20 backdrop-blur-sm">
			<div className="bg-white rounded-xl w-full max-w-lg p-6 relative">
				<button
					onClick={onClose}
					className="absolute top-4 right-4"
				>
					<X size={20} />
				</button>

				<h2 className="text-2xl font-semibold mb-6">
					{title}
				</h2>

				{children}
			</div>
		</div>,
		document.body
	);
};

export default Modal;