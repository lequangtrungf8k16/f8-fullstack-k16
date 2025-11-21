import logo from "../assets/icon/logo_youtube-music-dark.svg";

const sidebar = () => {
    return `
        <div class="js-sidebar group w-60 h-full py-4 transition-all duration-300 overflow-hidden border-r border-r-gray-700">
            <!-- Logo Youtube Music -->
            <div class="flex items-center gap-3 px-5 py-2">
                    
                <button class="js-menu-btn cursor-pointer">
                    <i class="fa-solid fa-bars text-xl"></i>
                </button>

                <a href="/" class="flex items-center">
                    <img 
                        src="${logo}"
                        alt="logo_youtube-music-dark"
                        class="h-6"
                    >
                </a>
            </div>

            <!-- Thanh điều hướng -->
            <div class="mx-4 mt-4 group-[.collapsed]:w-16 group-[.collapsed]:mx-0">
               <a class="js-sidebar-item w-full flex flex-wrap max-w-10:justify-center items-center gap-3 max-w-20:text-sx px-2 py-3 rounded-lg cursor-pointer transition-colors hover:bg-gray-800 group-[.collapsed]:flex-col group-[.collapsed]:justify-center group-[.collapsed]:text-center
                  group-[.collapsed]:gap-1" href="/">
                <i class="fa-regular fa-house"></i>
                <span class="sidebar-text group-[.collapsed]:text-[10px]">
                    Trang chủ
                </span>
               </a>
               <a class="js-sidebar-item w-full flex flex-wrap max-w-10:justify-center items-center gap-3 max-w-20:text-sx px-2 py-3 rounded-lg cursor-pointer transition-colors hover:bg-gray-800 group-[.collapsed]:flex-col group-[.collapsed]:justify-center group-[.collapsed]:text-center
                  group-[.collapsed]:gap-1" href="/discover">
                <i class="fa-regular fa-compass"></i>
                <span class="sidebar-text group-[.collapsed]:text-[10px]">
                    Khám phá
                </span>
               </a>
               <a class="js-sidebar-item w-full flex flex-wrap max-w-10:justify-center items-center gap-3 max-w-20:text-sx px-2 py-3 rounded-lg cursor-pointer transition-colors hover:bg-gray-800 group-[.collapsed]:flex-col group-[.collapsed]:justify-center group-[.collapsed]:text-center
                  group-[.collapsed]:gap-1" href="/library">
                <i class="fa-regular fa-bookmark"></i>
                <span class="sidebar-text group-[.collapsed]:text-[10px]">
                    Thư viện
                </span>
               </a>
               <a class="js-sidebar-item w-full flex flex-wrap max-w-10:justify-center items-center gap-3 max-w-20:text-sx px-2 py-3 rounded-lg cursor-pointer transition-colors hover:bg-gray-800 group-[.collapsed]:flex-col group-[.collapsed]:justify-center group-[.collapsed]:text-center
                  group-[.collapsed]:gap-1" href="/upgrade">
                <i class="fa-regular fa-circle-play"></i>
                <span class="sidebar-text group-[.collapsed]:text-[10px]">
                    Nâng cấp
                </span>
               </a>
            </div>
            <div class="border-b border-gray-500 mx-2 pb-7 group-[.collapsed]:hidden"></div>

            <!-- Nút đăng nhập -->
            <div class="mt-6 px-2">
                <button class="w-full text-center text-sm bg-gray-800 px-4 py-2 rounded-3xl cursor-pointer transition-colors hover:bg-gray-500
                       group-[.collapsed]:hidden">
                    Đăng nhập
                </button>
                <p 
                    class="w-full text-gray-500 text-left text-xs pr-1 py-1
                  group-[.collapsed]:text-[8px] group-[.collapsed]:hidden""
                >
                    Đăng nhập để tạo và chia sẻ danh sách phát, nhận đề xuất được cá nhân hóa và nhiều hơn thế nữa.
                </p>
            </div>
        </div>
    `;
};

document.addEventListener("DOMContentLoaded", () => {
    const sidebarEl = document.querySelector(".js-sidebar");
    const menuBtn = document.querySelector(".js-menu-btn");

    menuBtn.addEventListener("click", () => {
        sidebarEl.classList.toggle("collapsed");
        sidebarEl.classList.toggle("w-60");
        sidebarEl.classList.toggle("w-36");
    });
});

export default sidebar;
