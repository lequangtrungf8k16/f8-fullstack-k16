import { playlistService } from "../service/playlistService";
import { playerService } from "../service/playerService";
import { escapeHtml } from "../utils/htmlUtils";
import { formatUtils } from "../utils/formatUtils";

const getImageUrl = (item) => {
    if (!item) return "./src/assets/images/default-album.jpg";
    if (item.thumbnailUrl) return item.thumbnailUrl;
    if (item.thumbnails && item.thumbnails.length > 0)
        return item.thumbnails[0];
    if (item.thumbnail) return item.thumbnail;
    return "./src/assets/images/default-album.jpg";
};

const updateActiveSongUI = (activeIndex) => {
    const items = document.querySelectorAll(".js-detail-song-item");
    items.forEach((item) => {
        const index = parseInt(item.dataset.index);
        const titleEl = item.querySelector(".js-song-title");
        const indexEl = item.querySelector(".js-song-index");

        if (index === activeIndex) {
            item.classList.add("bg-[#2a2a2a]");
            if (titleEl) {
                titleEl.classList.remove("text-white");
                titleEl.classList.add("text-green-500");
            }
            if (indexEl) {
                indexEl.classList.remove("text-gray-500");
                indexEl.classList.add("text-green-500");
                indexEl.innerHTML = '<i class="fa-solid fa-chart-simple"></i>';
            }
        } else {
            item.classList.remove("bg-[#2a2a2a]");
            if (titleEl) {
                titleEl.classList.remove("text-green-500");
                titleEl.classList.add("text-white");
            }
            if (indexEl) {
                indexEl.classList.remove("text-green-500");
                indexEl.classList.add("text-gray-500");
                indexEl.innerText = index + 1;
            }
        }
    });
};

const playlistDetailPage = async (match) => {
    const slug = match.data.slug;
    const isAlbum = window.location.pathname.startsWith("/album");
    const type = isAlbum ? "album" : "playlist";

    try {
        const data = await playlistService.getTrackList(slug, type);
        if (!data) throw new Error("Không tìm thấy dữ liệu");

        const songs = data.songs || [];
        const totalDuration = songs.reduce(
            (acc, song) => acc + (song.duration || 0),
            0
        );

        setTimeout(() => {
            const container = document.getElementById("detail-song-list");
            const playAllBtn = document.getElementById("btn-play-all-detail");

            if (playAllBtn) {
                playAllBtn.addEventListener("click", () => {
                    if (songs.length > 0) {
                        playerService.setPlaylist(songs, 0);

                        updateActiveSongUI(0);

                        setTimeout(() => {
                            document.dispatchEvent(
                                new CustomEvent("OPEN_FULL_PLAYER")
                            );
                        }, 50);
                    }
                });
            }

            if (container) {
                container.addEventListener("click", (e) => {
                    const songItem = e.target.closest(".js-detail-song-item");
                    if (songItem) {
                        const index = parseInt(songItem.dataset.index);
                        playerService.setPlaylist(songs, index);
                        updateActiveSongUI(index);

                        setTimeout(() => {
                            document.dispatchEvent(
                                new CustomEvent("OPEN_FULL_PLAYER")
                            );
                        }, 50);
                    }
                });
            }
        }, 100);

        const renderSongList = () => {
            if (songs.length === 0)
                return '<div class="p-4 text-gray-500">Chưa có bài hát nào.</div>';

            return songs
                .map(
                    (song, index) => `
                <div class="js-detail-song-item flex items-center gap-3 p-3 rounded-md hover:bg-[#2a2a2a] cursor-pointer group border-b border-gray-800 last:border-0 transition-colors" data-index="${index}">
                    <div class="js-song-index w-8 text-center text-gray-500 font-medium text-sm">
                        ${index + 1}
                    </div>
                    <div class="w-10 h-10 rounded overflow-hidden shrink-0">
                        <img src="${
                            song.thumbnail
                        }" class="w-full h-full object-cover">
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="js-song-title text-white font-medium truncate text-sm md:text-base transition-colors">${escapeHtml(
                            song.title
                        )}</p>
                        <p class="text-gray-400 text-xs truncate">${escapeHtml(
                            song.artist
                        )}</p>
                    </div>
                    <div class="text-gray-500 text-xs md:text-sm font-medium">
                        ${
                            formatUtils
                                ? formatUtils.formatTime(song.duration)
                                : "--:--"
                        }
                    </div>
                </div>
            `
                )
                .join("");
        };

        return `
            <div class="w-full pb-32 px-4 md:px-8 pt-8 max-w-[1600px] mx-auto animate-fade-in">
                <div class="flex flex-col md:flex-row gap-8 mb-8">
                    <div class="w-[200px] md:w-[260px] shrink-0 mx-auto md:mx-0 shadow-2xl rounded-lg overflow-hidden aspect-square">
                        <img src="${getImageUrl(
                            data
                        )}" class="w-full h-full object-cover">
                    </div>
                    <div class="flex flex-col justify-end text-center md:text-left flex-1">
                        <h4 class="text-gray-400 font-bold text-xs uppercase tracking-wider mb-2">${
                            isAlbum ? "Album" : "Playlist"
                        }</h4>
                        <h2 class="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">${escapeHtml(
                            data.title || data.name
                        )}</h2>
                        <div class="text-gray-300 text-sm mb-6 line-clamp-2 max-w-2xl">${escapeHtml(
                            data.description || data.sortDescription || ""
                        )}</div>
                        
                        <div class="flex items-center gap-4 justify-center md:justify-start">
                            <button id="btn-play-all-detail" class="bg-white text-black font-bold py-3 px-8 rounded-full hover:scale-105 transition-transform flex items-center gap-2 shadow-lg cursor-pointer">
                                <i class="fa-solid fa-play"></i> Phát tất cả
                            </button>
                            </div>
                    </div>
                </div>
                <div id="detail-song-list" class="flex flex-col">
                    ${renderSongList()}
                </div>
                <div class="mt-8 text-xs text-gray-500 text-center pb-8">
                    ${songs.length} bài hát • Tổng thời gian: ${Math.floor(
            totalDuration / 60
        )} phút
                </div>
            </div>
        `;
    } catch (error) {
        console.error(error);
        return `<div class="pt-20 text-center text-white">Không tải được thông tin playlist.</div>`;
    }
};

export default playlistDetailPage;
