import searchBar from "./searchBar";

const header = () => {
    return `
        <header class="sticky top-0 z-50 flex justify-between items-center border-r border-gray-600 px-20 py-4 ">            
          
            <!-- Thanh tìm kiếm -->
            ${searchBar()}

            <!-- >Người dùng -->
            <div class="flex items-center gap-4">
        <button class="text-white text-2xl cursor-pointer">
            <i class="fa-brands fa-chromecast"></i>
        </button>

        <div class="relative">
            <button class="js-authMenuBtn text-text-white rotate-90 cursor-pointer">
                <i class="fa-solid fa-ellipsis"></i>
            </button>
            <div>
            <ul class="js-authMenu hidden absolute right-0 w-xs py-2 bg-gray-700 text-white rounded-lg overflow-hidden">
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

        </div>

        <button class="bg-white text-black text-sm rounded-full px-4 py-1.5 cursor-pointer">
            Đăng nhập
        </button>
    </div>




        </header>
    `;
};

export default header;
