// react import
import React from 'react';
import { Button, ButtonProps } from '@mui/material';

const CancelButton: React.FC<ButtonProps> = (props) => {
	return (
		<Button
			{...props}
			sx={{
				background: '#ff5656',
				color: '#ebebeb',
				padding: '4px',
				fontSize: '12px',
				'&:hover': {
					background: '#fa7373'
				}
			}}
		>
			{props.children || 'Cancel'}
		</Button>
	);
};

export default CancelButton;
