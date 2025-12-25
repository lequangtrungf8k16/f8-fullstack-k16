import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function ProductItem({ product }) {
    const dispatch = useDispatch();
    const [isAdded, setIsAdded] = useState(false);

    useEffect(() => {
        let timer;
        if (isAdded) {
            timer = setTimeout(() => setIsAdded(false), 2000);
        }
        return () => clearTimeout(timer);
    }, [isAdded]);

    const handleAddToCart = () => {
        setIsAdded(true);
        setTimeout(() => {
            dispatch({
                type: "cart/add",
                payload: product,
            });
        }, 2000);
        return () => clearTimeout;
    };

    return (
        // Thông tin sản phẩm
        <div className="flex flex-col justify-center items-center gap-2 overflow-hidden shadow-xl mt-10 border border-gray-200 bg-gray-100 rounded-md">
            {/* Ảnh sản phẩm */}
            <div className="w-full bg-gray-200">
                <img
                    onClick={handleAddToCart}
                    src={product.thumbnail}
                    alt={product.title}
                    className="py-4 mx-auto aspect-square transition-transform cursor-pointer hover:scale-105"
                />
            </div>
            <div className="flex flex-col justify-between items-center gap-2">
                <h3
                    onClick={handleAddToCart}
                    className="text-xl font-bold line-clamp-1 transition-colors cursor-pointer hover:text-violet-950"
                >
                    {product.title}
                </h3>
                <p className="text-red-500 font-bold">{product.price} $</p>
            </div>
            {/* Nút Thêm vào giỏ hàng */}
            <button
                onClick={handleAddToCart}
                disabled={isAdded}
                className={`w-full bg-violet-950 py-3 text-white font-bold transition-colors ${
                    isAdded
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer hover:bg-violet-800"
                }`}
            >
                {isAdded ? "Added" : "Add to cart"}
            </button>
        </div>
    );
}
