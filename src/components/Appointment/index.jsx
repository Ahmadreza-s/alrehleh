import { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import { useTheme, useMediaQuery } from '@mui/material';
import tickCircleIcon from '@/assets/images/icons/tick-circle.png';
import { getArabicDayName, getArabicMonthName } from '@/utils/translator';
import { trackEvent, ANALYTICS_EVENTS } from '@/utils/analytics';
import useStyles from './styles';

export default function Appointment({ onAppointmentChange }) {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const buttonRef = useRef(null);
  const buttonOriginalBottomRef = useRef(0);
  const [isButtonSticky, setIsButtonSticky] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState('other'); // 'today' or 'other'
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [isDaysListVisible, setIsDaysListVisible] = useState(false);
  const [selectedTimePeriod, setSelectedTimePeriod] = useState('صباح'); // 'صباح' or 'عصر'
  const [selectedTime, setSelectedTime] = useState(null);
  const [isLoadingTimes, setIsLoadingTimes] = useState(false);
  const loadingTimesTimeoutRef = useRef(null);
  const isFirstDateSelection = useRef(true);

  // دریافت روز هفته به عربی
  const getTodayArabicDayName = () => {
    const today = new Date().getDay();
    return getArabicDayName(today);
  };

  // دریافت تاریخ امروز به عربی
  const getTodayDate = () => {
    const dayName = getTodayArabicDayName();
    return `اليوم (${dayName})`;
  };

  // بررسی اینکه آیا یک تاریخ گذشته است یا نه
  const isDatePast = (dateIndex) => {
    if (dateIndex === 0) return false; // امروز نمی‌تواند گذشته باشد
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + dateIndex);
    return targetDate < today;
  };

  // بررسی اینکه آیا یک ساعت برای یک تاریخ خاص گذشته است یا نه
  const isTimePast = (dateIndex, timeString) => {
    const now = new Date();
    const targetDate = new Date(now);
    targetDate.setDate(now.getDate() + dateIndex);

    const [hours, minutes] = timeString.split(':').map(Number);
    targetDate.setHours(hours, minutes, 0, 0);

    return targetDate < now;
  };

  // پیدا کردن نزدیک‌ترین ساعت ممکن برای امروز
  const getNearestAvailableTime = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    // لیست ساعات الصباح
    const morningSlots = ['08:00', '09:00', '10:00', '11:00', '12:00'];
    // لیست ساعات العصر
    const afternoonSlots = ['13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];

    // بررسی ساعات الصباح
    for (const slot of morningSlots) {
      const [hours] = slot.split(':').map(Number);
      // اگر ساعت بیشتر از ساعت فعلی باشد یا اگر همان ساعت باشد و کمتر از 30 دقیقه گذشته باشد
      if (hours > currentHour || (hours === currentHour && currentMinute < 30)) {
        return { time: slot, period: 'صباح' };
      }
    }

    // اگر ساعات الصباح گذشته، بررسی ساعات العصر
    for (const slot of afternoonSlots) {
      const [hours] = slot.split(':').map(Number);
      if (hours > currentHour || (hours === currentHour && currentMinute < 30)) {
        return { time: slot, period: 'عصر' };
      }
    }

    // اگر همه ساعات امروز گذشته، اولین ساعت فردا را برگردان
    return { time: '08:00', period: 'صباح', isTomorrow: true };
  };

  // تولید لیست روزها (امروز + روزهای آینده)
  const getDaysList = () => {
    const days = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 20; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push({
        date: date.getDate(), // عدد روز
        dayIndex: date.getDay(), // ایندکس روز هفته (0-6)
        monthIndex: date.getMonth(), // ایندکس ماه (0-11)
        isToday: i === 0,
        dateIndex: i,
      });
    }

    return days;
  };

  const daysList = getDaysList();

  // تابع برای ساخت اطلاعات انتخاب شده
  const getAppointmentData = () => {
    if (selectedAppointment === 'today') {
      const nearest = getNearestAvailableTime();
      const today = new Date();
      return {
        type: 'today',
        date: today,
        dateIndex: 0,
        time: nearest.time,
        period: nearest.period,
        isTomorrow: nearest.isTomorrow || false,
      };
    } else {
      const selectedDay = daysList[selectedDateIndex];
      if (!selectedDay || !selectedTime) return null;

      const selectedDate = new Date();
      selectedDate.setDate(selectedDate.getDate() + selectedDay.dateIndex);

      return {
        type: 'other',
        date: selectedDate,
        dateIndex: selectedDay.dateIndex,
        day: selectedDay.date,
        dayName: selectedDay.isToday ? 'اليوم' : getArabicDayName(selectedDay.dayIndex),
        monthName: getArabicMonthName(selectedDay.monthIndex),
        time: selectedTime,
        period: selectedTimePeriod,
      };
    }
  };

  // فیلتر کردن ساعات بر اساس روز انتخاب شده
  const getAvailableTimes = (period) => {
    const allMorningSlots = ['08:00', '09:00', '10:00', '11:00', '12:00'];
    const allAfternoonSlots = [
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
      '19:00',
      '20:00',
    ];

    // اگر امروز انتخاب شده، فقط ساعات آینده را نمایش بده
    if (selectedDateIndex === 0) {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();

      if (period === 'صباح') {
        return allMorningSlots.filter((slot) => {
          const [hours] = slot.split(':').map(Number);
          return hours > currentHour || (hours === currentHour && currentMinute < 30);
        });
      } else {
        return allAfternoonSlots.filter((slot) => {
          const [hours] = slot.split(':').map(Number);
          return hours > currentHour || (hours === currentHour && currentMinute < 30);
        });
      }
    } else {
      // برای روزهای آینده، همه ساعات در دسترس هستند
      return period === 'صباح' ? allMorningSlots : allAfternoonSlots;
    }
  };

  // انیمیشن ورود لیست روزها
  useEffect(() => {
    if (selectedAppointment === 'other') {
      setIsDaysListVisible(true);
      // Reset first date selection flag
      isFirstDateSelection.current = true;
      // وقتی به "روزهای آینده" تغییر می‌دهد، اولین روز غیرگذشته را انتخاب کن
      const firstAvailableIndex = daysList.findIndex((day) => !isDatePast(day.dateIndex));
      if (firstAvailableIndex !== -1) {
        setSelectedDateIndex(firstAvailableIndex);
      }
    } else {
      setIsDaysListVisible(false);
      // وقتی "امروز" انتخاب می‌شود، نزدیک‌ترین ساعت را تنظیم کن
      const nearest = getNearestAvailableTime();
      setSelectedTimePeriod(nearest.period);
      setSelectedTime(nearest.time);
    }
  }, [selectedAppointment]);

  // وقتی روز تغییر می‌کند، ساعت را ریست کن و loading نمایش بده
  useEffect(() => {
    if (selectedAppointment === 'other') {
      setSelectedTime(null);

      // اگر روز انتخاب شده گذشته است، اولین روز غیرگذشته را انتخاب کن
      if (isDatePast(selectedDateIndex)) {
        const firstAvailableIndex = daysList.findIndex((day) => !isDatePast(day.dateIndex));
        if (firstAvailableIndex !== -1) {
          setSelectedDateIndex(firstAvailableIndex);
        }
        return;
      }

      // Skip اولین انتخاب روز
      if (isFirstDateSelection.current) {
        isFirstDateSelection.current = false;
        return;
      }

      // فعال کردن loading
      setIsLoadingTimes(true);

      // Clear timeout قبلی اگر وجود داشته باشد
      if (loadingTimesTimeoutRef.current) {
        clearTimeout(loadingTimesTimeoutRef.current);
      }

      // بعد از 1 ثانیه loading را تمام کن
      loadingTimesTimeoutRef.current = setTimeout(() => {
        setIsLoadingTimes(false);
      }, 1000);

      // Cleanup
      return () => {
        if (loadingTimesTimeoutRef.current) {
          clearTimeout(loadingTimesTimeoutRef.current);
        }
      };
    }
  }, [selectedDateIndex, selectedAppointment]);

  // وقتی دوره زمانی تغییر می‌کند، ساعت را ریست کن
  useEffect(() => {
    setSelectedTime(null);
  }, [selectedTimePeriod]);

  // ارسال اطلاعات به parent هر زمان که تغییر کند
  useEffect(() => {
    if (onAppointmentChange) {
      const data = getAppointmentData();
      onAppointmentChange(data);
    }
  }, [selectedAppointment, selectedDateIndex, selectedTime, selectedTimePeriod]);

  // مدیریت sticky button برای موبایل
  useEffect(() => {
    if (!isMobile || !buttonRef.current) return;

    const buttonElement = buttonRef.current;

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const currentScrollBottom = scrollTop + window.innerHeight;
      const rect = buttonElement.getBoundingClientRect();

      // اگر دکمه در viewport است
      if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        // موقعیت اصلی را به‌روزرسانی کن
        buttonOriginalBottomRef.current = rect.bottom + scrollTop;
        setIsButtonSticky(false);
        return;
      }

      // اگر دکمه از بالا خارج شده (از بالای صفحه رد شده)
      if (rect.bottom < 0) {
        setIsButtonSticky(false);
        return;
      }

      // اگر دکمه از پایین viewport خارج شده
      if (rect.top > window.innerHeight) {
        // بررسی کن آیا از محل اصلی دکمه به پایین گذشته‌ایم
        if (currentScrollBottom >= buttonOriginalBottomRef.current) {
          // از محل اصلی دکمه گذشته‌ایم -> sticky نشود
          setIsButtonSticky(false);
        } else {
          // هنوز به محل دکمه نرسیده‌ایم -> sticky شود
          setIsButtonSticky(true);
        }
      }
    };

    // IntersectionObserver برای تشخیص سریع‌تر
    const observer = new IntersectionObserver(
      () => {
        handleScroll();
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0,
      },
    );

    observer.observe(buttonElement);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // یکبار برای تنظیم موقعیت اولیه
    const initialRect = buttonElement.getBoundingClientRect();
    const initialScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    buttonOriginalBottomRef.current = initialRect.bottom + initialScrollTop;
    handleScroll();

    return () => {
      observer.unobserve(buttonElement);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile]);

  return (
    <Box className={classes.appointmentContainer}>
      {/* بخش انتخاب موعد */}
      <Box className={classes.appointmentSection}>
        <Typography variant="body1" className={classes.appointmentTitle}>
          اختر موعدك
        </Typography>

        <Box className={classes.appointmentOptions}>
          {/* باکس اول: أقرب موعد */}
          <Box
            className={classes.appointmentBox}
            onClick={() => setSelectedAppointment('today')}
            style={{ cursor: 'pointer' }}
          >
            {selectedAppointment === 'today' ? (
              <Box
                component="img"
                src={tickCircleIcon}
                alt="محدد"
                className={classes.appointmentCheckIcon}
              />
            ) : (
              <Box className={classes.appointmentEmptyCircle}></Box>
            )}
            <Box className={classes.appointmentBoxContent}>
              <Typography variant="body2" className={classes.appointmentBoxTitle}>
                أقرب موعد متاح للحجز
              </Typography>
              <Typography variant="body2" className={classes.appointmentBoxDetails}>
                {(() => {
                  const nearest = getNearestAvailableTime();
                  if (nearest.isTomorrow) {
                    return 'غداً - الساعة ٠٨:٠٠';
                  }
                  return `${getTodayDate()} - الساعة ${nearest.time.replace(':', ':')}`;
                })()}
              </Typography>
            </Box>
          </Box>

          {/* باکس دوم: اختر موعدًا آخر */}
          <Box
            className={classes.appointmentBox}
            onClick={() => {
              setSelectedAppointment('other');
              trackEvent(ANALYTICS_EVENTS.CLICK_OTHER_TIME);
            }}
            style={{ cursor: 'pointer' }}
          >
            {selectedAppointment === 'other' ? (
              <Box
                component="img"
                src={tickCircleIcon}
                alt="محدد"
                className={classes.appointmentCheckIcon}
              />
            ) : (
              <Box className={classes.appointmentEmptyCircle}></Box>
            )}
            <Box className={classes.appointmentBoxContent}>
              <Typography variant="body2" className={classes.appointmentBoxTitle}>
                اختر موعدًا آخر
              </Typography>
              <Typography variant="body2" className={classes.appointmentBoxDetails}>
                لأيام أخرى
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* بخش نمایش روزها - فقط وقتی باکس دوم انتخاب شده باشد */}
      {selectedAppointment === 'other' && (
        <Box
          className={`${classes.daysSection} ${
            isDaysListVisible ? classes.daysSectionVisible : ''
          }`}
        >
          <Box className={classes.daysList}>
            {daysList.map((day, index) => {
              const isPast = isDatePast(day.dateIndex);
              return (
                <Box
                  key={index}
                  className={`${classes.dayCard} ${
                    selectedDateIndex === index ? classes.dayCardSelected : ''
                  } ${isPast ? classes.dayCardDisabled : ''}`}
                  onClick={() => {
                    if (!isPast) {
                      setSelectedDateIndex(index);
                    }
                  }}
                  style={{ cursor: isPast ? 'not-allowed' : 'pointer', opacity: isPast ? 0.5 : 1 }}
                >
                  <Typography variant="body2" className={classes.dayCardDayName}>
                    {day.isToday ? 'اليوم' : getArabicDayName(day.dayIndex)}
                  </Typography>
                  <Typography variant="h6" className={classes.dayCardDate}>
                    {day.date}
                  </Typography>
                  <Typography variant="body2" className={classes.dayCardMonth}>
                    {getArabicMonthName(day.monthIndex)}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Box>
      )}

      {/* بخش انتخاب ساعت - فقط وقتی روز انتخاب شده باشد */}
      {selectedAppointment === 'other' && (
        <Box className={classes.timeSection}>
          {/* تب‌های الصباح و العصر */}
          <Box className={classes.timeTabs}>
            <Box
              className={`${classes.timeTab} ${
                selectedTimePeriod === 'صباح' ? classes.timeTabActive : ''
              }`}
              onClick={() => {
                setSelectedTimePeriod('صباح');
                setSelectedTime(null);
              }}
              style={{ cursor: 'pointer' }}
            >
              <Typography variant="body2" className={classes.timeTabText}>
                الصباح
              </Typography>
            </Box>
            <Box
              className={`${classes.timeTab} ${
                selectedTimePeriod === 'عصر' ? classes.timeTabActive : ''
              }`}
              onClick={() => {
                setSelectedTimePeriod('عصر');
                setSelectedTime(null);
              }}
              style={{ cursor: 'pointer' }}
            >
              <Typography variant="body2" className={classes.timeTabText}>
                العصر
              </Typography>
            </Box>
          </Box>

          {/* لیست ساعات */}
          <Box className={classes.timeSlotsContainer}>
            {isLoadingTimes ? (
              <Box className={classes.timeSlotsGrid}>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                  <Skeleton
                    key={item}
                    variant="rectangular"
                    height={40}
                    sx={{ borderRadius: '8px' }}
                  />
                ))}
              </Box>
            ) : (
              (() => {
                const availableTimes = getAvailableTimes(selectedTimePeriod);

                if (availableTimes.length === 0) {
                  return (
                    <Typography
                      variant="body2"
                      style={{ textAlign: 'center', color: '#7b7b7b', padding: '16px' }}
                    >
                      لا توجد أوقات متاحة في هذا الفترة
                    </Typography>
                  );
                }

                return (
                  <Box className={classes.timeSlotsGrid}>
                    {availableTimes.map((time) => {
                      const dateIndex = daysList[selectedDateIndex]?.dateIndex || 0;
                      const isPast = isTimePast(dateIndex, time);

                      return (
                        <Box
                          key={time}
                          className={`${classes.timeSlot} ${
                            selectedTime === time ? classes.timeSlotActive : ''
                          } ${isPast ? classes.timeSlotDisabled : ''}`}
                          onClick={() => {
                            if (!isPast) {
                              setSelectedTime(time);
                            }
                          }}
                          style={{
                            cursor: isPast ? 'not-allowed' : 'pointer',
                            opacity: isPast ? 0.5 : 1,
                          }}
                        >
                          <Typography variant="body2" className={classes.timeSlotText}>
                            {time}
                          </Typography>
                        </Box>
                      );
                    })}
                  </Box>
                );
              })()
            )}
          </Box>
        </Box>
      )}

      {/* دکمه Submit */}
      <Box ref={buttonRef} className={classes.submitButtonContainer}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          disabled={selectedAppointment === 'other' && !selectedTime}
          onClick={() => {
            const data = getAppointmentData();
            if (onAppointmentChange && data) {
              // Track event based on selected appointment type
              if (selectedAppointment === 'today') {
                trackEvent(ANALYTICS_EVENTS.CLICK_CONTINUE_NEAREST_TIME);
              } else {
                trackEvent(ANALYTICS_EVENTS.CLICK_CONTINUE_CHOOSE_LATER);
              }
              onAppointmentChange(data, true); // true = isSubmit
            }
          }}
        >
          متابعة
        </Button>
      </Box>

      {/* دکمه Fixed برای موبایل */}
      {isButtonSticky && isMobile && (
        <Box className={classes.submitButtonFixed}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            disabled={selectedAppointment === 'other' && !selectedTime}
            onClick={() => {
              const data = getAppointmentData();
              if (onAppointmentChange && data) {
                // Track event based on selected appointment type
                if (selectedAppointment === 'today') {
                  trackEvent(ANALYTICS_EVENTS.CLICK_CONTINUE_NEAREST_TIME);
                } else {
                  trackEvent(ANALYTICS_EVENTS.CLICK_CONTINUE_CHOOSE_LATER);
                }
                onAppointmentChange(data, true); // true = isSubmit
              }
            }}
          >
            متابعة
          </Button>
        </Box>
      )}
    </Box>
  );
}
