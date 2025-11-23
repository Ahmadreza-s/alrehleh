import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import youtubeIcon from '@/assets/images/icons/youtube.svg';
import instagramIcon from '@/assets/images/icons/instagram.svg';
import facebookIcon from '@/assets/images/icons/facebook.svg';
import whatsappIcon from '@/assets/images/icons/whatsapp.svg';
import locationIcon from '@/assets/images/icons/location.svg';
import { trackEvent, ANALYTICS_EVENTS } from '@/utils/analytics';

import useStyles from './styles.js';

export default function HeaderInfo() {
  const classes = useStyles();

  return (
    <Box component="header" className={classes.root}>
      <Container className={classes.container}>
        <Box className={classes.socialGroup}>
          <Box
            component="a"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              trackEvent(ANALYTICS_EVENTS.CLICK_YOUTUBE_HEADER);
            }}
            className={classes.socialIcon}
            style={{ cursor: 'pointer' }}
          >
            <Box component="img" src={youtubeIcon} alt="YouTube" className={classes.socialIcon} />
          </Box>
          <Box
            component="a"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              trackEvent(ANALYTICS_EVENTS.CLICK_INSTAGRAM_HEADER);
            }}
            className={classes.socialIcon}
            style={{ cursor: 'pointer' }}
          >
            <Box component="img" src={instagramIcon} alt="Instagram" className={classes.socialIcon} />
          </Box>
          <Box
            component="a"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              trackEvent(ANALYTICS_EVENTS.CLICK_FACEBOOK_HEADER);
            }}
            className={classes.socialIcon}
            style={{ cursor: 'pointer' }}
          >
            <Box component="img" src={facebookIcon} alt="Facebook" className={classes.socialIcon} />
          </Box>
          <Box
            component="a"
            href="http://wa.me/989125056029"
            target="_blank"
            rel="noopener noreferrer"
            className={classes.whatsappLink}
            onClick={() => trackEvent(ANALYTICS_EVENTS.CLICK_WHATSAPP_HEADER)}
          >
            <Box component="img" src={whatsappIcon} alt="WhatsApp" className={classes.socialIcon} />
            <Typography variant="body2" className={classes.whatsappText}>
              <span dir="ltr">0098 912 505 6029</span>
            </Typography>
          </Box>
        </Box>

        <Box className={classes.addressWrapper}>
          <Box component="img" src={locationIcon} alt="الموقع" className={classes.locationIcon} />
          <Typography
            variant="body2"
            className={classes.addressText}
            title="مقر شركة رحلة الشفا (عنوان تجريبي)، مقابل ساحة الزهراء، شارع الوحدة، مبنى رقم 13، كربلاء"
          >
            مقر شركة رحلة الشفا (عنوان تجريبي)، مقابل ساحة الزهراء، شارع الوحدة، مبنى رقم 13، كربلاء
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
