import { useEffect, useState } from "react";
import productsApi from "../Utils/ProductsApi";
import ProductItem from "../components/ProductItem";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                setIsError(null);
                const res = await productsApi(`/products?limit=8`);
                setProducts(res.data.products);
            } catch (error) {
                const message =
                    error?.response?.data.message ||
                    error.message ||
                    "Lỗi không xác định";
                console.log(message);

                setIsError(message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (isLoading) {
        return (
            <div className="flex flex-col justify-center items-center gap-4 my-20">
                <div className="w-16 h-16 border-4 border-dashed border-blue-500 rounded-full animate-spin"></div>
                <h3 className="text-3xl text-center font-bold">
                    Đang tải dữ liệu...
                </h3>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex flex-col justify-center items-center gap-4 my-20">
                <h3 className="text-4xl text-center text-red-500 font-bold">
                    Đã có lỗi xảy ra
                </h3>
                <p className="text-2xl text-center text-red-500 font-bold">
                    Chi tiết: {isError}
                </p>
            </div>
        );
    }

    return (
        <div className="mt-10 p-8">
            <h2 className="text-3xl font-bold">Sản phẩm</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                    <ProductItem key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}
