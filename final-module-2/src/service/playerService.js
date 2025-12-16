import apiClient from "../utils/apiClient";
import { getTrackList } from "./playlistService";

let audioEl = null;

let playerState = {
    currentSong: null,
    currentPlaylist: [],
    isPlaying: false,
    currentIndex: -1,
    currentVolume: 1,
    isLoading: false,
    consecutiveErrors: 0,
};

let onSongStartCallback = null;

const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "00:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m < 10 ? "0" + m : m}:${s < 10 ? "0" + s : s}`;
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
                : `<i class="fa-solid fa-play ml-1"></i>`;
        }
    }

    if (songInfo) {
        if (playerState.currentSong) {
            const song = playerState.currentSong;
            songInfo.innerHTML = `
                <p id="track-title" class="font-bold text-sm md:text-base truncate hover:underline cursor-pointer">${song.title}</p>
                <p id="track-artist" class="text-xs text-gray-400 truncate hover:text-white cursor-pointer">${song.artist}</p>
            `;
            if (thumbEl) {
                thumbEl.src =
                    song.thumbnail || "./src/assets/images/default-song.jpg";
            }
        } else {
            songInfo.innerHTML = `
                <p id="track-title" class="font-bold text-sm md:text-base truncate">Chưa chọn bài</p>
                <p id="track-artist" class="text-xs text-gray-400 truncate">...</p>
            `;
        }
    }

    if (nextBtn) nextBtn.disabled = playerState.currentPlaylist.length <= 1;
    if (prevBtn) prevBtn.disabled = playerState.currentPlaylist.length <= 1;
};

const getStreamUrl = async (songId) => {
    if (!songId) return null;
    try {
        const response = await apiClient.get(`/songs/details/${songId}`);
        const songData = response.data.data || response.data;
        if (!songData) return null;

        if (songData.audioUrl) return songData.audioUrl;
        if (songData["128"]) return songData["128"];
        if (songData["320"]) return songData["320"];
        if (songData.source && songData.source["128"])
            return songData.source["128"];
        if (songData.link) return songData.link;
        return null;
    } catch (error) {
        console.error("Lỗi lấy link nhạc:", error);
        return null;
    }
};

const playTrack = async () => {
    if (!playerState.currentSong) return;

    if (playerState.consecutiveErrors >= 5) {
        alert("Playlist có quá nhiều bài lỗi. Player sẽ dừng lại.");
        playerState.isPlaying = false;
        playerState.isLoading = false;
        playerState.consecutiveErrors = 0;
        updatePlayerUI();
        return;
    }

    playerState.isLoading = true;
    updatePlayerUI();

    try {
        const songId = playerState.currentSong.id;
        let streamUrl = playerState.currentSong.audioUrl;

        if (!streamUrl) {
            streamUrl = await getStreamUrl(songId);
            playerState.currentSong.audioUrl = streamUrl;
        }

        if (!streamUrl) {
            console.warn(`Không tìm thấy link nhạc: ${songId}`);
            playerState.consecutiveErrors++;
            playerState.isLoading = false;
            updatePlayerUI();
            setTimeout(() => nextTrack(), 1000);
            return;
        }

        playerState.consecutiveErrors = 0;

        if (audioEl.src !== streamUrl) {
            audioEl.src = streamUrl;
        }

        try {
            await audioEl.play();
            playerState.isPlaying = true;
        } catch (playErr) {
            console.warn("Autoplay blocked:", playErr);
            playerState.isPlaying = false;
        }
    } catch (error) {
        console.error("Lỗi playTrack:", error);
        playerState.isPlaying = false;
    } finally {
        playerState.isLoading = false;
        updatePlayerUI();
    }
};

const pauseTrack = () => {
    if (audioEl) {
        audioEl.pause();
        playerState.isPlaying = false;
        updatePlayerUI();
    }
};

