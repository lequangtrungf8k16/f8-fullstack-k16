import { formatUtils } from "../utils/formatUtils";

const INITIAL_PLAYLIST_DATA = [
    {
        title: "Nỗi Đau Giữa Hòa Bình",
        artist: [{ name: "Hòa Minzy" }],
        streamUrl: "./src/assets/music/song1.mp3",
        duration: 0,
        thumbnail: "./src/assets/images/default-album.jpg",
    },
    {
        title: "Viết Tiếp Câu Chuyện Hòa Bình",
        artist: [{ name: "Tùng Dương" }],
        streamUrl: "./src/assets/music/song2.mp3",
        duration: 0,
        thumbnail: "./src/assets/images/default-album.jpg",
    },
];

let audioEl = null;
let playerState = {
    currentSong: null,
    currentPlaylist: [],
    isPlaying: false,
    currentIndex: -1,
    currentVolume: 1,
};

const renderPlaylistItems = () => {
    if (playerState.currentPlaylist.length === 0) {
        return '<p class="text-gray-400">Danh sách phát trống.</p>';
    }

    return playerState.currentPlaylist
        .map((song, index) => {
            const isCurrent = index === playerState.currentIndex;
            const statusClass = isCurrent
                ? "bg-red-600 font-bold text-white"
                : "hover:bg-gray-700 text-gray-300";

            const artistName =
                song.artist?.map((a) => a.name).join(", ") || "Unknown Artist";

            let durationDisplay = "00:00";
            if (isCurrent && audioEl?.duration && !isNaN(audioEl.duration)) {
                durationDisplay = formatUtils.formatTime(audioEl.duration);
            } else if (song.duration) {
                durationDisplay = formatUtils.formatTime(song.duration);
            }

            return `
            <button 
                class="js-playlist-item w-full text-left px-3 py-2 rounded-md transition-colors ${statusClass}"
                data-index="${index}"
            >
                <div class="flex justify-between items-center">
                    <div>
                        <i class="fa-solid fa-play text-xs mr-2 ${
                            isCurrent ? "opacity-100" : "opacity-0"
                        }"></i>
                        <span class="font-bold">${
                            song.title || "Unknown Song"
                        }</span>
                        <p class="text-xs text-gray-400 pl-4">${artistName}</p>
                    </div>
                    <span class="text-xs ${
                        isCurrent ? "text-white" : "text-gray-400"
                    }">${durationDisplay}</span>
                </div>
            </button>
        `;
        })
        .join("");
};

const updatePlaylistPopup = () => {
    const playlistContainer = document.getElementById("playlist-list");
    if (playlistContainer) {
        playlistContainer.innerHTML = renderPlaylistItems();
    }
};

const updateVolumeIcon = () => {
    const volumeIcon = document.getElementById("volume-icon");
    if (!audioEl || !volumeIcon) return;

    if (audioEl.volume === 0) {
        volumeIcon.className = "fa-solid fa-volume-xmark";
    } else if (audioEl.volume >= 0.5) {
        volumeIcon.className = "fa-solid fa-volume-high";
    } else {
        volumeIcon.className = "fa-solid fa-volume-low";
    }
};

const updatePlayerUI = () => {
    const playBtn = document.getElementById("play-btn");
    const songInfo = document.querySelector(".js-song-info");
    const thumbEl = document.querySelector("#music-player img");

    if (playBtn) {
        playBtn.innerHTML = playerState.isPlaying
            ? `<i class="fa-solid fa-pause"></i>`
            : `<i class="fa-solid fa-play"></i>`;
    }

    if (songInfo) {
        if (playerState.currentSong) {
            const song = playerState.currentSong;
            const title = song.title || "Unknown Title";
            const artist =
                song.artist?.map((a) => a.name).join(", ") || "Unknown Artist";
            songInfo.innerHTML = `
                <p id="track-title" class="font-bold truncate">${title}</p>
                <p id="track-artist" class="text-xs text-gray-400 truncate">${artist}</p>
            `;
            if (thumbEl) {
                thumbEl.src =
                    song.thumbnail || "./src/assets/images/default-album.jpg";
            }
        } else {
            songInfo.innerHTML = `
                <p id="track-title" class="font-bold">Chưa có bài hát</p>
                <p id="track-artist" class="text-xs text-gray-400">Chọn nhạc để phát</p>
            `;
            if (thumbEl) {
                thumbEl.src = "./src/assets/images/default-album.jpg";
            }
        }
    }
    updatePlaylistPopup();
    updateVolumeIcon();
};

const playTrack = () => {
    if (!audioEl || !audioEl.src) {
        console.warn("Không có nguồn nhạc để phát.");
        return;
    }
    audioEl.play().catch((error) => {
        console.warn("Lỗi tự động phát nhạc:", error);
    });
    playerState.isPlaying = true;
    updatePlayerUI();
};

const pauseTrack = () => {
    if (!audioEl) return;
    audioEl.pause();
    playerState.isPlaying = false;
    updatePlayerUI();
};

