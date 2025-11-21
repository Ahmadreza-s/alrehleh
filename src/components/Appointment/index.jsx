import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import tickCircleIcon from '@/assets/images/icons/tick-circle.png';
import { getArabicDayName, getArabicMonthName } from '@/utils/translator';
import useStyles from './styles';

export default function Appointment() {
  const classes = useStyles();
  const [selectedAppointment, setSelectedAppointment] = useState('other'); // 'today' or 'other'
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [isDaysListVisible, setIsDaysListVisible] = useState(false);

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

  // تولید لیست روزها (امروز + 19 روز آینده = 20 روز)
  const getDaysList = () => {
    const days = [];
    const today = new Date();

    for (let i = 0; i < 20; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push({
        date: date.getDate(), // عدد روز
        dayIndex: date.getDay(), // ایندکس روز هفته (0-6)
        monthIndex: date.getMonth(), // ایندکس ماه (0-11)
        isToday: i === 0,
      });
    }

    return days;
  };

  const daysList = getDaysList();

  // انیمیشن ورود لیست روزها
  useEffect(() => {
    if (selectedAppointment === 'other') {
      setIsDaysListVisible(true);
    } else {
      setIsDaysListVisible(false);
    }
  }, [selectedAppointment]);

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
                {getTodayDate()} - الساعة ١٢:٠٠
              </Typography>
            </Box>
          </Box>

          {/* باکس دوم: اختر موعدًا آخر */}
          <Box
            className={classes.appointmentBox}
            onClick={() => setSelectedAppointment('other')}
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
            {daysList.map((day, index) => (
              <Box
                key={index}
                className={`${classes.dayCard} ${
                  selectedDateIndex === index ? classes.dayCardSelected : ''
                }`}
                onClick={() => setSelectedDateIndex(index)}
                style={{ cursor: 'pointer' }}
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
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}

