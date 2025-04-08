import WalletInput from "@/components/WalletInput";
import React, { useState } from "react";

const AddCreditsModal: React.FC = () => {
  const [amount, setAmount] = useState<number>(); // Default selected amount
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
        <WalletInput value={amount as any} onChange={(e) => setAmount(e.target.value as any)} />
          
        <div className="flex flex-col justify-between w-full">
          <div className="flex justify-between">
            <p className="text-icon-primary">Current Balance</p>
            <p>XXXX</p>
          </div>
          <div className="flex justify-between">
            <p className="text-icon-primary">Total</p>
            <p>XXXX</p>
          </div>
        </div>
        <button className="bg-btn-primary px-4 py-2 rounded-full font-semibold">Proceed</button>
      </div>
    </div>
  );
};

export default AddCreditsModal;
