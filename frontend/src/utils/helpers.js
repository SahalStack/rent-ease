export function formatDate(date) {
	return new Date(date).toLocaleDateString("en-IN", {
		day: "numeric",
		month: "short",
		year: "numeric",
	});
}

export function formattedDate(date) {
	return new Date(date).toLocaleDateString("en-IN", {
		month: "short",
		day: "numeric",
		year: "numeric",
	})
}