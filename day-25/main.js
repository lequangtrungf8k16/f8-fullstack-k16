const products = [
    { id: 1, name: "Sản phẩm 1", price: 1000 },
    { id: 2, name: "Sản phẩm 2", price: 2000 },
    { id: 3, name: "Sản phẩm 3", price: 3000 },
    { id: 4, name: "Sản phẩm 4", price: 4000 },
];

const productList = document.querySelector("#product-list");
const cartSection = document.querySelector("#cart-section");
const actionDiv = document.querySelector("#action-btn");
const cartHead = document.querySelector("#cart-head");
const cartInfo = document.querySelector("#cart-info");
const cartTotalEl = document.querySelector("#cart-total");
const updateCartBtn = document.querySelector("#update-cart");
const clearCartBtn = document.querySelector("#clear-cart");

let cart = [];

// Hiển thị danh sách sản phẩm
function showProducts() {
    productList.innerHTML = products
        .map(
            (product, index) => `
        <tr>
            <td class="border-collapse border border-gray-500 text-center">${
                index + 1
            }</td>
            <td class="border-collapse border border-gray-500 px-2">${
                product.name
            }</td>
            <td class="border-collapse border border-gray-500 px-2 text-right">${
                product.price
            }</td>
            <td class="flex flex-col border-collapse border border-gray-500">
                <input type="number" min="1" value="1" class="w-full text-center product-qty focus:outline-none" data-id="${
                    product.id
                }" />

                <button class="add-to-cart bg-gray-400 border border-gray-800 text-xs text-white hover:bg-blue-800 hover:cursor-pointer" data-id="${
                    product.id
                }">
                    Thêm vào giỏ
                </button>
            </td>
        </tr>`
        )
        .join("");
    // console.log(productList);
}

// Thêm sản phẩm vào giỏ
function addCart(id, quantity) {
    const product = products.find((p) => p.id === id);
    const existing = cart.find((item) => item.id === id);

    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({ ...product, quantity });
    }

    showCart();
}

// Hiển thị giỏ hàng
function showCart() {
    const emptyCartMsg = document.querySelector("#empty-cart");
    if (cart.length === 0) {
        cartHead.classList.add("hidden");
        cartSection.classList.add("hidden");
        emptyCartMsg.classList.remove("hidden");
        actionDiv.classList.add("hidden");
        return;
    }

    cartHead.classList.remove("hidden");
    cartSection.classList.remove("hidden");
    emptyCartMsg.classList.add("hidden");
    actionDiv.classList.remove("hidden");

    // Tính tổng số lượng
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

    // Tính tổng tiền
    const totalPrice = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    // Hiển thị các sản phẩm trong giỏ
    const rows = cart
        .map(
            (item, index) => `
            <tr>
                <td class="border border-gray-500 text-center">${index + 1}</td>
                <td class="border border-gray-500 px-2">${item.name}</td>
                <td class="border border-gray-500 px-2 text-right">${
                    item.price
                }</td>
                <td class="border border-gray-500 px-2 text-center">
                    <input type="number" min="1" value="${item.quantity}" 
                        class="w-full text-center qty-input focus:outline-none cart-qty" data-id="${
                            item.id
                        }" />
                </td>
                <td class="border border-gray-500 px-2 text-right">${
                    item.price * item.quantity
                }</td>
                <td class="border border-gray-500 text-center">
                    <button class="del-item w-full py-1 bg-red-600 border border-gray-800 text-xs text-white hover:bg-red-800 hover:cursor-pointer delete-item" 
                        data-id="${item.id}">Xóa</button>
                </td>
            </tr>`
        )
        .join("");

    // Hiển thị dòng tổng
    const totalRow = `
        <tr class="font-bold">
            <td colspan="3" class="border border-gray-500">Tổng</td>
            <td class="border border-gray-500 text-center">${totalQuantity}</td>
            <td class="border border-gray-500 px-2 text-right">${totalPrice}</td>
            <td class="border border-gray-500"></td>
        </tr>`;

    cartInfo.innerHTML = rows + totalRow;
}

// Cập nhật giỏ hàng
function updateCart() {
    const qtyInputs = document.querySelectorAll(".cart-qty");
    qtyInputs.forEach((input) => {
        const id = +input.dataset.id;
        const newQty = +input.value;
        const item = cart.find((i) => i.id === id);
        if (item) item.quantity = newQty;
    });
    showCart();
}

// Xóa toàn bộ giỏ hàng
function clearCart() {
    if (confirm("Bạn có chắc chắn muốn xóa?")) {
        cart = [];
        alert("Xóa thành công");
        showCart();
    }
}

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-to-cart")) {
        const id = Number(e.target.dataset.id);
        const input = document.querySelector(`.product-qty[data-id="${id}"]`);
        const qty = +input.value || 1;
        addCart(id, qty);
    }

    if (e.target.classList.contains("delete-item")) {
        const id = Number(e.target.dataset.id);
        if (confirm("Bạn có chắc chắn muốn xóa?")) {
            cart = cart.filter((item) => item.id !== id);
            alert("Xóa thành công");

            showCart();
        }
    }
});

updateCartBtn.addEventListener("click", updateCart);
clearCartBtn.addEventListener("click", clearCart);

showProducts();
