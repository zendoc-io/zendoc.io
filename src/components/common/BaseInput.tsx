import React from "react";

type Props = {
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (value: string) => void;
};

export default function BaseInput({
  placeholder,
  type = "text",
  value = "",
  onChange,
}: Props) {
  return (
    <div>
      <input
        className="w-full rounded-lg border-2 border-gray-200 p-3 text-black outline-none focus:border-gray-600"
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (onChange) {
            onChange(e.target.value);
          }
        }}
      />
    </div>
  );
}
