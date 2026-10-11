import { Link } from "react-router-dom";

const RentButton = ({ type, label, to }) => {

	const primary = "bg-primary text-on-primary px-4 py-2 rounded-lg font-label-md text-label-md hover:opacity-90 transition-opacity";

	return (
		<Link className={type === 'primary' ? primary : ''} to={to}>
			{label}
		</Link>
	)
}

export default RentButton
