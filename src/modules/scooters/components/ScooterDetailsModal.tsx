import React from "react";
import ScooterRidesTable from "../../../components/Navbar/components/ScooterRidesTable.tsx";
import DateRangeSelector from "@/components/DateRangeSelector";
import modalStore from "@/globalStore/modalStore";
import mapStore from "@/globalStore/mapStore";

type ExtraData = {
  lat: number;
  lng: number;
  alt: number;
  spd: number;
  brg: number;
  ang: number;
  temp: number;
  motion: boolean;
  ignition: boolean;
  mainPower: boolean;
  relayState: boolean;
  ts: number;
  externalVolt: number;
  imei: number;
};

type Props = {
  data: any;
  extraData?: ExtraData;
};

const ScooterDetailsModal: React.FC<Props> = ({ data, extraData }) => {
  console.log("extraData", extraData);

  const { closeModal } = modalStore();
  const { setTargetLocation } = mapStore();

  const kmFromMeters = (meters: number) => {
    return (meters / 1000).toFixed(2);
  };

  const distanceTravelled = kmFromMeters(6964.851914820795);

  const handleDateRangeChange = (fromDate: string, toDate: string) => {
    console.log("Date range changed:", { fromDate, toDate });
    // Here you can implement logic to filter/recalculate distance based on date range
  };

  const handleLocateOnMap = () => {
    // Get scooter location from extraData if available
    if (extraData && extraData.lat && extraData.lng) {
      // Set the target location for the map to pan to
      setTargetLocation({
        lat: extraData.lat,
        lng: extraData.lng,
        zoom: 16, // Zoom in closer to show the scooter location
      });
      
      // Close the modal
      closeModal();
    } else {
      console.warn("Scooter location data not available");
      // You could show a toast notification here
    }
  };

  return (
    <div>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-6 gap-4">
        {/* Scooter Info */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl md:text-3xl font-bold">
              {data.scooters[0].registration_number}
            </h1>
            <span className="h-3 w-3 rounded-full bg-[#18F27A]" />
          </div>

          <div className="flex gap-4 text-sm">
            <span className="text-blue-600 font-semibold">Battery %</span>
            <span className="text-gray-700">
              {extraData?.externalVolt || "Battery status not available"}
            </span>
          </div>
          <div className="flex gap-4 text-sm">
            <span className="text-blue-600 font-semibold">Current Status</span>
            <span className="text-gray-700">
              {extraData?.motion ? "Moving" : "Stopped"}
            </span>
          </div>

          <div className="h-[1px] w-full bg-gray-300 rounded-full mt-2" />
          {/* <p className="text-lg font-bold">Distance travelled by scooter</p> */}
          <div className="flex gap-4 text-sm">
            <span className="text-blue-600 font-semibold">
              Distance travelled today
            </span>
            <span className="text-gray-700">{distanceTravelled} km</span>
          </div>

          {/* Date Range Selector */}
          <div className="mt-2 mb-2">
            <DateRangeSelector
              onDateRangeChange={handleDateRangeChange}
              className="flex-wrap"
            />
          </div>

          {/* <div className="flex gap-4 text-sm">
            <span className="text-blue-600 font-semibold">
              Distance travelled
            </span>
            <span className="text-gray-700">{distanceTravelled} km</span>
          </div> */}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-2 md:mt-0">
          <button 
            className="bg-gray-100 text-sm font-medium px-5 py-2 rounded-full shadow-sm hover:bg-gray-200 transition"
            onClick={handleLocateOnMap}
          >
            Locate on Map
          </button>
          <button className="bg-green-400 text-white text-sm font-medium px-5 py-2 rounded-full hover:bg-green-500 transition">
            Unlock
          </button>
        </div>
      </div>

      {/* Recent Rides Table */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Recent Rides</h2>
        <ScooterRidesTable rides={data.ride_details} />
      </div>

      {/* Servicing CTA */}
      <div className="flex justify-end mt-6">
        <button className="bg-red-500 text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-red-600 transition">
          Request Servicing
        </button>
      </div>
    </div>
  );
};

export default ScooterDetailsModal;
