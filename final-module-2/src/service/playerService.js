import apiClient from "../utils/apiClient";
import { formatUtils } from "../utils/formatUtils";
import { getTrackList } from "./playlistService";

let audioEl = null;

let playerState = {
    currentSong: null,
    currentPlaylist: [],
    isPlaying: false,
    currentIndex: -1,
    currentVolume: 1,
    isLoading: false,
};

const updatePlayerUI = () => {
    const playBtn = document.getElementById("play-btn");
    const songInfo = document.querySelector(".js-song-info");
    const thumbEl = document.querySelector("#music-player img");
    const nextBtn = document.getElementById("next-btn");
    const prevBtn = document.getElementById("prev-btn");

    if (playBtn) {
        if (playerState.isLoading) {
            playBtn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i>`;
        } else {
            playBtn.innerHTML = playerState.isPlaying
                ? `<i class="fa-solid fa-pause"></i>`
                : `<i class="fa-solid fa-play"></i>`;
        }
    }

    if (songInfo) {
        if (playerState.currentSong) {
            const song = playerState.currentSong;
            songInfo.innerHTML = `
                <p id="track-title" class="font-bold truncate text-sm md:text-base">${song.title}</p>
                <p id="track-artist" class="text-xs text-gray-400 truncate">${song.artist}</p>
            `;
            if (thumbEl) {
                thumbEl.src =
                    song.thumbnail || "./src/assets/images/default-album.jpg";
            }
        } else {
            songInfo.innerHTML = `
                <p id="track-title" class="font-bold">Chọn bài hát</p>
                <p id="track-artist" class="text-xs text-gray-400">...</p>
            `;
        }
    }

    if (nextBtn) nextBtn.disabled = playerState.currentPlaylist.length <= 1;
    if (prevBtn) prevBtn.disabled = playerState.currentPlaylist.length <= 1;

    updatePopupList();
};

const updatePopupList = () => {
    const listContainer = document.getElementById("playlist-list");
    if (!listContainer) return;

    if (playerState.currentPlaylist.length === 0) {
        listContainer.innerHTML =
            '<div class="text-gray-400 text-center text-sm p-4">Danh sách trống</div>';
        return;
    }

    const html = playerState.currentPlaylist
        .map((song, index) => {
            const isActive = index === playerState.currentIndex;
            return `
            <div class="js-playlist-item flex justify-between items-center p-2 rounded cursor-pointer hover:bg-gray-700 ${
                isActive ? "bg-gray-700 border-l-4 border-red-500" : ""
            }" data-index="${index}">
                <div class="flex items-center gap-3 overflow-hidden">
                    <img src="${
                        song.thumbnail
                    }" class="w-8 h-8 rounded object-cover">
                    <div class="flex flex-col overflow-hidden">
                        <span class="text-sm font-medium truncate ${
                            isActive ? "text-white" : "text-gray-300"
                        }">${song.title}</span>
                        <span class="text-xs text-gray-500 truncate">${
                            song.artist
                        }</span>
                    </div>
                </div>
                ${
                    isActive && playerState.isPlaying
                        ? '<i class="fa-solid fa-chart-simple text-red-500 animate-pulse"></i>'
                        : ""
                }
            </div>
        `;
        })
        .join("");

    listContainer.innerHTML = html;
};

const getStreamUrl = async (songId) => {
    try {
        const response = await apiClient.get(`/songs/details/${songId}`);
        const songData = response.data.data;

        if (songData && songData.source) {
            return songData.source["128"] || songData.source["320"];
        }
        return songData.link || "";
    } catch (error) {
        console.error("Không lấy được link nhạc:", error);
        return null;
    }
};

const playTrack = async () => {
    if (!playerState.currentSong) return;

    playerState.isLoading = true;
    updatePlayerUI();

    try {
        const songId = playerState.currentSong.id;

        const streamUrl = await getStreamUrl(songId);

        if (!streamUrl) {
            alert(
                "Bài hát này chưa được hỗ trợ phát (Lỗi bản quyền hoặc link hỏng)."
            );
            nextTrack();
            return;
        }

        audioEl.src = streamUrl;
        await audioEl.play();
        playerState.isPlaying = true;
    } catch (error) {
        console.error("Lỗi phát nhạc:", error);
        playerState.isPlaying = false;
    } finally {
        playerState.isLoading = false;
        updatePlayerUI();
    }
};

const pauseTrack = () => {
    audioEl.pause();
    playerState.isPlaying = false;
    updatePlayerUI();
};

const loadSongByIndex = (index) => {
    if (index < 0 || index >= playerState.currentPlaylist.length) return;

    playerState.currentIndex = index;
    playerState.currentSong = playerState.currentPlaylist[index];

    playTrack();
};

const nextTrack = () => {
    let nextIndex = playerState.currentIndex + 1;
    if (nextIndex >= playerState.currentPlaylist.length) {
        nextIndex = 0;
    }
    loadSongByIndex(nextIndex);
};

const prevTrack = () => {
    let prevIndex = playerState.currentIndex - 1;
    if (prevIndex < 0) {
        prevIndex = playerState.currentPlaylist.length - 1;
    }
    loadSongByIndex(prevIndex);
};

export const initializePlayerService = () => {
    audioEl = document.getElementById("audio");
    if (!audioEl) return;

    audioEl.addEventListener("ended", nextTrack);

    const progressBar = document.getElementById("progress-bar");
    const currentTimeEl = document.getElementById("current-time");
    const durationEl = document.getElementById("duration");

    audioEl.addEventListener("timeupdate", () => {
        if (audioEl.duration) {
            const percent = (audioEl.currentTime / audioEl.duration) * 100;
            if (progressBar) progressBar.value = percent;
            if (currentTimeEl)
                currentTimeEl.textContent = formatUtils.formatTime(
                    audioEl.currentTime
                );
        }
    });

    audioEl.addEventListener("loadedmetadata", () => {
        if (durationEl)
            durationEl.textContent = formatUtils.formatTime(audioEl.duration);
    });

    if (progressBar) {
        progressBar.addEventListener("input", (e) => {
            const seekTime = (audioEl.duration / 100) * e.target.value;
            audioEl.currentTime = seekTime;
        });
    }

    const volumeControl = document.getElementById("volume-control");
    if (volumeControl) {
        volumeControl.addEventListener("input", (e) => {
            audioEl.volume = e.target.value;
        });
    }

    updatePlayerUI();
};

export const playerService = {
    playAlbumOrPlaylist: async (id, type = "playlist") => {
        playerState.isLoading = true;
        updatePlayerUI();

        const data = await getTrackList(id, type);

        if (data && data.songs && data.songs.length > 0) {
            playerState.currentPlaylist = data.songs;

            loadSongByIndex(0);
        } else {
            alert("Album/Playlist này không có bài hát nào!");
            playerState.isLoading = false;
            updatePlayerUI();
        }
    },

    toggle: () => {
        if (playerState.currentPlaylist.length === 0) return;
        playerState.isPlaying ? pauseTrack() : playTrack();
    },

    next: nextTrack,
    prev: prevTrack,

    selectSong: (index) => {
        loadSongByIndex(index);
    },

    getState: () => playerState,
};
