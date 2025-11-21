import { makeStyles } from '@mui/styles';

const spacingValue = (theme, value) =>
  typeof value === 'number' ? theme.spacing(value) : (value ?? theme.spacing(0));

const useStyles = makeStyles((theme) => {
  const tokens = theme.custom?.headerInfo ?? {};
  const background = tokens.background ?? theme.palette.brand?.main ?? '#21004B';
  const textColor = tokens.text ?? theme.palette.brand?.contrastText ?? '#ffffff';
  const iconSize = tokens.iconSize ?? 22;
  const gap = tokens.gap ?? 2;
  const gapValue = spacingValue(theme, gap);

  return {
    root: {
      backgroundColor: background,
      color: textColor,
      padding: `${theme.spacing(1)} 0`,
    },
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: gapValue,
    },
    socialGroup: {
      display: 'flex',
      alignItems: 'center',
      gap: gapValue,
      minWidth: 0,
    },
    socialIcon: {
      width: `${iconSize}px`,
      height: `${iconSize}px`,
      flexShrink: 0,
    },
    whatsappLink: {
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing(1),
      color: 'inherit',
      textDecoration: 'none',
      '&:hover, &:focus-visible': {
        textDecoration: 'underline',
      },
    },
    whatsappText: {
      direction: 'ltr !important',
      whiteSpace: 'nowrap',
    },
    addressWrapper: {
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing(1),
      marginLeft: 'auto',
      textAlign: 'right',
      direction: 'rtl',
      minWidth: 0,
    },
    addressText: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      maxWidth: 'clamp(220px, 50vw, 520px)',
    },
    locationIcon: {
      width: `${iconSize}px`,
      height: `${iconSize}px`,
      flexShrink: 0,
    },
  };
});

export default useStyles;
