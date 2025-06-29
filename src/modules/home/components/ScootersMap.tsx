import React, { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api";
import { scooterService } from "@/modules/scooters/service/scooterService";
import { getCurrentLocation } from "@/utils/getCurrentLocation";
import mapStore from "@/globalStore/mapStore";

type Props = {
  scooters: any;
};

const containerStyle = {
  width: "100%",
  height: "40vh",
  borderRadius: "0.5rem",
};

const mapOptions = {
  disableDefaultUI: true,
  draggable: true,
  scrollwheel: true,
  disableDoubleClickZoom: false,
  keyboardShortcuts: false,
  styles: [
    // Hide all POI (Points of Interest) labels except buildings
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }]
    },
    // Hide specific POI categories
    {
      featureType: "poi.attraction",
      stylers: [{ visibility: "off" }]
    },
    {
      featureType: "poi.business",
      stylers: [{ visibility: "off" }]
    },
    {
      featureType: "poi.government",
      stylers: [{ visibility: "off" }]
    },
    {
      featureType: "poi.medical",
      stylers: [{ visibility: "off" }]
    },
    {
      featureType: "poi.park",
      elementType: "labels",
      stylers: [{ visibility: "off" }]
    },
    {
      featureType: "poi.place_of_worship",
      stylers: [{ visibility: "off" }]
    },
    {
      featureType: "poi.school",
      stylers: [{ visibility: "off" }]
    },
    {
      featureType: "poi.sports_complex",
      stylers: [{ visibility: "off" }]
    },
    // Hide transit stations (metro, bus, etc.)
    {
      featureType: "transit.station",
      stylers: [{ visibility: "off" }]
    },
    {
      featureType: "transit.line",
      stylers: [{ visibility: "off" }]
    },
    // Keep building labels visible but make them subtle
    {
      featureType: "poi.business",
      elementType: "labels.text.fill",
      stylers: [{ visibility: "on" }, { color: "#666666" }]
    },
    // Keep road labels clean and visible
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ color: "#333333" }]
    },
    // Keep area labels (neighborhoods, etc.) visible but subtle
    {
      featureType: "administrative.neighborhood",
      elementType: "labels.text.fill",
      stylers: [{ color: "#888888" }]
    }
  ]
};

const ScootersMap: React.FC<Props> = ({ scooters }) => {
  const [markers, setMarkers] = useState<any[]>([]);
  const [center, setCenter] = useState<any>({
    lat: 28.6139,
    lng: 77.209,
  });
  const [selectedMarker, setSelectedMarker] = useState<number | null>(null);
  const [zoom, setZoom] = useState<number>(12);

  // Get map store state
  const targetLocation = mapStore.use.targetLocation();
  const shouldPanToLocation = mapStore.use.shouldPanToLocation();
  const { clearTargetLocation } = mapStore();

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
  });

  useEffect(() => {
    getScooterMarkers();
  }, [scooters]);

  useEffect(() => {
    getCurrentLocation().then((location) => {
      setCenter(location);
    });
  }, []);

  // Listen for location panning requests
  useEffect(() => {
    if (shouldPanToLocation && targetLocation) {
      setCenter({
        lat: targetLocation.lat,
        lng: targetLocation.lng,
      });
      if (targetLocation.zoom) {
        setZoom(targetLocation.zoom);
      }
      // Clear the target location after panning
      clearTargetLocation();
    }
  }, [shouldPanToLocation, targetLocation, clearTargetLocation]);

  const isValidCoordinate = (lat: any, lng: any): boolean => {
    return (
      typeof lat === 'number' &&
      typeof lng === 'number' &&
      !isNaN(lat) &&
      !isNaN(lng) &&
      lat >= -90 &&
      lat <= 90 &&
      lng >= -180 &&
      lng <= 180
    );
  };

  const getScooterMarkers = async () => {
    const scooterMarkers: any[] = [];

    for (const scooter of scooters.scooters) {
      try {
        console.log('Fetching details for scooter:', scooter.imei);
        const scooterLastSeenData = await scooterService.getScooterDetails(scooter.imei);
        console.log('Scooter last seen data:', scooterLastSeenData);

        let lat, lng;

        if (scooterLastSeenData?.data) {
          lat = parseFloat(scooterLastSeenData.data.lat);
          lng = parseFloat(scooterLastSeenData.data.lng);
        } else {
          lat = parseFloat(scooter.latitude);
          lng = parseFloat(scooter.longitude);
        }

        if (isValidCoordinate(lat, lng)) {
          scooterMarkers.push({
            lat,
            lng,
            imei: scooter.imei,
            registration_number: scooter.registration_number
          });
        } else {
          console.warn('Invalid coordinates for scooter:', scooter.imei, { lat, lng });
        }
      } catch (error) {
        console.error('Error fetching scooter details:', error);
      }
    }

    console.log('Final markers array:', scooterMarkers);
    setMarkers(scooterMarkers);
  };

  return (
    <div className="w-full flex items-center justify-center">
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={zoom}
          options={mapOptions}
        >
          {/* Render each marker */}
          {markers?.map((marker, index) => (
            <React.Fragment key={index}>
              <Marker 
                position={marker} 
                onClick={() => setSelectedMarker(index)}
              />
              {selectedMarker === index && (
                <InfoWindow
                  position={marker}
                  onCloseClick={() => setSelectedMarker(null)}
                >
                  <div className="p-2">
                    <p className="font-semibold">Scooter Details</p>
                    <p>Registration: {marker.registration_number}</p>
                    <p>IMEI: {marker.imei}</p>
                    <p>Latitude: {marker.lat.toFixed(6)}</p>
                    <p>Longitude: {marker.lng.toFixed(6)}</p>
                  </div>
                </InfoWindow>
              )}
            </React.Fragment>
          ))}
        </GoogleMap>
      ) : (
        <div className="w-full h-[40vh] bg-gray-300 rounded-lg flex items-center justify-center">
          Loading map...
        </div>
      )}
    </div>
  );
};

export default ScootersMap;
