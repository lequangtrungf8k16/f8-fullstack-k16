import { playerService } from "../service/playerService";
import { formatUtils } from "../utils/formatUtils";

const renderFullPlayerList = () => {
    const listContainer = document.getElementById("full-player-list");
    const { currentPlaylist, currentIndex } = playerService.getState();
    if (!listContainer) return;
    if (currentPlaylist.length === 0) {
        listContainer.innerHTML =
            '<div class="text-gray-500 text-center mt-10">Danh sách trống</div>';
        return;
    }
    const html = currentPlaylist
        .map((song, index) => {
            const isActive = index === currentIndex;
            const duration = song.duration
                ? formatUtils.formatTime(song.duration)
                : "--:--";
            return `
        <div class="js-playlist-item group flex items-center gap-3 p-2 rounded-md cursor-pointer transition-colors ${
            isActive ? "bg-[#2a2a2a]" : "hover:bg-[#2a2a2a]"
        }" data-index="${index}">
            <div class="w-6 text-center text-sm text-gray-500 shrink-0">
                ${
                    isActive
                        ? `<i class="fa-solid fa-chart-simple text-white animate-pulse"></i>`
                        : `<span class="group-hover:hidden">${
                              index + 1
                          }</span><i class="fa-solid fa-play hidden group-hover:inline text-white text-xs"></i>`
                }
            </div>
            <div class="w-10 h-10 rounded overflow-hidden shrink-0"><img src="${
                song.thumbnail
            }" class="w-full h-full object-cover opacity-80 group-hover:opacity-100"></div>
            <div class="flex-1 min-w-0 flex flex-col justify-center">
                <p class="text-sm font-medium truncate ${
                    isActive ? "text-white" : "text-gray-200"
                }">${song.title}</p>
                <p class="text-xs text-gray-400 truncate">${song.artist}</p>
            </div>
            <div class="text-xs text-gray-500 pr-2">${duration}</div>
        </div>`;
        })
        .join("");
    listContainer.innerHTML = html;
    const activeItem = listContainer.querySelector(
        `[data-index="${currentIndex}"]`
    );
    if (activeItem)
        activeItem.scrollIntoView({ behavior: "smooth", block: "center" });
};

const renderPopupList = () => {
    const listContainer = document.getElementById("playlist-list");
    const { currentPlaylist, currentIndex } = playerService.getState();
    if (!listContainer) return;
    if (currentPlaylist.length === 0) {
        listContainer.innerHTML =
            '<div class="text-gray-500 text-center p-4">Danh sách trống</div>';
        return;
    }
    const html = currentPlaylist
        .map((song, index) => {
            const isActive = index === currentIndex;
            return `
        <div class="js-playlist-item flex items-center gap-3 p-2 rounded hover:bg-white/10 cursor-pointer ${
            isActive ? "bg-white/10" : ""
        }" data-index="${index}">
             <img src="${
                 song.thumbnail
             }" class="w-10 h-10 rounded object-cover">
             <div class="flex-1 min-w-0">
                 <p class="text-sm font-medium truncate ${
                     isActive ? "text-green-500" : "text-white"
                 }">${song.title}</p>
                 <p class="text-xs text-gray-400 truncate">${song.artist}</p>
             </div>
             ${
                 isActive
                     ? '<i class="fa-solid fa-volume-high text-green-500 text-xs"></i>'
                     : ""
             }
        </div>`;
        })
        .join("");
    listContainer.innerHTML = html;
};

