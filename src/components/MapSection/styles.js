import { makeStyles } from '@mui/styles';

// Global styles for Leaflet map labels
export const mapLabelStyles = `
	.city-label-icon {
		background: transparent !important;
		border: none !important;
		box-shadow: none !important;
	}
	.city-label-bubble {
		font-family: 'IRANSansXFaNum', sans-serif;
		background: #4caf50;
		color: #FFFFFF;
		padding: 10px 30px;
		border-radius: 12px;
		font-weight: 700;
		font-size: 1.2rem;
		text-align: center;
		white-space: nowrap;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
		position: relative;
		cursor: pointer;
		transition: transform 0.2s, box-shadow 0.2s;
	}
	.city-label-bubble:hover {
		transform: scale(1.05);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
	}
	.city-label-bubble:after {
		content: '';
		position: absolute;
		bottom: -10px;
		left: 50%;
		transform: translateX(-50%);
		width: 0;
		height: 0;
		border-left: 12px solid transparent;
		border-right: 12px solid transparent;
		border-top: 12px solid #4caf50;
	}
`;

export const useStyles = makeStyles((theme) => ({
  rightColumn: {
    flex: '1 1 720px',
    position: 'relative',
    minHeight: 460,
    display: 'flex',
  },
  mapContainer: {
    width: '100%',
    height: '100%',
    zIndex: 0,
  },
  mapOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(18, 4, 60, 0.75) 100%)',
    pointerEvents: 'none',
    borderRadius: 10,
    zIndex: 1,
  },
  bannerContainer: {
    position: 'absolute',
    bottom: '2rem',
    left: '2rem',
    right: '2rem',
    zIndex: 2,
    pointerEvents: 'auto',
    [theme.breakpoints.down('sm')]: {
      bottom: '.5rem',
      left: '.5rem',
      right: '.5rem',
    },
  },
  bannerWrapper: {
    position: 'relative',
    width: '100%',
  },
  mapBanner: {
    width: '100%',
    height: 'auto',
    objectFit: 'contain',
    display: 'block',
  },
  bannerCloseButton: {
    position: 'absolute !important',
    top: 8,
    left: 8,
    width: 28,
    height: 28,
    minWidth: 28,
    padding: 4,
    backgroundColor: '#FFFFFF',
    color: '#000000',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
    '& .MuiSvgIcon-root': {
      fontSize: 18,
    },
    '&:hover': {
      backgroundColor: '#F5F5F5',
    },
    zIndex: 3,
    [theme.breakpoints.down('sm')]: {
      top: 4,
      left: 4,
      width: 16,
      height: 16,
      minWidth: 16,
      padding: 2,
    },
  },
}));
