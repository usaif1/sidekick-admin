import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

type Props = {
  markers?: { lat: number; lng: number }[];
};

const containerStyle = {
  width: "100%",
  height: "40vh",
  borderRadius: "0.5rem",
};

const center = {
  lat: 28.6139,
  lng: 77.2090,
};

const mapOptions = {
  disableDefaultUI: true,
  draggable: true,
  scrollwheel: true,
  disableDoubleClickZoom: false,
  keyboardShortcuts: false,
};

const ScootersMap: React.FC<Props> = ({ markers }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
  });

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
