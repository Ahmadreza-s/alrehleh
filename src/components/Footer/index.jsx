import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import Divider from '@mui/material/Divider';
import { useStyles } from './styles.js';

import youtubeIcon from '@/assets/images/icons/youtube.svg';
import instagramIcon from '@/assets/images/icons/instagram.svg';
import facebookIcon from '@/assets/images/icons/facebook.svg';
import locationColoredIcon from '@/assets/images/icons/location-colored.svg';
import callColoredIcon from '@/assets/images/icons/call-colored.svg';
import messageColoredIcon from '@/assets/images/icons/message-colored.svg';
import logoColored from '@/assets/images/icons/logo-colored.png';

const Footer = () => {
  const classes = useStyles();
  const [email, setEmail] = useState('');

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      // TODO: Handle newsletter subscription
      console.log('Email submitted:', email);
      setEmail('');
    }
  };

  return (
    <Box component="footer" className={classes.footer}>
      <Container className={classes.container}>
        <Box className={classes.footerContent}>
          {/* Right Section */}
          <Box className={classes.rightSection}>
            <Box
              component="img"
              src={logoColored}
              alt="رحلة الشفا"
              className={classes.footerLogo}
            />
            <Box className={classes.contactInfo}>
              <Box className={classes.contactItem}>
                <Box
                  component="img"
                  src={locationColoredIcon}
                  alt="Location"
                  className={classes.contactIcon}
                />
                <Typography variant="body2" className={classes.contactText}>
                  مقر شركة رحلة الشفا (عنوان تجريبي)، مقابل ساحة الزهراء، شارع الوحدة، مبنى رقم 12،
                  كربلاء
                </Typography>
              </Box>
              <Box className={classes.contactItem}>
                <Box
                  component="img"
                  src={callColoredIcon}
                  alt="Phone"
                  className={classes.contactIcon}
                />
                <Typography
                  variant="body2"
                  sx={{ direction: 'ltr !important' }}
                  className={classes.contactText}
                >
                  +964 37 123 4567
                </Typography>
              </Box>
              <Box className={classes.contactItem}>
                <Box
                  component="img"
                  src={messageColoredIcon}
                  alt="Email"
                  className={classes.contactIcon}
                />
                <Typography variant="body2" className={classes.contactText}>
                  info@rehlatshifa.com
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Left Section */}
          <Box className={classes.leftSection}>
            <Box className={classes.newsletterSection}>
              <TextField
                fullWidth
                type="email"
                placeholder="أدخل بريدك الإلكتروني"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleEmailSubmit(e);
                  }
                }}
                className={classes.emailInput}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        variant="contained"
                        onClick={handleEmailSubmit}
                        className={classes.subscribeButton}
                        disabled={!email.trim()}
                      >
                        تسجیل
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Typography variant="body2" className={classes.companyDescription}>
              من نحن
              <br />
              <br />
              رحلة الشفا هي منصة متخصصة في تنظيم الرحلات العلاجية إلى إيران، تهدف إلى تسهيل حصول
              المرضى من العراق على أفضل الخدمات الطبية بأعلى جودة وأسعار مناسبة. من خلال موقعنا،
              يمكنك حجز مواعيد الأطباء والمستشفيات المعتمدة بسهولة، واختيار باقات الإقامة والنقل، مع
              دعم متواصل من فريق خدمة العملاء ومترجمين عراقيين متواجدين في المستشفيات لمساعدتك خطوة
              بخطوة.
            </Typography>
          </Box>
        </Box>
      </Container>
      <Box className={classes.dividerWrapper}>
        <Divider className={classes.divider} />
      </Box>
      <Container>
        <Box className={classes.copyrightSection}>
          <Box className={classes.copyrightIcons}>
            <Box
              component="a"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className={classes.copyrightIcon}
            >
              <Box component="img" src={youtubeIcon} alt="YouTube" />
            </Box>

            <Box
              component="a"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className={classes.copyrightIcon}
            >
              <Box component="img" src={instagramIcon} alt="Instagram" />
            </Box>

            <Box
              component="a"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className={classes.copyrightIcon}
            >
              <Box component="img" src={facebookIcon} alt="Facebook" />
            </Box>
          </Box>
          <Typography variant="body2" className={classes.copyrightText}>
            جميع الحقوق محفوظة ومملوكة لشركة رحلة الشفا © 2022
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
