import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import shopApi from "../Utils/shopApi";

export default function ProductDetail() {
    const { id } = useParams();

    const [productDetail, setProductDetail] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const [mainImage, setMainImage] = useState("");

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                setIsLoading(true);
                setIsError(false);

                const res = await shopApi.get(`/products/${id}`);

                setProductDetail(res.data);

                setMainImage(res.data.images[0] || res.data.thumbnail);
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

    const handlePrev = () => {
        const images = productDetail?.images || [];
        if (images.length === 0) return;
        const currentIndex = images.indexOf(mainImage);
        const newIndex = (currentIndex - 1 + images.length) % images.length;

        setMainImage(images[newIndex]);
    };

    const handleNext = () => {
        const images = productDetail?.images || [];
        if (images.length === 0) return;
        const currentIndex = images.indexOf(mainImage);
        const newIndex = (currentIndex + 1) % images.length;

        setMainImage(images[newIndex]);
    };

    return (
        <div className="mt-10 px-4">
            <h3 className="text-center text-5xl font-bold">
                Chi tiết sản phẩm
            </h3>

            <article className="flex flex-col justify-between mt-10 px-4 lg:flex-row">
                <div className="flex-1 px-4">
                    <div className="bg-gray-200 rounded-md">
                        <img src={mainImage} alt={productDetail?.title} />
                    </div>

                    <div className="flex justify-center items-center gap-4 my-4 overflow-x-auto">
                        {productDetail?.images.length > 2 ? (
                            <button
                                onClick={handlePrev}
                                className="font-bold cursor-pointer"
                            >
                                Trước
                            </button>
                        ) : (
                            ""
                        )}
                        {productDetail?.images?.map((image, index) => (
                            <div key={index} 
                                className="w-60 overflow-x-hidden">
                                <img
                                    onClick={() => setMainImage(image)}
                                    src={image}
                                    alt={productDetail?.title}
                                    className={`mt-6 w-20 h-20 object-cover cursor-pointer rounded-md border-2 transition-all duration-300 shadow-sm ${
                                        mainImage === image
                                            ? "border-blue-500 -translate-y-4 shadow-xl scale-110 z-10" // Khi được chọn: Nhấc lên, phóng to, đổ bóng đậm
                                            : "border-transparent opacity-60 hover:opacity-100 hover:-translate-y-1" // Khi chưa chọn: Mờ hơn, rê chuột vào nhấc nhẹ
                                    }`}
                                />
                            </div>
                        ))}
                        {productDetail?.images.length > 2 ? (
                            <button
                                onClick={handleNext}
                                className="font-bold cursor-pointer"
                            >
                                Sau
                            </button>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
                <div className="flex-1 px-4">
                    <h3 className="mt-4 text-3xl text-gray-800 font-bold text-justify">
                        {productDetail?.title}
                    </h3>
                    <p className="mt-4 text-red-500 font-bold">
                        {productDetail?.price} $
                    </p>
                    <p className="mt-4 text-gray-600">
                        
                        {productDetail?.description}
                    </p>
                    <div className="mt-4 flex gap-4 text-blue-500">
                        <span>
                            <b>Rating: </b>
                            {productDetail?.rating}
                        </span>
                        <span>
                            <b>Stock: </b>
                            {productDetail?.stock}
                        </span>
                    </div>
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
                    </div>
                    <div className="my-4 flex gap-2 text-blue-500">
                        {productDetail?.tags.map((tag, index) => (
                            <span key={index}>#{tag}</span>
                        ))}
                    </div>
                </div>
            </article>
        </div>
    );
}
