import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import { saveNewsletterSubscription } from '@/utils/firebase';
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // تابع اعتبارسنجی ایمیل
  const validateEmail = (email) => {
    if (!email.trim()) {
      return 'هذا الحقل إجباري';
    }
    // بررسی فرمت ایمیل
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'البريد الإلكتروني غير صحيح';
    }
    // حداکثر 50 کاراکتر
    if (email.length > 50) {
      return 'البريد الإلكتروني يجب أن يكون أقل من 50 حرف';
    }
    return '';
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    
    // پاک کردن خطا و موفقیت قبلی
    setError('');
    setSuccess(false);
    
    // اعتبارسنجی ایمیل
    const emailError = validateEmail(email);
    if (emailError) {
      setError(emailError);
      return;
    }

    setIsSubmitting(true);
    
    try {
      await saveNewsletterSubscription(email.trim());
      setSuccess(true);
      setEmail('');
      // بعد از 3 ثانیه پیام موفقیت را پاک کن
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      setError('حدث خطأ أثناء التسجيل. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsSubmitting(false);
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
                onChange={(e) => {
                  setEmail(e.target.value);
                  // پاک کردن خطا وقتی کاربر شروع به تایپ می‌کند
                  if (error) {
                    setError('');
                  }
                  if (success) {
                    setSuccess(false);
                  }
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !isSubmitting) {
                    handleEmailSubmit(e);
                  }
                }}
                className={classes.emailInput}
                error={!!error}
                helperText={error || (success ? 'تم التسجيل بنجاح!' : '')}
                FormHelperTextProps={{
                  sx: {
                    textAlign: 'right',
                    color: success ? '#4caf50' : undefined,
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        variant="contained"
                        onClick={handleEmailSubmit}
                        className={classes.subscribeButton}
                        disabled={!email.trim() || isSubmitting}
                        startIcon={isSubmitting ? <CircularProgress size={16} color="inherit" /> : null}
                      >
                        {isSubmitting ? 'جاري التسجيل...' : 'تسجیل'}
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
