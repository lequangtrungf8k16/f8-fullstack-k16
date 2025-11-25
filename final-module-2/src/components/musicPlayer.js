import { playerService } from "../service/playerService";

const musicPlayer = () => {
    return `
    <div id="music-player" class="fixed bottom-0 left-0 right-0 bg-gray-900 text-white shadow-xl z-50 border-t border-gray-700">

        <div class="absolute -top-4 left-0 w-full">
            <input
                id="progress-bar"
                type="range"
                min="0"
                max="100"
                value="0"
                class="w-full accent-red-500 cursor-pointer h-1 opacity-0 hover:opacity-100"
            />
        </div>

        <div class="flex items-center justify-between gap-4 px-4 py-2">
            
            <div class="flex flex-col items-center">
                <div class="flex items-center gap-4">                
                    <button id="prev-btn" class="w-10 h-10 rounded-full text-xl cursor-pointer hover:bg-gray-500">
                        <i class="fa-solid fa-backward-step"></i>
                    </button>
                    <button id="play-btn" class="w-12 h-12 rounded-full text-4xl cursor-pointer hover:bg-gray-500">
                        <i class="fa-solid fa-play"></i>
                    </button>
                    <button id="next-btn" class="w-10 h-10 rounded-full text-xl cursor-pointer hover:bg-gray-500">
                        <i class="fa-solid fa-forward-step"></i>
                    </button>

                    <div class="flex items-center gap-2 text-xs mt-1">
                        <span id="current-time">00:00</span>
                        <span class="text-gray-500">/</span>
                        <span id="duration">00:00</span>
                    </div>
                </div>                
            </div>

            
            <div class="flex items-center gap-4 w-64 shrink-0">
                <img class="w-12 h-12 rounded-md" src="./src/assets/images/default-album.jpg" alt="Song thumbnail"/>
                <div class="js-song-info">
                    <p id="track-title" class="font-bold">Chưa có bài hát</p>
                    <p id="track-artist" class="text-xs text-gray-400">...</p>
                </div>
            </div>
            
            <div class="flex items-center gap-4 w-64 shrink-0 justify-end">
                <button id="volume-icon-btn" class="text-xl cursor-pointer hover:bg-gray-500 rounded-full w-10 h-10 flex items-center justify-center">
                    <i id="volume-icon" class="fa-solid fa-volume-high"></i>
                </button>
                <input type="range" min="0" max="1" step="0.01" value="1" id="volume-control" class="w-24 accent-red-500">
                <button class="js-open-playlist w-10 h-10 rounded-full text-xl cursor-pointer hover:bg-gray-500">
                    <i class="fa-solid fa-sort-down"></i>
                </button>
            </div>
        </div>

        <audio id="audio"></audio>
    </div>

    <div
    class="js-playlist-popup hidden absolute bottom-20 right-4 w-140 bg-gray-800 text-white rounded-lg p-4 max-h-96 overflow-y-auto z-50">
        <h3 class="text-lg font-bold border-b border-b-gray-500 pb-4">Danh sách phát</h3>
        <div id="playlist-list" class="flex flex-col justify-start gap-4 py-2">
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

    document.getElementById("playlist-list")?.addEventListener("click", (e) => {
        const itemBtn = e.target.closest(".js-playlist-item");
        if (!itemBtn) return;

        const index = parseInt(itemBtn.dataset.index);

        const currentPlaylist = playerService.getState().currentPlaylist;

        if (!isNaN(index) && currentPlaylist.length > 0) {
            playerService.setPlaylist(currentPlaylist, index);
        }
    });

    document.addEventListener("click", (e) => {
        const playlist = document.querySelector(".js-playlist-popup");
        const playlistBtn = document.querySelector(".js-open-playlist");
        if (!playlist || !playlistBtn) return;

        if (e.target.closest(".js-open-playlist")) {
            playlist.classList.toggle("hidden");

            if (playlist.classList.contains("hidden")) {
                playlistBtn.innerHTML = `<i class="fa-solid fa-sort-down"></i>`;
            } else {
                playlistBtn.innerHTML = `<i class="fa-solid fa-angle-up"></i>`;
            }
        }
    });
};

export default musicPlayer;
