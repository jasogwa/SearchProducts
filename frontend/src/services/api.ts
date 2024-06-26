// react import
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// project import
import { AddSubProduct, SubProduct } from '../types';

const API_URL = import.meta.env.VITE_API_URL;

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
	const response = await axios.get(`${API_URL}/products/`);
	return response.data;
});

export const fetchSubCategories = createAsyncThunk('products/fetchSubCategories', async () => {
	const response = await axios.get(`${API_URL}/subcategories/`);
	return response.data;
});

export const fetchSubProducts = createAsyncThunk('products/fetchSubProducts', async () => {
	const response = await axios.get(`${API_URL}/subproducts/`);
	return response.data;
});

export const createSubProduct = async (subProduct: AddSubProduct) => {
	try {
		const response = await axios.post<SubProduct>(`${API_URL}/subproducts/`, subProduct);
		return response.data;
	} catch (error: any) {
		throw new Error(`Failed to create subproduct: ${error.message}`);
	}
};

export const fetchAllSubProducts = async (): Promise<SubProduct[]> => {
	try {
		const response = await axios.get<SubProduct[]>(`${API_URL}/subproducts/`);
		return response.data;
	} catch (error) {
		console.error('Failed to fetch sub products:', error);
		throw new Error('Failed to fetch sub products');
	}
};
