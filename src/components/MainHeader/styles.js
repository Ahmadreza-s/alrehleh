import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => {
  const tokens = theme.custom?.mainHeader ?? {};
  const background =
    tokens.background ?? 'linear-gradient(0deg, #9B10AD 0%, #660D86 31%, #2C0067 100%)';
  const textColor = tokens.text ?? '#FFFFFF';
  const flagGap = tokens.flagGap ?? 1;
  const flagGapValue =
    typeof flagGap === 'number' ? theme.spacing(flagGap) : (flagGap ?? theme.spacing(0));

  return {
    root: {
      background: background,
      color: textColor,
      padding: `${theme.spacing(1.5)} 0`,
      [theme.breakpoints.up('sm')]: {
        padding: `${theme.spacing(2)} 0`,
      },
    },
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: theme.spacing(3),
    },
    brandGroup: {
      display: 'flex',
      alignItems: 'center',
      minWidth: 0,
    },
    logo: {
      width: '186px',
      height: 'auto',
      flexShrink: 0,
    },
    taglineGroup: {
      display: 'flex',
      alignItems: 'center',
      gap: flagGapValue,
      marginLeft: 'auto',
      textAlign: 'right',
      direction: 'rtl',
    },
    taglineText: {
      fontWeight: 600,
      whiteSpace: 'nowrap',
      '@media (max-width: 480px)': {
        display: 'none',
      },
    },
    flagGroup: {
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing(0.75),
    },
    flag: {
      width: '28px',
      height: 'auto',
      flexShrink: 0,
    },
  };
});

export default useStyles;
