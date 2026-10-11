import AvailabilityOption from "./AvailabilityOption";
import { availability } from "../../../data";

const ProductAvailability = ({ selectedAvailability, updateParam }) => {

	const handleAvailabilityChange = (slug) => {
		updateParam("availability", slug);
	};

	return (
		<div>
			<h3 className="text-headline-sm font-headline-sm text-primary mb-4">Availability</h3>
			<div className="space-y-3">
				{availability.map((option) => (
					<AvailabilityOption
						key={option.id}
						slug={option.slug}
						value={option.name}
						availability={selectedAvailability}
						setAvailability={handleAvailabilityChange}
					/>
				))}
			</div>
		</div>
	)
}

export default ProductAvailability
