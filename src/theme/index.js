import { createTheme } from '@mui/material/styles';
import { faIR } from '@mui/material/locale';
import IRANSansXFaNumRegular from '@/assets/fonts/IRANSansXFaNum-Regular.ttf';

const BRAND_PRIMARY = '#0b6efd';
const BRAND_SECONDARY = '#6c757d';
const BRAND_ERROR = '#d32f2f';
const BRAND_BACKGROUND_DEFAULT = '#fff';
const BRAND_BACKGROUND_PAPER = '#ffffff';

const HEADER_BG = '#21004B';
const HEADER_TEXT = '#ffffff';
const MAIN_HEADER_GRADIENT = 'linear-gradient(90deg, #9810AD 0%, #660D86 31%, #2C0067 100%)';
const MAIN_HEADER_TEXT = '#FFFFFF';

// Single, app-wide theme (no light/dark switching)
const theme = createTheme(
  {
    palette: {
      primary: { main: BRAND_PRIMARY },
      secondary: { main: BRAND_SECONDARY },
      error: { main: BRAND_ERROR },
      background: { default: BRAND_BACKGROUND_DEFAULT, paper: BRAND_BACKGROUND_PAPER },
      brand: {
        main: HEADER_BG,
        contrastText: HEADER_TEXT,
      },
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
      MuiPaper: {
        styleOverrides: {
          root: {
            boxShadow: 'none !important',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 10,
          },
          containedPrimary: {
            backgroundColor: '#8B0EA1',
            color: '#FFF6F4 !important',
            fontSize: '14px !important',
            padding: 12,
            fontWeight: 'bold !important',
            '&:hover': {
              backgroundColor: '#7a0d91',
            },
          },
        },
        defaultProps: {
          variant: 'contained',
          color: 'primary',
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            direction: 'rtl !important',
          },
        },
      },
      MuiContainer: {
        defaultProps: {
          maxWidth: 'xl',
        },
      },
    },
    custom: {
      headerInfo: {
        background: HEADER_BG,
        text: HEADER_TEXT,
        iconSize: 22,
        gap: 2,
      },
      mainHeader: {
        background: MAIN_HEADER_GRADIENT,
        text: MAIN_HEADER_TEXT,
        dividerColor: 'rgba(255, 255, 255, 0.4)',
        flagGap: 1,
      },
    },
  },
  faIR,
);

export default theme;
