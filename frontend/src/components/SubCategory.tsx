// react import
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';

// project import
import { subProductValidationSchema } from '../validation/validationSchema';
import { addNewSubProduct } from '../slices/productsSlice';
import { RootState } from '../store';
import { selectSubProductsBySubCategoryId } from '../selectors';
import { createSubProduct, fetchAllSubProducts } from '../services/api';
import StyledButton from './StyledButton';
import CancelButton from './CancelButton';

// material ui
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
	DialogContent,
	DialogActions,
	DialogTitle,
	Dialog
} from '@mui/material';
import StyledTextField from './StyledTextField';

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

	const formik = useFormik({
		initialValues: {
			newSubProductName: ''
		},
		validationSchema: subProductValidationSchema,
		onSubmit: async (values) => {
			const newSubProduct = {
				subCategory: subCategoryId,
				subProductName: values.newSubProductName
			};
			try {
				const response = await createSubProduct(newSubProduct);
				setSubProducts((prevSubProducts) => [...prevSubProducts, response]);
				dispatch(addNewSubProduct(response));
			} catch (error) {
				console.error('Failed to add sub-product:', error);
			}
			handleDialogClose();
		}
	});

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
							Select Sub Products
						</Typography>
					</div>
					<CardContent sx={{ background: '#e9e9e9' }}>
						<StyledTextField
							label="Search"
							fullWidth
							margin="normal"
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
						<StyledButton onClick={handleDialogOpen}>+ Add Sub-Product</StyledButton>
					</CardActions>
				</Card>
			</Collapse>
			<Dialog open={isDialogOpen} onClose={handleDialogClose} fullWidth maxWidth="sm">
				<DialogTitle sx={{ background: '#ebebeb' }}>Add New Sub Product</DialogTitle>
				<DialogContent>
					<form onSubmit={formik.handleSubmit}>
						<TextField
							autoFocus
							margin="dense"
							label="Enter Sub Product Name"
							fullWidth
							id="newSubProductName"
							name="newSubProductName"
							sx={{
								background: '#fff',
								'& .MuiOutlinedInput-root': {
									padding: '8px',
									'& fieldset': {
										border: '1px dotted #f2f2f2'
									}
								},
								'& .MuiInputBase-input': {
									height: '1.2em',
									padding: '6px'
								}
							}}
							value={formik.values.newSubProductName}
							onChange={formik.handleChange}
							error={formik.touched.newSubProductName && Boolean(formik.errors.newSubProductName)}
							helperText={formik.touched.newSubProductName && formik.errors.newSubProductName}
						/>
					</form>
				</DialogContent>
				<DialogActions sx={{ background: '#ebebeb', display: 'flex', justifyContent: 'space-between' }}>
					<CancelButton onClick={handleDialogClose}>Cancel</CancelButton>
					<StyledButton onClick={formik.submitForm}>Add</StyledButton>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default SubCategory;
