import React, { InputHTMLAttributes } from "react";

type LabelInputProps = {
  label: string;
  id: string;
} & InputHTMLAttributes<HTMLInputElement>;

const LabelInput: React.FC<LabelInputProps> = ({
  label,
  id,
  className,
  ...inputProps
}) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="mb-1 text-sm font-medium text-gray-400">
        {label}
      </label>
      <input
        id={id}
        {...inputProps}
        className={`px-4 py-2 border text-black font-semibold border-border-primary rounded-md focus:outline-none ${
          className || ""
        }`}
      />
    </div>
  );
};

export default LabelInput;
