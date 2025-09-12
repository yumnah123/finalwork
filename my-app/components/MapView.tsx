"use client";
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { AddressResult } from '../hooks/useAddressAutocomplete';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapViewProps {
  pickup: AddressResult;
  dropoff: AddressResult;
  className?: string;
}

interface RouteCoordinate {
  lat: number;
  lng: number;
}

export const MapView: React.FC<MapViewProps> = ({ pickup, dropoff, className = "" }) => {
  const [route, setRoute] = useState<RouteCoordinate[]>([]);
  const [loading, setLoading] = useState(true);

  const pickupLatLng: RouteCoordinate = {
    lat: parseFloat(pickup.lat),
    lng: parseFloat(pickup.lon),
  };

  const dropoffLatLng: RouteCoordinate = {
    lat: parseFloat(dropoff.lat),
    lng: parseFloat(dropoff.lon),
  };

  // Calculate center point between pickup and dropoff
  const center: RouteCoordinate = {
    lat: (pickupLatLng.lat + dropoffLatLng.lat) / 2,
    lng: (pickupLatLng.lng + dropoffLatLng.lng) / 2,
  };

  // Calculate appropriate zoom level based on distance
  const calculateZoom = () => {
    const latDiff = Math.abs(pickupLatLng.lat - dropoffLatLng.lat);
    const lngDiff = Math.abs(pickupLatLng.lng - dropoffLatLng.lng);
    const maxDiff = Math.max(latDiff, lngDiff);
    
    if (maxDiff > 5) return 8;
    if (maxDiff > 1) return 10;
    if (maxDiff > 0.5) return 11;
    if (maxDiff > 0.1) return 13;
    return 14;
  };

  useEffect(() => {
    const fetchRoute = async () => {
      setLoading(true);
      try {
        // Try to get route from OpenRouteService if API key is available
        const apiKey = 'eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjEwNTMyZGQxZjE4YTQwNmQ5MmNkZmMzOWRjZTg3ODE1IiwiaCI6Im11cm11cjY0In0=';
        
        if (apiKey) {
          const response = await fetch(
            `https://api.openrouteservice.org/v2/directions/driving-car?` +
              new URLSearchParams({
                api_key: apiKey,
                start: `${pickup.lon},${pickup.lat}`,
                end: `${dropoff.lon},${dropoff.lat}`,
              })
          );

          if (response.ok) {
            const data = await response.json();
            const coordinates = data.features[0].geometry.coordinates;
            const routeCoords = coordinates.map((coord: [number, number]) => ({
              lat: coord[1],
              lng: coord[0],
            }));
            setRoute(routeCoords);
          } else {
            // Fallback to straight line
            setRoute([pickupLatLng, dropoffLatLng]);
          }
        } else {
          // Fallback to straight line if no API key
          setRoute([pickupLatLng, dropoffLatLng]);
        }
      } catch (error) {
        console.error('Error fetching route:', error);
        // Fallback to straight line
        setRoute([pickupLatLng, dropoffLatLng]);
      } finally {
        setLoading(false);
      }
    };

    fetchRoute();
  }, [pickup, dropoff]);

  // Custom icons for pickup and dropoff
  const pickupIcon = new L.DivIcon({
    html: `
      <div style="
        background-color: #10b981;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
        color: white;
        font-weight: bold;
      ">P</div>
    `,
    className: '',
    iconSize: [26, 26],
    iconAnchor: [13, 13],
  });

  const dropoffIcon = new L.DivIcon({
    html: `
      <div style="
        background-color: #ef4444;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
        color: white;
        font-weight: bold;
      ">D</div>
    `,
    className: '',
    iconSize: [26, 26],
    iconAnchor: [13, 13],
  });

  return (
    <div className={`relative ${className}`}>
      {loading && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-10 rounded-lg">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#235e99]"></div>
        </div>
      )}
      
      <MapContainer
        center={center}
        zoom={calculateZoom()}
        className="w-full h-full rounded-lg"
        style={{ minHeight: '200px' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Pickup Marker */}
        <Marker position={pickupLatLng} icon={pickupIcon}>
          <Popup>
            <div className="text-sm">
              <strong className="text-green-600">Pickup Location</strong>
              <br />
              {pickup.display_name.split(',').slice(0, 2).join(',')}
            </div>
          </Popup>
        </Marker>
        
        {/* Dropoff Marker */}
        <Marker position={dropoffLatLng} icon={dropoffIcon}>
          <Popup>
            <div className="text-sm">
              <strong className="text-red-600">Dropoff Location</strong>
              <br />
              {dropoff.display_name.split(',').slice(0, 2).join(',')}
            </div>
          </Popup>
        </Marker>
        
        {/* Route Line */}
        {route.length > 0 && (
          <Polyline
            positions={route}
            color="#235e99"
            weight={4}
            opacity={0.8}
          />
        )}
      </MapContainer>
      
      {/* Legend */}
      <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm rounded px-2 py-1 text-xs shadow-md z-[1000]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className='text-black'>Pickup</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className='text-black'>Dropoff</span>
          </div>
        </div>
      </div>
    </div>
  );
};