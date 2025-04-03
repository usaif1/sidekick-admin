import React from "react";
import ScootersMap from "./components/ScootersMap";
import ScooterTable from "./components/ScooterTable";
import RideTable from "./components/RidesTable";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col pt-4 gap-y-4">
      <ScootersMap />
      <div className="flex flex-1 justify-center gap-x-4">
        <div className="w-1/2">
          <ScooterTable />
        </div>
        <div className="w-1/2">
          <RideTable />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
