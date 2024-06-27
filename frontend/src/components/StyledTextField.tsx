import React from 'react';
import TextField from '@mui/material/TextField';

const StyledTextField: React.FC<{
	label: string;
	fullWidth: boolean;
	margin: 'normal';
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ label, fullWidth, margin, value, onChange }) => {
	return (
		<TextField
			label={label}
			fullWidth={fullWidth}
			margin={margin}
			value={value}
			onChange={onChange}
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
		/>
	);
};

export default StyledTextField;
