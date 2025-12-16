import { storageService } from "../service/storageService";
import searchInput from "./searchInput";

const Header = () => {
    const user = storageService.getUserInfo();

    return `
    <header class="sticky top-0 z-50 flex justify-between items-center px-4 md:px-8 lg:px-20 py-4 bg-black/90 backdrop-blur-md">  
        ${searchInput()}
        <div class="flex items-center gap-4 ml-auto">
                    
            <button class="text-gray-300 hover:text-white text-xl cursor-pointer p-2 hidden sm:block">
                <i class="fa-brands fa-chromecast"></i>
            </button>            
            ${
                user
                    ? `
                
                <div class="relative group">
                    <button class="js-avatar-btn w-8 h-8 rounded-full bg-linear-to-br from-purple-500 to-blue-500 text-white font-bold flex items-center justify-center cursor-pointer border-2 border-transparent hover:border-white transition-all">
                        ${user.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </button>
                    
                    <div class="js-avatar-menu hidden absolute right-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-xl overflow-hidden ring-1 ring-black ring-opacity-5 z-50">
                        <div class="px-4 py-3 border-b border-gray-700">
                            <p class="text-sm text-white font-bold truncate">${
                                user.name
                            }</p>
                            <p class="text-xs text-gray-400 truncate">${
                                user.email
                            }</p>
                        </div>
                        <ul class="py-1">
                            <li>
                                <a href="#" class="js-open-profile block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">
                                    Thay đổi thông tin cá nhân
                                </a>
                            </li>
                            <li>
                                <a href="#" class="js-open-password block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">
                                    Đổi mật khẩu
                                </a>
                            </li>
                            <li class="border-t border-gray-700 mt-1">
                                <a href="#" class="js-logout block px-4 py-2 text-sm text-red-400 hover:bg-gray-700 hover:text-red-300">
                                    <i class="fa-solid fa-arrow-right-from-bracket mr-2"></i> Đăng xuất
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                `
                    : `
                
                <div class="relative">
                    <button class="js-MenuBtn text-white p-2 mr-2 rotate-90 cursor-pointer hover:bg-gray-800 rounded-full">
                        <i class="fa-solid fa-ellipsis"></i>
                    </button>
                    
                    <ul class="js-toggleMenu hidden absolute right-0 top-full mt-2 w-56 bg-gray-800 text-white rounded-lg overflow-hidden shadow-lg z-50">
                         <li><a class="block px-4 py-3 hover:bg-gray-700 cursor-pointer text-sm">Cài đặt</a></li>
                         <li><a class="block px-4 py-3 hover:bg-gray-700 cursor-pointer text-sm">Trợ giúp & Phản hồi</a></li>
                    </ul>
                </div>

                <button class="js-open-login-modal bg-white text-black font-medium text-sm rounded-full px-6 py-1.5 cursor-pointer hover:bg-gray-200 transition-colors">
                    Đăng nhập
                </button>
                `
            }
        </div>
    </header>
    `;
};

export const initHeaderEvents = () => {
    const avatarBtn = document.querySelector(".js-avatar-btn");
    const avatarMenu = document.querySelector(".js-avatar-menu");

    if (avatarBtn && avatarMenu) {
        avatarBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            avatarMenu.classList.toggle("hidden");
        });

        document.addEventListener("click", (e) => {
            if (
                !avatarBtn.contains(e.target) &&
                !avatarMenu.contains(e.target)
            ) {
                avatarMenu.classList.add("hidden");
            }
        });
    }

    document.addEventListener("click", (e) => {
        if (e.target.closest(".js-open-login-modal")) {
            const modal = document.querySelector(".js-auth-modal");
            const overlay = document.querySelector(".js-auth-overlay");
            if (modal && overlay) {
                modal.classList.remove("hidden");
                overlay.classList.remove("hidden");
            }
        }
    });

    document
        .querySelector(".js-logout")
        ?.addEventListener("click", async (e) => {
            e.preventDefault();
            storageService.clear();
            window.location.reload();
        });

    document
        .querySelector(".js-open-profile")
        ?.addEventListener("click", (e) => {
            e.preventDefault();
            document
                .querySelector(".js-user-modal-overlay")
                .classList.remove("hidden");
            document
                .querySelector(".js-profile-modal")
                .classList.remove("hidden");
            if (avatarMenu) avatarMenu.classList.add("hidden");
        });

    document
        .querySelector(".js-open-password")
        ?.addEventListener("click", (e) => {
            e.preventDefault();
            document
                .querySelector(".js-user-modal-overlay")
                .classList.remove("hidden");
            document
                .querySelector(".js-password-modal")
                .classList.remove("hidden");
            if (avatarMenu) avatarMenu.classList.add("hidden");
        });

    const menuBtn = document.querySelector(".js-MenuBtn");
    const toggleMenu = document.querySelector(".js-toggleMenu");
    if (menuBtn && toggleMenu) {
        menuBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleMenu.classList.toggle("hidden");
        });
        document.addEventListener("click", (e) => {
            if (!menuBtn.contains(e.target) && !toggleMenu.contains(e.target)) {
                toggleMenu.classList.add("hidden");
            }
        });
    }
};

export default Header;
