import shopApi from "../Utils/shopApi";

import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Pagination from "../Components/Pagination";

export default function Products() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [products, setProducts] = useState([]);

    const [inputValue, setInputValue] = useState(searchParams.get("q") || "");
    const searchQuery = searchParams.get("q") || "";
    const navigate = useNavigate();

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const limit = 8;

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setSearchParams({ q: inputValue });
            setPage(1);
        }, 700);
        return () => clearTimeout(timeoutId);
    }, [inputValue, setSearchParams]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                setIsError(false);
                const skip = (page - 1) * limit;

                const endpoint = searchQuery ? "/products/search" : "/products";

                const res = await shopApi.get(endpoint, {
                    params: {
                        limit: limit,
                        skip: skip,
                        q: searchQuery,
                    },
                });

                setProducts(res.data.products);

                setTotalPages(Math.ceil(res.data.total / limit));
            } catch (error) {
                console.log(error);
                const message = error?.response?.data?.message || error.message;
                setIsError(message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, [page, searchQuery]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    if (isLoading) {
        return (
            <div className="mt-20 flex flex-col items-center gap-2 p-4">
                <div className="w-16 h-16 border-4 border-dashed border-blue-500 rounded-full animate-spin"></div>
                <p className="text-3xl font-bold">Đang tải dữ liệu...</p>
            </div>
        );
    }

    if (isError)
        return (
            <p className="mt-20 text-center text-4xl font-bold text-red-500">
                Đã có lỗi: {isError}
            </p>
        );

    return (
        <div className="my-20 px-4">
            <h2 className="text-2xl font-bold">Sản phẩm</h2>
            <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                type="text"
                placeholder="Tìm kiếm..."
                className="w-full sm:w-100 mt-4 px-3 py-2 border border-gray-400 rounded-md shadow-md"
            />
            {!isLoading ? (
                <section className="grid grid-cols-1 gap-8 mt-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {products?.length > 0 ? (
                        products.map((item) => (
                            <article
                                key={item.id}
                                className="flex flex-col gap-2 overflow-hidden rounded-lg border border-gray-100 shadow-md transition-all hover:shadow-xl group"
                            >
                                <div className="aspect-square overflow-hidden bg-gray-200">
                                    <img
                                        onClick={() =>
                                            navigate(`/product/${item.id}`)
                                        }
                                        src={item?.thumbnail}
                                        alt={item?.title}
                                        className="w-full object-cover cursor-pointer transition-transform duration-300 group-hover:scale-110"
                                    />
                                </div>
                                <div className="flex flex-col flex-1 justify-between gap-2 px-4">
                                    <h3
                                        onClick={() =>
                                            navigate(`/product/${item.id}`)
                                        }
                                        className="flex-1 text-xl font-bold text-gray-900 line-clamp-2 cursor-pointer"
                                    >
                                        {item?.title}
                                    </h3>
                                    <div className="flex flex-col items-start mt-auto">
                                        <p className="text-xl font-bold text-red-600">
                                            {item?.price} $
                                        </p>
                                        <button
                                            onClick={() =>
                                                navigate(`/product/${item.id}`)
                                            }
                                            className="py-2 text-blue-800 underline cursor-pointer transition-colors hover:text-blue-600"
                                        >
                                            Xem chi tiết
                                        </button>
                                    </div>
                                </div>
                            </article>
                        ))
                    ) : (
                        <p className="col-span-full mt-20 text-3xl font-bold text-center">
                            Không tìm thấy sản phẩm nào
                        </p>
                    )}
                </section>
            ) : (
                <div>
                    <p className="text-3xl text-red-500 font-bold">
                        {isError.message}
                    </p>
                </div>
            )}
            {products.length > 0 ? (
                <Pagination
                    page={page}
                    totalPages={totalPages}
                    onChangePage={handlePageChange}
                />
            ) : (
                ""
            )}
        </div>
    );
}
