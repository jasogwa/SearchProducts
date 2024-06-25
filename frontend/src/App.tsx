import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import ProductList from './components/ProductList';
import { Container, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

const App: React.FC = () => {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Provider store={store}>
				<Container>
					<ProductList />
				</Container>
			</Provider>
		</ThemeProvider>
	);
};

export default App;
