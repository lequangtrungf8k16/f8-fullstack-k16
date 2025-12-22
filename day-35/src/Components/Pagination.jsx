import { useEffect, useState } from "react";

export default function Pagination({ page, totalPages, onChangePage }) {
    const [isEdit, setIsEdit] = useState(false);
    const [inputValue, setInputValue] = useState(page);

    useEffect(() => {
        setInputValue(page);
    }, [page]);

    if (totalPages <= 0) return null;

    const handleInputSubmit = () => {
        const newPage = parseInt(inputValue);

        if (!isNaN(newPage) && newPage > 0 && newPage <= totalPages) {
            onChangePage(newPage);
        } else {
            setInputValue(page);
        }
        setIsEdit(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleInputSubmit();
        } else if (e.key === "Escape") {
            setIsEdit(false);
            setInputValue(page);
        }
    };

    return (
        <div className="flex justify-center items-center gap-4 px-4 py-10 font-bold">
            <button
                onClick={() => onChangePage(page - 1)}
                disabled={page === 1}
                className={`min-w-28 p-2 border border-gray-400 rounded-md transition-all ${
                    page === 1
                        ? "cursor-not-allowed bg-gray-200"
                        : "cursor-pointer hover:bg-blue-600 hover:text-white"
                }`}
            >
                Trang trước
            </button>
            <div>
                {isEdit ? (
                    <input
                        type="number"
                        autoFocus
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onBlur={handleInputSubmit}
                        onKeyDown={handleKeyDown}
                        className="w-full p-2 border-2 border-blue-500 rounded-md text-center outline-none"
                        min="1"
                        max={totalPages}
                    />
                ) : (
                    <span
                        onClick={() => setIsEdit(true)}
                        className="min-w-28 text-center p-2 border border-gray-400 rounded-md"
                    >
                        {page} / {totalPages}
                    </span>
                )}
            </div>
            <button
                onClick={() => onChangePage(page + 1)}
                disabled={page === totalPages}
                className={`min-w-28 p-2 border border-gray-400 rounded-md transition-all ${
                    page === totalPages
                        ? "cursor-not-allowed bg-gray-200"
                        : "cursor-pointer hover:bg-blue-600 hover:text-white"
                }`}
            >
                Trang sau
            </button>
        </div>
    );
}
