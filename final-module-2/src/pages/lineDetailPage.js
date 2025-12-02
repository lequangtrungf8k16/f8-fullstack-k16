import { homeService } from "../service/homeService";
import { playlistService } from "../service/playlistService";
import { playerService } from "../service/playerService";

const lineDetailPage = async (match) => {
    const slugOrId = match?.data?.slug;

    if (!slugOrId)
        return `<div class="text-gray-500 text-center mt-20">Không tìm thấy thông tin.</div>`;

    let data = null;
    let type = "line";

    try {
        const lineData = await homeService.getLineDetail(slugOrId);
        if (lineData) {
            data = lineData;
        } else {
            const playlistData = await playlistService.getPlaylistDetailsApi(
                slugOrId
            );
            if (playlistData) {
                data = playlistData;
                type = "playlist";
            } else {
                const albumData = await playlistService.getAlbumDetailsApi(
                    slugOrId
                );
                if (albumData) {
                    data = albumData;
                    type = "album";
                }
            }
        }
    } catch (error) {
        console.error("Lỗi:", error);
    }

    if (!data) {
        console.error(
            "Không thể tìm thấy dữ liệu (Line/Playlist/Album) cho ID:",
            slugOrId
        );

        return `<div class="text-white text-center mt-20">
            <h2 class="text-2xl mb-2">Không tìm thấy Tuyển tập này</h2>
            <p class="text-gray-400">Có thể dữ liệu đã bị xóa khỏi API (ID: ${slugOrId}).</p>
        </div>`;
    }

    const title = data.name || data.title || "Tuyển tập";

    const thumbnail =
        data.thumbnail ||
        data.thumbnailUrl ||
        (data.thumbnails && data.thumbnails[0]) ||
        "./src/assets/images/default-album.jpg";

    const songs = data.songs || data.items || data.tracks || [];
    const currentSongId = playerService.getState().currentSong?.id;

    const renderSongs =
        songs.length > 0
            ? songs
                  .map((song, index) => {
                      let songThumb = thumbnail;
                      if (song.thumbnails && song.thumbnails.length > 0)
                          songThumb = song.thumbnails[0];
                      else if (song.thumbnail) songThumb = song.thumbnail;

                      const songId = song.encodeId || song._id || song.id;
                      const isPlaying = currentSongId === songId;

                      const durationFormatted = song.duration
                          ? formatTime(song.duration)
                          : "--:--";

                      const songData = {
                          id: songId,
                          title: song.title,
                          artist: song.artists
                              ? song.artists.map((a) => a.name).join(", ")
                              : song.artist || "Unknown",
                          thumbnail: songThumb,
                          duration: song.duration || 0,
                          audioUrl: song.audioUrl || "",
                      };
                      const songDataStr = encodeURIComponent(
                          JSON.stringify(songData)
                      );

                      return `
                <div class="flex items-center gap-4 p-2 rounded-md cursor-pointer transition-colors border-b border-gray-800 last:border-0 group js-play-song ${
                    isPlaying ? "bg-[#2a2a2a]" : "hover:bg-[#2a2a2a]"
                }"
                     data-song="${songDataStr}" data-index="${index}">
                    
                    <span class="text-gray-500 w-6 text-center text-sm font-medium">
                        ${
                            isPlaying
                                ? '<i class="fa-solid fa-chart-simple text-green-500"></i>'
                                : index + 1
                        }
                    </span>

                    <div class="w-10 h-10 rounded overflow-hidden shrink-0 bg-gray-800">
                        <img src="${
                            songData.thumbnail
                        }" class="w-full h-full object-cover">
                    </div>

                    <div class="flex-1 min-w-0">
                        <h4 class="text-white text-sm font-medium truncate ${
                            isPlaying ? "text-green-500" : ""
                        }">${songData.title}</h4>
                        <p class="text-xs text-gray-500 truncate mt-0.5">${
                            songData.artist
                        }</p>
                    </div>

                    <div class="text-xs text-gray-500 font-medium">
                        ${durationFormatted}
                    </div>
                </div>`;
                  })
                  .join("")
            : `<div class="text-gray-500 italic py-4">Danh sách trống.</div>`;

    setTimeout(() => {
        const btnPlayAll = document.querySelector(".js-play-all-line");
        if (btnPlayAll && songs.length > 0) {
            btnPlayAll.addEventListener("click", () => {
                const formattedSongs = formatSongsForPlayer(songs, thumbnail);
                playerService.setPlaylist(formattedSongs, 0);
            });
        }

        const songItems = document.querySelectorAll(".js-play-song");
        songItems.forEach((item) => {
            item.addEventListener("click", () => {
                const idx = parseInt(item.dataset.index);
                const formattedSongs = formatSongsForPlayer(songs, thumbnail);
                playerService.setPlaylist(formattedSongs, idx);

                document.querySelectorAll(".js-play-song").forEach((el) => {
                    el.classList.remove("bg-[#2a2a2a]");
                    el.querySelector("span").innerHTML =
                        parseInt(el.dataset.index) + 1;
                    el.querySelector("h4").classList.remove("text-green-500");
                });
                item.classList.add("bg-[#2a2a2a]");
                item.querySelector("span").innerHTML =
                    '<i class="fa-solid fa-chart-simple text-green-500"></i>';
                item.querySelector("h4").classList.add("text-green-500");
            });
        });
    }, 100);

    return `
    <div class="animate-fade-in pb-32 bg-[#121212] min-h-screen">
        <div class="flex flex-col md:flex-row items-center md:items-end gap-6 pt-24 pb-8 px-6 md:px-10 border-b border-gray-800">
            <div class="w-40 h-40 shadow-lg rounded-lg overflow-hidden shrink-0 bg-gray-800">
                <img src="${thumbnail}" class="w-full h-full object-cover">
            </div>
            
            <div class="text-center md:text-left flex-1">
                <h1 class="text-2xl md:text-4xl font-bold text-white mb-2 leading-tight">
                    ${title}
                </h1>
                <p class="text-gray-400 text-sm mb-4 line-clamp-1">
                    ${type === "playlist" ? "Playlist" : "Album"} • ${
        songs.length
    } bài hát
                </p>
                <button class="js-play-all-line bg-green-500 hover:bg-green-400 text-black font-bold rounded-full px-8 py-2.5 text-sm uppercase tracking-wider transition-transform hover:scale-105">
                    <i class="fa-solid fa-play mr-2"></i> Phát tất cả
                </button>
            </div>
        </div>

        <div class="px-2 md:px-8 mt-4">
            ${renderSongs}
        </div>
    </div>
    `;
};

function formatSongsForPlayer(songs, defaultThumb) {
    return songs.map((song) => {
        let songThumb = defaultThumb;
        if (song.thumbnails && song.thumbnails.length > 0)
            songThumb = song.thumbnails[0];
        else if (song.thumbnail) songThumb = song.thumbnail;
        return {
            id: song.encodeId || song._id || song.id,
            title: song.title,
            artist: song.artists
                ? song.artists.map((a) => a.name).join(", ")
                : song.artist || "Unknown",
            thumbnail: songThumb,
            duration: song.duration || 0,
            audioUrl: song.audioUrl || "",
        };
    });
}

function formatTime(seconds) {
    if (!seconds) return "00:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m < 10 ? "0" + m : m}:${s < 10 ? "0" + s : s}`;
}

export default lineDetailPage;
