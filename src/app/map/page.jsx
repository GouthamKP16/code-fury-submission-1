'use client'
import { useState, useEffect } from 'react'
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api'
import { reliefLocations } from '@/lib/utils';
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

const mapContainerStyle = {
  width: '100%',
  height: '500px'
}

const center = {
  lat: 20.5937, // Centered on India
  lng: 78.9629
}

// Dummy data for shelters, NGOs, and other relief places

export default function Map() {
  const [userLocation, setUserLocation] = useState(null)
  const [selectedLocation, setSelectedLocation] = useState(null)

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        (error) => {
          console.error('Error getting location:', error)
        }
      )
    } else {
      console.error('Geolocation is not supported by this browser.')
    }
  }

  const getMarkerIcon = (type) => {
    switch(type) {
      case 'Shelter':
        return 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
      case 'NGO':
        return 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
      case 'Hospital':
        return 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
      default:
        return 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-white">Emergency Services Map</h1>
      <button
        onClick={handleLocationClick}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600 transition"
      >
        Use My Location
      </button>
      <div className="mb-4 text-white">
        <span className="mr-4"><span className="inline-block w-4 h-4 bg-blue-500 rounded-full mr-2"></span>Shelter</span>
        <span className="mr-4"><span className="inline-block w-4 h-4 bg-green-500 rounded-full mr-2"></span>NGO</span>
        <span><span className="inline-block w-4 h-4 bg-red-500 rounded-full mr-2"></span>Hospital</span>
      </div>
      <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={userLocation || center}
          zoom={userLocation ? 12 : 5}
        >
          {userLocation && <Marker position={userLocation} />}
          {reliefLocations.map((location) => (
            <Marker
              key={location.id}
              position={{ lat: location.lat, lng: location.lng }}
              icon={getMarkerIcon(location.type)}
              onClick={() => setSelectedLocation(location)}
            />
          ))}
          {selectedLocation && (
            <InfoWindow
              position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
              onCloseClick={() => setSelectedLocation(null)}
            >
              <div>
                <h2 className="font-bold">{selectedLocation.name}</h2>
                <p>{selectedLocation.type}</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  )
}