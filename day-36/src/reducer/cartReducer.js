export const initialState = {
    cartItems: [],
    isCartOpen: false,
};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        // Mở giỏ hàng
        case "cart/toggle": {
            return {
                ...state,
                isCartOpen: action.payload,
            };
        }
        // Thêm sản phẩm
        case "cart/add": {
            const newItem = action.payload;
            const existItem = state.cartItems.find(
                (item) => item.id === newItem.id
            );
            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((item) =>
                        item.id === newItem.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    ),
                };
            } else {
                return {
                    ...state,
                    cartItems: [
                        ...state.cartItems,
                        { ...newItem, quantity: 1 },
                    ],
                };
            }
        }
        // Xóa sản phẩm trong giỏ hàng
        case "cart/remove": {
            return {
                ...state,
                cartItems: state.cartItems.filter(
                    (item) => item.id !== action.payload
                ),
            };
        }

        // Cập nhật tăng giảm sản phẩm trong giỏ hàng
        case "cart/updateQuantity": {
            const { id, quantity } = action.payload;
            return {
                ...state,
                cartItems: state.cartItems.map((item) =>
                    item.id === id
                        ? { ...item, quantity: quantity < 1 ? 1 : quantity }
                        : item
                ),
            };
        }
        default: {
            return state;
        }
    }
};
