import { playerService } from "../service/playerService";

const musicPlayer = () => {
    return `
    <div id="music-player" class="fixed bottom-0 left-0 right-0 bg-gray-900 text-white shadow-xl z-50 border-t border-gray-700 h-18 flex flex-col justify-center">

        <div class="absolute -top-4 left-0 w-full group h-1 cursor-pointer">
            <input
                id="progress-bar"
                type="range"
                min="0"
                max="100"
                value="0"
                class="w-full h-full bg-gray-600 appearance-none cursor-pointer accent-red-600 hover:h-2 transition-all"
            />
        </div>

        <div class="flex items-center justify-between px-4 h-full">
           
            <div class="flex flex-col items-left w-1/3">
                <div class="flex items-center gap-4 md:gap-6">                
                    <button id="prev-btn" class="text-gray-300 hover:text-white text-lg md:text-xl p-2 disabled:opacity-50">
                        <i class="fa-solid fa-backward-step"></i>
                    </button>
                    
                    <button id="play-btn" class="w-10 h-10 md:w-12 md:h-12 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 transition-transform text-lg md:text-xl shadow-lg">
                        <i class="fa-solid fa-play ml-1"></i>
                    </button>
                    
                    <button id="next-btn" class="text-gray-300 hover:text-white text-lg md:text-xl p-2 disabled:opacity-50">
                        <i class="fa-solid fa-forward-step"></i>
                    </button>
                    <div class="flex items-center gap-1 text-[10px] md:text-xs text-gray-400 mt-1">
                        <span id="current-time">00:00</span>
                        <span>/</span>
                        <span id="duration">00:00</span>
                    </div>
                </div>
            </div>

            <div class="flex justify-center items-center gap-4 w-1/3 min-w-[150px]">
                <img class="w-12 h-12 md:w-14 md:h-14 rounded-md object-cover shadow-md bg-gray-800" src="./src/assets/images/default-album.jpg" alt="Thumbnail"/>
                <div class="js-song-info overflow-hidden">
                    <p id="track-title" class="font-bold text-sm md:text-base truncate">Chưa chọn bài</p>
                    <p id="track-artist" class="text-xs text-gray-400 truncate">...</p>
                </div>
                <button class="text-gray-400 hover:text-red-500 hidden md:block"><i class="fa-regular fa-heart"></i></button>
            </div>

            <div class="flex items-center justify-end gap-2 md:gap-4 w-1/3">
                <div class="hidden md:flex items-center gap-2 group">
                    <i class="fa-solid fa-volume-high text-gray-400"></i>
                    <input type="range" min="0" max="1" step="0.05" value="1" id="volume-control" class="w-20 accent-gray-400 h-1 cursor-pointer">
                </div>
                
                <button class="js-open-playlist p-2 text-gray-300 hover:text-red-500 transition-colors relative" title="Danh sách phát">
                    <i class="fa-solid fa-list-ul"></i>
                </button>
            </div>
        </div>

        <audio id="audio" class="hidden"></audio>
    </div>

    <div class="js-playlist-popup hidden fixed bottom-24 right-4 w-80 md:w-96 bg-[#181818] border border-gray-700 text-white rounded-xl shadow-2xl z-40 max-h-[60vh] flex flex-col animate-fade-in-up">
        <div class="p-4 border-b border-gray-700 bg-[#202020] rounded-t-xl flex justify-between items-center">
            <h3 class="font-bold text-sm uppercase tracking-wide">Danh sách đang phát</h3>
            <button class="js-close-playlist hover:text-gray-300"><i class="fa-solid fa-chevron-down"></i></button>
        </div>
        <div id="playlist-list" class="flex-1 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-gray-600">
            </div>
    </div>
    `;
};

export const initPlayerControls = () => {
    const playBtn = document.getElementById("play-btn");
    playBtn?.addEventListener("click", playerService.toggle);

    const nextBtn = document.getElementById("next-btn");
    nextBtn?.addEventListener("click", playerService.next);

    const prevBtn = document.getElementById("prev-btn");
    prevBtn?.addEventListener("click", playerService.prev);

    const playlistPopup = document.querySelector(".js-playlist-popup");
    const openBtn = document.querySelector(".js-open-playlist");
    const closeBtn = document.querySelector(".js-close-playlist");
    const listContainer = document.getElementById("playlist-list");

    if (openBtn && playlistPopup) {
        const togglePopup = () => {
            playlistPopup.classList.toggle("hidden");
            openBtn.classList.toggle("text-red-500");
        };

        openBtn.addEventListener("click", togglePopup);
        if (closeBtn)
            closeBtn.addEventListener("click", () =>
                playlistPopup.classList.add("hidden")
            );
    }

    if (listContainer) {
        listContainer.addEventListener("click", (e) => {
            const item = e.target.closest(".js-playlist-item");
            if (item) {
                const index = parseInt(item.dataset.index);
                playerService.selectSong(index);
            }
        });
    }
};

export default musicPlayer;
