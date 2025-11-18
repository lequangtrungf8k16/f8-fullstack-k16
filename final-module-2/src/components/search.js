const search = () => {
    return `
        <div class="lg:flex lg:justify-between lg:flex-1 hidden">
            <div class="flex items-center xl:w-120 lg:w-100 md:w-full bg-gray-800 border border-gray-600 rounded-lg overflow-hidden">
                <button class="px-4 text-gray-400 hover:text-white">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </button>
                <input
                    type="text"
                    class="w-full bg-gray-800 py-3 focus:outline-none text-sm"
                    placeholder="Tìm bài hát, đĩa nhạc, nghệ sĩ, podcast"
                />
                <button class="px-4 text-gray-400 hover:text-white js-clear-search">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
        </div>
        <button class="lg:hidden ml-auto px-4 text-white hover:text-white">
            <i class="fa-solid fa-magnifying-glass"></i>
        </button>
    `;
};

export default search;
