const Card = ({ title, value }) => (
	<div className="p-4 bg-white rounded-xl shadow">
		<p className="text-sm text-gray-500">{title}</p>
		<h2 className="text-xl font-bold">{value}</h2>
	</div>
);

export default Card