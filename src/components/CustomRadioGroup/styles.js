import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => ({
  radioContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    color: '#717171',
    fontWeight: 'bold !important',
    fontSize: '12px !important',
  },
  radioGroup: {
    display: 'flex',
    flexDirection: 'row',
    gap: '16px',
    margin: 0,
  },
  radioLabel: {
    margin: '0 !important',
    '& .MuiFormControlLabel-label': {
      fontSize: '12px !important',
      color: '#717171 !important',
      fontWeight: 'bold !important',
    },
  },
  radio: {
    padding: '4px !important',
    '& .MuiSvgIcon-root': {
      fontSize: '20px',
    },
    '&.Mui-checked': {
      color: '#8B0EA1 !important',
    },
  },
  helperText: {
    fontSize: '12px !important',
    color: '#d32f2f !important',
    marginTop: '4px !important',
  },
  helperTextError: {
    fontSize: '12px !important',
    color: '#d32f2f !important',
    marginTop: '4px !important',
  },
}));
