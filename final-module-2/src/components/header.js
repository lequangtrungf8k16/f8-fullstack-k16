import searchBar from "./search";

const header = () => {
    return `
    <header class="sticky top-0 z-50 flex justify-between items-center px-20 py-4">            
        
        <!-- Tìm kiếm -->
        ${searchBar()}

        <div class="flex items-center gap-4">
        
            <!-- Nút truyền hình ảnh -->
            <button class="text-white text-2xl cursor-pointer">
                <i class="fa-brands fa-chromecast"></i>
            </button>

            <!-- Nút Menu và danh sách tùy chọn -->
            <div class="relative">
                <button class="js-MenuBtn text-text-white rotate-90 cursor-pointer">
                    <i class="fa-solid fa-ellipsis"></i>
                </button>

                <!-- Bật tùy chọn khi click vào menu -->                
                <ul class="js-toggleMenu hidden absolute right-0 w-xs py-2 bg-gray-700 text-white rounded-lg overflow-hidden">
                    <li>
                        <a class="flex gap-4 items-center w-full px-4 py-2 cursor-pointer hover:bg-gray-500 transition-colors">
                            <i class="fa-brands fa-youtube"></i>
                            <span>Get Music Premium</span>
                        </a>
                    </li>
                    <li>
                        <a class="flex gap-4 items-center w-full px-4 py-2 cursor-pointer hover:bg-gray-500 transition-colors">
                            <i class="fa-solid fa-gear"></i>
                            <span>Settings</span>
                        </a>
                    </li>
                    <li>
                        <a class="flex gap-4 items-center w-full px-4 py-2 cursor-pointer hover:bg-gray-500 transition-colors">
                            <i class="fa-solid fa-shield-halved"></i>
                            <span>Terms & privacy policy</span>
                        </a>
                    </li>
                    <li>
                        <a class="flex gap-4 items-center w-full px-4 py-2 cursor-pointer hover:bg-gray-500 transition-colors">
                            <i class="fa-regular fa-circle-question"></i>
                            <span>Help</span>
                        </a>
                    </li>
                    <li>
                        <a class="flex gap-4 items-center w-full px-4 py-2 cursor-pointer hover:bg-gray-500 transition-colors">
                            <span>
                            <i class="fa-regular fa-message"></i>
                            Send feedback
                            </span>
                        </a>
                    </li>
                </ul>
            </div>

            <!-- Auth -->
            <button class="js-login-btn bg-white text-black text-sm rounded-full px-4 py-1.5 cursor-pointer">
                Đăng nhập
            </button>
        </div>
    </header>
    `;
};

export const toggleMenu = () => {
    document.addEventListener("click", (e) => {
        const menu = document.querySelector(".js-toggleMenu");
        if (!menu) return;

        if (e.target.closest(".js-MenuBtn")) {
            menu.classList.toggle("hidden");
            return;
        }
        if (!e.target.closest(".js-toggleMenu")) {
            menu.classList.add("hidden");
        }
    });
};

export default header;
