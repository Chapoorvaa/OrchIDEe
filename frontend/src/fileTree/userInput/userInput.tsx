import React, { useState, useEffect, useRef } from "react";

const UserInput: React.FC<{
  title: string;
  placeholder: string;
  onSubmit: (name: string) => void;
  onCancel: () => void;
}> = ({ title, placeholder, onSubmit, onCancel }) => {
  const [name, setName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if (name.trim()) {
      onSubmit(name);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
      onCancel();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-skin-bg-dark bg-opacity-50 z-50">
      <div className="p-4 bg-skin-bg-medium text-skin-text-primary border border-skin-stroke-light w-1/4">
        <h3 className="text-center mb-4">{title}</h3>
        <form className="flex flex-col" onSubmit={(e) => e.preventDefault()}>
          <input
            ref={inputRef}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={placeholder}
            className="p-2 mb-4 text-center bg-skin-bg-light text-skin-text-primary border rounded"
          />
        </form>
      </div>
    </div>
  );
};

export default UserInput;