const loadSongByIndex = (index) => {
    if (index < 0 || index >= playerState.currentPlaylist.length) return;

    if (playerState.currentIndex === index && playerState.currentSong) {
        if (playerState.isPlaying) pauseTrack();
        else playTrack();
        return;
    }

    playerState.currentIndex = index;
    playerState.currentSong = playerState.currentPlaylist[index];

    playTrack();

    if (onSongStartCallback) onSongStartCallback();
};

const nextTrack = () => {
    if (playerState.currentPlaylist.length === 0) return;
    let nextIndex = playerState.currentIndex + 1;
    if (nextIndex >= playerState.currentPlaylist.length) nextIndex = 0;

    playerState.currentIndex = nextIndex;
    playerState.currentSong = playerState.currentPlaylist[nextIndex];
    playTrack();
    if (onSongStartCallback) onSongStartCallback();
};

const prevTrack = () => {
    if (playerState.currentPlaylist.length === 0) return;
    let prevIndex = playerState.currentIndex - 1;
    if (prevIndex < 0) prevIndex = playerState.currentPlaylist.length - 1;

    playerState.currentIndex = prevIndex;
    playerState.currentSong = playerState.currentPlaylist[prevIndex];
    playTrack();
    if (onSongStartCallback) onSongStartCallback();
};

export const initializePlayerService = () => {
    audioEl = document.getElementById("audio");
    if (!audioEl) return;

    audioEl.addEventListener("ended", () => {
        playerState.consecutiveErrors = 0;
        nextTrack();
    });

    audioEl.addEventListener("error", () => {
        if (playerState.isPlaying) {
            console.warn("Audio Error, skipping...");
            playerState.consecutiveErrors++;
            setTimeout(nextTrack, 1000);
        }
    });

    const currentTimeEl = document.getElementById("current-time");
    const durationEl = document.getElementById("duration");

    audioEl.addEventListener("timeupdate", () => {
        if (currentTimeEl)
            currentTimeEl.textContent = formatTime(audioEl.currentTime);
    });

    audioEl.addEventListener("loadedmetadata", () => {
        if (durationEl) durationEl.textContent = formatTime(audioEl.duration);
    });

    updatePlayerUI();
};

export const playerService = {
    setPlaylist: (songs, startIndex = 0) => {
        playerState.currentPlaylist = songs;
        playerState.consecutiveErrors = 0;
        playerState.currentIndex = startIndex;
        playerState.currentSong = songs[startIndex];
        playTrack();
        if (onSongStartCallback) onSongStartCallback();
    },
    playAlbumOrPlaylist: async (id, type = "playlist") => {
        playerState.isLoading = true;
        updatePlayerUI();
        try {
            const data = await getTrackList(id, type);
            if (data && data.songs && data.songs.length > 0) {
                playerState.currentPlaylist = data.songs;
                playerState.consecutiveErrors = 0;

                playerState.currentIndex = 0;
                playerState.currentSong = data.songs[0];
                playTrack();
                if (onSongStartCallback) onSongStartCallback();
            } else {
                alert("Playlist rỗng hoặc không tải được.");
            }
        } catch (e) {
            console.error(e);
        } finally {
            playerState.isLoading = false;
            updatePlayerUI();
        }
    },
    loadPlaylistOnly: async (id, type = "playlist") => {
        playerState.isLoading = true;
        try {
            const data = await getTrackList(id, type);
            if (data && data.songs && data.songs.length > 0) {
                playerState.currentPlaylist = data.songs;
                playerState.consecutiveErrors = 0;
                playerState.currentIndex = 0;
                playerState.currentSong = data.songs[0];

                playerState.isPlaying = false;
                if (audioEl) audioEl.pause();

                updatePlayerUI();
                if (onSongStartCallback) onSongStartCallback();
            }
        } catch (error) {
            console.error("Lỗi loadPlaylistOnly:", error);
        } finally {
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
        playerState.consecutiveErrors = 0;
        loadSongByIndex(index);
    },
    getState: () => playerState,
    registerOnPlayCallback: (callback) => {
        onSongStartCallback = callback;
    },
};
