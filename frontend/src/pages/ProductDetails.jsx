import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft } from "lucide-react";


import { rentalDurations } from "../../data";

import Rating from '../ui/Rating';
import { addToCart } from '../features/Cart/cartSlice';
import { formatDate } from "../utils/helpers";

import ProductDetailsImg from "../features/Product/ProductDetailsImg";
import RentalDurationCard from "../features/Product/RentalDurationCard";
import QuantitySelector from "../features/Product/QuantitySelector";
// import ProductFeatureCard from "../features/Product/ProductFeatureCard";
import ProductNotFound from "../features/Product/ProductNotFound";
import ReviewCard from "../features/Review/ReviewCard";
import usePageTitle from "../hooks/usePageTitle";
import DeliveryInfoCard from "../features/Product/DeliveryInfoCard";
import { handleDelivery } from "../utils/deliveryUtils";
import { fetchProductById } from "../features/Product/productThunk";
import { selectProduct } from "../features/Product/productSelectors";
import ContentLoader from "../ui/ContentLoader";

const ProductDetails = () => {
	const { productId } = useParams();

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchProductById(productId));
	}, [dispatch, productId]);

	const navigate = useNavigate();

	const [quantity, setQuantity] = useState(1);
	const [selectedDuration, setselectedDuration] = useState(rentalDurations[0]);

	const selectedProduct = useSelector(selectProduct);
	const isLoading = useSelector((state) => state.products.isLoading);
	usePageTitle(selectedProduct?.name);

	if (isLoading) return <ContentLoader text='Loading product details...' />

	if (!selectedProduct) {
		return <ProductNotFound />
	}

	const totalPrice = selectedProduct.price * quantity * selectedDuration.value;

	const {
		deliveryStartDate,
		deliveryEndDate,
		rentalEndDate,
		rentalEndDateMax,
	} = handleDelivery(selectedDuration.value);

	const cartItem = {
		id: selectedProduct.id,
		name: selectedProduct.name,
		price: selectedProduct.price,
		image: selectedProduct.image,
		securityDeposit: selectedProduct.securityDeposit,
		quantity: quantity,
		duration: selectedDuration.value,
		deliveryStartDate,
		rentalEndDate,
	};

	const handleAddToCart = () => {
		dispatch(addToCart(cartItem));
		navigate('/cart');
	};

	const handleRentNow = () => {
		dispatch(addToCart(cartItem));
		navigate('/checkout');
	}

	return (
		<main className="max-w-container-max mx-auto px-margin-desktop py-stack-md animate-fadeUp">
			<Link
				to="/products"
				className="flex items-center gap-2 mb-stack-md text-primary text-body-md font-caption hover:text-on-surface-variant transition-colors"
			>
				<ArrowLeft size={18} />
				Back to products
			</Link>
			{/*ProductDetails Section */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-stack-lg items-start">
				<ProductDetailsImg selectedProduct={selectedProduct} />

				<div className="flex flex-col gap-stack-md">
					<div>
						<span className="text-label-md font-label-md text-secondary tracking-widest uppercase">
							Category: {selectedProduct.category}
						</span>
						<h1 className="text-display-lg font-display-lg text-primary mt-2">{selectedProduct.name}</h1>
						<div className="flex items-center gap-2 mt-4">
							<Rating stars={selectedProduct.rating}
								color='tertiary'
								variant="productDetails" />
							<span className="text-body-md font-body-md text-on-surface-variant">{selectedProduct.rating} ({selectedProduct.reviewCount} reviews)</span>
						</div>
					</div>
					<p className="text-body-lg font-body-lg text-on-surface-variant max-w-lg leading-relaxed">
						{selectedProduct.description}
					</p>

					<div className="p-stack-md rounded-xl bg-white product-card-shadow border border-surface-container">
						<div className="flex justify-between items-end mb-6">
							<div>
								<span className="text-display-lg font-display-lg text-primary">${totalPrice}</span>
								<span className="text-body-md font-body-md text-on-surface-variant">/mo</span>
							</div>
							<div className="text-right">
								<p className="text-caption font-caption text-on-surface-variant">Security Deposit: ${selectedProduct.securityDeposit}</p>
								<span className="inline-flex items-center gap-1 text-primary text-label-md font-label-md mt-1">
									<span className="w-2 h-2 rounded-full bg-primary"></span>{selectedProduct.inStock === true ? 'In Stock' : 'Out of stock'}
								</span>
							</div>
						</div>

						<div className="space-y-stack-sm mb-6">
							<label className="text-label-md font-label-md text-on-surface block">Rental Duration</label>
							<div className="grid grid-cols-4 gap-2">
								{rentalDurations.map((duration) => (
									<RentalDurationCard
										key={duration.value}
										isSelected={selectedDuration.value === duration.value}
										onSelect={() => setselectedDuration(duration)}
										duration={duration} />
								))}
							</div>
						</div>

						<div className="flex gap-stack-sm">
							<QuantitySelector
								value={quantity}
								onChange={setQuantity}
								min={1}
								max={10}
							/>
							<button
								className="flex-1 bg-primary text-on-primary py-4 rounded-lg font-bold text-body-md hover:bg-primary-container transition-all"
								onClick={handleRentNow}
							>Rent Now</button>
						</div>
						<button
							className="w-full mt-stack-sm border-2 border-primary text-primary py-4 rounded-lg font-bold text-body-md hover:bg-primary-container/5 transition-all"
							onClick={handleAddToCart}
						>Add to Cart</button>
					</div>
					<DeliveryInfoCard
						deliveryStart={formatDate(deliveryStartDate)}
						deliveryEnd={formatDate(deliveryEndDate)}
						rentalEnd={`${formatDate(rentalEndDate)} – ${formatDate(rentalEndDateMax)}`}
					/>
				</div>
			</div>


			{/*Features and Benefits Card */}
			{/* <section className="py-section-padding grid grid-cols-1 md:grid-cols-3 gap-stack-lg border-b border-surface-container">
				{selectedProduct.features.map((feature, index) => (
					<ProductFeatureCard feature={feature} key={index} />
				))}
			</section> */}

			{/* Reviews Section  */}
			<section className="py-section-padding">
				<div className="flex justify-between items-end mb-stack-lg">
					<div>
						<h2 className="text-headline-md font-headline-md text-primary">Customer Feedback</h2>
						<p className="text-on-surface-variant mt-2">What our members are saying about this piece.</p>
					</div>
					<button className="text-primary font-bold hover:underline flex items-center gap-1">
						View All Reviews <span className="material-symbols-outlined">arrow_forward</span>
					</button>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-stack-md">
					{selectedProduct.reviews.map((review) => (
						<ReviewCard review={review} key={review.id} />
					))}
				</div>
			</section>
		</main>
	)
}

export default ProductDetails
