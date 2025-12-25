import { useDispatch, useSelector } from "react-redux";

export const Cart = () => {
    const { cartItems, isCartOpen } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const totalAmount = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const closeCart = () => {
        dispatch({ type: "cart/toggle", payload: false });
    };

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
                    isCartOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
                onClick={closeCart}
            ></div>

            {/* Giỏ hàng */}
            <div
                className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
                    isCartOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div className="flex justify-between items-center p-4 border-b bg-gray-50">
                    <button
                        onClick={closeCart}
                        className="w-10 h-10 rounded-md pb-2 border border-gray-400 text-3xl font-bold text-gray-500 transition-colors cursor-pointer hover:text-red-500"
                    >
                        &times;
                    </button>
                    <h2 className="text-xl font-bold text-gray-800">
                        Giỏ hàng
                        <span className="mx-2">({totalCount})</span>
                    </h2>
                </div>

                {/* Các sản phẩm trong giỏ hàng */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {cartItems.length === 0 ? (
                        <p className="text-2xl text-center text-gray-600 mt-10">
                            Chưa có sản phẩm nào!
                        </p>
                    ) : (
                        cartItems.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center gap-4 border-b pb-4"
                            >
                                <img
                                    src={item.thumbnail}
                                    alt=""
                                    className="w-16 h-16 object-cover rounded border"
                                />

                                <div className="flex-1 flex flex-col justify-between gap-2">
                                    <h4 className="text-xl text-gray-800 line-clamp-1">
                                        {item.title}
                                    </h4>
                                    <p className="text-red-500">
                                        {item.price} $
                                    </p>
                                </div>

                                {/* Tăng giảm sản phẩm */}
                                <div className="flex flex-col items-center">
                                    <button
                                        className="w-6 h-6 bg-gray-200 rounded hover:bg-gray-300 flex items-center justify-center cursor-pointer"
                                        onClick={() =>
                                            dispatch({
                                                type: "cart/updateQuantity",
                                                payload: {
                                                    id: item.id,
                                                    quantity: item.quantity - 1,
                                                },
                                            })
                                        }
                                    >
                                        -
                                    </button>

                                    <span className="mx-3 font-medium">
                                        {item.quantity}
                                    </span>

                                    <button
                                        className="w-6 h-6 bg-gray-200 rounded hover:bg-gray-300 flex items-center justify-center cursor-pointer"
                                        onClick={() =>
                                            dispatch({
                                                type: "cart/updateQuantity",
                                                payload: {
                                                    id: item.id,
                                                    quantity: item.quantity + 1,
                                                },
                                            })
                                        }
                                    >
                                        +
                                    </button>
                                </div>

                                <button
                                    className="text-red-500 hover:text-red-700 text-3xl h-fit self-center"
                                    onClick={() =>
                                        dispatch({
                                            type: "cart/remove",
                                            payload: item.id,
                                        })
                                    }
                                >
                                    &times;
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {/* Tổng số tiền */}
                <div className="p-4 bg-violet-950">
                    <div className="flex gap-2 text-white text-lg font-bold">
                        <span>Tổng cộng:</span>
                        <span>{totalAmount.toFixed(2)} $</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;
