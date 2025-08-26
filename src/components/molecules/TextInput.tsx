import React, { useRef, useState } from "react";

interface Props {
  value: string;
  setValue: (value: string) => void;
  header: string;
  placeholder: string;
  onChange: (value: string, valid?: boolean) => void;
  validation?: (value: string) => boolean;
  mode?: "short-answer" | "long-answer";
}

const TextInput = ({
  value, 
  setValue,
  header,
  placeholder,
  onChange,
  validation,
  mode = "short-answer",
}: Props) => {
  const [valid, setValid] = useState(true);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const handleChange = () => {
    setValue(inputRef.current?.value || "");
  };

  const finalizeInput = () => {
    if (validation) {
      setValid(validation(value));
    }
    onChange(value, valid);
  };

  return (
    <div className="h-full w-full flex flex-col items-start justify-center gap-2">
      <div className="flex flex-row items-center justify-center gap-1">
        <span>{header}</span>
        {validation && <span>*</span>}
      </div>
      {mode === "short-answer" ? (
        <input
          type="text"
          className="w-full p-2 border focus:outline-none bg-primary-gray"
          style={{
            borderColor: valid ? "rgba(100, 100, 100, 0.8)" : "red",
          }}
          placeholder={placeholder}
          onChange={handleChange}
          onBlur={finalizeInput}
          value={value}
          ref={inputRef as React.RefObject<HTMLInputElement>}
        />
      ) : (
        <textarea
          className="h-full w-full p-2 border focus:outline-none bg-primary-gray"
          style={{
            borderColor: valid ? "rgba(100, 100, 100, 0.8)" : "red",
          }}
          placeholder={placeholder}
          onChange={handleChange}
          onBlur={finalizeInput}
          value={value}
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
        />
      )}
    </div>
  );
};

export default TextInput;
