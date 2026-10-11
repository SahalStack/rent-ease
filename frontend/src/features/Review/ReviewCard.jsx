import Rating from "../../ui/Rating"

const ReviewCard = ({ review }) => {
	return (
		<div className="p-stack-md rounded-xl bg-white border border-surface-container product-card-shadow">
			<Rating stars={review.rating} variant="reviewCard" />
			<p className="text-body-md font-body-md text-on-surface italic mb-4">"{review.comment}"</p>
			<p className="text-label-md font-label-md text-secondary">— {review.userName} , {review.country}</p>
		</div>
	)
}

export default ReviewCard
