import React, { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { scooterService } from "@/modules/scooters/service/scooterService";
import { getCurrentLocation } from "@/utils/getCurrentLocation";

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
};

const ScootersMap: React.FC<Props> = ({ scooters }) => {
  const [markers, setMarkers] = useState<any[]>([]);
  const [center, setCenter] = useState<any>({
    lat: 28.6139,
    lng: 77.209,
  });

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

  const getScooterMarkers = () => {
    const scooterMarkers: any[] = [];

    scooters.scooters.forEach(async (scooter: any) => {
      const scooterLastSeenData = await scooterService.getScooterDetails(
        scooter.imei
      );

      if (scooterLastSeenData) {
        scooterMarkers.push({
          lat: scooterLastSeenData.data.lat,
          lng: scooterLastSeenData.data.lng,
        });
      } else {
        scooterMarkers.push({ lat: scooter.latitude, lng: scooter.longitude });
      }

      setMarkers(scooterMarkers);
    });
  };

  return (
    <div className="w-full flex items-center justify-center">
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={12}
          options={mapOptions}
        >
          {/* Render each marker */}
          {markers?.map((marker, index) => (
            <Marker key={index} position={marker} />
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