const musicPlayer = () => {
    return `
    <div id="full-player" class="hidden fixed top-16 md:top-20 bottom-20 left-0 md:left-60 right-0 z-40 bg-[#000000] flex flex-col animate-fade-in overflow-hidden">
        
        <div class="absolute inset-0 bg-linear-to-b from-gray-900 to-black pointer-events-none"></div>

        <div class="relative flex flex-col md:flex-row h-full overflow-hidden z-10">
            <div class="flex-1 flex items-center justify-center p-4 md:p-8 overflow-hidden">
                <div class="relative aspect-square w-full max-w-[300px] md:max-w-[400px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-lg overflow-hidden group">
                     <img id="full-player-thumb" src="./src/assets/images/default-album.jpg" class="w-full h-full object-cover" />
                </div>
            </div>

            <div class="w-full md:w-[450px] flex flex-col bg-transparent md:bg-[#0a0a0a]/50 md:border-l md:border-white/10 px-4 md:px-0">
                <div class="flex items-center gap-8 border-b border-white/10 px-6 py-4 text-sm font-bold text-gray-400 uppercase tracking-wider shrink-0">
                    <button class="text-white border-b-2 border-white pb-4 -mb-4.5 cursor-pointer">Tiếp theo</button>
                    <button class="hover:text-white cursor-pointer transition">Lời nhạc</button>
                    <button class="hover:text-white cursor-pointer transition">Liên quan</button>
                    <button class="js-toggle-full-player md:hidden ml-auto text-2xl">
                        <i class="fa-solid fa-chevron-down"></i>
                    </button>
                </div>

                <div class="flex-col justify-between items-center py-4 px-6 border-b border-white/10 hidden md:flex">
                     <span class="text-sm text-gray-400">Đang phát từ danh sách phát</span>
                </div>

                <div id="full-player-list" class="flex-1 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-gray-600 space-y-1"></div>
            </div>
        </div>
    </div>

    <div id="music-player" class="fixed bottom-0 left-0 right-0 bg-[#212121] text-white shadow-2xl z-50 border-t border-gray-700 h-20 flex flex-col justify-center transition-all duration-300">
        <div class="absolute -top-4 left-0 w-full group h-1 cursor-pointer">
            <input id="progress-bar" type="range" min="0" max="100" value="0" class="w-full h-full bg-gray-600 appearance-none cursor-pointer accent-red-600 hover:h-1.5 transition-all" />
        </div>
        <div class="flex items-center justify-between px-4 h-full">
            <div class="flex items-center gap-4 w-1/3">
                 <button id="prev-btn" class="text-gray-300 hover:text-white text-xl p-2"><i class="fa-solid fa-backward-step cursor-pointer"></i></button>
                 <button id="play-btn" class="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 transition shadow-lg text-lg cursor-pointer"><i class="fa-solid fa-play ml-1"></i></button>
                 <button id="next-btn" class="text-gray-300 hover:text-white text-xl p-2"><i class="fa-solid fa-forward-step cursor-pointer"></i></button>
                 <div class="text-xs text-gray-400 ml-2 hidden sm:block">
                    <span id="current-time">00:00</span> / <span id="duration">00:00</span>
                 </div>
            </div>
            <div class="js-toggle-full-player flex items-center gap-4 w-1/3 justify-center cursor-pointer group">
                <div class="relative w-12 h-12 md:w-14 md:h-14 shrink-0 rounded overflow-hidden">
                     <img class="w-full h-full object-cover group-hover:brightness-75 transition" src="./src/assets/images/default-album.jpg" alt="Thumbnail"/>
                     <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                        <i class="fa-solid fa-chevron-up text-white"></i>
                     </div>
                </div>
                <div class="js-song-info overflow-hidden max-w-[200px]">
                    <p id="track-title" class="font-bold text-sm truncate group-hover:underline">Chưa chọn bài</p>
                    <p id="track-artist" class="text-xs text-gray-400 truncate">...</p>
                </div>
            </div>
            <div class="flex items-center justify-end gap-4 w-1/3">
                <div class="hidden md:flex items-center gap-2 group ml-2">
                    <i class="js-volume-icon fa-solid fa-volume-high text-gray-400 w-5 text-center"></i>
                    <input type="range" min="0" max="1" step="0.05" value="1" id="volume-control" class="w-20 accent-white h-1 cursor-pointer bg-gray-600">
                </div>
                <button class="js-open-playlist js-toggle-full-player text-gray-400 hover:text-white ml-4 p-2 transition-transform" title="Danh sách phát / Mở rộng">
                    <i class="js-playlist-icon fa-solid fa-chevron-down text-lg cursor-pointer"></i>
                </button>
            </div>
        </div>
        <audio id="audio" class="hidden" crossorigin="anonymous"></audio>
    </div>

    `;
};

export const initPlayerControls = () => {
    const fullPlayer = document.getElementById("full-player");
    const toggleBtns = document.querySelectorAll(".js-toggle-full-player");
    const fullThumb = document.getElementById("full-player-thumb");
    const miniThumb = document.querySelector("#music-player img");
    const playlistIcon = document.querySelector(".js-playlist-icon");

    const updateImages = () => {
        const state = playerService.getState();
        if (state.currentSong) {
            if (fullThumb) fullThumb.src = state.currentSong.thumbnail;
            if (miniThumb) miniThumb.src = state.currentSong.thumbnail;
        }
    };

    const toggleFullPlayer = () => {
        if (!fullPlayer) return;
        fullPlayer.classList.toggle("hidden");

        if (fullPlayer.classList.contains("hidden")) {
            playlistIcon.classList.remove("fa-chevron-up");
            playlistIcon.classList.add("fa-chevron-down");
        } else {
            playlistIcon.classList.remove("fa-chevron-down");
            playlistIcon.classList.add("fa-chevron-up");
            renderFullPlayerList();
            updateImages();
        }
    };

    toggleBtns.forEach((btn) =>
        btn.addEventListener("click", toggleFullPlayer)
    );

    playerService.registerOnPlayCallback(() => {
        if (fullPlayer.classList.contains("hidden")) {
            toggleFullPlayer();
        }
    });

    if (miniThumb && fullThumb) {
        const observer = new MutationObserver(() => {
            fullThumb.src = miniThumb.src;
            renderFullPlayerList();
        });
        observer.observe(miniThumb, {
            attributes: true,
            attributeFilter: ["src"],
        });
    }

    const handleListClick = (e) => {
        const item = e.target.closest(".js-playlist-item");
        if (item) {
            playerService.selectSong(parseInt(item.dataset.index));
            setTimeout(() => {
                renderFullPlayerList();
                updateImages();
            }, 100);
        }
    };
    const fullListContainer = document.getElementById("full-player-list");
    if (fullListContainer)
        fullListContainer.addEventListener("click", handleListClick);

    const volumeControl = document.getElementById("volume-control");
    const volumeIcon = document.querySelector(".js-volume-icon");
    const audio = document.getElementById("audio");
    if (volumeControl && volumeIcon && audio) {
        volumeControl.addEventListener("input", (e) => {
            const val = parseFloat(e.target.value);
            audio.volume = val;
            volumeIcon.className =
                "js-volume-icon fa-solid text-gray-400 w-5 text-center";
            if (val === 0) volumeIcon.classList.add("fa-volume-xmark");
            else if (val === 1) volumeIcon.classList.add("fa-volume-high");
            else volumeIcon.classList.add("fa-volume-low");
        });
    }

    const playBtn = document.getElementById("play-btn");
    playBtn?.addEventListener("click", playerService.toggle);
    const nextBtn = document.getElementById("next-btn");
    nextBtn?.addEventListener("click", playerService.next);
    const prevBtn = document.getElementById("prev-btn");
    prevBtn?.addEventListener("click", playerService.prev);
};

export default musicPlayer;
