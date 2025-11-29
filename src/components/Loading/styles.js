import { styled, keyframes } from '@mui/material/styles';
import { Box } from '@mui/material';

const shine = keyframes`
  0% {
    filter: brightness(1) drop-shadow(0 0 0px rgba(255, 255, 255, 0));
  }
  50% {
    filter: brightness(1.5) drop-shadow(0 0 40px rgba(255, 255, 255, 1)) drop-shadow(0 0 60px rgba(255, 255, 255, 0.6));
  }
  100% {
    filter: brightness(1) drop-shadow(0 0 0px rgba(255, 255, 255, 0));
  }
`;

export const LoadingContainer = styled(Box)({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: '#21004B',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,
});

export const LogoImage = styled('img')({
  width: '280px',
  height: 'auto',
  animation: `${shine} 3s ease-in-out infinite`,
  '@media (max-width: 768px)': {
    width: '200px',
  },
});

export const LoadingText = styled('p')({
  color: '#ffffff',
  fontSize: '28px',
  fontWeight: 600,
  fontFamily: 'IRANSansXFaNum, sans-serif',
  textAlign: 'center',
  margin: 0,
  letterSpacing: '2px',
  minHeight: '40px',
  direction: 'rtl',
  '@media (max-width: 768px)': {
    fontSize: '22px',
  },
});

