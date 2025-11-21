// تبدیل ماه‌ها به عربی
export const getArabicMonthName = (monthIndex) => {
  const months = [
    'يناير', // January (0)
    'فبراير', // February (1)
    'مارس', // March (2)
    'أبريل', // April (3)
    'مايو', // May (4)
    'يونيو', // June (5)
    'يوليو', // July (6)
    'أغسطس', // August (7)
    'سبتمبر', // September (8)
    'أكتوبر', // October (9)
    'نوفمبر', // November (10)
    'ديسمبر', // December (11)
  ];
  return months[monthIndex] || '';
};

// تبدیل روزهای هفته به عربی
export const getArabicDayName = (dayIndex) => {
  const days = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
  return days[dayIndex] || '';
};

// دریافت نام روز هفته امروز
export const getTodayArabicDayName = () => {
  const today = new Date().getDay();
  return getArabicDayName(today);
};

