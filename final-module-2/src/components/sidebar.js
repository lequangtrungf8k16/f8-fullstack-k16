const sidebar = () => {
    const menu = [
        { page: "home", icon: "fa-solid fa-house", label: "Trang chủ" },
        { page: "discover", icon: "fa-regular fa-compass", label: "Khám phá" },
        { page: "library", icon: "fa-regular fa-bookmark", label: "Thư viện" },
        // {
        //     page: "upgrade",
        //     icon: "fa-regular fa-circle-play",
        //     label: "Nâng cấp",
        // },
    ];

    const menuHtml = menu
        .map(
            (item) => `            
            <li>
                <button 
                    data-page="${item.page}" 
                    class="w-full flex items-center gap-3 pl-2 py-3 rounded-lg cursor-pointer transition-colors hover:bg-gray-800"
                >
                    <i class="${item.icon} text-xl"></i>
                    <span>${item.label}</span>
                </button>
            </li>
        `
        )
        .join("");

    return `
    <div class="js-sidebar w-60 h-screen border-r border-gray-500 px-2 py-1">
        <ul>
            ${menuHtml}
        </ul>

        <div class="border-b border-gray-500 mx-2 pb-7"></div>

        <div class="mt-6 px-4">
            <button 
                class="w-full text-center text-sm bg-gray-800 mt-2 px-4 py-2 rounded-3xl cursor-pointer transition-colors hover:bg-gray-500"
            >
                Đăng nhập
            </button>

            <p 
                class="w-full text-gray-500 text-left text-xs pr-1 py-1"
            >
                Đăng nhập để tạo và chia sẻ danh sách phát, nhận đề xuất được cá nhân hóa và nhiều hơn thế nữa.
            </p>
        </div>
    </div>
    `;
};

export default sidebar;
