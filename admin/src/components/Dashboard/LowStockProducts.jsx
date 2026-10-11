import {
	Avatar,
	Card,
	CardContent,
	CardHeader,
	Chip,
	LinearProgress,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Box,
} from "@mui/material";

const products = [
	{
		id: 1,
		name: "Office Chair",
		image: "/products/chair.jpg",
		stock: 1,
	},
	{
		id: 2,
		name: "Laptop Stand",
		image: "/products/laptop-stand.jpg",
		stock: 3,
	},
	{
		id: 3,
		name: "Monitor",
		image: "/products/monitor.jpg",
		stock: 0,
	},
];


export default function LowStockProducts() {
	return (
		<div>
			<Card
				elevation={3}
				sx={{
					borderRadius: 4,
					boxShadow: "0 1px 3px rgba(0,0,0,.08), 0 1px 2px rgba(0,0,0,.04)",
				}}

			>
				<CardHeader
					title="Low Stock Products"
					subheader="Products requiring restocking"
				/>

				<CardContent>

					<List>

						{products.map((product) => (

							<ListItem
								key={product.id}
							>

								<ListItemAvatar>

									<Avatar
										src={product.image}
										variant="rounded"
									/>

								</ListItemAvatar>

								<Box flex={1}>

									<ListItemText
										primary={product.name}
									/>

									<LinearProgress
										variant="determinate"
										value={product.stock * 20}
										color={
											product.stock === 0
												? "error"
												: product.stock <= 2
													? "warning"
													: "success"
										}
										sx={{
											mt: 1,
											borderRadius: 5,
											height: 7
										}}
									/>

								</Box>

								<Chip
									sx={{ ml: 2 }}
									size="small"
									label={
										product.stock === 0
											? "Out of Stock"
											: `${product.stock} left`
									}
									color={
										product.stock === 0
											? "error"
											: product.stock <= 2
												? "warning"
												: "success"
									}
								/>

							</ListItem>
						))}
					</List>
				</CardContent>
			</Card>
		</div>
	);
}
