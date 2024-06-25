import { createSelector } from 'reselect';
import { RootState } from '../store';

const selectProductsState = (state: RootState) => state.products;

export const selectSubCategoriesByProductId = createSelector(
	[selectProductsState, (_state: RootState, productId: number) => productId],
	(productsState, productId) => productsState.subCategories.filter((subCategory) => subCategory.product === productId)
);

export const selectSubProductsBySubCategoryId = createSelector(
	[selectProductsState, (_state: RootState, subCategoryId: number) => subCategoryId],
	(productsState, subCategoryId) => productsState.subProducts.filter((subProduct) => subProduct.subCategory === subCategoryId)
);
