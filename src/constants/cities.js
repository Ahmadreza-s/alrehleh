import miladHospitalImage from '@/assets/images/hospitals/milad.png';
import tabrizHospitalImage from '@/assets/images/hospitals/tabriz.png';
import urumiaHospitalImage from '@/assets/images/hospitals/urumia.png';
import isfahanHospitalImage from '@/assets/images/hospitals/isfahan.png';
import shirazHospitalImage from '@/assets/images/hospitals/shiraz.png';
import yazdHospitalImage from '@/assets/images/hospitals/yazd.png';
import mashhadHospitalImage from '@/assets/images/hospitals/mashhad.png';
import abadanHospitalImage from '@/assets/images/hospitals/abadan.png';
import mahshahrHospitalImage from '@/assets/images/hospitals/mahshahr.png';
import ahwazHospitalImage from '@/assets/images/hospitals/ahwaz.png';
import susangerdHospitalImage from '@/assets/images/hospitals/susangerd.png';
import dezfulHospitalImage from '@/assets/images/hospitals/dezful.png';
import khoramabadHospitalImage from '@/assets/images/hospitals/khoramabad.png';
import ilamHospitalImage from '@/assets/images/hospitals/ilam.png';
import kermanshahHospitalImage from '@/assets/images/hospitals/kermanshah.png';
import andimeshkHospitalImage from '@/assets/images/hospitals/andimeshk.png';

