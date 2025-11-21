import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  commentSection: {
    width: 'calc(100% + 48px)',
    marginLeft: '-24px',
    [theme.breakpoints.down('sm')]: {
      width: 'calc(100% + 32px)',
      marginLeft: '-16px',
    },
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
    background:
      'linear-gradient(to right, rgba(155, 16, 173, 0.63) 0%, rgba(48, 7, 95, 0.47) 100%)',
    overflow: 'hidden',
    paddingBottom: theme.spacing(2),
  },
  commentSectionTitle: {
    fontWeight: 'bold !important',
    textAlign: 'center',
    color: '#000000',
    fontSize: '2rem !important',
    marginTop: `${theme.spacing(3)} !important`,
  },
  commentsWrapper: {
    position: 'relative',
    overflow: 'hidden',
    [theme.breakpoints.up('sm')]: {
      overflow: 'hidden',
    },
  },
  commentsContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: theme.spacing(2.5),
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      animation: '$marquee 40s linear infinite',
      animationPlayState: ({ isHovered }) => (isHovered ? 'paused' : 'running'),
      transition: 'animation-play-state 0.3s ease-in-out',
      width: 'fit-content',
      willChange: 'transform',
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      overflowX: 'hidden',
      overflowY: 'auto',
      margin: '0 1rem !important',
      animation: 'none',
    },
    '&::-webkit-scrollbar': {
      height: 6,
    },
    '&::-webkit-scrollbar-track': {
      background: 'rgba(0, 0, 0, 0.05)',
      borderRadius: 3,
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'rgba(0, 0, 0, 0.2)',
      borderRadius: 3,
      '&:hover': {
        background: 'rgba(0, 0, 0, 0.3)',
      },
    },
    '& > *': {
      flexShrink: 0,
      minWidth: 380,
      maxWidth: 480,
      [theme.breakpoints.down('sm')]: {
        minWidth: 'auto',
        maxWidth: 'none',
        margin: '0 auto !important',
      },
    },
    '& > *:first-child': {
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(2),
      },
    },
    '& > *:last-child': {
      [theme.breakpoints.up('sm')]: {
        marginRight: theme.spacing(2),
      },
    },
  },
  '@keyframes marquee': {
    '0%': {
      transform: 'translateX(0)',
    },
    '100%': {
      transform: 'translateX(-50%)',
    },
  },
}));
