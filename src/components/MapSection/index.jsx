import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import CloseIcon from '@mui/icons-material/Close';
import bannerImage from '@/assets/images/banner.png';
import { cities } from '@/constants/cities';
import { useStyles, mapLabelStyles } from './styles.js';

// Fix for default marker icon in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

function CityMarker({ city }) {
  const map = useMap();

  const handleClick = () => {
    map.flyTo([city.lat, city.long], 10, {
      duration: 1.5,
    });
  };

  const cityIcon = L.divIcon({
    className: 'city-label-icon',
    html: `<div class="city-label-bubble">${city.name}</div>`,
    iconSize: [null, null],
    iconAnchor: [20, 0],
  });

  return (
    <Marker
      position={[city.lat, city.long]}
      icon={cityIcon}
      eventHandlers={{ click: handleClick }}
    />
  );
}

function MapFlyTo({ selectedCity }) {
  const map = useMap();

  useEffect(() => {
    if (selectedCity && selectedCity.value) {
      const city = selectedCity.value;
      map.flyTo([city.lat, city.long], 10, {
        duration: 1.5,
      });
    }
  }, [selectedCity, map]);

  return null;
}

const MapSection = ({ selectedCity }) => {
  const classes = useStyles();
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    const styleId = 'map-label-styles';
    if (!document.getElementById(styleId)) {
      const styleElement = document.createElement('style');
      styleElement.id = styleId;
      styleElement.textContent = mapLabelStyles;
      document.head.appendChild(styleElement);
    }
  }, []);

  return (
    <Box className={classes.rightColumn}>
      <MapContainer
        center={[32.4279, 53.688]}
        zoom={6}
        minZoom={5}
        maxZoom={12}
        className={classes.mapContainer}
        scrollWheelZoom={true}
        maxBounds={[
          [29.158988, 43.796008],
          [39.237248, 62.499597],
        ]}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <MapFlyTo selectedCity={selectedCity} />
        {cities.map((city, index) => (
          <CityMarker key={index} city={city} />
        ))}
      </MapContainer>
      <Box className={classes.mapOverlay} />
      {showBanner && (
        <Box className={classes.bannerContainer}>
          <Box className={classes.bannerWrapper}>
            <IconButton
              className={classes.bannerCloseButton}
              onClick={() => setShowBanner(false)}
              size="small"
            >
              <CloseIcon />
            </IconButton>
            <Box component="img" src={bannerImage} alt="Banner" className={classes.mapBanner} />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default MapSection;
