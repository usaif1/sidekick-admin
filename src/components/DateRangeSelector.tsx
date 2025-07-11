import axios from "axios";
import React, { useState, useEffect } from "react";

interface DateRangeSelectorProps {
  onDateRangeChange?: (fromDate: string, toDate: string) => void;
  onDistanceUpdate?: (distance: number) => void;
  imei?: string;
  className?: string;
}

const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({
  onDateRangeChange,
  onDistanceUpdate,
  imei,
  className = "",
}) => {
  // Helper function to format date for datetime-local input
  const formatDateTimeLocal = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  // Helper function to format date for display (30 June 2025)
  const formatDateDisplay = (dateString: string): string => {
    if (!dateString) return "";

    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day} ${month} ${year}, ${hours}:${minutes}`;
  };

  // Set default values
  const getDefaultDates = () => {
    const now = new Date();

    // From date: today at 00:00
    const fromDate = new Date(now);
    fromDate.setHours(0, 0, 0, 0);

    // To date: current date and time
    const toDate = now;

    return {
      from: formatDateTimeLocal(fromDate),
      to: formatDateTimeLocal(toDate),
    };
  };

  const defaultDates = getDefaultDates();
  const [fromDate, setFromDate] = useState<string>(defaultDates.from);
  const [toDate, setToDate] = useState<string>(defaultDates.to);
  const [showFromPicker, setShowFromPicker] = useState<boolean>(false);
  const [showToPicker, setShowToPicker] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Only close on Escape key - no automatic click-outside closing
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowFromPicker(false);
        setShowToPicker(false);
      }
    };

    if (showFromPicker || showToPicker) {
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [showFromPicker, showToPicker]);

  // Trigger callback with default values on component mount
  useEffect(() => {
    if (onDateRangeChange) {
      onDateRangeChange(fromDate, toDate);
    }
  }, []); // Empty dependency array means this runs once on mount

  const handleFromDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFromDate = e.target.value;
    setFromDate(newFromDate);
    if (onDateRangeChange) {
      onDateRangeChange(newFromDate, toDate);
    }
  };

  const handleToDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newToDate = e.target.value;
    setToDate(newToDate);
    if (onDateRangeChange) {
      onDateRangeChange(fromDate, newToDate);
    }
  };

  const handleViewClick = async () => {
    if (!imei) {
      alert("IMEI is required for fetching scooter stats");
      console.warn("IMEI is required for fetching scooter stats");
      return;
    }

    setIsLoading(true);

    try {
      // Convert datetime-local format to milliseconds
      const fromTimeMs = new Date(fromDate).getTime();
      const toTimeMs = new Date(toDate).getTime();

      const response = await axios.post(
        "https://sidekick-backend-279t.onrender.com/api/scooter/get-stats",
        {
          imei: imei,
          fromTime: fromTimeMs,
          toTime: toTimeMs,
        }
        // {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({
        //     imei: imei,
        //     fromTime: fromTimeMs,
        //     toTime: toTimeMs,
        //   }),
        // }
      );

      const result = await response.data;

      if (result.success && result.data?.data && result.data.data.length > 0) {
        const distance = result.data.data[0].dst; // Distance in meters
        console.log("Distance updated:", distance, "meters");

        if (onDistanceUpdate) {
          onDistanceUpdate(distance);
        }
      } else {
        alert("Please select a valid date range");
        console.warn("No data found in API response");
      }
    } catch (error) {
      console.error("Error fetching scooter stats:", error);
      alert("Error fetching scooter data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="flex items-center gap-2 relative" data-date-picker>
        <label className="text-blue-600 font-semibold text-sm whitespace-nowrap">
          From:
        </label>
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowFromPicker(!showFromPicker)}
            className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-left min-w-[180px] cursor-pointer hover:bg-gray-50"
          >
            {formatDateDisplay(fromDate) || "Select date"}
          </button>
          {showFromPicker && (
            <div className="absolute top-full left-0 mt-1 z-10">
              <input
                type="datetime-local"
                value={fromDate}
                onChange={handleFromDateChange}
                className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowFromPicker(false)}
                className="absolute -top-1 -right-1 w-4 h-4 bg-gray-500 text-white rounded-full text-xs flex items-center justify-center hover:bg-gray-700"
                aria-label="Close date picker"
              >
                ×
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 relative" data-date-picker>
        <label className="text-blue-600 font-semibold text-sm whitespace-nowrap">
          To:
        </label>
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowToPicker(!showToPicker)}
            className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-left min-w-[180px] cursor-pointer hover:bg-gray-50"
          >
            {formatDateDisplay(toDate) || "Select date"}
          </button>
          {showToPicker && (
            <div className="absolute top-full left-0 mt-1 z-10">
              <input
                type="datetime-local"
                value={toDate}
                onChange={handleToDateChange}
                className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                min={fromDate} // Ensure "to" date is not before "from" date
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowToPicker(false)}
                className="absolute -top-1 -right-1 w-4 h-4 bg-gray-500 text-white rounded-full text-xs flex items-center justify-center hover:bg-gray-700"
                aria-label="Close date picker"
              >
                ×
              </button>
            </div>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={handleViewClick}
        disabled={isLoading}
        className={`px-4 py-1 text-sm rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center gap-2 ${
          isLoading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
        } text-white`}
      >
        {isLoading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        {isLoading ? "Loading..." : "View"}
      </button>
    </div>
  );
};

export default DateRangeSelector;
