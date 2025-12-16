export const SortPosts = ({ currentOrder, onSortChange }) => {
    return (
        <div className="flex gap-2 m-4">
            <button
                onClick={() => {
                    onSortChange("asc");
                }}
                className={`p-2 border border-gray-400 shadow-md rounded-sm cursor-pointer ${
                    currentOrder === "asc"
                        ? "bg-blue-500 text-white"
                        : "hover:bg-blue-500 hover:text-white"
                }`}
            >
                Mới nhất
            </button>
            <button
                onClick={() => onSortChange("desc")}
                className={`p-2 border border-gray-400 shadow-md rounded-sm cursor-pointer ${
                    currentOrder === "desc"
                        ? "bg-blue-500 text-white"
                        : "hover:bg-blue-500 hover:text-white"
                }`}
            >
                Cũ nhất
            </button>
        </div>
    );
};
