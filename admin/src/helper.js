export const pageHeaders = [
	{
		id: "dashboard",
		path: "/admin/dashboard",
		heading: "Dashboard",
		subheading: "Overview of your store performance",
	},
	{
		id: "users",
		path: "/admin/users",
		heading: "Users",
		subheading: "Manage your registered users",
	},
	{
		id: "products",
		path: "/admin/products",
		heading: "Products",
		subheading: "Manage your product inventory",
	},
	{
		id: "orders",
		path: "/admin/orders",
		heading: "Orders",
		subheading: "Track and manage customer orders",
	},
];

export const navLinks = [
	{ id: "dashboard", to: "/admin/dashboard", icon: "dashboard", label: "Dashboard" },
	{ id: "users", to: "/admin/users", icon: "group", label: "Users" },
	{ id: "products", to: "/admin/products", icon: "inventory_2", label: "Products" },
	{ id: "orders", to: "/admin/orders", icon: "shopping_bag", label: "Orders" },
];

export const paymentStyles = {
	paid: "bg-green-100 text-green-700",
	unpaid: "bg-red-100 text-red-700",
	refunded: "bg-yellow-100 text-yellow-700",
};

export const statusStyles = {
	active: "bg-green-100 text-green-700",
	pending: "bg-yellow-100 text-yellow-700",
	completed: "bg-blue-100 text-blue-700",
	cancelled: "bg-red-100 text-red-700",
};

export const formatDate = (date) => {
	return new Date(date)
		.toLocaleDateString("en-GB", {
			day: "2-digit",
			month: "2-digit",
			year: "2-digit",
		})
		.replace(/\//g, "-");
};

// Orders whose customer was deleted come back with user: null,
// so the customer column falls back to a placeholder.
export const getCustomerName = (order) => order.user?.full_name || "Deleted user";

export const getItemNames = (order) =>
	Array.isArray(order.items) && order.items.length > 0
		? order.items.map((item) => item.name).join(", ")
		: "—";

export const capitalize = (value) =>
	typeof value === "string" && value.length > 0
		? value.charAt(0).toUpperCase() + value.slice(1)
		: "—";

