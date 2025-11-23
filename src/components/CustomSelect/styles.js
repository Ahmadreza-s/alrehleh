import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  selectWrapper: {
    width: '100%',
    '& .react-select__control': {
      fontFamily: theme.typography.fontFamily,
    },
  },
  iconWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(0, 1.5),
    paddingRight: 0,
    borderLeft: '1px solid #e0e0e0',
  },
  icon: {
    width: 20,
    height: 20,
    objectFit: 'contain',
  },
  chevronIcon: {
    fontSize: '20px !important',
    color: '#21004B',
    transition: 'transform 0.2s ease',
  },
  chevronOpen: {
    transform: 'rotate(180deg)',
  },
}));
