import Select from 'react-select';
import { components } from 'react-select';
import { Box } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import useStyles from './styles.js';

const DropdownIndicator = (props) => {
  const classes = useStyles();
  const isOpen = props.selectProps.menuIsOpen;
  return (
    <components.DropdownIndicator {...props}>
      <KeyboardArrowDownIcon
        className={`${classes.chevronIcon} ${isOpen ? classes.chevronOpen : ''}`}
      />
    </components.DropdownIndicator>
  );
};

const Control = ({ children, ...props }) => {
  const classes = useStyles();
  const { icon } = props.selectProps;

  return (
    <components.Control {...props}>
      {icon && (
        <Box className={classes.iconWrapper}>
          <Box component="img" src={icon} alt="icon" className={classes.icon} />
        </Box>
      )}
      {children}
    </components.Control>
  );
};

const CustomSelect = ({
  options,
  value,
  onChange,
  placeholder = 'انتخاب کنید...',
  icon,
  isRtl = true,
  ...otherProps
}) => {
  const classes = useStyles();

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      minHeight: '48px',
      borderRadius: '8px',
      border: state.isFocused ? '1px solid #8B0EA1' : '1px solid #e0e0e0',
      boxShadow: 'none',
      '&:hover': {
        border: state.isFocused ? '1px solid #8B0EA1' : '1px solid #b0b0b0',
      },
      backgroundColor: '#ffffff',
      direction: isRtl ? 'rtl' : 'ltr',
      paddingRight: icon ? '12px' : '8px',
      paddingLeft: '8px',
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: '4px 8px',
    }),
    input: (provided) => ({
      ...provided,
      margin: 0,
      padding: 0,
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#9e9e9e',
      fontSize: '14px',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#21004B',
      fontSize: '14px',
      fontWeight: 500,
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      marginTop: '4px',
      zIndex: 9999,
    }),
    menuList: (provided) => ({
      ...provided,
      padding: '4px',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? '#8B0EA1'
        : state.isFocused
          ? 'rgba(139, 14, 161, 0.1)'
          : 'transparent',
      color: state.isSelected ? '#ffffff' : '#21004B',
      cursor: 'pointer',
      padding: '10px 12px',
      borderRadius: '6px',
      fontSize: '14px',
      marginBottom: '0.25rem',
      '&:last-child': {
        marginBottom: 0,
      },
      '&:active': {
        backgroundColor: '#8B0EA1',
        color: '#ffffff',
      },
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      padding: '8px',
      color: '#21004B',
    }),
  };

  return (
    <Box className={classes.selectWrapper}>
      <Select
        isSearchable={false}
        options={options}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        components={{ Control, DropdownIndicator }}
        styles={customStyles}
        isRtl={isRtl}
        icon={icon}
        inputProps={{
          readOnly: true,
        }}
        {...otherProps}
      />
    </Box>
  );
};

export default CustomSelect;
