import { useEffect, useMemo, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { getArabicMonthName } from '@/utils/translator';
import { doctors } from '@/constants/doctors';
import locationColoredIcon from '@/assets/images/icons/location-colored.svg';
import monitorIcon from '@/assets/images/icons/monitor.png';
import translateIcon from '@/assets/images/icons/translate.png';
import dateIcon from '@/assets/images/icons/date.png';
import callBlackIcon from '@/assets/images/icons/call-black.png';
import userTickIcon from '@/assets/images/icons/user-tick.png';
import CustomInput from '@/components/CustomInput';
import CustomRadioGroup from '@/components/CustomRadioGroup';
import { PaymentItems } from '@/constants/paymentItems';
import tickCircleIcon from '@/assets/images/icons/tick-circle.png';
import { saveBooking } from '@/utils/firebase';
import { trackEvent, ANALYTICS_EVENTS } from '@/utils/analytics';
import { useStyles } from './styles';

export default function Booking() {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();

  const { city, speciality, appointment } = location.state || {};

  // State برای فرم
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    passport: '',
    gender: '',
    email: '',
  });

  // State برای errors
  const [errors, setErrors] = useState({
    fullName: '',
    phone: '',
    gender: '',
    email: '',
    passport: '',
  });

  // Refs برای focus کردن
  const fullNameRef = useRef(null);
  const phoneRef = useRef(null);
  const genderRef = useRef(null);
  const emailRef = useRef(null);
  const passportRef = useRef(null);

  // State برای روش پرداخت (پیش‌فرض اولین آیتم)
  const [selectedPayment, setSelectedPayment] = useState(PaymentItems[0]);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // پیدا کردن دکتر بر اساس تخصص
  const selectedDoctor = useMemo(() => {
    if (!speciality) return null;
    return doctors.find((doctor) => doctor.speciality === speciality) || null;
  }, [speciality]);

  // تولید عدد 12 رقمی تصادفی برای رمز الموعد
  const appointmentCode = useMemo(() => {
    return Math.floor(100000000000 + Math.random() * 900000000000).toString();
  }, []);

  useEffect(() => {
    // Track page view
    trackEvent(ANALYTICS_EVENTS.VIEW_BOOKING_PAGE);
    
    // Scroll to top با انیمیشن وقتی صفحه لود می‌شود
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }, 100);
    
    // اگر اطلاعات وجود نداشت، به صفحه خانه redirect کن
    if (!location.state || !location.state.city || !location.state.speciality || !location.state.appointment) {
      navigate('/');
    }
  }, [location.state, navigate]);

  // اگر اطلاعات وجود نداشت، چیزی نمایش نده
  if (!location.state || !location.state.city || !location.state.speciality || !location.state.appointment) {
    return null;
  }

  // تبدیل اعداد به اعداد عربی
  const toArabicNumerals = (num) => {
    const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return num.toString().replace(/\d/g, (digit) => arabicNumerals[parseInt(digit)]);
  };

  // فرمت کردن تاریخ و زمان به فرمت مورد نظر
  const formatAppointmentDateTime = (withLabel = true) => {
    let day, monthName, year, time;
    let date;
    
    if (appointment.type === 'today') {
      if (appointment.isTomorrow) {
        date = new Date();
        date.setDate(date.getDate() + 1);
      } else {
        date = appointment.date || new Date();
      }
      day = date.getDate();
      monthName = getArabicMonthName(date.getMonth());
      year = date.getFullYear();
      time = appointment.time;
    } else {
      // برای type === 'other'
      if (appointment.date) {
        date = new Date(appointment.date);
      } else if (appointment.dateIndex !== undefined) {
        date = new Date();
        date.setDate(date.getDate() + appointment.dateIndex);
      } else {
        date = new Date();
      }
      day = appointment.day || date.getDate();
      monthName = appointment.monthName || getArabicMonthName(date.getMonth());
      year = date.getFullYear();
      time = appointment.time;
    }

    // تبدیل ساعت به اعداد عربی
    const arabicTime = toArabicNumerals(time);
    const arabicDay = toArabicNumerals(day);
    const arabicYear = toArabicNumerals(year);

    const formatted = `${arabicDay} ${monthName} ${arabicYear} الساعة ${arabicTime}`;
    return withLabel ? `تاريخ و وقت الموعد: ${formatted}` : formatted;
  };

  // تابع اعتبارسنجی ایمیل
  const validateEmail = (email) => {
    if (!email) return '';
    if (email.length > 50) {
      return 'البريد الإلكتروني يجب أن يكون أقل من 50 حرف';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'البريد الإلكتروني غير صحيح';
    }
    return '';
  };

  // تابع اعتبارسنجی شماره موبایل
  const validatePhone = (phone) => {
    if (!phone) return 'هذا الحقل إجباري';
    // فقط عدد
    if (!/^\d+$/.test(phone)) {
      return 'يجب إدخال أرقام فقط';
    }
    // حداقل 10 و حداکثر 14 رقم
    if (phone.length < 10) {
      return 'يجب إدخال 10 أرقام على الأقل';
    }
    if (phone.length > 14) {
      return 'يجب إدخال 14 رقم على الأكثر';
    }
    return '';
  };

  // تابع اعتبارسنجی passport
  const validatePassport = (passport) => {
    if (!passport) return '';
    // فقط عدد
    if (!/^\d+$/.test(passport)) {
      return 'يجب إدخال أرقام فقط';
    }
    // حداکثر 20 رقم
    if (passport.length > 20) {
      return 'يجب أن يكون أقل من 20 رقم';
    }
    return '';
  };

  // تابع اعتبارسنجی و ارسال فرم
  const handleSubmit = async () => {
    // اگر در حال submit هستیم، از اجرای مجدد جلوگیری کن
    if (isSubmitting) return;
    
    const newErrors = {
      fullName: '',
      phone: '',
      gender: '',
      email: '',
      passport: '',
    };

    let hasError = false;
    let firstErrorRef = null;

    // اعتبارسنجی name
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'هذا الحقل إجباري';
      hasError = true;
      if (!firstErrorRef) {
        firstErrorRef = fullNameRef;
      }
    }

    // اعتبارسنجی phone
    const phoneError = validatePhone(formData.phone);
    if (phoneError) {
      newErrors.phone = phoneError;
      hasError = true;
      if (!firstErrorRef) {
        firstErrorRef = phoneRef;
      }
    }

    // اعتبارسنجی gender
    if (!formData.gender) {
      newErrors.gender = 'هذا الحقل إجباري';
      hasError = true;
      if (!firstErrorRef) {
        firstErrorRef = genderRef;
      }
    }

    // اعتبارسنجی email (اگر وارد شده باشد)
    if (formData.email) {
      const emailError = validateEmail(formData.email);
      if (emailError) {
        newErrors.email = emailError;
        hasError = true;
        if (!firstErrorRef) {
          firstErrorRef = emailRef;
        }
      }
    }

    // اعتبارسنجی passport (اگر وارد شده باشد)
    if (formData.passport) {
      const passportError = validatePassport(formData.passport);
      if (passportError) {
        newErrors.passport = passportError;
        hasError = true;
        if (!firstErrorRef) {
          firstErrorRef = passportRef;
        }
      }
    }

    setErrors(newErrors);

    // اگر خطایی وجود داشت، روی اولین input focus کن
    if (hasError && firstErrorRef && firstErrorRef.current) {
      setTimeout(() => {
        if (firstErrorRef.current) {
          firstErrorRef.current.focus();
        }
      }, 100);
    }

    // اگر خطایی وجود نداشت، اطلاعات را در Firebase ذخیره کن
    if (!hasError) {
      setIsSubmitting(true);
      
      const bookingData = {
        name: formData.fullName,
        hospitalName: city.hospital,
        reservationDate: formatAppointmentDateTime(false),
        referenceCode: appointmentCode,
        doctorName: selectedDoctor ? selectedDoctor.name : 'غير محدد',
        speciality: speciality,
        paymentType: selectedPayment.title,
        phone: formData.phone,
        email: formData.email || '',
        passport: formData.passport || '',
        gender: formData.gender,
      };
      
      try {
        const bookingId = await saveBooking(bookingData);
        console.log('Booking saved successfully with ID:', bookingId);
        trackEvent(ANALYTICS_EVENTS.CLICK_SUBMIT_BOOKING);
        setSuccessDialogOpen(true);
      } catch (error) {
        console.error('Error saving booking:', error);
        // می‌توانید اینجا یک پیام خطا به کاربر نشان دهید
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <Container maxWidth="md" className={classes.container}>
      <Typography variant="body1" className={classes.sectionTitle}>
        تفاصيل موعدك
      </Typography>
      <Paper className={classes.card}>
        {/* ستون اول: نقشه */}
        <Box className={classes.mapColumn}>
          <Box
            component="iframe"
            src={`https://www.google.com/maps?q=${city.lat},${city.long}&hl=fa&z=15&output=embed`}
            className={classes.mapIframe}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Box>

        {/* ستون دوم: اطلاعات */}
        <Box className={classes.infoColumn}>
          {/* ردیف اول: عکس بیمارستان، عنوان و آدرس */}
          <Box className={classes.hospitalInfoRow}>
            <Box
              component="img"
              src={city.image}
              alt="عکس بیمارستان"
              className={classes.hospitalImage}
            />
            <Box className={classes.hospitalTextInfo}>
              <Typography variant="h6" className={classes.hospitalTitle}>
                {city.hospital}
              </Typography>
              <Box className={classes.hospitalLocation}>
                <Box
                  component="img"
                  src={locationColoredIcon}
                  alt="موقعیت"
                  className={classes.locationIcon}
                />
                <Typography variant="body2" className={classes.hospitalAddress}>
                  {city.address}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Divider */}
          <Box className={classes.divider} />

          {/* ردیف دوم: اطلاعات الموعد */}
          <Box className={classes.appointmentInfoRow}>
            {/* اسم الطبيب */}
            <Box className={classes.infoItem}>
              <Box
                component="img"
                src={monitorIcon}
                alt="تخصص"
                className={classes.infoIcon}
              />
              <Typography variant="body2" className={classes.infoText}>
                اسم الطبيب: {selectedDoctor ? selectedDoctor.name : 'غير محدد'}
              </Typography>
            </Box>

            {/* موقع وجود الدليل العراقي */}
            <Box className={classes.infoItem}>
              <Box
                component="img"
                src={translateIcon}
                alt="مترجم"
                className={classes.infoIcon}
              />
              <Typography variant="body2" className={classes.infoText}>
                موقع وجود الدليل العراقي: {city.translator}
              </Typography>
            </Box>

            {/* تاريخ ووقت الموعد */}
            <Box className={classes.infoItem}>
              <Box
                component="img"
                src={dateIcon}
                alt="تاریخ"
                className={classes.infoIcon}
              />
              <Typography variant="body2" className={classes.infoText}>
                {formatAppointmentDateTime()}
              </Typography>
            </Box>

            {/* رمز الموعد الخاص بك */}
            <Box className={classes.infoItem}>
              <Box
                component="img"
                src={callBlackIcon}
                alt="رمز"
                className={classes.infoIcon}
              />
              <Typography variant="body2" className={classes.infoText}>
                رمز الموعد الخاص بك: {toArabicNumerals(appointmentCode)}
              </Typography>
            </Box>

            {/* رقم عيادة الاتصال */}
            <Box className={classes.infoItem}>
              <Box
                component="img"
                src={userTickIcon}
                alt="تماس"
                className={classes.infoIcon}
              />
              <Typography variant="body2" className={classes.infoText}>
                رقم عيادة الاتصال:{' '}
                <Box component="span" sx={{ direction: 'ltr', display: 'inline-block' }}>
                  {selectedDoctor ? selectedDoctor.tell : city.tell}
                </Box>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>

  
      <Typography variant="body1" className={classes.sectionTitle} sx={{ marginTop: 1.5 }}>
        أدخل بياناتك
      </Typography>

      <Paper className={classes.formCard}>
        <Box className={classes.formContainer}>
          <CustomInput
            ref={fullNameRef}
            label="الاسم الكامل"
            placeholder="إدخال اسمك الكامل"
            value={formData.fullName}
            onChange={(e) => {
              setFormData({ ...formData, fullName: e.target.value });
              if (errors.fullName) {
                setErrors({ ...errors, fullName: '' });
              }
            }}
            helperText={errors.fullName}
            error={!!errors.fullName}
          />
          <CustomInput
            ref={phoneRef}
            label="رقم الهاتف"
            placeholder="إدخال رقم هاتفك"
            type="tel"
            value={formData.phone}
            onChange={(e) => {
              // فقط عدد اجازه بده
              const value = e.target.value.replace(/\D/g, '');
              setFormData({ ...formData, phone: value });
              if (errors.phone) {
                setErrors({ ...errors, phone: '' });
              }
            }}
            helperText={errors.phone}
            error={!!errors.phone}
            sx={{
              '& .MuiOutlinedInput-input': {
                direction: 'ltr',
                textAlign: 'right',
              },
            }}
          />
          <CustomInput
            ref={passportRef}
            label="رقم الجواز (اختياري)"
            placeholder="إدخال رقم الجواز"
            value={formData.passport}
            onChange={(e) => {
              // فقط عدد اجازه بده
              const value = e.target.value.replace(/\D/g, '');
              setFormData({ ...formData, passport: value });
              if (errors.passport) {
                setErrors({ ...errors, passport: '' });
              }
            }}
            helperText={errors.passport}
            error={!!errors.passport}
          />
          <CustomRadioGroup
            ref={genderRef}
            label="الجنس"
            value={formData.gender}
            onChange={(e) => {
              setFormData({ ...formData, gender: e.target.value });
              if (errors.gender) {
                setErrors({ ...errors, gender: '' });
              }
            }}
            options={[
              { value: 'male', label: 'ذکر' },
              { value: 'female', label: 'أنثى' },
            ]}
            helperText={errors.gender}
            error={!!errors.gender}
          />
          <CustomInput
            ref={emailRef}
            label="البريد الإلكتروني (اختياري)"
            placeholder="example@example.com"
            type="email"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              if (errors.email) {
                setErrors({ ...errors, email: '' });
              }
            }}
            helperText={errors.email}
            error={!!errors.email}
            sx={{
              '& .MuiOutlinedInput-input': {
                direction: 'ltr',
                textAlign: 'right',
              },
            }}
          />
        </Box>
      </Paper>

      <Typography variant="body1" className={classes.sectionTitle} sx={{ marginTop: 1.5 }}>
        تحديد طريقة الدفع الخاصة بك
      </Typography>

      <Box className={classes.paymentOptions}>
        {PaymentItems.map((item, index) => (
          <Box
            key={index}
            className={classes.paymentBox}
            onClick={() => setSelectedPayment(item)}
            style={{ cursor: 'pointer' }}
          >
            <Box className={classes.paymentBoxInner}>
              {selectedPayment === item ? (
                <Box
                  component="img"
                  src={tickCircleIcon}
                  alt="محدد"
                  className={classes.paymentCheckIcon}
                />
              ) : (
                <Box className={classes.paymentEmptyCircle}></Box>
              )}
              <Box className={classes.paymentBoxContent}>
                <Typography variant="body2" className={classes.paymentBoxTitle}>
                  {item.title}
                </Typography>
                {item.description && (
                  <Typography variant="body2" className={classes.paymentBoxDetails}>
                    {item.description}
                  </Typography>
                )}
              </Box>
              {item.badge ? (
                <Box className={classes.paymentBadge}>
                  {item.badge}
                </Box>
              ) : item.image ? (
                <Box
                  component="img"
                  src={item.image}
                  alt={item.title}
                  className={classes.paymentImage}
                />
              ) : null}
            </Box>
          </Box>
        ))}
      </Box>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        className={classes.submitButton}
        onClick={handleSubmit}
        disabled={isSubmitting}
        startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}
      >
        {isSubmitting
          ? ''
          : selectedPayment === PaymentItems[PaymentItems.length - 1]
          ? 'أكمل الحجز ( 3750 IQD)'
          : 'أكمل الحجز ( 2500 IQD)'}
      </Button>

      {/* Dialog برای نمایش پیام موفقیت */}
      <Dialog
        open={successDialogOpen}
        onClose={() => setSuccessDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent sx={{ textAlign: 'center', padding: '32px 24px' }}>
          <CheckCircleIcon
            sx={{
              fontSize: 80,
              color: '#4caf50',
              mb: 2,
            }}
          />
          <DialogTitle
            sx={{
              textAlign: 'center',
              fontWeight: 'bold',
              padding: 0,
              mb: 2,
            }}
          >
            تم الحفظ بنجاح
          </DialogTitle>
          <Typography variant="body1" sx={{ textAlign: 'right', mb: 2 }}>
            تم حفظ معلوماتك بنجاح وسنتصل بك قريباً.
          </Typography>
          <Typography variant="body2" sx={{ textAlign: 'right', color: 'text.secondary' }}>
            ملاحظة: حفظ هذه المعلومات لا يعني حجز موعد مع الطبيب. سيتم التواصل معك لتأكيد الموعد.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', padding: '16px' }}>
          <Button
            onClick={() => {
              setSuccessDialogOpen(false);
              navigate('/', { replace: true, state: { skipHomePageTracking: true } });
            }}
            variant="contained"
            color="primary"
            sx={{ minWidth: '120px' }}
          >
            موافق
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

