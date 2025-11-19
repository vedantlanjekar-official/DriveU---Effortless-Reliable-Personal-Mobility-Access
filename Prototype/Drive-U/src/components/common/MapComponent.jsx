import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom driver icon
const driverIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/3774/3774299.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const MapComponent = ({ center, zoom = 13, drivers = [], showRadius = false, radius = 5000, onLocationSelect, interactive = false }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleMapClick = (e) => {
    if (interactive && onLocationSelect) {
      const coordinates = {
        lat: e.latlng.lat,
        lng: e.latlng.lng,
        name: `Location ${e.latlng.lat.toFixed(4)}, ${e.latlng.lng.toFixed(4)}`
      };
      setSelectedLocation(coordinates);
      onLocationSelect(coordinates);
    }
  };

  return (
    <MapContainer 
      center={center} 
      zoom={zoom} 
      style={{ height: '400px', width: '100%', borderRadius: 'var(--radius-lg)' }}
      onClick={handleMapClick}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {/* User location marker */}
      <Marker position={center}>
        <Popup>Your Location</Popup>
      </Marker>

      {/* Selected location marker */}
      {selectedLocation && (
        <Marker position={[selectedLocation.lat, selectedLocation.lng]}>
          <Popup>
            <div style={{ textAlign: 'center' }}>
              <strong>Selected Destination</strong><br />
              {selectedLocation.name}
            </div>
          </Popup>
        </Marker>
      )}

      {/* Show radius circle */}
      {showRadius && (
        <Circle
          center={center}
          radius={radius}
          pathOptions={{ color: 'blue', fillColor: 'blue', fillOpacity: 0.1 }}
        />
      )}

      {/* Driver markers */}
      {drivers.map((driver) => (
        <Marker
          key={driver.id}
          position={[driver.location.lat, driver.location.lng]}
          icon={driverIcon}
        >
          <Popup>
            <div style={{ textAlign: 'center' }}>
              <strong>{driver.name}</strong><br />
              <span>Rating: {driver.rating} ⭐</span><br />
              <span>Experience: {driver.experience} years</span><br />
              <span style={{ color: driver.available ? 'green' : 'red' }}>
                {driver.available ? 'Available' : 'Busy'}
              </span>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;

