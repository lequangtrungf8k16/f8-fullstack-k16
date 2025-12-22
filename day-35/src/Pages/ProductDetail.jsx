import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import shopApi from "../Utils/shopApi";

export default function ProductDetail() {
    const { id } = useParams();

    const [productDetail, setProductDetail] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                setIsLoading(true);
                setIsError(false);

                const res = await shopApi.get(`/products/${id}`);

                setProductDetail(res.data);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };
        if (id) {
            fetchProductDetail();
        }
    }, [id]);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center gap-2 p-4">
                <div className="w-16 h-16 border-4 border-dashed border-blue-500 rounded-full animate-spin"></div>
                <p className="text-3xl font-bold">Đang tải dữ liệu...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <p className="mt-10 text-center text-4xl font-bold text-red-500">
                Đã có lỗi: {isError}
            </p>
        );
    }

    return (
        <div className="mt-10">
            <h3 className="text-center text-5xl font-bold">
                Chi tiết sản phẩm
            </h3>

            <article className="flex flex-col justify-between mt-10 px-4 lg:flex-row">
                <div className="flex-1 px-4">
                    <img
                        src={productDetail?.thumbnail}
                        alt={productDetail?.title}
                    />
                </div>
                <div className="flex-1 px-4">
                    <h3 className="mt-4 text-3xl text-gray-800 font-bold text-justify">
                        {productDetail?.title}
                    </h3>
                    <p className="mt-4 text-red-500 font-bold">
                        {productDetail?.price}
                    </p>
                    <p className="mt-4 text-gray-600">
                        {productDetail?.description}
                    </p>
                    <div className="flex gap-4 mt-4 text-white font-bold">
                        <button className="bg-blue-600 shadow-md rounded-md px-4 py-2 cursor-pointer transition-colors hover:bg-blue-400">
                            Thêm vào giỏ
                        </button>
                        <button className="bg-orange-400 shadow-md rounded-md px-4 py-2 cursor-pointer transition-colors hover:bg-orange-600">
                            Mua ngay
                        </button>
                    </div>

                    <hr className="mt-4" />
                    <div className="mt-4 flex gap-4 text-blue-500">
                        <span>
                            <b>Category: </b>
                            {productDetail?.category}
                        </span>
                        <span>
                            <b>DiscountPercentage: </b>
                            {productDetail?.discountPercentage}
                        </span>
                        <span>
                            <b>Rating: </b>
                            {productDetail?.rating}
                        </span>
                        <span>
                            <b>Stock: </b>
                            {productDetail?.stock}
                        </span>
                    </div>
                    <div className="mt-4 flex gap-2 text-blue-500">
                        {productDetail?.tags.map((tag, index) => (
                            <span key={index}>#{tag}</span>
                        ))}
                    </div>
                </div>
            </article>
        </div>
    );
}