export const cities = [
  {
    name: 'طهران',
    lat: 35.74556,
    long: 51.38111,
    hospital: 'مستشفى ميلاد',
    address: 'طهران – طريق همت السريع، مخرج خاص برج ميلاد - مستشفى ميلاد التخصصي',
    translator: 'مدخل مبنى المستشفى – بوابة الحراسة',
    tell: '0098 - 2184090',
    patientsCount: 576,
    image: miladHospitalImage,
    gmapUrl:
      'https://www.google.com/maps/dir//Tehran%D8%8C+%D8%A7%D8%B3%D8%AA%D8%A7%D9%86+%D8%AA%D9%87%D8%B1%D8%A7%D9%86+%D8%AA%D9%87%D8%B1%D8%A7%D9%86+%D8%A7%D8%AA%D9%88%D8%A8%D8%A7%D9%86+%D9%87%D9%85%D8%AA+%D8%AE%D8%B1%D9%88%D8%AC%DB%8C+%D8%A7%D8%AE%D8%AA%D8%B5%D8%A7%D8%B5%DB%8C+%D8%A8%D8%B1%D8%AC+%D9%88+%D8%A8%DB%8C%D9%85%D8%A7%D8%B1%D8%B3%D8%AA%D8%A7%D9%86+%D9%85%DB%8C%D9%84%D8%A7%D8%AF%D8%8C+P9WJ%2B6HH%E2%80%AD/@35.7455369,51.2990968,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3f8e0719694e4b75:0x46a536ae2e926588!2m2!1d51.3814979!2d35.745565?entry=ttu&g_ep=EgoyMDI1MTEwNS4wIKXMDSoASAFQAw%3D%3D',
  },
  {
    name: 'تبريز',
    lat: 38.056,
    long: 46.303,
    hospital: 'مستشفى شهداء تبريز',
    address: 'تبريز – شارع ائل گلي، منطقة گلشهر - مستشفى شهداء تبريز التخصصي',
    translator: 'مدخل مبنى المستشفى – مكتب المعلومات',
    tell: '0098 - 4133893336',
    patientsCount: 653,
    image: tabrizHospitalImage,
    gmapUrl:
      'https://www.google.com/maps/reviews/@38.0344463,46.3637885,17z/data=!4m6!14m5!1m4!2m3!1sChdDSUhNMG9nS0VJQ0FnSUNYd3IyZmtBRRAB!2m1!1s0x0:0xa35c2ea708e436f0?hl=en-GB&entry=ttu&g_ep=EgoyMDI1MTEwNS4wIKXMDSoASAFQAw%3D%3D',
  },
  {
    name: 'أورمية',
    lat: 37.554,
    long: 45.067,
    hospital: 'مستشفى الدكتور صولتي',
    address: 'أورميه – شارع الإمام، قريب من مركز المدينة - مستشفى الدكتور صولتي التخصصي',
    translator: 'مدخل المبنى – جنب الصيدلية',
    tell: '0098 - 4432222525',
    patientsCount: 214,
    image: urumiaHospitalImage,
    gmapUrl:
      'https://www.google.com/maps/place/Dr.+Soulati+Hosptial/@37.5453234,45.0642036,17z/data=!3m1!4b1!4m6!3m5!1s0x40055372bede8617:0xc45d27ab97982c2d!8m2!3d37.5453192!4d45.0667785!16s%2Fg%2F1hf43xhh3?hl=en-GB&entry=ttu&g_ep=EgoyMDI1MTEwNS4wIKXMDSoASAFQAw%3D%3D',
  },
  {
    name: 'أصفهان',
    lat: 32.612322,
    long: 51.650327,
    hospital: 'مستشفى العائلة',
    address: 'أصفهان – شارع شهداء صفه - مستشفى العائلة التخصصي',
    translator: 'الباب الشرقي للمبنى – جنب قسم الأشعة (راديولوجي)',
    tell: '0098 - 5136668888',
    patientsCount: 349,
    image: isfahanHospitalImage,
    gmapUrl:
      'https://www.google.com/maps?ll=32.612322,51.650327&z=14&t=m&hl=fa&gl=US&mapclient=embed&cid=1552196225482340956',
  },
  {
    name: 'شيراز',
    lat: 29.6267718,
    long: 52.5291898,
    hospital: 'مستشفى الشهيد فقيهي',
    address: 'شيراز – شارع كريم خان زند، يم كلية الطب - مستشفى الشهيد فقيهي التخصصي',
    translator: 'مدخل المبنى – مكتب استقبال المرضى',
    tell: '0098 -3136201392',
    patientsCount: 881,
    image: shirazHospitalImage,
    gmapUrl:
      'https://www.google.com/maps/place/%D8%A8%DB%8C%D9%85%D8%A7%D8%B1%D8%B3%D8%AA%D8%A7%D9%86+%D8%B4%D9%87%DB%8C%D8%AF+%D9%81%D9%82%DB%8C%D9%87%DB%8C+(%D8%B3%D8%B9%D8%AF%DB%8C)%E2%80%AD/@29.6267764,52.5317647,17z/data=!3m1!4b1!4m6!3m5!1s0x3fb21277aa5beda5:0x2b20917b1b481a48!8m2!3d29.6267718!4d52.5291898!16s%2Fg%2F1hh_qtlf8?hl=fa&entry=ttu&g_ep=EgoyMDI1MTEwNS4wIKXMDSoASAFQAw%3D%3D',
  },
  {
    name: 'يزد',
    lat: 31.88635,
    long: 54.3604,
    hospital: 'مستشفى الشهيد رهنمون (فرخي)',
    address: 'يزد – شارع فرخي، ساحة الحرية (ميدان آزادي) -  مستشفى الشهيد الدكتور رهنمون التخصصي',
    translator: 'مدخل المبنى – جنب الصيدلية',
    tell: '0098 - 7132351087',
    patientsCount: 591,
    image: yazdHospitalImage,
    gmapUrl:
      'https://www.google.com/maps/place/%D8%A8%DB%8C%D9%85%D8%A7%D8%B1%D8%B3%D8%AA%D8%A7%D9%86+%D8%B4%D9%87%D9%8A%D8%AF+%D8%B1%D9%87%D9%86%D9%85%D9%88%D9%86%E2%80%AD/@31.8862267,54.3626138,17z/data=!3m1!4b1!4m6!3m5!1s0x3fa6199afbbc5ef5:0x4035a622a791cb9c!8m2!3d31.8862222!4d54.3600389!16s%2Fg%2F1tm112jt?hl=fa&entry=ttu&g_ep=EgoyMDI1MTEwNS4wIKXMDSoASAFQAw%3D%3D',
  },
  {
    name: 'مشهد',
    lat: 36.3549,
    long: 59.5479,
    hospital: 'مستشفى رضوي',
    address: 'مشهد – طريق النبي الأعظم، بعد جسر قائم - مستشفى رضوي التخصصي',
    translator: 'مدخل مبنى المستشفى – بوابة الحراسة',
    tell: '0098 - 3536260001',
    patientsCount: 1108,
    image: mashhadHospitalImage,
    gmapUrl:
      'https://www.google.com/maps/place/%D8%A8%DB%8C%D9%85%D8%A7%D8%B1%D8%B3%D8%AA%D8%A7%D9%86+%D8%B1%D8%B6%D9%88%DB%8C%E2%80%AD/@36.3550966,59.5507797,17z/data=!3m1!4b1!4m6!3m5!1s0x3f6c8de9e3bde0c7:0x780d7891ac3187e5!8m2!3d36.3550923!4d59.5482048!16s%2Fg%2F11cl7ddmkq?hl=fa&entry=ttu&g_ep=EgoyMDI1MTEwNS4wIKXMDSoASAFQAw%3D%3D',
  },
  {
    name: 'آبادان',
    lat: 30.33667151,
    long: 48.28036427,
    hospital: 'مستشفى الإمام الخميني (رض)',
    address:
      'مدينة عبادان - سيكلين - بجانب المصفاة - شارع منتظري - رقم 671 - مستشفى الامام الخميني (رض): صناعة النفط عبادان سابقا',
    translator: 'مدخل مبنى المستشفى – بوابة الحراسة',
    tell: '0098 - 6153226811',
    patientsCount: 3017,
    image: abadanHospitalImage,
    gmapUrl: 'https://maps.app.goo.gl/kp5wf7FHp9BuDD127',
  },
  {
    name: 'بندرماهشهر',
    lat: 30.57397909,
    long: 49.18973927,
    hospital: 'مستشفى الإمام موسى الكاظم (ع)',
    address:
      'ماهشهر، شارع الخليج الفارسي، مقابل جامعة آزاد الإسلامية، مستشفى الإمام موسى الكاظم (ع)',
    translator: 'مدخل المبنى – جنب الصيدلية',
    tell: '0098 - 6152356031',
    patientsCount: 3007,
    image: mahshahrHospitalImage,
    gmapUrl: 'https://maps.app.goo.gl/7ew6MWPyA5qKTJUp6',
  },
  {
    name: 'الأهواز',
    lat: 31.32690024,
    long: 48.68395883,
    hospital: 'مستشفى الشهيد رجائي',
    address: 'الأهواز - شارع آزادكان - شارع الشهيد رستكاري - مستشفى الشهيد رجائي',
    translator: 'الباب الشرقي للمبنى – جنب قسم الأشعة (راديولوجي)',
    tell: '0098 -6132225520',
    patientsCount: 4701,
    image: ahwazHospitalImage,
    gmapUrl: 'https://maps.app.goo.gl/n8iDQJuGHi44QJFs6',
  },
  {
    name: 'سوسنجرد',
    lat: 31.56108069,
    long: 48.189926,
    hospital: 'مستشفى الشهيد شمران',
    address: 'سوسنجرد، شارع الامام الخميني، مستشفى الشهيد جمران، دشت ازاديكان',
    translator: 'مدخل المبنى – مكتب استقبال المرضى',
    tell: '0098 - 6136746275',
    patientsCount: 2369,
    image: susangerdHospitalImage,
    gmapUrl: 'https://maps.app.goo.gl/2bCj7MXhyoVCndq57',
  },
  {
    name: 'دزفول',
    lat: 32.398139,
    long: 48.38320367,
    hospital: 'مستشفى جانجفيان',
    address: 'دزفول - بداية طريق دزفول-أنديمشك، مقابل اللواء المدرع 292',
    translator: 'الباب الشرقي للمبنى – جنب قسم الأشعة (راديولوجي)',
    tell: '0098 - 6142422040',
    patientsCount: 1329,
    image: dezfulHospitalImage,
    gmapUrl: 'https://maps.app.goo.gl/gu8StMGM1HGTDyo36',
  },
  {
    name: 'خرم آباد',
    lat: 33.49899356,
    long: 48.37095884,
    hospital: 'مستشفى شفا',
    address: 'خرم آباد - زقاق ارتيش - شارع بيروزي',
    translator: 'مدخل المبنى – مكتب استقبال المرضى',
    tell: '0098 - 6633265020',
    patientsCount: 945,
    image: khoramabadHospitalImage,
    gmapUrl: 'https://maps.app.goo.gl/5cucDK4R4mCegi8PA',
  },
  {
    name: 'ايلام',
    lat: 33.63741393,
    long: 46.42198913,
    hospital: 'مستشفى الإمام الخميني (رض)',
    address: 'ايلام شارع اية الله حيدري مستشفى الامام الخميني (رض)',
    translator: 'مدخل مبنى المستشفى – بوابة الحراسة',
    tell: '0098 - 8433338255',
    patientsCount: 3364,
    image: ilamHospitalImage,
    gmapUrl: 'https://maps.app.goo.gl/FCysPxvwbwkiVfjD6',
  },
  {
    name: 'كرمانشاه',
    lat: 34.31600617,
    long: 47.10516726,
    hospital: 'مستشفى بيستون',
    address: 'كرمانشاه، شارع كيهانشهر، بجوار بلدة رسالت',
    translator: 'مدخل مبنى المستشفى – مكتب المعلومات',
    tell: '0098 - 8338321701',
    patientsCount: 2257,
    image: kermanshahHospitalImage,
    gmapUrl: 'https://maps.app.goo.gl/a1tQwVZKEnJpcSEBA',
  },
  {
    name: 'أنديمشك',
    lat: 32.45806559,
    long: 48.36954258,
    hospital: 'مستشفى الإمام علي (ع)',
    address: 'أنديمشك، طريق الأهواز الدائري، أنديمشك، مستشفى الإمام علي (ع).',
    translator: 'مدخل مبنى المستشفى – مكتب المعلومات',
    tell: '0098 - 6142628776',
    patientsCount: 1784,
    image: andimeshkHospitalImage,
    gmapUrl: 'https://maps.app.goo.gl/ayckXx2q5QugcPXZA',
  },
];
