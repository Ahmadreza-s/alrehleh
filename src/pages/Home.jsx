import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import whatsappIcon from '@/assets/images/icons/whatsapp.svg';
import locationColoredIcon from '@/assets/images/icons/location-colored.svg';
import { PaymentItems } from '@/constants/paymentItems';
import { cities } from '@/constants/cities';
import { doctors } from '@/constants/doctors';
import { useStyles } from './Home.styles.js';
import CommentSection from '@/components/CommentSection';
import MapSection from '@/components/MapSection';
import Footer from '@/components/Footer';
import CustomSelect from '@/components/CustomSelect';
import Appointment from '@/components/Appointment';
import monitorIcon from '@/assets/images/icons/monitor.png';
import miladHospitalImage from '@/assets/images/hospitals/milad.png';
import translateIcon from '@/assets/images/icons/translate.png';
import callBlackIcon from '@/assets/images/icons/call-black.png';
import userTickIcon from '@/assets/images/icons/user-tick.png';
import tickCircleIcon from '@/assets/images/icons/tick-circle.png';

export default function Home() {
  const classes = useStyles();

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

  return (
    <Box>
      <Box className={classes.paymentSection}>
        {PaymentItems.map((item, index) => (
          <Box
            key={index}
            component="img"
            src={item.image}
            alt={item.title}
            className={classes.paymentImage}
          />
        ))}
      </Box>
      <Box className={classes.root}>
        <Box className={classes.layout}>
          <Box className={classes.leftColumn}>
            <Box className={classes.filterRow}>
              <Box className={classes.specialitySelectWrapper}>
                <CustomSelect
                  options={specialityOptions}
                  value={selectedSpeciality}
                  onChange={(selected) => setSelectedSpeciality(selected)}
                  placeholder="انتخاب التخصص..."
                  icon={monitorIcon}
                />
              </Box>

              <Box className={classes.citySelectWrapper}>
                <CustomSelect
                  options={cityOptions}
                  value={selectedCity}
                  onChange={(selected) => setSelectedCity(selected)}
                  placeholder="انتخاب المدينة..."
                  icon={locationColoredIcon}
                />
              </Box>
            </Box>

            <Paper className={classes.card}>
              {/* ردیف اول */}
              <Box className={classes.cardFirstRow}>
                {/* ستون اول: عکس بیمارستان، عنوان و آدرس */}
                <Box className={classes.hospitalInfoColumn}>
                  <Box
                    component="img"
                    src={miladHospitalImage}
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
                  >
                    <Box
                      component="img"
                      src={whatsappIcon}
                      alt="واتساپ"
                      className={classes.whatsappIcon}
                    />
                    <Typography variant="body2" className={classes.whatsappNumber}>
                      0098 912 505 6099
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

            {/* بخش انتخاب موعد */}
            <Appointment />
          </Box>

          <MapSection selectedCity={selectedCity} />
        </Box>
      </Box>

      <CommentSection />

      <Footer />
    </Box>
  );
}
