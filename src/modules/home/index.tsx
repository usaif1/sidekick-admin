import React from "react";
import ScootersMap from "./components/ScootersMap";
import ScooterTable from "./components/ScooterTable";
import RideTable from "./components/RidesTable";
import { useQuery } from "@apollo/client";
import { FETCH_ACTIVE_SCOOTERS } from "@/graphql/queries/fetchActiveScooters";
import { FETCH_RIDES } from "@/graphql/queries/fetchRides";

type Marker = {
  lat: number;
  lng: number;
};

const getScooterMarkers = (scooters: any[]): Marker[] => {
  return scooters
    .filter((scooter) => scooter.latitude && scooter.longitude)
    .map((scooter) => ({
      lat: scooter.latitude,
      lng: scooter.longitude,
    }));
};

const HomePage: React.FC = () => {
  const {
    data: scootersData,
    loading: scootersLoading,
    error: scootersError,
  } = useQuery(FETCH_ACTIVE_SCOOTERS);

  const {
    data: ridesData,
    loading: ridesLoading,
    error: ridesError,
  } = useQuery(FETCH_RIDES);

  if (scootersLoading || ridesLoading) return <p>Loading...</p>;
  if (scootersError || ridesError) return <p>Error loading!</p>;

  const markers = getScooterMarkers(scootersData?.scooters || []);

  return (
    <div className="flex flex-col pt-4 gap-y-4">
      <ScootersMap markers={markers} />
      <div className="flex flex-1 justify-center gap-x-4">
        <div className="w-1/2">
          <ScooterTable scooters={scootersData?.scooters || []} />
        </div>
        <div className="w-1/2">
          <RideTable rides={ridesData?.ride_details || []} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
