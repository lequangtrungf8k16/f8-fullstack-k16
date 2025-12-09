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
                : "00:00";

            return `
            <div class="js-playlist-item flex items-center gap-3 p-2 rounded-md cursor-pointer border-b border-gray-800 last:border-0 transition-colors ${
                isActive ? "bg-[#2a2a2a]" : "hover:bg-[#2a2a2a]"
            }" data-index="${index}">
                <div class="w-6 text-center text-sm font-medium shrink-0 ${
                    isActive ? "text-green-500" : "text-gray-500"
                }">
                    ${
                        isActive
                            ? '<i class="fa-solid fa-music"></i>'
                            : index + 1
                    }
                </div>
                <div class="w-10 h-10 rounded overflow-hidden shrink-0 bg-gray-800">
                    <img src="${
                        song.thumbnail
                    }" class="w-full h-full object-cover opacity-90">
                </div>
                <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium truncate ${
                        isActive ? "text-green-500" : "text-white"
                    }">${song.title}</p>
                    <p class="text-xs text-gray-500 truncate mt-0.5">${
                        song.artist
                    }</p>
                </div>
                <div class="text-xs text-gray-500 font-medium pr-2">${duration}</div>
            </div>`;
        })
        .join("");

    listContainer.innerHTML = html;

    if (currentIndex >= 0) {
        setTimeout(() => {
            const activeItem = listContainer.querySelector(
                `[data-index="${currentIndex}"]`
            );
            if (activeItem)
                activeItem.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                });
        }, 100);
    }
};

const musicPlayer = () => {
    return `
    <div id="full-player" class="hidden fixed top-16 bottom-20 right-0 left-0 z-10 bg-[#121212] flex flex-col animate-fade-in overflow-hidden cursor-default transition-all duration-300">
        <div class="relative flex flex-col md:flex-row h-full overflow-hidden">
            <div class="flex-1 flex items-center justify-center p-6 md:p-10 overflow-hidden bg-[#0a0a0a]">
                <div class="js-stop-close relative aspect-square w-full max-w-[320px] md:max-w-[450px] shadow-2xl rounded-lg overflow-hidden border border-gray-800">
                     <img id="full-player-thumb" src="./src/assets/images/default-album.jpg" class="w-full h-full object-cover" />
                </div>
            </div>
            <div class="js-stop-close w-full md:w-[450px] flex flex-col bg-[#121212] md:border-l border-gray-800">
                <div class="flex items-center justify-between border-b border-gray-800 px-6 py-5 shrink-0">
                    <span class="text-white font-bold text-lg uppercase tracking-wide">Danh sách phát</span>
                    <button class="js-toggle-full-player text-gray-400 hover:text-white transition p-2">
                        <i class="fa-solid fa-chevron-down text-xl"></i>
                    </button>
                </div>
                <div id="full-player-list" class="flex-1 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-gray-700"></div>
            </div>
        </div>
    </div>

    <div id="music-player" class="hidden fixed bottom-0 left-0 right-0 bg-[#212121] text-white shadow-2xl z-50 border-t border-gray-700 h-20 flex flex-col justify-center transition-all duration-300">
        <div class="absolute -top-4 left-0 w-full group h-1 cursor-pointer">
            <input id="progress-bar" type="range" min="0" max="100" value="0" class="w-full h-full bg-[#4b5563] appearance-none cursor-pointer hover:h-1.5 transition-all rounded-lg" style="background: linear-gradient(to right, #dc2626 0%, #4b5563 0%);" />
        </div>
        <div class="flex items-center justify-between px-4 h-full">
            <div class="flex items-center gap-4 w-1/3">
                 <button id="prev-btn" class="text-gray-300 hover:text-white text-xl p-2"><i class="fa-solid fa-backward-step cursor-pointer"></i></button>
                 <button id="play-btn" class="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 transition shadow-lg text-lg cursor-pointer"><i class="fa-solid fa-play ml-1"></i></button>
                 <button id="next-btn" class="text-gray-300 hover:text-white text-xl p-2"><i class="fa-solid fa-forward-step cursor-pointer"></i></button>
                 <div class="text-xs text-gray-400 ml-2 hidden sm:block"><span id="current-time">00:00</span> / <span id="duration">00:00</span></div>
            </div>
            <div class="js-toggle-full-player flex items-center gap-4 w-1/3 justify-center cursor-pointer group">
                <div class="relative w-12 h-12 shrink-0 rounded overflow-hidden bg-gray-800">
                     <img class="w-full h-full object-cover group-hover:brightness-75 transition" src="./src/assets/images/default-album.jpg" alt="Thumbnail"/>
                     <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"><i class="fa-solid fa-chevron-up text-white"></i></div>
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
                <button class="js-open-playlist js-toggle-full-player text-gray-400 hover:text-white ml-4 p-2 transition-transform" title="Mở rộng"><i class="js-playlist-icon fa-solid fa-chevron-down text-lg cursor-pointer"></i></button>
            </div>
        </div>
        <audio id="audio" class="hidden"></audio>
    </div>
    `;
};

