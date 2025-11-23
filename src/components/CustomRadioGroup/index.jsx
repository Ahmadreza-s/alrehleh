import React, { forwardRef, useImperativeHandle } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useStyles } from './styles';

const CustomRadioGroup = forwardRef(({ label, value, onChange, options = [], helperText, error }, ref) => {
  const classes = useStyles();
  const firstRadioRef = React.useRef(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      if (firstRadioRef.current) {
        firstRadioRef.current.focus();
      }
    },
  }));

  return (
    <Box className={classes.radioContainer}>
      {label && (
        <Typography variant="body2" className={classes.label}>
          {label}
        </Typography>
      )}
      <RadioGroup
        row
        value={value}
        onChange={onChange}
        className={classes.radioGroup}
      >
        {options.map((option, index) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={
              <Radio
                className={classes.radio}
                inputRef={index === 0 ? firstRadioRef : null}
              />
            }
            label={option.label}
            className={classes.radioLabel}
          />
        ))}
      </RadioGroup>
      {helperText && (
        <Typography variant="caption" className={error ? classes.helperTextError : classes.helperText}>
          {helperText}
        </Typography>
      )}
    </Box>
  );
});

CustomRadioGroup.displayName = 'CustomRadioGroup';

export default CustomRadioGroup;

