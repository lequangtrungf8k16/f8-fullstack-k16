import { authService } from "../service/authService";
import { tokenService } from "../service/tokenService";
import { storageService } from "../service/storageService";

const authForm = () => {
    return `
    <div class="js-auth-overlay hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-sm transition-opacity"></div>

    <div class="js-auth-modal hidden fixed z-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md p-8 bg-gray-900 text-white rounded-xl shadow-2xl border border-gray-700">
        
        <div id="login-form">
            <h3 class="text-3xl text-center font-bold mb-6">Đăng nhập</h3>
            <form class="flex flex-col gap-4">
                <div class="flex flex-col gap-1">
                    <label for="login-email" class="text-sm text-gray-400">Email</label>
                    <input id="login-email" name="email" autocomplete="username" class="js-login-email w-full bg-gray-800 border border-gray-600 focus:border-white outline-none px-4 py-3 rounded-lg transition-colors" type="email" placeholder="name@example.com">
                </div>
                <div class="flex flex-col gap-1">
                    <label for="login-password" class="text-sm text-gray-400">Mật khẩu</label>
                    <input id="login-password" name="password" autocomplete="current-password" class="js-login-password w-full bg-gray-800 border border-gray-600 focus:border-white outline-none px-4 py-3 rounded-lg transition-colors" type="password" placeholder="Nhập mật khẩu">
                </div>
                
                <button type="submit" class="js-btn-login mt-4 w-full bg-white text-black font-bold py-3 rounded-full cursor-pointer hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    Đăng nhập
                </button>
            </form>
            <p class="mt-6 text-center text-gray-400 text-sm">
                Chưa có tài khoản? 
                <button class="js-switch-to-register text-white font-bold cursor-pointer hover:underline">Đăng ký ngay</button>
            </p>
        </div>

        <div id="register-form" class="hidden">
            <h3 class="text-3xl text-center font-bold mb-6">Đăng ký</h3>
            <form class="flex flex-col gap-4">
                <div class="flex flex-col gap-1">
                    <label for="reg-name" class="text-sm text-gray-400">Tên hiển thị</label>
                    <input id="reg-name" name="name" autocomplete="name" class="js-reg-name w-full bg-gray-800 border border-gray-600 focus:border-white outline-none px-4 py-3 rounded-lg transition-colors" type="text" placeholder="Tên của bạn">
                </div>
                <div class="flex flex-col gap-1">
                    <label for="reg-email" class="text-sm text-gray-400">Email</label>
                    <input id="reg-email" name="email" autocomplete="username" class="js-reg-email w-full bg-gray-800 border border-gray-600 focus:border-white outline-none px-4 py-3 rounded-lg transition-colors" type="email" placeholder="name@example.com">
                </div>
                <div class="flex flex-col gap-1">
                    <label for="reg-password" class="text-sm text-gray-400">Mật khẩu</label>
                    <input id="reg-password" name="password" autocomplete="new-password" class="js-reg-password w-full bg-gray-800 border border-gray-600 focus:border-white outline-none px-4 py-3 rounded-lg transition-colors" type="password" placeholder="Nhập mật khẩu">
                </div>
                <div class="flex flex-col gap-1">
                    <label for="reg-confirm" class="text-sm text-gray-400">Nhập lại mật khẩu</label>
                    <input id="reg-confirm" name="confirm-password" autocomplete="new-password" class="js-reg-confirm-password w-full bg-gray-800 border border-gray-600 focus:border-white outline-none px-4 py-3 rounded-lg transition-colors" type="password" placeholder="Xác nhận mật khẩu">
                </div>
                
                <button type="submit" class="js-btn-register mt-4 w-full bg-white text-black font-bold py-3 rounded-full cursor-pointer hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    Đăng ký
                </button>
            </form>
            <p class="mt-6 text-center text-gray-400 text-sm">
                Đã có tài khoản? 
                <button class="js-switch-to-login text-white font-bold cursor-pointer hover:underline">Đăng nhập</button>
            </p>
        </div>

        <button class="js-close-auth absolute top-4 right-4 text-gray-400 hover:text-white">
            <i class="fa-solid fa-xmark text-xl"></i>
        </button>
    </div>    
    `;
};

