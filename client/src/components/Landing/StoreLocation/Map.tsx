import React from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import markerPng from '../../../../public/marker-icon-2x.png';

import { icon } from 'leaflet';

const ICON = icon({
  iconUrl: markerPng.src,
  iconSize: [32, 52],
});

const COORDS: LatLngExpression = [37.96332118797257, 23.722338003120228];

const StoreMap = () => (
  <MapContainer
    center={COORDS}
    zoom={15}
    style={{ height: '400px', width: '100%' }}
  >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker
      position={COORDS}
      icon={ICON}
      eventHandlers={{
        click: (e) => {
          window.open('https://maps.app.goo.gl/4K9Aw1NuNUcFtm8u9', '_blank');
        },
      }}
    >
      <Popup>Minas Phone</Popup>
    </Marker>
  </MapContainer>
);

export default StoreMap;
