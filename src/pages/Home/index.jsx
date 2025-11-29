import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { trackEvent, ANALYTICS_EVENTS } from '@/utils/analytics';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { useTheme, useMediaQuery } from '@mui/material';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import whatsappIcon from '@/assets/images/icons/whatsapp.svg';
import locationColoredIcon from '@/assets/images/icons/location-colored.svg';
import { PaymentItems } from '@/constants/paymentItems';
import { cities } from '@/constants/cities';
import { doctors } from '@/constants/doctors';
import { useStyles } from './styles';
import CommentSection from '@/components/CommentSection';
import MapSection from '@/components/MapSection';
import Footer from '@/components/Footer';
import CustomSelect from '@/components/CustomSelect';
import Appointment from '@/components/Appointment';
import SEO from '@/components/SEO';
import StructuredData from '@/components/StructuredData';
import monitorIcon from '@/assets/images/icons/monitor.png';
import translateIcon from '@/assets/images/icons/translate.png';
import callBlackIcon from '@/assets/images/icons/call-black.png';
import userTickIcon from '@/assets/images/icons/user-tick.png';
import tickCircleIcon from '@/assets/images/icons/tick-circle.png';

export default function Home() {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const cityOptions = cities.map((city) => ({
    value: city,
    label: city.name,
  }));

  // استخراج تخصص‌های منحصر به فرد از لیست پزشکان
  const uniqueSpecialities = [...new Set(doctors.map((doctor) => doctor.speciality))].sort();

  const specialityOptions = uniqueSpecialities.map((speciality) => ({
    value: speciality,
    label: speciality,
  }));

  const [selectedCity, setSelectedCity] = useState(cityOptions[0]);
  const [selectedSpeciality, setSelectedSpeciality] = useState(specialityOptions[0]);
  const [isLoading, setIsLoading] = useState(false);
  const loadingTimeoutRef = useRef(null);
  const isFirstMount = useRef(true);

  // Track page view - فقط اگر از Dialog نیامده باشد
  useEffect(() => {
    // اگر از Dialog آمده باشد، location.state.skipHomePageTracking وجود دارد
    if (!location.state?.skipHomePageTracking) {
      trackEvent(ANALYTICS_EVENTS.VIEW_HOME_PAGE);
    }
  }, [location.state]);

  // مدیریت loading state وقتی select ها تغییر می‌کنند
  useEffect(() => {
    // Skip اولین mount
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    // Clear timeout قبلی اگر وجود داشته باشد
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
    }

    // شروع loading
    setIsLoading(true);

    // بعد از 2 ثانیه loading را تمام کن
    loadingTimeoutRef.current = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Cleanup
    return () => {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, [selectedCity, selectedSpeciality]);

  // تابع scrollToTop با انیمیشن
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // مدیریت تغییرات appointment و ارسال به booking
  const handleAppointmentChange = (data, isSubmit = false) => {
    if (isSubmit && data) {
      // Scroll to top با انیمیشن
      scrollToTop();

      // کمی تاخیر برای نمایش انیمیشن scroll
      setTimeout(() => {
        // ارسال اطلاعات به صفحه booking
        navigate('/booking', {
          state: {
            city: selectedCity.value,
            speciality: selectedSpeciality.value,
            appointment: data,
          },
        });
      }, 200);
    }
  };

  // Structured Data for SEO
  const organizationStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'رحلة الشفا',
    alternateName: 'Alrehleh',
    url: 'https://alrehleh.web.app',
    logo: 'https://alrehleh.web.app/og-image.png',
    description:
      'منصة متخصصة في تنظيم الرحلات العلاجية إلى إيران، تهدف إلى تسهيل حصول المرضى من العراق على أفضل الخدمات الطبية',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'كربلاء',
      addressCountry: 'IQ',
      streetAddress: 'مقر شركة رحلة الشفا، مقابل ساحة الزهراء، شارع الوحدة، مبنى رقم 12',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+964-37-123-4567',
      contactType: 'customer service',
      email: 'info@rehlatshifa.com',
      availableLanguage: ['Arabic', 'Persian'],
    },
    sameAs: ['https://www.facebook.com', 'https://www.instagram.com', 'https://www.youtube.com'],
  };

  const medicalServiceStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: 'رحلة الشفا - خدمات العلاج في إيران',
    description:
      'حجز مواعيد الأطباء والمستشفيات المعتمدة في إيران، مع دعم مترجمين عراقيين ومتابعة كاملة',
    url: 'https://alrehleh.web.app',
    medicalSpecialty: doctors.map((doc) => doc.speciality),
    areaServed: {
      '@type': 'Country',
      name: 'Iraq',
    },
    serviceType: 'Medical Tourism',
  };

  return (
    <Box>
      <SEO
        title="رحلة الشفا - حجز مواعيد العلاج في إيران | منصة العلاج في إيران"
        description="رحلة الشفا منصة متخصصة في تنظيم الرحلات العلاجية إلى إيران. احجز مواعيد الأطباء والمستشفيات المعتمدة بسهولة، اختر باقات الإقامة والنقل، مع دعم مترجمين عراقيين في المستشفيات. العلاج في إيران صار أسهل"
        keywords="العلاج في إيران, حجز موعد طبي, رحلة علاجية, مستشفيات إيران, أطباء إيران, السياحة العلاجية, حجز موعد, مترجم عراقي, رحلة الشفا, alrehleh"
        url="https://alrehleh.web.app/"
      />
      <StructuredData data={organizationStructuredData} />
      <StructuredData data={medicalServiceStructuredData} />
      <Box className={classes.paymentSection}>
        <Box className={classes.paymentContainer}>
          {(isDesktop
            ? PaymentItems.slice(0, 6)
            : [
                ...PaymentItems.slice(0, 6),
                ...PaymentItems.slice(0, 6),
                ...PaymentItems.slice(0, 6),
                ...PaymentItems.slice(0, 6),
              ]
          ).map((item, index) => (
            <Box
              key={index}
              component="img"
              src={item.image}
              alt={item.title}
              className={classes.paymentImage}
            />
          ))}
        </Box>
      </Box>
      <Box className={classes.root}>
        <Box className={classes.layout}>
          <Box className={classes.leftColumn}>
            <Box className={classes.filterRow}>
              <Box className={classes.specialitySelectWrapper}>
                <CustomSelect
                  options={specialityOptions}
                  value={selectedSpeciality}
                  onChange={(selected) => {
                    setSelectedSpeciality(selected);
                    trackEvent(ANALYTICS_EVENTS.CLICK_SPECIALITY_CHANGE, {
                      speciality: selected.value,
                    });
                  }}
                  placeholder="انتخاب التخصص..."
                  icon={monitorIcon}
                />
              </Box>

              <Box className={classes.citySelectWrapper}>
                <CustomSelect
                  options={cityOptions}
                  value={selectedCity}
                  onChange={(selected) => {
                    setSelectedCity(selected);
                    trackEvent(ANALYTICS_EVENTS.CLICK_CITY_CHANGE, {
                      city: selected.value.name,
                    });
                  }}
                  placeholder="انتخاب المدينة..."
                  icon={locationColoredIcon}
                />
              </Box>
            </Box>

            {isLoading ? (
              <Paper className={classes.card}>
                {/* Skeleton برای ردیف اول */}
                <Box className={classes.cardFirstRow}>
                  <Box className={classes.hospitalInfoColumn}>
                    <Skeleton
                      variant="rectangular"
                      width={60}
                      height={60}
                      className={classes.hospitalImage}
                    />
                    <Box className={classes.hospitalTextInfo} sx={{ flex: 1 }}>
                      <Box className={classes.hospitalTitleRow}>
                        <Skeleton variant="text" width="60%" height={30} />
                        <Skeleton variant="text" width={40} height={20} />
                      </Box>
                      <Box className={classes.hospitalLocation}>
                        <Skeleton variant="text" width="100%" height={20} />
                      </Box>
                    </Box>
                  </Box>
                </Box>

                {/* Divider */}
                <Box className={classes.cardDivider} />

                {/* Skeleton برای ردیف دوم */}
                <Box className={classes.cardSecondRow}>
                  {[1, 2, 3, 4].map((item) => (
                    <Box key={item} className={classes.infoRow}>
                      <Skeleton variant="circular" width={16} height={16} />
                      <Skeleton variant="text" width="80%" height={20} />
                    </Box>
                  ))}
                </Box>
              </Paper>
            ) : (
              <Paper className={classes.card}>
                {/* ردیف اول */}
                <Box className={classes.cardFirstRow}>
                  {/* ستون اول: عکس بیمارستان، عنوان و آدرس */}
                  <Box className={classes.hospitalInfoColumn}>
                    <Box
                      component="img"
                      src={selectedCity.value.image}
                      alt="عکس بیمارستان"
                      className={classes.hospitalImage}
                    />
                    <Box className={classes.hospitalTextInfo}>
                      <Box className={classes.hospitalTitleRow}>
                        <Typography variant="h6" className={classes.hospitalTitle}>
                          {selectedCity.value.hospital}
                        </Typography>
                        <Box className={classes.ratingBox}>
                          <StarRoundedIcon className={classes.starIcon} />
                          <Typography variant="body1" className={classes.ratingText}>
                            4/5
                          </Typography>
                        </Box>
                      </Box>
                      <Box className={classes.hospitalLocation}>
                        <Box
                          component="img"
                          src={locationColoredIcon}
                          alt="موقعیت"
                          className={classes.locationIcon}
                        />
                        <Typography variant="body2" className={classes.hospitalAddress}>
                          {selectedCity.value.address}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>

                {/* Divider */}
                <Box className={classes.cardDivider} />

                {/* ردیف دوم */}
                <Box className={classes.cardSecondRow}>
                  {/* ردیف 1: تخصص */}
                  <Box className={classes.infoRow}>
                    <Box
                      component="img"
                      src={monitorIcon}
                      alt="تخصص"
                      className={classes.infoRowIcon}
                    />
                    <Box className={classes.infoTextWithTick}>
                      <Typography variant="body2" className={classes.infoRowText}>
                        {selectedSpeciality.value}: موجود
                      </Typography>
                      <Box
                        component="img"
                        src={tickCircleIcon}
                        alt="موجود"
                        className={classes.tickIcon}
                      />
                    </Box>
                  </Box>

                  {/* ردیف 2: مترجم */}
                  <Box className={classes.infoRow}>
                    <Box
                      component="img"
                      src={translateIcon}
                      alt="مترجم"
                      className={classes.infoRowIcon}
                    />
                    <Box className={classes.infoTextWithTick}>
                      <Typography variant="body2" className={classes.infoRowText}>
                        مترجم و مرشد عراقي في المستشفى: متوفر
                      </Typography>
                      <Box
                        component="img"
                        src={tickCircleIcon}
                        alt="متوفر"
                        className={classes.tickIcon}
                      />
                    </Box>
                  </Box>

                  {/* ردیف 3: واتساپ */}
                  <Box className={classes.infoRow}>
                    <Box
                      component="img"
                      src={callBlackIcon}
                      alt="الحجز"
                      className={classes.infoRowIcon}
                    />
                    <Typography variant="body2" className={classes.infoRowText}>
                      الحجز عبر واتساب:
                    </Typography>
                    <Box
                      component="a"
                      href="http://wa.me/989125056099"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={classes.whatsappBox}
                      onClick={() => trackEvent(ANALYTICS_EVENTS.CLICK_WHATSAPP_HOSPITAL_CARD)}
                    >
                      <Box
                        component="img"
                        src={whatsappIcon}
                        alt="واتساپ"
                        className={classes.whatsappIcon}
                      />
                      <Typography variant="body2" className={classes.whatsappNumber}>
                        <span dir="ltr">0098 912 505 6099</span>
                      </Typography>
                    </Box>
                  </Box>

                  {/* ردیف 4: تعداد بیماران */}
                  <Box className={classes.infoRow}>
                    <Box
                      component="img"
                      src={userTickIcon}
                      alt="بیماران"
                      className={classes.infoRowIcon}
                    />
                    <Box className={classes.infoTextWithTick}>
                      <Typography variant="body2" className={classes.infoRowText}>
                        عدد الزوار من رحله الشفا: {selectedCity.value.patientsCount} حتى الآن
                      </Typography>
                      <Box
                        component="img"
                        src={tickCircleIcon}
                        alt="تایید"
                        className={classes.tickIcon}
                      />
                    </Box>
                  </Box>
                </Box>
              </Paper>
            )}

            {/* بخش انتخاب موعد */}
            {isLoading ? (
              <Paper className={classes.appointmentSkeleton}>
                <Skeleton variant="text" width="40%" height={30} sx={{ mb: 2 }} />

                {/* Skeleton برای دو باکس انتخاب */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 2 }}>
                  {[1, 2].map((item) => (
                    <Box key={item} sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
                      <Skeleton variant="circular" width={28} height={28} />
                      <Box sx={{ flex: 1 }}>
                        <Skeleton variant="text" width="70%" height={20} />
                        <Skeleton variant="text" width="50%" height={16} />
                      </Box>
                    </Box>
                  ))}
                </Box>

                {/* Skeleton برای روزها */}
                <Box sx={{ display: 'flex', gap: 1, mb: 2, overflow: 'hidden' }}>
                  {[1, 2, 3, 4, 5].map((item) => (
                    <Skeleton
                      key={item}
                      variant="rectangular"
                      width={60}
                      height={80}
                      sx={{ borderRadius: '12px' }}
                    />
                  ))}
                </Box>

                {/* Skeleton برای تب‌ها */}
                <Box sx={{ display: 'flex', gap: 1, mb: 1.5 }}>
                  <Skeleton variant="text" width="50%" height={40} />
                  <Skeleton variant="text" width="50%" height={40} />
                </Box>

                {/* Skeleton برای ساعات */}
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, mb: 2 }}>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                    <Skeleton
                      key={item}
                      variant="rectangular"
                      height={40}
                      sx={{ borderRadius: '8px' }}
                    />
                  ))}
                </Box>

                {/* Skeleton برای دکمه */}
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={50}
                  sx={{ borderRadius: '10px', mt: 2 }}
                />
              </Paper>
            ) : (
              <Appointment onAppointmentChange={handleAppointmentChange} />
            )}
          </Box>

          {!isMobile && <MapSection selectedCity={selectedCity} />}
        </Box>
      </Box>

      <CommentSection />

      <Footer />
    </Box>
  );
}
