import { useState } from "react";
import toast from 'react-hot-toast';
import { addReview } from "./reviewThunk";
import { useDispatch } from "react-redux";

const ReviewForm = ({ productId }) => {
	const [rating, setRating] = useState(0);
	const [hover, setHover] = useState(0);
	const [comment, setComment] = useState("");

	const dispatch = useDispatch();

	const handleSubmit = async () => {
		if (rating === 0) {
			toast.error("Please select a rating before submitting your review.");
			return;
		};

		if (comment.trim() === "") {
			toast.error("Please write a comment before submitting your review.");
			return;
		}

		const result = await dispatch(addReview({ productId, reviewData: { rating, comment } }));

		if (addReview.fulfilled.match(result)) {
			setRating(0);
			setComment("");
			toast.success("Review submitted successfully!");
		}
	};

	return (
		<div className="bg-surface-container-lowest order-card-shadow rounded-xl p-stack-md border border-surface-variant/30">
			<div className="flex items-center gap-2 mb-stack-sm">
				<span className="material-symbols-outlined text-primary">rate_review</span>
				<h3 className="font-headline-sm">Write a Review</h3>
			</div>

			{/* Stars */}
			<div className="flex gap-1 mb-stack-md">
				{[1, 2, 3, 4, 5].map((star) => (
					<button
						key={star}
						type="button"
						onClick={() => setRating(star)}
						onMouseEnter={() => setHover(star)}
						onMouseLeave={() => setHover(0)}
						className="active:scale-95 transition-transform"
					>
						<span
							className="material-symbols-outlined text-3xl"
							style={{
								fontVariationSettings: (hover || rating) >= star ? "'FILL' 1" : "'FILL' 0",
								color: (hover || rating) >= star ? "#f5a623" : "#c4c4c4",
							}}
						>
							star
						</span>
					</button>
				))}
			</div>

			{/* Comment box */}
			<textarea
				value={comment}
				onChange={(e) => setComment(e.target.value)}
				placeholder="Share your experience..."
				rows={4}
				className="w-full rounded-lg border border-surface-variant/50 p-3 text-body-md text-on-surface focus:outline-none focus:border-primary resize-none"
			/>

			<button
				onClick={handleSubmit}
				className="mt-stack-sm w-full py-2.5 bg-primary text-on-primary rounded-lg font-label-md shadow-sm hover:opacity-95 transition-all active:scale-95"
			>
				Submit Review
			</button>
		</div>
	);
};

export default ReviewForm;