const searchBar = () => {
    return `
        <div class="flex flex-1 ml-20">
                <div class="flex items-center w-full max-w-xl bg-gray-800 border border-gray-600 rounded-lg overflow-hidden">

                    <button class="px-4 text-gray-400 hover:text-white">
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </button>

                    <input
                        type="text"
                        class="w-full bg-gray-800 py-2 focus:outline-none text-sm"
                        placeholder="Tìm bài hát, đĩa nhạc, nghệ sĩ, podcast"
                    />

                    <button class="px-4 text-gray-400 hover:text-white js-clear-search">
                        <i class="fa-solid fa-xmark"></i>
                    </button>

                </div>
            </div>
    `;
};

export default searchBar;
