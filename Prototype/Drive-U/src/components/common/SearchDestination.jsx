import React, { useState, useEffect } from 'react';
import { Search, MapPin } from 'lucide-react';
import MapComponent from './MapComponent';

const SearchDestination = ({ onDestinationSelect, placeholder = "Where do you want to go?" }) => {
  const [searchValue, setSearchValue] = useState('');
  const [showMap, setShowMap] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);

  // Get current location on component mount
  useEffect(() => {
    // First try to get from localStorage
    const storedLocation = localStorage.getItem('userLocation');
    if (storedLocation) {
      setCurrentLocation(JSON.parse(storedLocation));
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setCurrentLocation(location);
          localStorage.setItem('userLocation', JSON.stringify(location));
        },
        (error) => {
          console.log('Location permission denied or error:', error);
        }
      );
    }
  }, []);

  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // Fast direct Nominatim API search
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchValue && searchValue.length >= 3) {
        setIsSearching(true);
        
        try {
          // Direct API call to Nominatim - FAST!
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?` +
            `q=${encodeURIComponent(searchValue + ', India')}&` +
            `format=json&limit=10&addressdetails=1`,
            {
              headers: { 'Accept': 'application/json' }
            }
          );
          
          if (!response.ok) {
            throw new Error('Search failed');
          }
          
          const results = await response.json();
          
          if (results && results.length > 0) {
            const formattedResults = results.map(result => {
              const addr = result.address || {};
              return {
                name: result.display_name.split(',')[0],
                description: result.display_name,
                lat: parseFloat(result.lat),
                lng: parseFloat(result.lon),
                city: addr.city || addr.town || addr.village || '',
                state: addr.state || '',
                distance: "5 km",
                time: "15 min"
              };
            });
            
            setFilteredPlaces(formattedResults);
            setShowSuggestions(true);
          } else {
            setFilteredPlaces([]);
            setShowSuggestions(true);
          }
        } catch (error) {
          console.error('Search failed:', error);
          setFilteredPlaces([]);
          setShowSuggestions(true);
        } finally {
          setIsSearching(false);
        }
      } else {
        setFilteredPlaces([]);
        setShowSuggestions(false);
      }
    }, 400); // 400ms debounce for better performance

    return () => clearTimeout(delayDebounceFn);
  }, [searchValue]);

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  const handlePlaceSelect = (place) => {
    setSearchValue(place.description || place.name);
    setShowSuggestions(false);
    
    // Use coordinates from API or mock data
    const locationData = {
      lat: place.lat,
      lng: place.lng,
      name: place.description || place.name,
      city: place.city || '',
      state: place.state || '',
      distance: place.distance || "5 km",
      time: place.time || "15 min"
    };
    
    setSelectedLocation(locationData);
    
    onDestinationSelect({
      name: locationData.name,
      distance: locationData.distance,
      time: locationData.time,
      coordinates: {
        lat: place.lat,
        lng: place.lng
      }
    });
  };

  const handleMapLocationSelect = (coordinates) => {
    setSelectedLocation(coordinates);
    setSearchValue(coordinates.name || 'Selected Location');
    onDestinationSelect(coordinates);
    setShowMap(false);
  };

  const toggleMap = () => {
    setShowMap(!showMap);
  };

  return (
    <div className="search-destination-container">
      <div className="search-input-container">
        <Search size={20} color="#6B7280" />
        <input
          type="text"
          placeholder={placeholder}
          value={searchValue}
          onChange={(e) => handleSearch(e.target.value)}
          className="search-input"
        />
        {isSearching && (
          <div style={{ 
            marginRight: '0.5rem', 
            color: 'var(--primary-blue)',
            animation: 'spin 1s linear infinite'
          }}>
            ⏳
          </div>
        )}
        <button 
          className="choose-on-map-btn"
          onClick={toggleMap}
          title="Choose on Map"
        >
          <MapPin size={18} />
        </button>
      </div>

      {showMap && (
        <>
          <div className="map-modal-overlay" onClick={() => setShowMap(false)}></div>
          <div className="map-selection-modal">
            <div className="map-selection-header">
              <h3>Choose Destination on Map</h3>
              <button onClick={() => setShowMap(false)} className="close-modal-btn">×</button>
            </div>
            <div className="map-selection-content">
              {currentLocation ? (
                <MapComponent 
                  center={[currentLocation.lat, currentLocation.lng]}
                  zoom={13}
                  onLocationSelect={handleMapLocationSelect}
                  interactive={true}
                />
              ) : (
                <div style={{ padding: '2rem', textAlign: 'center' }}>
                  <p>Loading your location...</p>
                </div>
              )}
              <div className="map-instructions">
                <p>Click on the map to select your destination</p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Real-time Search Suggestions - Google Maps Style with Nominatim */}
      {showSuggestions && filteredPlaces.length > 0 && (
        <div className="search-suggestions-dropdown">
          {filteredPlaces.map((place, index) => (
            <div
              key={index}
              className="suggestion-item"
              onClick={() => handlePlaceSelect(place)}
            >
              <MapPin size={18} color="#6B7280" />
              <div className="suggestion-content">
                <div className="suggestion-name">{place.name}</div>
                <div className="suggestion-meta">
                  {place.description || `${place.city}, ${place.state || ''}`}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Loading indicator */}
      {isSearching && (
        <div className="search-suggestions-dropdown">
          <div className="no-results">
            <div style={{ animation: 'spin 1s linear infinite' }}>🔍</div>
            <span>Searching locations...</span>
          </div>
        </div>
      )}

      {/* No results message */}
      {showSuggestions && searchValue.length >= 2 && filteredPlaces.length === 0 && !isSearching && (
        <div className="search-suggestions-dropdown">
          <div className="no-results">
            <MapPin size={18} color="#9CA3AF" />
            <span>No locations found for "{searchValue}"</span>
          </div>
        </div>
      )}

      {selectedLocation && (
        <div className="selected-location-info">
          <div className="location-details">
            <MapPin size={16} color="#1E3A8A" />
            <span><strong>{selectedLocation.name}</strong></span>
            {selectedLocation.distance && (
              <span className="location-distance">• {selectedLocation.distance}</span>
            )}
            {selectedLocation.time && (
              <span className="location-time">• {selectedLocation.time}</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchDestination;