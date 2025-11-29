import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  footer: {
    width: '100%',
    backgroundColor: theme.palette.background?.default || '#f5f5f5',
    padding: theme.spacing(4, 0),
    position: 'relative',
  },
  dividerWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '2.5rem',
    marginBottom: '2.5rem',
  },
  divider: {
    width: '80%',
    backgroundColor: '#EFEFEF',
    height: '2px',
    border: 'none',
  },
  container: {
    width: '100%',
  },
  footerContent: {
    display: 'flex',
    flexDirection: 'row-reverse',
    gap: theme.spacing(4),
    alignItems: 'flex-start',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      gap: theme.spacing(3),
    },
  },
  leftSection: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
  },
  rightSection: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
    alignItems: 'flex-end',
  },
  footerLogo: {
    height: 'auto',
    maxWidth: 200,
    objectFit: 'contain',
    marginBottom: theme.spacing(1),
  },
  contactInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    alignItems: 'flex-end',
  },
  contactItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: theme.spacing(1.5),
    direction: 'rtl',
  },
  contactIcon: {
    width: 20,
    height: 20,
    flexShrink: 0,
    marginTop: 2,
  },
  contactText: {
    color: '#21004B !important',
    fontSize: '0.9rem !important',
    textAlign: 'right !important',
    direction: 'rtl !important',
    lineHeight: '1.6 !important',
  },
  newsletterSection: {
    width: '100%',
    maxWidth: 400,
  },
  emailInput: {
    '& .MuiOutlinedInput-root': {
      borderRadius: 4,
      backgroundColor: theme.palette.background?.paper || '#ffffff',
      paddingRight: theme.spacing(1),
      '& input': {
        padding: theme.spacing(1.5, 2),
      },
    },
  },
  subscribeButton: {
    fontWeight: 600,
    minWidth: 'auto',
    '&.Mui-disabled': {
      backgroundColor: '#ccc',
      color: 'red',
    },
    '&.MuiButton-root': {
      boxShadow: 'none !important',
      backgroundColor: '#8B0EA1',
      margin: '-0.5rem',
      padding: '0.7rem 2rem',
      borderTopRightRadius: '4px',
      borderTopLeftRadius: '0',
      borderBottomLeftRadius: '0',
      borderBottomRightRadius: '4px',
    },
  },
  companyDescription: {
    color: '#21004B',
    lineHeight: '1.6 !important',
    textAlign: 'right',
    direction: 'rtl',
    fontSize: '0.9rem !important',
  },
  copyrightSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(2),
    paddingBottom: theme.spacing(3),
    flexWrap: 'wrap',
  },
  copyrightIcons: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1.5),
  },
  copyrightIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 20,
    height: 20,
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
      filter:
        'brightness(0) saturate(100%) invert(8%) sepia(96%) saturate(4849%) hue-rotate(258deg) brightness(90%) contrast(115%)',
    },
    '&:hover': {
      opacity: 0.8,
    },
  },
  copyrightText: {
    color: '#21004B',
    textAlign: 'center',
  },
}));
