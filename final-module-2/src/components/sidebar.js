import logo from "../assets/icon/logo_youtube-music-dark.svg";
import { storageService } from "../service/storageService";

const sidebar = () => {
    const user = storageService.getUserInfo();

    return `
        <div class="js-sidebar group w-20 md:w-60 h-full py-4 overflow-hidden border-r border-r-gray-800 bg-black flex flex-col">
            
            <div class="flex items-center gap-4 px-6 py-2 group-[.collapsed]:gap-2">
                <button class="js-menu-btn cursor-pointer text-gray-400 hover:text-white">
                    <i class="fa-solid fa-bars text-xl"></i>
                </button>
                <a href="/" class="js-sidebar-link flex items-center max-md:hidden" data-navigo>
                    <img src="${logo}" alt="Youtube Music" class="h-6">
                </a>
            </div>
            
            <nav class="js-menu mx-2 mt-6 space-y-2 group-[.collapsed]:mx-2">
                <a class="js-sidebar-link nav-item flex flex-wrap items-center gap-4 px-4 py-3 rounded-lg text-white hover:bg-gray-800 transition-colors group-[.collapsed]:flex-col group-[.collapsed]:px-1 max-md:justify-center max-md:px-0 group-[.collapsed]:w-14 group-[.collapsed]:gap-1 group-[.collapsed]:text-[10px]" href="/" data-navigo>
                    <i class="fa-solid fa-house text-xl"></i>
                    <span class="group-[.collapsed]:text-[10px] text-[10px] md:text-lg">Trang chủ</span>
                </a>
                
                <a class="js-sidebar-link nav-item flex flex-wrap items-center gap-4 px-4 py-3 rounded-lg text-white hover:bg-gray-800 transition-colors group-[.collapsed]:flex-col group-[.collapsed]:px-1 max-md:justify-center max-md:px-0 group-[.collapsed]:w-14 group-[.collapsed]:gap-1 group-[.collapsed]:text-[10px]" href="/discoverPage" data-navigo>
                    <i class="fa-regular fa-compass text-xl"></i>
                    <span class="group-[.collapsed]:text-[10px] text-[10px] md:text-lg">Khám phá</span>
                </a>

                <a class="js-sidebar-link nav-item flex flex-wrap items-center gap-4 px-4 py-3 rounded-lg text-white hover:bg-gray-800 transition-colors group-[.collapsed]:flex-col group-[.collapsed]:px-1 max-md:justify-center max-md:px-0 group-[.collapsed]:w-14 group-[.collapsed]:gap-1 group-[.collapsed]:text-[10px]" href="/libraryPage" data-navigo>
                    <i class="fa-solid fa-bookmark text-xl"></i>
                    <span class="group-[.collapsed]:text-[10px] text-[10px] md:text-lg">Thư viện</span>
                </a>               
                ${
                    user
                        ? `
                <a class="js-sidebar-link nav-item flex flex-wrap items-center gap-4 px-4 py-3 rounded-lg text-white hover:bg-gray-800 transition-colors group-[.collapsed]:flex-col group-[.collapsed]:px-1 max-md:justify-center max-md:px-0 group-[.collapsed]:w-14 group-[.collapsed]:gap-1 group-[.collapsed]:text-[10px]" href="/upgradePage" data-navigo>
                    <i class="fa-regular fa-circle-play text-xl"></i>
                    <span class="group-[.collapsed]:text-[10px] text-[10px] md:text-lg">Nâng cấp</span>
                </a>
                `
                        : ""
                }
            </nav>

            <div class="border-t border-gray-800 mx-4 my-4 group-[.collapsed]:hidden"></div>
            
            <div class="px-4 pb-4 group-[.collapsed]:hidden max-md:hidden">
                ${
                    user
                        ? `
                    <button class="w-full flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-full transition-colors cursor-pointer">
                        <i class="fa-solid fa-plus"></i>
                        <span class="text-sm font-medium">Danh sách phát mới</span>
                    </button>
                    `
                        : `
                    <button class="js-open-login-modal w-full bg-white text-black text-sm font-bold py-2 rounded-full cursor-pointer hover:bg-gray-200 transition-colors">
                        Đăng nhập
                    </button>
                    <p class="mt-4 text-[10px] text-gray-400">
                        Đăng nhập để tạo và chia sẻ danh sách phát, nhận đề xuất được cá nhân hóa và nhiều hơn thế nữa.
                    </p>
                    `
                }
            </div>
        </div>
    `;
};

export const updateActiveSidebar = () => {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll(".js-menu .nav-item");

    navLinks.forEach((link) => {
        const href = link.getAttribute("href");
        if (href === currentPath) {
            link.classList.add("bg-gray-800", "font-semibold");
        } else {
            link.classList.remove("bg-gray-800", "font-semibold");
        }
    });
};

export const initSidebarEvents = () => {
    const sidebarEl = document.querySelector(".js-sidebar");
    const menuBtn = document.querySelector(".js-menu-btn");

    updateActiveSidebar();

    if (sidebarEl && menuBtn) {
        menuBtn.addEventListener("click", () => {
            sidebarEl.classList.toggle("collapsed");
            sidebarEl.classList.toggle("w-60");
            sidebarEl.classList.toggle("w-40");
        });
    }

    const links = document.querySelectorAll(".js-sidebar-link");
    links.forEach((link) => {
        link.addEventListener("click", () => {
            document.dispatchEvent(new CustomEvent("CLOSE_FULL_PLAYER"));
        });
    });
};

export default sidebar;
