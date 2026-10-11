import { useDispatch } from 'react-redux';
import QuantitySelector from '../Product/QuantitySelector'
import { increaseQuantity, decreaseQuantity, removeFromCart } from "../Cart/cartSlice";
import { formatDate } from '../../utils/helpers';

const CartItem = ({ item }) => {
	const dispatch = useDispatch();

	return (
		<div className="cart-item-enter flex flex-col md:flex-row bg-surface p-6 rounded-lg border border-outline-variant/30 shadow-ambient-sm transition-all hover:shadow-ambient-lg group">
			<div className="w-full md:w-48 h-48 rounded-lg overflow-hidden bg-white mb-4 md:mb-0 shrink-0">
				<img alt={item.name}
					className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
					data-alt="A luxurious forest green velvet sectional sofa placed in a bright, modern living room with natural oak flooring. The lighting is soft and golden, highlighting the plush texture of the upholstery and the clean lines of the furniture. The overall aesthetic is one of quiet luxury and sophisticated comfort, consistent with a high-end furniture rental brand."
					src={item.image} />
			</div>
			<div className="md:ml-8 grow flex flex-col justify-between">
				<div className="flex justify-between items-start">
					<div>
						<h3 className="font-headline-sm text-headline-sm text-on-surface mb-1">{item.name}
						</h3>
						<p className="font-body-md text-on-surface-variant">Forest Green | {item.duration} Months Rental</p>
					</div>
					<button
						className="text-on-surface-variant hover:text-error transition-colors p-2"
						title="Remove Item"
						onClick={() => dispatch(removeFromCart(item.id))}
					>
						<span className="material-symbols-outlined">delete</span>
					</button>
				</div>

				{/* NEW: Date Row */}
				<div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-on-surface-variant">
					<span className="material-symbols-outlined" style={{ fontSize: '14px' }}>calendar_today</span>
					<span>Starts: {formatDate(item.deliveryStartDate)}</span>
					<span className="text-outline-variant">|</span>
					<span>Ends: {formatDate(item.rentalEndDate)}</span>
				</div>

				<div className="flex flex-wrap items-center justify-between mt-6">
					<QuantitySelector
						value={item.quantity}
						onChange={(newVal) => {
							newVal > item.quantity
								? dispatch(increaseQuantity(item.id))
								: dispatch(decreaseQuantity(item.id))
						}}
					/>					<div className="text-right">
						<p className="font-headline-sm text-primary font-bold">
							${item.price * item.quantity * item.duration}.00/mo</p>
						<p className="font-caption text-caption text-on-surface-variant">Security deposit: ${item.securityDeposit}.00
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CartItem
