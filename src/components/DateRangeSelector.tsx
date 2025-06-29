import React, { useState, useEffect } from "react";

interface DateRangeSelectorProps {
  onDateRangeChange?: (fromDate: string, toDate: string) => void;
  className?: string;
}

const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({ 
  onDateRangeChange, 
  className = "" 
}) => {
  // Helper function to format date for datetime-local input
  const formatDateTimeLocal = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  // Helper function to format date for display (30 June 2025)
  const formatDateDisplay = (dateString: string): string => {
    if (!dateString) return "";
    
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
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
      to: formatDateTimeLocal(toDate)
    };
  };

  const defaultDates = getDefaultDates();
  const [fromDate, setFromDate] = useState<string>(defaultDates.from);
  const [toDate, setToDate] = useState<string>(defaultDates.to);
  const [showFromPicker, setShowFromPicker] = useState<boolean>(false);
  const [showToPicker, setShowToPicker] = useState<boolean>(false);

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

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="flex items-center gap-2 relative">
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
            <input
              type="datetime-local"
              value={fromDate}
              onChange={handleFromDateChange}
              className="absolute top-full left-0 mt-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent z-10 bg-white"
              autoFocus
              onBlur={() => setShowFromPicker(false)}
            />
          )}
        </div>
      </div>
      
      <div className="flex items-center gap-2 relative">
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
            <input
              type="datetime-local"
              value={toDate}
              onChange={handleToDateChange}
              className="absolute top-full left-0 mt-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent z-10 bg-white"
              min={fromDate} // Ensure "to" date is not before "from" date
              autoFocus
              onBlur={() => setShowToPicker(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DateRangeSelector; 