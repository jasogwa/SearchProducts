// react import
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// project import
import { Product, SubCategory, SubProduct, AddSubProduct } from '../types';
import { fetchProducts, fetchSubCategories, fetchSubProducts } from '../services/api';

interface ProductsState {
	products: Product[];
	subCategories: SubCategory[];
	subProducts: SubProduct[];
	AddSubProduct: AddSubProduct[];
	loading: boolean;
	error: string | null;
}

const initialState: ProductsState = {
	products: [],
	subCategories: [],
	subProducts: [],
	AddSubProduct: [],
	loading: false,
	error: null
};

const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		addNewSubProduct: (state, action: PayloadAction<SubProduct>) => {
			state.subProducts.push(action.payload);
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProducts.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchProducts.fulfilled, (state, action) => {
				state.loading = false;
				state.products = action.payload;
			})
			.addCase(fetchProducts.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Failed to fetch products';
			})
			.addCase(fetchSubCategories.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchSubCategories.fulfilled, (state, action) => {
				state.loading = false;
				state.subCategories = action.payload;
			})
			.addCase(fetchSubCategories.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Failed to fetch subcategories';
			})
			.addCase(fetchSubProducts.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchSubProducts.fulfilled, (state, action) => {
				state.loading = false;
				state.subProducts = [...state.subProducts, ...action.payload];
			})
			.addCase(fetchSubProducts.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Failed to fetch subproducts';
			});
	}
});

export const { addNewSubProduct } = productsSlice.actions;
export default productsSlice.reducer;
