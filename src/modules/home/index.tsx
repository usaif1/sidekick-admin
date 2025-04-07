import React from "react";
import ScootersMap from "./components/ScootersMap";
import ScooterTable from "./components/ScooterTable";
import RideTable from "./components/RidesTable";
import { useQuery } from "@apollo/client";
import { FETCH_ACTIVE_SCOOTERS } from "@/graphql/queries/fetchActiveScooters";

const HomePage: React.FC = () => {
  const { data, loading, error } = useQuery(FETCH_ACTIVE_SCOOTERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading scooters!</p>;

  return (
    <div className="flex flex-col pt-4 gap-y-4">
      <ScootersMap />
      <div className="flex flex-1 justify-center gap-x-4">
        <div className="w-1/2 h-full">
          <ScooterTable scooters={data.scooters} />
        </div>
        <div className="w-1/2">
          <RideTable />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
