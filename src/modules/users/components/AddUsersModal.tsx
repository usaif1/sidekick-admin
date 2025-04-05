import LabelInput from "@/components/LabelInput";
import React, { useState } from "react";

const AddUsersModal: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  return (
    <div className="flex flex-col items-center">
      <h1 className="font-semibold text-xl">Add Users</h1>
      <p className="text-sm text-gray-400">
        Please Enter the New User's Details
      </p>
      <div className="flex gap-x-2 mt-4">
        <LabelInput
          id="name"
          type="text"
          placeholder="Full Name"
          label="Enter Name"
          className="w-72"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <LabelInput
          id="email"
          type="text"
          className="w-72"
          placeholder="Example@example.com"
          label="Enter Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mt-4 flex justify-between w-full">
        <button className="bg-btn-secondary px-4 py-1.5 text-sm font-medium rounded-full">
          Upload CSV
        </button>
        <button className="bg-btn-primary px-4 py-1.5 text-sm font-medium rounded-full">
          Add
        </button>
      </div>
    </div>
  );
};

export default AddUsersModal;
