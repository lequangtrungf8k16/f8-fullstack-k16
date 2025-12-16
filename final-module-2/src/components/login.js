import { loginApi } from "../api/authApi";
import { tokenService, refreshTokenService } from "../service/token";

const login = () => {
    return `
    <div class="js-overlay hidden absolute inset-0 z-90 bg-gray-500/50 backdrop-blur-sm"></div>
    <div class="js-form-login hidden absolute z-999 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-md p-8 bg-[#212121] text-white rounded-xl shadow-2xl border border-gray-700">
        <h3 class="text-3xl text-center font-bold mb-6">Đăng nhập</h3>
        
        <form class="js-login-form flex flex-col gap-4">
            <div class="flex flex-col gap-2">
                <label class="text-sm text-gray-400">Email</label>
                <input class="js-email w-full bg-[#0f0f0f] border border-gray-600 focus:border-white outline-none px-4 py-3 rounded-lg transition-colors" type="email" placeholder="example@email.com">
            </div>
            <div class="flex flex-col gap-2">
                <label class="text-sm text-gray-400">Mật khẩu</label>
                <input class="js-password w-full bg-[#0f0f0f] border border-gray-600 focus:border-white outline-none px-4 py-3 rounded-lg transition-colors" type="password" placeholder="••••••">
            </div>

            <button class="js-submit-btn mt-4 bg-white text-black font-medium rounded-full hover:bg-gray-200 px-4 py-3 cursor-pointer transition-colors">
                Đăng nhập
            </button>
            <p class="js-error-msg text-red-500 text-sm text-center hidden"></p>
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
            loginForm.classList.remove("hidden");
            overlay.classList.remove("hidden");
        } else if (e.target.closest(".js-overlay")) {
            loginForm.classList.add("hidden");
            overlay.classList.add("hidden");
        }
    });
};

export const initLogin = () => {
    const formEl = document.querySelector(".js-login-form");
    if (!formEl) return;

    formEl.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.querySelector(".js-email").value.trim();
        const password = document.querySelector(".js-password").value.trim();
        const errorMsg = document.querySelector(".js-error-msg");

        if (!email || !password) {
            errorMsg.textContent = "Vui lòng điền đầy đủ thông tin";
            errorMsg.classList.remove("hidden");
            return;
        }

        try {
            const submitBtn = document.querySelector(".js-submit-btn");
            const originalText = submitBtn.textContent;
            submitBtn.textContent = "Đang xử lý...";
            submitBtn.disabled = true;

            const data = await loginApi(email, password);

            if (data && data.access_token) {
                tokenService.save(data.access_token);
                if (data.refreshToken) {
                    refreshTokenService.save(data.refreshToken);
                }
                window.location.reload();
            }
        } catch (error) {
            console.error(error);
            errorMsg.textContent =
                error.message || "Email hoặc mật khẩu chưa đúng";
            errorMsg.classList.remove("hidden");
        } finally {
            const submitBtn = document.querySelector(".js-submit-btn");
            submitBtn.textContent = "Đăng nhập";
            submitBtn.disabled = false;
        }
    });
};

export default login;
