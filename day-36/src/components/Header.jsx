import { useDispatch, useSelector } from "react-redux";

const Header = () => {
    const dispatch = useDispatch();

    const cartItems = useSelector((state) => state.cart.cartItems);
    const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <header className="fixed top-0 right-0 left-0 z-50 flex justify-between items-center gap-2 px-8 py-4 bg-violet-950 text-white">
            <h2 className="text-2xl font-bold">Redux Shopping Cart</h2>
            <button
                onClick={() => dispatch({ type: "cart/toggle", payload: true })}
                className="flex gap-2 cursor-pointer"
            >
                <span>Giỏ hàng</span>
                <span className="w-6 h-6 rounded-full bg-gray-400">
                    {totalCount}
                </span>
            </button>
        </header>
    );
};

export default Header;
