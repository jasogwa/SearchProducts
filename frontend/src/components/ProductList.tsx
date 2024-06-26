import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchProducts, fetchSubCategories, fetchSubProducts } from '../services/api';
import Product from './Product';
import {
	Container,
	Typography,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	List,
	ListItem,
	ListItemText,
	Card,
	CardActions,
	CardContent,
	Box
} from '@mui/material';
import StyledButton from './StyledButton';
import CancelButton from './CancelButton';

const ProductList: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const products = useSelector((state: RootState) => state.products.products);
	const subCategories = useSelector((state: RootState) => state.products.subCategories);
	const subProducts = useSelector((state: RootState) => state.products.subProducts);
	const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
	const [selectedSubCategories, setSelectedSubCategories] = useState<number[]>([]);
	const [selectedSubProducts, setSelectedSubProducts] = useState<number[]>([]);
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	useEffect(() => {
		dispatch(fetchProducts());
		dispatch(fetchSubCategories());
		dispatch(fetchSubProducts());
	}, [dispatch]);

	const handleDoneClick = () => {
		setIsDialogOpen(true);
	};

	const handleDialogClose = () => {
		setIsDialogOpen(false);
	};

	const selectedProductName = useMemo(() => {
		const selectedProduct = products.find((product) => product.productId === selectedProductId);
		return selectedProduct ? selectedProduct.productName : 'None';
	}, [products, selectedProductId]);

	const selectedSubCategoryNames = useMemo(() => {
		return selectedSubCategories.flatMap((subCategoryId) =>
			subCategories
				.filter((subCategory) => subCategory.subCategoryId === subCategoryId)
				.map((subCategory) => subCategory.subCategoryName)
		);
	}, [selectedSubCategories, subCategories]);

	const selectedSubProductNames = useMemo(() => {
		return selectedSubProducts.flatMap((subProductId) =>
			subProducts.filter((subProduct) => subProduct.subProductId === subProductId).map((subProduct) => subProduct.subProductName)
		);
	}, [selectedSubProducts, subProducts]);

	return (
		<Container>
			<Card
				variant="outlined"
				style={{
					marginBottom: '16px',
					marginTop: '16px',
					background: '#64c1fc'
				}}
			>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						marginBottom: '16px'
					}}
				>
					<Typography variant="h5" gutterBottom style={{ margin: 'auto', color: '#fff' }}>
						Products
					</Typography>
					<StyledButton
						style={{
							marginRight: '15px',
							marginTop: '7px'
						}}
						onClick={handleDoneClick}
					>
						Done
					</StyledButton>
				</div>
				<CardContent style={{ background: '#f7f7f7' }}>
					<Card
						variant="outlined"
						style={{
							marginBottom: '16px',
							border: 0,
							background: '#ffffff',
							padding: '5px'
						}}
					>
						{products.map((product) => (
							<Product
								key={product.productId}
								productId={product.productId}
								productName={product.productName}
								selectedProductId={selectedProductId}
								setSelectedProductId={setSelectedProductId}
								selectedSubCategories={selectedSubCategories}
								setSelectedSubCategories={setSelectedSubCategories}
								selectedSubProducts={selectedSubProducts}
								setSelectedSubProducts={setSelectedSubProducts}
							/>
						))}
					</Card>
					<Dialog open={isDialogOpen} onClose={handleDialogClose} fullWidth maxWidth="sm">
						<DialogTitle sx={{ background: '#ebebeb' }}>Selected Items</DialogTitle>
						<DialogContent>
							<List>
								<ListItem>
									<ListItemText primary="Products" secondary={selectedProductName} />
								</ListItem>
								<ListItem>
									<ListItemText primary="Sub Categories" secondary={selectedSubCategoryNames.join(', ')} />
								</ListItem>
								<ListItem>
									<ListItemText primary="Sub Products" secondary={selectedSubProductNames.join(', ')} />
								</ListItem>
							</List>
						</DialogContent>
						<DialogActions sx={{ background: '#ebebeb', display: 'flex', justifyContent: 'space-between' }}>
							<Box sx={{ display: 'flex', flexGrow: 1 }}>
								<CancelButton onClick={handleDialogClose}>Close</CancelButton>
							</Box>
							<Box sx={{ display: 'flex', justifyContent: 'flex-end', flexGrow: 1 }}>
								<StyledButton>Save</StyledButton>
							</Box>
						</DialogActions>
					</Dialog>
				</CardContent>
				<CardActions style={{ justifyContent: 'center' }}>
					<StyledButton>+ Add Product</StyledButton>
				</CardActions>
			</Card>
		</Container>
	);
};

export default ProductList;
