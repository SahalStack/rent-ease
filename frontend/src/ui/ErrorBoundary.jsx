import { Component } from "react";

class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError() {
		return { hasError: true };
	}

	componentDidCatch(error, errorInfo) {
		console.error("Unhandled UI error:", error, errorInfo);
	}

	render() {
		if (!this.state.hasError) return this.props.children;

		return (
			<div className="flex flex-col items-center justify-center py-20 text-center px-6">
				<span className="material-symbols-outlined text-6xl text-error mb-4">
					error
				</span>

				<p className="text-headline-sm font-headline-sm text-on-surface">
					Something went wrong
				</p>

				<p className="text-body-md text-on-surface-variant mt-2 max-w-md">
					This page could not be displayed. Reload the page to try again.
				</p>

				<button
					type="button"
					onClick={() => window.location.reload()}
					className="mt-6 px-6 py-3 rounded-lg bg-primary text-on-primary font-label-md text-label-md hover:opacity-95 transition-all active:scale-95"
				>
					Reload Page
				</button>
			</div>
		);
	}
}

export default ErrorBoundary;
