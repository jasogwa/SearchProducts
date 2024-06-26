import * as Yup from 'yup';

export const subProductValidationSchema = Yup.object().shape({
	newSubProductName: Yup.string()
		.required('Sub Product Name is required')
		.min(3, 'Sub Product Name must be at least 3 characters')
		.max(50, 'Sub Product Name must be less than 50 characters')
});
