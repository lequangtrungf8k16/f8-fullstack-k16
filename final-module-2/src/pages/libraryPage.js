const libraryPage = () => {
    const savedPodcasts = [
        {
            title: "Tập podcast để thưởng thức sau",
            description: "Các tập bạn lưu để nghe sau",
            icon: "fa-solid fa-bookmark",
            bgColor: "bg-gradient-to-br from-indigo-500 to-purple-400",
        },
    ];

    const renderSavedPodcasts = () => {
        if (savedPodcasts.length === 0) return "";

        return savedPodcasts
            .map(
                (item) => `
            <div class="flex flex-col gap-3 cursor-pointer group w-[220px] shrink-0">
                <div class="relative overflow-hidden rounded-lg aspect-square shadow-lg ${item.bgColor} flex items-center justify-center">
                    <i class="${item.icon} text-white text-6xl"></i>
                </div>
                <div>
                    <h4 class="text-white font-bold text-base hover:underline" title="${item.title}">${item.title}</h4>
                    <p class="text-gray-400 text-sm mt-1" title="${item.description}">${item.description}</p>
                </div>
            </div>
        `
            )
            .join("");
    };

    return `
        <div class="w-full pb-32">
            <header class="flex justify-between items-center mb-8 top-0 bg-black z-10 py-4 -mt-4 -mx-20 px-20">
                <div class="flex gap-4 overflow-x-auto scrollbar-hide">
                    <button class="px-3 py-1 bg-white text-black text-sm font-medium rounded-full whitespace-nowrap">Danh sách phát</button>
                    <button class="px-3 py-1 bg-gray-800 text-white border border-gray-700 cursor-pointer hover:bg-gray-700 text-sm font-medium rounded-full whitespace-nowrap transition-colors">Bài hát</button>
                    <button class="px-3 py-1 bg-gray-800 text-white border border-gray-700 cursor-pointer hover:bg-gray-700 text-sm font-medium rounded-full whitespace-nowrap transition-colors">Đĩa nhạc</button>
                    <button class="px-3 py-1 bg-gray-800 text-white border border-gray-700 cursor-pointer hover:bg-gray-700 text-sm font-medium rounded-full whitespace-nowrap transition-colors">Nghệ sĩ</button>
                    <button class="px-3 py-1 bg-gray-800 text-white border border-gray-700 cursor-pointer hover:bg-gray-700 text-sm font-medium rounded-full whitespace-nowrap transition-colors">Hồ sơ</button>
                    <button class="px-3 py-1 bg-gray-800 text-white border border-gray-700 cursor-pointer hover:bg-gray-700 text-sm font-medium rounded-full whitespace-nowrap transition-colors">Podcast</button>
                </div>

                <div class="relative group hidden md:block">
                    <button class="flex items-center gap-2 px-3 py-1 bg-gray-800 text-white border border-gray-700 hover:bg-gray-700 text-sm font-medium rounded-full transition-colors">
                        Hoạt động gần đây <i class="fa-solid fa-chevron-down text-xs"></i>
                    </button>
                    <div class="hidden absolute right-0 mt-2 w-48 bg-gray-700 rounded-lg shadow-xl overflow-hidden group-hover:block">
                        <a href="#" class="block px-4 py-2 text-sm text-white hover:bg-gray-600">Mới nhất</a>
                        <a href="#" class="block px-4 py-2 text-sm text-white hover:bg-gray-600">A-Z</a>
                    </div>
                </div>
            </header>

            <h2 class="text-2xl font-bold text-white mb-6">Podcast đã lưu</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                ${renderSavedPodcasts()}
            </div>
            
            <!-- Placeholder cho các mục khác (ví dụ: Danh sách phát) -->
            <div class="mt-12">
                <h2 class="text-2xl font-bold text-white mb-6">Danh sách phát của bạn</h2>
                <p class="text-gray-400">Bạn chưa có danh sách phát nào. Bắt đầu tạo một cái ngay!</p>
            </div>
        </div>
    `;
};

export default libraryPage;
