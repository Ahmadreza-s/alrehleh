import { createTheme } from '@mui/material/styles';
import { faIR } from '@mui/material/locale';
import IRANSansXFaNumRegular from '@/assets/fonts/IRANSansXFaNum-Regular.ttf';

// Single, app-wide theme (no light/dark switching)
const theme = createTheme(
	{
		palette: {
			primary: { main: '#0b6efd' },
			secondary: { main: '#6c757d' },
			error: { main: '#d32f2f' },
			background: { default: '#fafafa', paper: '#ffffff' },
		},
		typography: {
			fontFamily:
				'IRANSansXFaNum, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", sans-serif',
			h1: { fontWeight: 700 },
			h2: { fontWeight: 700 },
			h3: { fontWeight: 700 },
		},
		components: {
			MuiCssBaseline: {
				styleOverrides: `
					@font-face {
						font-family: 'IRANSansXFaNum';
						src: url(${IRANSansXFaNumRegular}) format('truetype');
						font-weight: 400;
						font-style: normal;
						font-display: swap;
					}
				`,
			},
			MuiButton: {
				styleOverrides: {
					root: {
						textTransform: 'none',
						borderRadius: 10,
					},
				},
				defaultProps: {
					variant: 'contained',
					color: 'primary',
				},
			},
			MuiContainer: {
				defaultProps: {
					maxWidth: 'md',
				},
			},
		},
	},
	faIR,
);

export default theme;


