import { authService } from "../service/authService";
import { storageService } from "../service/storageService";

const userModals = () => {
    return `
    <div class="js-user-modal-overlay hidden fixed inset-0 z-100 bg-black/80 backdrop-blur-sm"></div>

    <div class="js-profile-modal hidden fixed z-101 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md p-6 bg-gray-900 text-white rounded-xl shadow-2xl border border-gray-700">
        <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-bold">Cập nhật thông tin</h3>
            <button class="js-close-user-modal hover:text-gray-300"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <form class="flex flex-col gap-4">
            <div>
                <label class="text-xs text-gray-400 uppercase font-bold">Tên hiển thị</label>
                <input autocomplete="name" class="js-update-name w-full mt-1 bg-gray-800 border border-transparent focus:border-white outline-none px-4 py-2 rounded" type="text">
            </div>
            <div>
                <label class="text-xs text-gray-400 uppercase font-bold">Email</label>
                <input autocomplete="email" class="js-update-email w-full mt-1 bg-gray-800 border border-transparent focus:border-white outline-none px-4 py-2 rounded" type="email">
            </div>
            <button class="js-save-profile mt-2 w-full bg-white text-black font-bold py-2 rounded hover:bg-gray-200">Lưu thay đổi</button>
        </form>
    </div>

    <div class="js-password-modal hidden fixed z-101 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md p-6 bg-gray-900 text-white rounded-xl shadow-2xl border border-gray-700">
        <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-bold">Đổi mật khẩu</h3>
            <button class="js-close-user-modal hover:text-gray-300"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <form class="flex flex-col gap-4">
            <input type="text" autocomplete="username" value="user_hien_tai" class="hidden">
            <div>
                 <input autocomplete="current-password" class="js-old-pass w-full bg-gray-800 px-4 py-2 rounded outline-none border border-transparent focus:border-white" type="password" placeholder="Mật khẩu cũ">
            </div>
            <div>
                <input autocomplete="new-password" class="js-new-pass w-full bg-gray-800 px-4 py-2 rounded outline-none border border-transparent focus:border-white" type="password" placeholder="Mật khẩu mới">
            </div>
            <div>
                <input autocomplete="new-password" class="js-confirm-new-pass w-full bg-gray-800 px-4 py-2 rounded outline-none border border-transparent focus:border-white" type="password" placeholder="Nhập lại mật khẩu mới">
            </div>
            <button class="js-save-password mt-2 w-full bg-white text-black font-bold py-2 rounded hover:bg-gray-200">Đổi mật khẩu</button>
        </form>
    </div>
    `;
};

export const initUserModalEvents = () => {
    const overlay = document.querySelector(".js-user-modal-overlay");
    const profileModal = document.querySelector(".js-profile-modal");
    const passwordModal = document.querySelector(".js-password-modal");

    const closeAll = () => {
        overlay?.classList.add("hidden");
        profileModal?.classList.add("hidden");
        passwordModal?.classList.add("hidden");
    };

    overlay?.addEventListener("click", closeAll);
    document
        .querySelectorAll(".js-close-user-modal")
        .forEach((btn) => btn.addEventListener("click", closeAll));

    const user = storageService.getUserInfo();
    const updateNameInput = document.querySelector(".js-update-name");
    const updateEmailInput = document.querySelector(".js-update-email");

    if (user && updateNameInput) {
        updateNameInput.value = user.name || "";
        updateEmailInput.value = user.email || "";
    }

    document
        .querySelector(".js-save-profile")
        ?.addEventListener("click", async (e) => {
            e.preventDefault();
            try {
                const name = updateNameInput.value;
                const email = updateEmailInput.value;
                await authService.updateProfile({ name, email });

                const newUser = { ...user, name, email };
                storageService.setUserInfo(newUser);
                alert("Cập nhật thành công!");
                window.location.reload();
            } catch (error) {
                alert(
                    "Cập nhật thất bại: " +
                        (error.response?.data?.message || "Lỗi server")
                );
            }
        });

    document
        .querySelector(".js-save-password")
        ?.addEventListener("click", async (e) => {
            e.preventDefault();
            const oldPassword = document.querySelector(".js-old-pass").value;
            const password = document.querySelector(".js-new-pass").value;
            const confirmPassword = document.querySelector(
                ".js-confirm-new-pass"
            ).value;

            try {
                await authService.changePassword({
                    oldPassword,
                    password,
                    confirmPassword,
                });
                alert("Đổi mật khẩu thành công!");
                closeAll();
            } catch (error) {
                alert(error.response?.data?.message || "Đổi mật khẩu thất bại");
            }
        });
};

export default userModals;
