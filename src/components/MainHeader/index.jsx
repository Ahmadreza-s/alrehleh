import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import logoWhite from '@/assets/images/icons/logo-white.png';
import iraqFlag from '@/assets/images/icons/iraq.png';
import iranFlag from '@/assets/images/icons/iran.png';

import useStyles from './styles.js';

export default function MainHeader() {
  const classes = useStyles();

  return (
    <Box component="section" className={classes.root}>
      <Container className={classes.container}>
        <Box className={classes.brandGroup}>
          <Box component="img" src={logoWhite} alt="Rehlat Shifa logo" className={classes.logo} />
        </Box>

        <Box className={classes.taglineGroup}>
          <Box className={classes.flagGroup}>
            <Box component="img" src={iranFlag} alt="علم إيران" className={classes.flag} />
            <Box component="img" src={iraqFlag} alt="علم العراق" className={classes.flag} />
          </Box>
          <Typography variant="subtitle1" className={classes.taglineText}>
            العلاج في إيران صار أسهل
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
