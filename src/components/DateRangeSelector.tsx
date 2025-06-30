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

  // Close date pickers when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      
      // Check if click is outside date pickers
      if (!target.closest('[data-date-picker]')) {
        setShowFromPicker(false);
        setShowToPicker(false);
      }
    };

    if (showFromPicker || showToPicker) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
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
    setShowFromPicker(false);
    if (onDateRangeChange) {
      onDateRangeChange(newFromDate, toDate);
    }
  };

  const handleToDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newToDate = e.target.value;
    setToDate(newToDate);
    setShowToPicker(false);
    if (onDateRangeChange) {
      onDateRangeChange(fromDate, newToDate);
    }
  };

  const handleViewClick = async () => {
    if (!imei) {
      console.warn("IMEI is required for fetching scooter stats");
      return;
    }

    try {
      // Convert datetime-local format to milliseconds
      const fromTimeMs = new Date(fromDate).getTime();
      const toTimeMs = new Date(toDate).getTime();

      const response = await fetch('http://localhost:3000/api/scooter/get-stats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imei: imei,
          fromTime: fromTimeMs,
          toTime: toTimeMs,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success && result.data?.data && result.data.data.length > 0) {
        const distance = result.data.data[0].dst; // Distance in meters
        console.log("Distance updated:", distance, "meters");
        
        if (onDistanceUpdate) {
          onDistanceUpdate(distance);
        }
      } else {
        console.warn("No data found in API response");
      }
    } catch (error) {
      console.error("Error fetching scooter stats:", error);
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
                onBlur={(e) => {
                  // Delay closing to allow for calendar interactions
                  setTimeout(() => {
                    // Check if the new focused element is not part of the date picker
                    if (!e.relatedTarget || !e.currentTarget.contains(e.relatedTarget as Node)) {
                      setShowFromPicker(false);
                    }
                  }, 150);
                }}
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
                onBlur={(e) => {
                  // Delay closing to allow for calendar interactions
                  setTimeout(() => {
                    // Check if the new focused element is not part of the date picker
                    if (!e.relatedTarget || !e.currentTarget.contains(e.relatedTarget as Node)) {
                      setShowToPicker(false);
                    }
                  }, 150);
                }}
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
        className="px-4 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
      >
        View
      </button>
    </div>
  );
};

export default DateRangeSelector;