import React, { useState } from "react";

const AddCreditsModal: React.FC = () => {
  const [amount, setAmount] = useState(1000); // Default selected amount
  const amounts = [1000, 2000, 3000]; // Available amounts

  return (
    <div className="flex flex-col items-center">
      <h1 className="font-semibold text-xl">Add Credits to Admin Wallet</h1>
      <p className="text-sm text-gray-400">Please select the amount</p>

      <div className="flex flex-col items-center space-y-3 mt-2">
        {/* tabs */}
        <div className="flex space-x-2">
          {amounts.map((value) => (
            <button
              key={value}
              onClick={() => setAmount(value)}
              className={`px-6 flex flex-col bg-btn-secondary items-center py-2 border border-border-primary rounded-md 
              `}
            >
              <span className="text-xl font-bold">+{value}</span>
              <span className="text-sm">XXXX</span>
            </button>
          ))}
        </div>

        <p className="text-gray-400">or</p>

        {/* Selected Amount Display */}
        <div className="border border-gray-300 rounded-md p-2 w-full text-center">
          <input
            type="number"
            value={amount}
            readOnly
            className="w-full outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default AddCreditsModal;
