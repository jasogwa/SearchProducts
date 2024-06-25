import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import {
	List,
	ListItem,
	ListItemText,
	Checkbox,
	Collapse,
	TextField,
	Card,
	Typography,
	CardContent,
	CardActions,
	Button,
	DialogContent,
	DialogActions,
	DialogTitle,
	Dialog
} from '@mui/material';
import { selectSubProductsBySubCategoryId } from '../selectors';
import { createSubProduct, fetchAllSubProducts } from '../services/api';
import { addNewSubProduct } from '../slices/productsSlice';

interface SubCategoryProps {
	subCategoryId: number;
	subCategoryName: string;
	isExpanded: boolean;
	isSelected: boolean;
	onToggle: (subCategoryId: number) => void;
	onSelect: (subCategoryId: number) => void;
	selectedSubProducts: number[];
	setSelectedSubProducts: React.Dispatch<React.SetStateAction<number[]>>;
}

interface SubProduct {
	subProductId: number;
	subProductName: string;
	subCategory: number;
}

const SubCategory: React.FC<SubCategoryProps> = ({
	subCategoryId,
	subCategoryName,
	isExpanded,
	isSelected,
	onToggle,
	onSelect,
	selectedSubProducts,
	setSelectedSubProducts
}) => {
	const dispatch = useDispatch();
	const subProductsFromRedux = useSelector((state: RootState) => selectSubProductsBySubCategoryId(state, subCategoryId));
	const [subProducts, setSubProducts] = useState<SubProduct[]>(subProductsFromRedux);
	const [subProductSearchTerm, setSubProductSearchTerm] = useState('');
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [newSubProductName, setNewSubProductName] = useState('');

	const filteredSubProducts = useMemo(() => {
		return subProducts.filter((subProduct) => subProduct.subProductName.toLowerCase().includes(subProductSearchTerm.toLowerCase()));
	}, [subProducts, subProductSearchTerm]);

	const handleSubProductSelect = useCallback((subProductId: number) => {
		setSelectedSubProducts((prev) => {
			const isSelected = prev.includes(subProductId);
			return isSelected ? prev.filter((id) => id !== subProductId) : [...prev, subProductId];
		});
	}, []);

	useEffect(() => {
		if (!isSelected) {
			setSelectedSubProducts((prev) => prev.filter((id) => !subProducts.map((subProduct) => subProduct.subProductId).includes(id)));
		}
	}, [isSelected, setSelectedSubProducts, subProducts]);

	const handleSubProductSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setSubProductSearchTerm(e.target.value);
	}, []);

	const handleCheckboxChange = useCallback(() => {
		onSelect(subCategoryId);
		onToggle(subCategoryId);
	}, [onSelect, onToggle, subCategoryId]);

	const handleDialogOpen = () => {
		setIsDialogOpen(true);
	};

	const handleDialogClose = () => {
		setIsDialogOpen(false);
	};

	const handleNewSubProductNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewSubProductName(e.target.value);
	};

	const handleAddSubProduct = async () => {
		const newSubProduct = {
			subCategory: subCategoryId,
			subProductName: newSubProductName
		};
		try {
			const response = await createSubProduct(newSubProduct);
			setSubProducts((prevSubProducts) => [...prevSubProducts, response]);
			dispatch(addNewSubProduct(response));
		} catch (error) {
			console.error('Failed to add sub-product:', error);
		}
		handleDialogClose();
	};

	useEffect(() => {
		const fetchSubProducts = async () => {
			try {
				const allSubProducts = await fetchAllSubProducts();
				const filteredSubProducts = allSubProducts.filter((subProduct) => subProduct.subCategory === subCategoryId);
				setSubProducts(filteredSubProducts);
			} catch (error) {
				console.error('Failed to fetch sub-products:', error);
			}
		};
		fetchSubProducts();
	}, [subProductsFromRedux]);

	return (
		<div key={`subcategory-${subCategoryId}`}>
			<ListItem
				sx={{
					paddingLeft: '20px',
					'&:hover': {
						backgroundColor: '#f0f0f0'
					}
				}}
			>
				<ListItemText primary={subCategoryName} />
				<Checkbox checked={isExpanded} onChange={handleCheckboxChange} inputProps={{ 'aria-label': 'select subcategory' }} />
			</ListItem>
			<Collapse in={isExpanded}>
				<Card
					variant="outlined"
					style={{
						marginBottom: '16px',
						border: 0,
						background: '#787878b8',
						padding: '5px'
					}}
				>
					<div>
						<Typography
							variant="h6"
							sx={{
								textAlign: 'center',
								fontWeight: '500',
								color: '#fff'
							}}
							color="text.secondary"
							gutterBottom
						>
							Select Sub-Products
						</Typography>
					</div>
					<CardContent sx={{ background: '#e9e9e9' }}>
						<TextField
							label="Search"
							fullWidth
							margin="normal"
							sx={{
								background: '#fff',
								'& .MuiOutlinedInput-root': {
									padding: '8px',
									'& fieldset': {
										border: 'none'
									}
								},
								'& .MuiInputBase-input': {
									height: '1.2em',
									padding: '6px'
								},
								'& .MuiInputLabel-root': {
									top: '-6px'
								}
							}}
							value={subProductSearchTerm}
							onChange={handleSubProductSearchChange}
						/>
						<List>
							{filteredSubProducts.map((subProduct, index) => (
								<ListItem
									key={`${index}-${subProduct.subProductId}`}
									sx={{
										paddingLeft: '32px',
										'&:hover': {
											backgroundColor: '#f0f0f0'
										}
									}}
								>
									<ListItemText primary={subProduct.subProductName} />
									<Checkbox
										checked={selectedSubProducts.includes(subProduct.subProductId)}
										onChange={() => handleSubProductSelect(subProduct.subProductId)}
									/>
								</ListItem>
							))}
						</List>
					</CardContent>
					<CardActions style={{ justifyContent: 'center' }}>
						<Button
							variant="outlined"
							size="small"
							style={{ background: '#ebebeb', transition: 'background-color 0.3s ease' }}
							onClick={handleDialogOpen}
						>
							+ Add Sub-Product
						</Button>
					</CardActions>
				</Card>
			</Collapse>
			<Dialog open={isDialogOpen} onClose={handleDialogClose}>
				<DialogTitle>Add New Sub-Product</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						label="Sub-Product Name"
						fullWidth
						value={newSubProductName}
						onChange={handleNewSubProductNameChange}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleDialogClose} color="primary">
						Cancel
					</Button>
					<Button onClick={handleAddSubProduct} color="primary">
						Add
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default SubCategory;
