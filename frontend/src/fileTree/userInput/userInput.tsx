import React, { useState, useEffect, useRef } from 'react';

const UserInput: React.FC<{ title: string, placeholder: string, onSubmit: (name: string) => void, onCancel: () => void }> = ({ title, placeholder, onSubmit, onCancel }) => {
    const [name, setName] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = () => {
        if (name.trim()) {
            onSubmit(name);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    const handleClickOutside = (e: MouseEvent) => {
        if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
            onCancel();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="p-4 bg-gray-800 text-gray-100 border border-gray-600 rounded">
            <h3 className="text-center mb-4">{title}</h3>
            <form className="flex flex-col" onSubmit={(e) => e.preventDefault()}>
                <input
                    ref={inputRef}
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder={placeholder}
                    className="p-2 mb-4 text-center bg-gray-600 text-white border border-gray-500 rounded"
                />
            </form>
        </div>
    );
};

export default UserInput;
