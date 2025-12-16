import logo from "../assets/icon/logo_youtube-music-dark.svg";
import { storageService } from "../service/storageService";

const sidebar = () => {
    const user = storageService.getUserInfo();

    return `
        <div class="js-sidebar group w-20 md:w-60 h-full py-4 overflow-hidden border-r border-r-gray-800 bg-black flex flex-col transition-all duration-300">
            
            <div class="flex items-center gap-4 px-6 py-2 group-[.collapsed]:gap-2 justify-start">
                <button class="js-menu-btn cursor-pointer text-gray-400 hover:text-white shrink-0">
                    <i class="fa-solid fa-bars text-xl"></i>
                </button>
                <a href="/" class="js-sidebar-link flex items-center group-[.collapsed]:hidden" data-navigo>
                    <img src="${logo}" alt="Youtube Music" class="h-6">
                </a>
            </div>
            
            <nav class="js-menu mx-2 mt-6 space-y-2 group-[.collapsed]:mx-2">
                <a class="js-sidebar-link nav-item flex items-center gap-4 px-4 py-3 rounded-lg text-white hover:bg-gray-800 transition-colors group-[.collapsed]:justify-center group-[.collapsed]:px-2" href="/" data-navigo>
                    <i class="fa-solid fa-house text-xl w-6 text-center"></i>
                    <span class="text-sm md:text-base font-medium group-[.collapsed]:hidden whitespace-nowrap">Trang chủ</span>
                </a>
                
                <a class="js-sidebar-link nav-item flex items-center gap-4 px-4 py-3 rounded-lg text-white hover:bg-gray-800 transition-colors group-[.collapsed]:justify-center group-[.collapsed]:px-2" href="/discoverPage" data-navigo>
                    <i class="fa-regular fa-compass text-xl w-6 text-center"></i>
                    <span class="text-sm md:text-base font-medium group-[.collapsed]:hidden whitespace-nowrap">Khám phá</span>
                </a>

                <a class="js-sidebar-link nav-item flex items-center gap-4 px-4 py-3 rounded-lg text-white hover:bg-gray-800 transition-colors group-[.collapsed]:justify-center group-[.collapsed]:px-2" href="/libraryPage" data-navigo>
                    <i class="fa-solid fa-bookmark text-xl w-6 text-center"></i>
                    <span class="text-sm md:text-base font-medium group-[.collapsed]:hidden whitespace-nowrap">Thư viện</span>
                </a>               
                ${
                    user
                        ? `
                <a class="js-sidebar-link nav-item flex items-center gap-4 px-4 py-3 rounded-lg text-white hover:bg-gray-800 transition-colors group-[.collapsed]:justify-center group-[.collapsed]:px-2" href="/upgradePage" data-navigo>
                    <i class="fa-regular fa-circle-play text-xl w-6 text-center"></i>
                    <span class="text-sm md:text-base font-medium group-[.collapsed]:hidden whitespace-nowrap">Nâng cấp</span>
                </a>
                `
                        : ""
                }
            </nav>

            <div class="border-t border-gray-800 mx-4 my-4 group-[.collapsed]:hidden"></div>
            
            <div class="px-4 pb-4 group-[.collapsed]:hidden">
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
    const path = window.location.pathname;
    const navLinks = document.querySelectorAll(".js-menu .nav-item");

    navLinks.forEach((link) => {
        link.classList.remove("bg-gray-800", "font-semibold");
    });

    let activeHref = null;

    if (path === "/" || path === "") {
        activeHref = "/";
    } else if (path.startsWith("/discoverPage")) {
        activeHref = "/discoverPage";
    } else if (path.startsWith("/libraryPage")) {
        activeHref = "/libraryPage";
    } else if (path.startsWith("/upgradePage")) {
        activeHref = "/upgradePage";
    }

    if (activeHref) {
        const activeLink = document.querySelector(
            `.js-menu .nav-item[href="${activeHref}"]`
        );
        if (activeLink) {
            activeLink.classList.add("bg-gray-800", "font-semibold");
        }
    }
};

export const initSidebarEvents = () => {
    const sidebarEl = document.querySelector(".js-sidebar");
    const menuBtn = document.querySelector(".js-menu-btn");

    updateActiveSidebar();

    if (sidebarEl && menuBtn) {
        menuBtn.addEventListener("click", () => {
            sidebarEl.classList.toggle("collapsed");
            if (sidebarEl.classList.contains("collapsed")) {
                sidebarEl.classList.remove("md:w-60");
                sidebarEl.classList.add("w-20");
            } else {
                sidebarEl.classList.add("md:w-60");
                sidebarEl.classList.remove("w-20");
            }
        });
    }

    const links = document.querySelectorAll(".js-sidebar-link");
    links.forEach((link) => {
        link.addEventListener("click", () => {
            document.dispatchEvent(new CustomEvent("CLOSE_FULL_PLAYER"));
            setTimeout(updateActiveSidebar, 50);
        });
    });
};

export default sidebar;
