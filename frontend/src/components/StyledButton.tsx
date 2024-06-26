import React from 'react';
import { Button, ButtonProps } from '@mui/material';

const StyledButton: React.FC<ButtonProps> = (props) => {
	return (
		<Button
			{...props}
			sx={{
				backgroundColor: '#15a1f7',
				border: 'none',
				borderRadius: '3px',
				color: 'white',
				padding: '6px 8px',
				textAlign: 'center',
				textDecoration: 'none',
				display: 'inline-block',
				margin: '2px 1px',
				fontSize: '12px',
				cursor: 'pointer',
				transition: 'background-color 0.3s ease',
				'&:hover': {
					backgroundColor: '#59bcf9'
				}
			}}
		/>
	);
};

export default StyledButton;