const setLoading = (btnSelector, isLoading) => {
    const btn = document.querySelector(btnSelector);
    if (!btn) return;
    if (isLoading) {
        btn.setAttribute("disabled", "true");
        btn.innerHTML =
            '<i class="fa-solid fa-circle-notch fa-spin"></i> Đang xử lý...';
    } else {
        btn.removeAttribute("disabled");
        btn.innerText = btnSelector.includes("login") ? "Đăng nhập" : "Đăng ký";
    }
};

export const initAuthEvents = () => {
    const overlay = document.querySelector(".js-auth-overlay");
    const modal = document.querySelector(".js-auth-modal");
    const loginForm = document.querySelector("#login-form");
    const registerForm = document.querySelector("#register-form");

    if (!modal) return;

    // Chuyển đổi tab
    document
        .querySelector(".js-switch-to-register")
        ?.addEventListener("click", (e) => {
            e.preventDefault();
            loginForm.classList.add("hidden");
            registerForm.classList.remove("hidden");
        });

    document
        .querySelector(".js-switch-to-login")
        ?.addEventListener("click", (e) => {
            e.preventDefault();
            registerForm.classList.add("hidden");
            loginForm.classList.remove("hidden");
        });

    const closeModal = () => {
        overlay.classList.add("hidden");
        modal.classList.add("hidden");
    };
    overlay.addEventListener("click", closeModal);
    document
        .querySelector(".js-close-auth")
        ?.addEventListener("click", closeModal);

    // Xử lý LOGIN
    document
        .querySelector(".js-btn-login")
        ?.addEventListener("click", async (e) => {
            e.preventDefault();

            const emailEl = document.querySelector(".js-login-email");
            const passEl = document.querySelector(".js-login-password");
            const email = emailEl.value.trim();
            const password = passEl.value.trim();

            if (!email || !password)
                return alert("Vui lòng nhập đầy đủ thông tin");

            // Bắt đầu loading
            setLoading(".js-btn-login", true);

            try {
                const res = await authService.login(email, password);
                await handleAuthSuccess(res.data);
            } catch (error) {
                alert(error.response?.data?.message || "Đăng nhập thất bại");
                setLoading(".js-btn-login", false); // Tắt loading nếu lỗi
            }
        });

    // Xử lý REGISTER
    document
        .querySelector(".js-btn-register")
        ?.addEventListener("click", async (e) => {
            e.preventDefault();

            const name = document.querySelector(".js-reg-name").value.trim();
            const email = document.querySelector(".js-reg-email").value.trim();
            const password = document
                .querySelector(".js-reg-password")
                .value.trim();
            const confirmPassword = document
                .querySelector(".js-reg-confirm-password")
                .value.trim();

            if (!name || !email || !password || !confirmPassword)
                return alert("Vui lòng nhập đầy đủ thông tin");
            if (password !== confirmPassword)
                return alert("Mật khẩu không khớp");

            setLoading(".js-btn-register", true);

            try {
                const res = await authService.register(
                    name,
                    email,
                    password,
                    confirmPassword
                );
                await handleAuthSuccess(res.data);
            } catch (error) {
                alert(error.response?.data?.message || "Đăng ký thất bại");
                setLoading(".js-btn-register", false);
            }
        });
};

async function handleAuthSuccess(data) {
    tokenService.setAccessToken(data.access_token);
    tokenService.setRefreshToken(data.refresh_token);

    try {
        const userRes = await authService.getMe();
        storageService.setUserInfo(userRes.data.data || userRes.data);
        window.location.reload();
    } catch (error) {
        console.error("Lỗi lấy thông tin user", error);
        window.location.reload();
    }
}

export default authForm;
