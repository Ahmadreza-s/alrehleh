import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  card: {
    borderRadius: '20px !important',
    padding: theme.spacing(3),
    minWidth: '500px',
    width: '100%',
    '&:hover': {
      transform: 'scale(1.05)',
      transition: 'transform 200ms linear',
    },
    [theme.breakpoints.down('sm')]: {
      minWidth: 'auto',
      margin: '0 auto !important',
    },
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    gap: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  leftSection: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    alignItems: 'flex-end',
  },
  starsContainer: {
    marginTop: 8,
    display: 'flex',
    alignItems: 'center',
  },
  starIcon: {
    color: '#F8D57E',
    fontSize: '32px !important',
  },
  commentText: {
    color: `${theme.palette.text.primary} !important`,
    lineHeight: '1.8 !important',
    fontSize: '1rem !important',
    textAlign: 'right !important',
    direction: 'rtl !important',
  },
  rightSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing(1),
  },
  avatar: {
    width: '120px !important',
    height: '120px !important',
    border: '2px solid #F0F0F0',
  },
  userName: {
    fontWeight: 'bold !important',
    fontSize: '1.25rem !important',
    textAlign: 'center',
  },
  userLocation: {
    color: '#374151',
    textAlign: 'center',
    fontSize: '0.875rem',
  },
}));

export default useStyles;
