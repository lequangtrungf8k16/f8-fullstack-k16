import { homeService } from "../service/homeService";
import { playlistService } from "../service/playlistService";
import { playerService } from "../service/playerService";

const lineDetailPage = async (match) => {
    const slugOrId = match?.data?.slug;

    if (!slugOrId) {
        return `<div class="text-white text-center mt-20">Không tìm thấy thông tin.</div>`;
    }

    let data = null;
    let type = "line";

    try {
        const lineData = await homeService.getLineDetail(slugOrId);
        if (lineData) {
            data = lineData;
        } else {
            console.log("Không tìm thấy Line, thử tìm Playlist ID:", slugOrId);
            const playlistData = await playlistService.getPlaylistDetailsApi(
                slugOrId
            );
            if (playlistData) {
                data = playlistData;
                type = "playlist";
            }
        }
    } catch (error) {
        console.error("Lỗi tải dữ liệu:", error);
    }

    if (!data) {
        return `<div class="text-white text-center mt-20">Không tải được nội dung (ID: ${slugOrId}).</div>`;
    }

    const title = data.name || data.title || "Tuyển tập";
    const description = data.description || data.sortDescription || "";

    const thumbnail =
        data.thumbnail ||
        data.thumbnailUrl ||
        "./src/assets/images/default-album.jpg";
    const songs = data.songs || data.items || [];

    const renderSongs =
        songs.length > 0
            ? songs
                  .map((song, index) => {
                      const songData = {
                          id: song.encodeId || song._id || song.id,
                          title: song.title,
                          artist: song.artists
                              ? song.artists.map((a) => a.name).join(", ")
                              : song.artist || "Unknown",
                          thumbnail: song.thumbnail || thumbnail,
                          duration: song.duration || 0,
                      };
                      const songDataStr = encodeURIComponent(
                          JSON.stringify(songData)
                      );
                      const durationFormatted = song.duration
                          ? formatTime(song.duration)
                          : "--:--";

                      return `
            <div class="flex items-center gap-4 p-3 hover:bg-white/10 rounded-lg cursor-pointer group js-play-song transition-colors"
                 data-song="${songDataStr}">
                
                <span class="text-gray-400 w-4 text-center group-hover:hidden">${
                    index + 1
                }</span>
                <i class="fa-solid fa-play text-white w-4 text-center hidden group-hover:block text-xs"></i>

                <div class="w-10 h-10 rounded overflow-hidden shrink-0">
                    <img src="${
                        songData.thumbnail
                    }" class="w-full h-full object-cover">
                </div>

                <div class="flex-1 min-w-0">
                    <h4 class="text-white font-medium truncate group-hover:text-green-400">${
                        songData.title
                    }</h4>
                    <p class="text-xs text-gray-400 truncate">${
                        songData.artist
                    }</p>
                </div>

                <div class="text-xs text-gray-400">
                    ${durationFormatted}
                </div>
            </div>
            `;
                  })
                  .join("")
            : `<div class="text-gray-400 italic">Chưa có bài hát nào trong danh sách này.</div>`;

    setTimeout(() => {
        const btnPlayAll = document.querySelector(".js-play-all-line");
        if (btnPlayAll && songs.length > 0) {
            btnPlayAll.addEventListener("click", () => {
                const formattedSongs = songs.map((song) => ({
                    id: song.encodeId || song._id || song.id,
                    title: song.title,
                    artist: song.artists
                        ? song.artists.map((a) => a.name).join(", ")
                        : song.artist || "Unknown",
                    thumbnail: song.thumbnail || thumbnail,
                    duration: song.duration || 0,
                }));
                playerService.setPlaylist(formattedSongs, 0);
            });
        }
    }, 500);

    return `
    <div class="animate-fade-in pb-32">
        <div class="flex flex-col md:flex-row items-end gap-6 md:gap-8 pt-20 px-8 pb-8 bg-linear-to-b from-emerald-900/50 to-black/50">
            <div class="w-48 h-48 md:w-56 md:h-56 shadow-2xl rounded-lg overflow-hidden shrink-0 mx-auto md:mx-0">
                <img src="${thumbnail}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
            </div>
            
            <div class="flex flex-col gap-4 text-center md:text-left w-full">
                <span class="text-xs font-bold uppercase text-white/80 tracking-wider">
                    ${type === "playlist" ? "PLAYLIST" : "DÒNG NHẠC"}
                </span>
                <h1 class="text-3xl md:text-5xl lg:text-7xl font-black text-white tracking-tight">
                    ${title}
                </h1>
                <p class="text-gray-300 text-sm md:text-base max-w-2xl line-clamp-2">
                    ${description}
                </p>
                <div class="mt-2 flex items-center justify-center md:justify-start gap-4">
                    <button class="js-play-all-line bg-green-500 hover:bg-green-400 text-black font-bold rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
                        <i class="fa-solid fa-play text-xl ml-1"></i>
                    </button>
                    <button class="w-10 h-10 rounded-full border border-gray-500 text-white flex items-center justify-center hover:border-white hover:bg-white/10 transition">
                        <i class="fa-regular fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>

        <div class="px-4 md:px-8 mt-4">
            <div class="bg-black/20 rounded-xl p-4 min-h-[300px]">
                ${renderSongs}
            </div>
        </div>
    </div>
    `;
};

function formatTime(seconds) {
    if (!seconds) return "00:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m < 10 ? "0" + m : m}:${s < 10 ? "0" + s : s}`;
}

export default lineDetailPage;
