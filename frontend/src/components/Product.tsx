// react import
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';

// project import
import { RootState } from '../store';
import SubCategory from './SubCategory';
import { selectSubCategoriesByProductId } from '../selectors';
import StyledButton from './StyledButton';
import StyledTextField from './StyledTextField';

// material ui
import { Card, CardContent, Typography, Checkbox, Collapse, List, CardActions, ListItem } from '@mui/material';

interface ProductProps {
	productId: number;
	productName: string;
	selectedProductId: number | null;
	setSelectedProductId: (productId: number | null) => void;
	selectedSubCategories: number[];
	setSelectedSubCategories: React.Dispatch<React.SetStateAction<number[]>>;
	selectedSubProducts: number[];
	setSelectedSubProducts: React.Dispatch<React.SetStateAction<number[]>>;
}

const Product: React.FC<ProductProps> = ({
	productId,
	productName,
	selectedProductId,
	setSelectedProductId,
	selectedSubCategories,
	setSelectedSubCategories,
	selectedSubProducts,
	setSelectedSubProducts
}) => {
	const subCategories = useSelector((state: RootState) => selectSubCategoriesByProductId(state, productId));

	const isChecked = selectedProductId === productId;
	const [searchTerm, setSearchTerm] = useState('');
	const [expandedSubCategories, setExpandedSubCategories] = useState<number[]>([]);

	const filteredSubCategories = useMemo(
		() => subCategories.filter((subCategory) => subCategory.subCategoryName.toLowerCase().includes(searchTerm.toLowerCase())),
		[subCategories, searchTerm]
	);

	useEffect(() => {
		if (!isChecked) {
			setExpandedSubCategories([]);
			setSelectedSubCategories([]);
			setSelectedSubProducts([]);
		}
	}, [isChecked, setSelectedSubCategories, setSelectedSubProducts]);

	const handleProductCheckboxChange = useCallback(() => {
		setSelectedProductId(isChecked ? null : productId);
	}, [isChecked, productId, setSelectedProductId]);

	const handleSubCategoryToggle = useCallback((subCategoryId: number) => {
		setExpandedSubCategories((prev) =>
			prev.includes(subCategoryId) ? prev.filter((id) => id !== subCategoryId) : [...prev, subCategoryId]
		);
	}, []);

	const handleSubCategorySelect = useCallback(
		(subCategoryId: number) => {
			setSelectedSubCategories((prev) => {
				const isSelected = prev.includes(subCategoryId);
				return isSelected ? prev.filter((id) => id !== subCategoryId) : [...prev, subCategoryId];
			});
		},
		[setSelectedSubCategories]
	);

	const handleSearchTermChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setSearchTerm(e.target.value);
		},
		[searchTerm]
	);

	return (
		<Card
			variant="outlined"
			style={{
				marginBottom: '16px',
				border: 0,
				background: 'transparent',
				padding: '5px'
			}}
		>
			<CardContent>
				<ListItem
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center'
					}}
					sx={{
						'&:hover': {
							backgroundColor: '#f0f0f0'
						}
					}}
				>
					<Typography variant="h6" component="div">
						{productName}
					</Typography>
					<Checkbox checked={isChecked} onChange={handleProductCheckboxChange} style={{ cursor: 'pointer' }} />
				</ListItem>

				<Collapse in={isChecked}>
					<Card
						variant="outlined"
						style={{
							marginBottom: '16px',
							border: 0,
							background: '#000',
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
								gutterBottom
							>
								Select Subcategories
							</Typography>
						</div>
						<CardContent sx={{ background: '#e7e4e4' }}>
							<StyledTextField label="Search" fullWidth margin="normal" value={searchTerm} onChange={handleSearchTermChange} />
							<List>
								{filteredSubCategories.map((subCategory, index) => (
									<SubCategory
										key={`${index}-${subCategory.subCategoryId}`}
										subCategoryId={subCategory.subCategoryId}
										subCategoryName={subCategory.subCategoryName}
										isExpanded={expandedSubCategories.includes(subCategory.subCategoryId)}
										isSelected={selectedSubCategories.includes(subCategory.subCategoryId)}
										onToggle={handleSubCategoryToggle}
										onSelect={handleSubCategorySelect}
										selectedSubProducts={selectedSubProducts}
										setSelectedSubProducts={setSelectedSubProducts}
									/>
								))}
							</List>
						</CardContent>
						<CardActions style={{ justifyContent: 'center' }}>
							<StyledButton variant="contained" color="primary">
								+ Add Sub-Category
							</StyledButton>
						</CardActions>
					</Card>
				</Collapse>
			</CardContent>
		</Card>
	);
};

export default Product;
