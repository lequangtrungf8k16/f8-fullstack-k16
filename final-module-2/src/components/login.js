const login = () => {
    return `
    <div class="js-overlay hidden absolute inset-0 z-90 bg-gray-500 opacity-50"></div>

    <div class="js-form-login hidden absolute z-999 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-md p-8 bg-white text-black rounded-md shadow-2xl shadow-black">
        <h3 class="text-3xl text-center font-bold">Đăng nhập</h3>
        <form class="flex flex-col justify-between gap-4 mt-4">
            <label>
                Tên tài khoản
                <input class="w-full border border-gray-500 mt-2 px-4 py-2 rounded-md" type="text" id="username" placeholder="Nhập tên tài khoản...">
            </label>
            <label>
                Mật khẩu
                <input class="w-full border border-gray-500 mt-2 px-4 py-2 rounded-md" type="password" id="password" placeholder="Nhập mật khẩu...">
            </label>
            <label>
                Nhập lại mật khẩu
                <input class="w-full border border-gray-500 mt-2 px-4 py-2 rounded-md" type="password" id="re-password" placeholder="Nhập lại mật khẩu...">
            </label>
            <div class="flex justify-between items-center gap-4">
                <label class="flex items-center gap-2 cursor-pointer">
                    <input class="border border-gray-500" type="checkbox" id="save-password">
                    Lưu mật khẩu
                </label>
                <a class="text-blue-700 underline" href="#!">Quên mật khẩu?</a>
            </div>
            <div class="mx-auto">
                <button class="border bg-blue-700 text-white rounded-md cursor-pointer hover:bg-blue-500  px-4 py-2">Đăng nhập</button>
            </div>
            
        </form>
    </div>    
    `;
};

export const loginFormEl = () => {
    document.addEventListener("click", (e) => {
        const loginForm = document.querySelector(".js-form-login");
        const overlay = document.querySelector(".js-overlay");
        if (!loginForm || !overlay) return;

        if (e.target.closest(".js-login-btn")) {
            loginForm.classList.toggle("hidden");
            overlay.classList.toggle("hidden");
            return;
        }

        if (e.target.closest(".js-form-login")) {
            return;
        }

        if (e.target.closest(".js-overlay")) {
            loginForm.classList.add("hidden");
            overlay.classList.add("hidden");
            return;
        }

        loginForm.classList.add("hidden");
        overlay.classList.add("hidden");
    });
};

export default login;
