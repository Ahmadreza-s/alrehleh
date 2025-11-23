import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => ({
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    color: '#717171',
    fontWeight: 'bold !important',
    fontSize: '12px !important',
  },
  input: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      '& fieldset': {
        borderColor: '#E0E0E0',
      },
      '&:hover fieldset': {
        borderColor: '#E0E0E0',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#E0E0E0',
      },
      '&.Mui-error fieldset': {
        borderColor: '#d32f2f',
      },
      '&.Mui-error.Mui-focused fieldset': {
        borderColor: '#d32f2f',
      },
    },
  },
  inputBase: {},
  inputElement: {
    padding: '16px !important',
    fontSize: '12px !important',
    color: '#292D32 !important',
    '&::placeholder': {
      color: '#7b7b7b',
      fontSize: '12px',
      opacity: 1,
    },
  },
  helperText: {
    fontSize: '12px !important',
    marginTop: '4px !important',
    textAlign: 'right !important',
  },
}));
