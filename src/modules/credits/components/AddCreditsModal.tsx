import WalletInput from "@/components/WalletInput";
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_WALLET_BALANCE } from "@/graphql/mutations/updateWalletBalance";
import modalStore from "@/globalStore/modalStore";

type Props = {
  currentBalance: number;
  walletId: string; // To identify which wallet to update
};

const AddCreditsModal: React.FC<Props> = ({ currentBalance, walletId }) => {
  // Use a union type for amount so it can be an empty string ("") when cleared
  const [amount, setAmount] = useState<number | "">("");
  const amounts = [1000, 2000, 3000]; // Available amounts

  const { closeModal } = modalStore();

  const [updateWalletBalance, { loading, error }] = useMutation(
    UPDATE_WALLET_BALANCE,
    {
      onCompleted: (data) => {
        console.log("Wallet updated successfully:", data);
        closeModal();
      },
      onError: (err) => {
        console.error("Error updating wallet:", err);
      },
    }
  );

  const handleSubmit = async () => {
    try {
      // Treat an empty value as 0 (or handle accordingly)
      const amt = amount === "" ? 0 : amount;
      await updateWalletBalance({
        variables: { id: walletId, balance: amt },
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="font-semibold text-xl">Add Credits to Admin Wallet</h1>
      <p className="text-sm text-gray-400">Please select the amount</p>

      <div className="flex flex-col items-center space-y-3 mt-2">
        {/* Tabs for preset amounts */}
        <div className="flex space-x-2">
          {amounts.map((value) => (
            <button
              key={value}
              onClick={() => setAmount(value)}
              className="px-6 flex flex-col bg-btn-secondary items-center py-2 border border-border-primary rounded-md"
            >
              <span className="text-xl font-bold">+{value}</span>
              <span className="text-sm">{currentBalance ?? "XXXX"}</span>
            </button>
          ))}
        </div>

        <p className="text-gray-400">or</p>

        {/* Selected Amount Input */}
        <WalletInput
          value={amount}
          onChange={(e) => {
            // Set the amount directly to allow an empty input.
            // Ensure that only numeric values are allowed.
            const newValue = e.target.value;
            if (newValue === "" || /^[0-9]+$/.test(newValue)) {
              setAmount(newValue === "" ? "" : Number(newValue));
            }
          }}
        />

        <div className="flex flex-col justify-between w-full">
          <div className="flex justify-between">
            <p className="text-icon-primary">Current Balance</p>
            <p>{currentBalance ?? "XXXX"}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-icon-primary">Total</p>
            <p>{(typeof amount === "number" ? amount : 0) + currentBalance}</p>
          </div>
        </div>
        <button
          className="bg-btn-primary px-4 py-2 rounded-full font-semibold"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Updating..." : "Proceed"}
        </button>
        {error && <p className="text-red-500 mt-2">Error: {error.message}</p>}
      </div>
    </div>
  );
};

export default AddCreditsModal;
