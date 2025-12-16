import { useEffect, useState } from "react";

export const SearchInput = ({ search }) => {
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        const handler = setTimeout(() => {
            search(inputValue);
        }, 500);
        return () => {
            clearTimeout(handler);
        };
    }, [inputValue, search]);

    return (
        <div className="m-4">
            <input
                onChange={(e) => setInputValue(e.target.value)}
                value={inputValue}
                type="text"
                placeholder="Nhập nội dung tìm kiếm..."
                className="w-full p-2 border border-gray-400 rounded-sm shadow-md outline-blue-500"
            />
        </div>
    );
};
