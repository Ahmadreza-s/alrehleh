import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useStyles } from './styles';

const CustomInput = forwardRef(({ label, placeholder, type = 'text', value, onChange, sx, helperText, error, ...props }, ref) => {
  const classes = useStyles();

  return (
    <Box className={classes.inputContainer}>
      {label && (
        <Typography variant="body2" className={classes.label}>
          {label}
        </Typography>
      )}
      <TextField
        fullWidth
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        className={classes.input}
        sx={sx}
        helperText={helperText}
        error={error}
        inputRef={ref}
        InputProps={{
          className: classes.inputBase,
        }}
        inputProps={{
          className: classes.inputElement,
        }}
        FormHelperTextProps={{
          className: classes.helperText,
        }}
        {...props}
      />
    </Box>
  );
});

CustomInput.displayName = 'CustomInput';

export default CustomInput;

