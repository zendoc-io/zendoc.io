import React from "react";

type Props = {
  placeholder?: string;
  type?: string;
};

export default function BaseInput({ placeholder, type = "text" }: Props) {
  return (
    <div>
      <input
        className="w-full rounded-lg border-2 border-gray-200 p-3 text-black outline-none focus:border-gray-600"
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
}