const loadAndPlaySong = (song, autoPlay = true) => {
    if (!audioEl || !song) return;

    const streamUrl =
        song.streamUrl ||
        song.audioUrl ||
        song.link ||
        "./src/assets/music/song1.mp3";

    if (!streamUrl) {
        console.error(
            "Lỗi: Không tìm thấy URL stream hợp lệ cho bài hát:",
            song.title
        );
        return;
    }

    audioEl.src = streamUrl;
    playerState.currentSong = song;
    audioEl.load();

    const playHandler = () => {
        if (autoPlay) {
            playTrack();
        }
        audioEl.removeEventListener("canplay", playHandler);
    };

    audioEl.addEventListener("canplay", playHandler, { once: true });
    updatePlayerUI();
};

const nextTrack = () => {
    if (playerState.currentPlaylist.length === 0) return;

    const nextIndex =
        (playerState.currentIndex + 1) % playerState.currentPlaylist.length;
    playerState.currentIndex = nextIndex;
    loadAndPlaySong(playerState.currentPlaylist[nextIndex], true);
};

const prevTrack = () => {
    if (playerState.currentPlaylist.length === 0) return;

    const prevIndex =
        (playerState.currentIndex - 1 + playerState.currentPlaylist.length) %
        playerState.currentPlaylist.length;
    playerState.currentIndex = prevIndex;
    loadAndPlaySong(playerState.currentPlaylist[prevIndex], true);
};

export const initializePlayerService = () => {
    audioEl = document.getElementById("audio");

    if (!audioEl) {
        console.error(
            "Lỗi khởi tạo Player: Không tìm thấy thẻ <audio> với id='audio'. Vui lòng đảm bảo musicPlayer() được gọi trước."
        );
        return false;
    }

    playerState.currentPlaylist = INITIAL_PLAYLIST_DATA;

    if (playerState.currentPlaylist.length > 0) {
        playerState.currentIndex = 0;
        const firstSong = playerState.currentPlaylist[0];

        loadAndPlaySong(firstSong, false);
        audioEl.pause();
        playerState.isPlaying = false;
    }

    const currentTimeEl = document.getElementById("current-time");
    const durationEl = document.getElementById("duration");
    const progressBar = document.getElementById("progress-bar");
    const volumeControl = document.getElementById("volume-control");
    const volumeIconBtn = document.getElementById("volume-icon-btn");

    audioEl.addEventListener("ended", nextTrack);

    audioEl.addEventListener("timeupdate", () => {
        if (!audioEl.duration || !progressBar) return;

        if (!isNaN(audioEl.duration) && audioEl.duration > 0) {
            progressBar.value = (audioEl.currentTime / audioEl.duration) * 100;
        }

        if (currentTimeEl) {
            currentTimeEl.textContent = formatUtils.formatTime(
                audioEl.currentTime
            );
        }
    });

    audioEl.addEventListener("loadedmetadata", () => {
        if (durationEl && !isNaN(audioEl.duration)) {
            durationEl.textContent = formatUtils.formatTime(audioEl.duration);
        }
        if (progressBar) {
            progressBar.max = 100;
        }
        updatePlayerUI();
    });

    volumeControl?.addEventListener("input", (e) => {
        if (!audioEl) return;
        const newVolume = parseFloat(e.target.value);
        audioEl.volume = newVolume;
        playerState.currentVolume = newVolume;
        updateVolumeIcon();
    });

    volumeIconBtn?.addEventListener("click", () => {
        if (!audioEl || !volumeControl) return;

        if (audioEl.volume > 0) {
            playerState.currentVolume = audioEl.volume;
            audioEl.volume = 0;
            volumeControl.value = 0;
        } else {
            const restoreVolume =
                playerState.currentVolume > 0 ? playerState.currentVolume : 1;
            audioEl.volume = restoreVolume;
            volumeControl.value = restoreVolume;
        }
        updateVolumeIcon();
    });

    progressBar?.addEventListener("input", () => {
        if (!audioEl || isNaN(audioEl.duration) || audioEl.duration <= 0)
            return;
        const seekTime = (progressBar.value / 100) * audioEl.duration;
        audioEl.currentTime = seekTime;
    });

    audioEl.volume = volumeControl?.value ? parseFloat(volumeControl.value) : 1;
    playerState.currentVolume = audioEl.volume;
    updatePlayerUI();
    return true;
};

const setAndPlayPlaylist = (playlist, startIndex = 0) => {
    if (!audioEl || !Array.isArray(playlist) || playlist.length === 0) return;

    playerState.currentPlaylist = playlist;
    playerState.currentIndex = startIndex;
    loadAndPlaySong(playlist[startIndex], true);
};

const playSingleSong = (song) => {
    setAndPlayPlaylist([song], 0);
};

export const playerService = {
    play: playSingleSong,
    setPlaylist: setAndPlayPlaylist,
    toggle: () => {
        if (!playerState.currentSong) {
            if (playerState.currentPlaylist.length > 0) {
                playerState.currentIndex = 0;
                loadAndPlaySong(playerState.currentPlaylist[0], true);
            }
            return;
        }

        playerState.isPlaying ? pauseTrack() : playTrack();
    },
    getState: () => playerState,
    next: nextTrack,
    prev: prevTrack,
};
