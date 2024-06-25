export interface SubProduct {
	subProductId: number;
	subProductName: string;
	subCategory: number;
}

export interface AddSubProduct {
	subProductName: string;
	subCategory: number;
}

export interface SubCategory {
	subCategoryId: number;
	subCategoryName: string;
	product: number;
	subProducts: SubProduct[];
}

export interface Product {
	productId: number;
	productName: string;
	subCategories: SubCategory[];
}

export interface ProductsState {
	products: Product[];
	subCategories: SubCategory[];
	subProducts: SubProduct[];
}

export interface RootState {
	products: ProductsState;
}