export const initPlayerControls = () => {
    const fullPlayer = document.getElementById("full-player");
    const miniPlayer = document.getElementById("music-player");
    const toggleBtns = document.querySelectorAll(".js-toggle-full-player");
    const fullThumb = document.getElementById("full-player-thumb");
    const miniThumb = document.querySelector("#music-player img");
    const playlistIcon = document.querySelector(".js-playlist-icon");
    const progressBar = document.getElementById("progress-bar");
    const playBtn = document.getElementById("play-btn");
    const audio = document.getElementById("audio");

    const updateImages = () => {
        const state = playerService.getState();
        if (state.currentSong) {
            if (fullThumb) fullThumb.src = state.currentSong.thumbnail;
            if (miniThumb) miniThumb.src = state.currentSong.thumbnail;
        }
    };

    const toggleFullPlayer = (forceState = null) => {
        if (!fullPlayer) return;

        if (forceState === "open") {
            fullPlayer.classList.remove("hidden");
        } else if (forceState === "close") {
            fullPlayer.classList.add("hidden");
        } else {
            fullPlayer.classList.toggle("hidden");
        }

        const isHidden = fullPlayer.classList.contains("hidden");
        if (playlistIcon) {
            playlistIcon.className = `js-playlist-icon fa-solid text-lg cursor-pointer ${
                isHidden ? "fa-chevron-up" : "fa-chevron-down"
            }`;
        }

        if (!isHidden) {
            renderFullPlayerList();
            updateImages();
        }
    };

    document.addEventListener("OPEN_FULL_PLAYER", () => {
        if (miniPlayer) miniPlayer.classList.remove("hidden");
        toggleFullPlayer("open");
    });

    document.addEventListener("CLOSE_FULL_PLAYER", () => {
        toggleFullPlayer("close");
    });

    toggleBtns.forEach((btn) =>
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleFullPlayer();
        })
    );

    document.addEventListener("click", (e) => {
        if (!fullPlayer || fullPlayer.classList.contains("hidden")) return;
        if (e.target.closest(".js-toggle-full-player")) return;
        if (e.target.closest(".js-stop-close")) return;
        if (e.target.closest("#music-player")) return;
        if (e.target.closest(".js-playlist-item")) return;

        toggleFullPlayer("close");
    });

    const updateProgressColor = (val) => {
        if (!progressBar) return;
        progressBar.style.background = `linear-gradient(to right, #dc2626 ${val}%, #4b5563 ${val}%)`;
    };

    let isSeeking = false;

    if (audio && progressBar) {
        audio.addEventListener("timeupdate", () => {
            if (!isSeeking && audio.duration) {
                const percent = (audio.currentTime / audio.duration) * 100;
                progressBar.value = percent;
                updateProgressColor(percent);
            }
        });

        const startSeek = () => {
            isSeeking = true;
        };
        progressBar.addEventListener("mousedown", startSeek);
        progressBar.addEventListener("touchstart", startSeek);

        progressBar.addEventListener("input", (e) => {
            updateProgressColor(e.target.value);
            const currentTimeEl = document.getElementById("current-time");
            if (currentTimeEl && audio.duration) {
                const seekTime = (audio.duration / 100) * e.target.value;
                currentTimeEl.textContent = formatUtils.formatTime(seekTime);
            }
        });

        const endSeek = (e) => {
            isSeeking = false;
            if (audio.duration) {
                const seekTime = (audio.duration / 100) * e.target.value;
                audio.currentTime = seekTime;
            }
        };
        progressBar.addEventListener("change", endSeek);
        progressBar.addEventListener("touchend", endSeek);

        audio.addEventListener("play", () => {
            if (playBtn)
                playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        });
        audio.addEventListener("pause", () => {
            if (playBtn)
                playBtn.innerHTML = '<i class="fa-solid fa-play ml-1"></i>';
        });
    }

    const handleListClick = (e) => {
        const item = e.target.closest(".js-playlist-item");
        if (item) {
            e.stopPropagation();
            playerService.selectSong(parseInt(item.dataset.index));
            setTimeout(() => {
                renderFullPlayerList();
                updateImages();
            }, 50);
        }
    };

    const fullListContainer = document.getElementById("full-player-list");
    if (fullListContainer) {
        fullListContainer.removeEventListener("click", handleListClick);
        fullListContainer.addEventListener("click", handleListClick);
    }

    const volumeControl = document.getElementById("volume-control");
    const volumeIcon = document.querySelector(".js-volume-icon");
    if (volumeControl && volumeIcon && audio) {
        volumeControl.addEventListener("input", (e) => {
            const val = parseFloat(e.target.value);
            audio.volume = val;
            volumeIcon.className =
                "js-volume-icon fa-solid text-gray-400 w-5 text-center";
            if (val === 0) volumeIcon.classList.add("fa-volume-xmark");
            else if (val >= 0.5) volumeIcon.classList.add("fa-volume-high");
            else volumeIcon.classList.add("fa-volume-low");
        });
    }

    playBtn?.addEventListener("click", (e) => {
        e.stopPropagation();
        playerService.toggle();
    });
    document.getElementById("next-btn")?.addEventListener("click", (e) => {
        e.stopPropagation();
        playerService.next();
    });
    document.getElementById("prev-btn")?.addEventListener("click", (e) => {
        e.stopPropagation();
        playerService.prev();
    });

    playerService.registerOnPlayCallback(() => {
        if (miniPlayer && miniPlayer.classList.contains("hidden"))
            miniPlayer.classList.remove("hidden");

        if (!fullPlayer.classList.contains("hidden")) {
            renderFullPlayerList();
            updateImages();
        }
    });

    if (miniThumb && fullThumb) {
        const observer = new MutationObserver(() => {
            fullThumb.src = miniThumb.src;
        });
        observer.observe(miniThumb, {
            attributes: true,
            attributeFilter: ["src"],
        });
    }
};

export default musicPlayer;
