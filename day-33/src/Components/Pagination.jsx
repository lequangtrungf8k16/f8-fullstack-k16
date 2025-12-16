export const Pagination = ({ page, totalPages, onChangePage }) => {
    if (totalPages <= 0) return null;

    return (
        <div className="flex justify-center items-center gap-4 mb-8">
            <button
                onClick={() => onChangePage(page - 1)}
                disabled={page === 1}
                className={`border border-gray-400 rounded-md p-2 shadow-md transition-all ${
                    page === 1
                        ? "cursor-not-allowed bg-gray-200"
                        : "cursor-pointer hover:bg-blue-700 hover:text-white hover:translate-y-0.5 hover:shadow-gray-500"
                }`}
            >
                Trang trước
            </button>
            <span className="border border-gray-500 rounded-md p-2">
                {page} / {totalPages}
            </span>
            <button
                onClick={() => onChangePage(page + 1)}
                disabled={page === totalPages}
                className={`border border-gray-400 rounded-md p-2 shadow-md transition-all ${
                    page === totalPages
                        ? "opacity-50 cursor-not-allowed bg-gray-200"
                        : "cursor-pointer hover:bg-blue-700 hover:text-white hover:translate-y-0.5 hover:shadow-gray-500"
                }`}
            >
                Trang sau
            </button>
        </div>
    );
};
