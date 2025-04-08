import React from "react";
import wallet from "@/assets/credits.svg";

type WalletInputProps = {
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const WalletInput: React.FC<WalletInputProps> = ({ value, onChange }) => {
  return (
    <div className="relative w-full">
      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
        <img
          src={wallet}
          alt="icon"
          style={{
            filter:
              "invert(35%) sepia(72%) saturate(3134%) hue-rotate(193deg) brightness(91%) contrast(93%)",
          }}
        />
      </span>
      <input
        type="numeric"
        value={value}
        onChange={onChange}
        placeholder="XXXX"
        className="w-full pl-10 pr-4 py-2 border border-icon-primary rounded-md focus:outline-none font-bold"
      />
    </div>
  );
};

export default WalletInput;
