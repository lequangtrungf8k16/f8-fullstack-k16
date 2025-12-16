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
            type = "line";
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
        console.error("Lỗi lấy dữ liệu chi tiết:", error);
    }

    if (!data) {
        return `<div class="text-white text-center mt-20">
            <h2 class="text-2xl mb-2">Không tìm thấy nội dung</h2>
            <p class="text-gray-400">ID: ${slugOrId}</p>
        </div>`;
    }

    const title = data.name || data.title || "Tuyển tập";
    const thumbnail =
        data.thumbnail ||
        data.thumbnailUrl ||
        (data.thumbnails && data.thumbnails[0]) ||
        "./src/assets/images/default-album.jpg";

    const playlists =
        data.playlists || (type === "line" ? data.items || [] : []) || [];

    const songs =
        data.songs ||
        data.tracks ||
        (type !== "line" ? data.items || [] : []) ||
        [];

    if (playlists.length > 0) {
        return renderLineView(title, thumbnail, playlists);
    }

    return renderPlaylistView(title, thumbnail, songs, type);
};

const renderLineView = (title, thumbnail, playlists) => {
    const renderPlaylistItems = playlists
        .map((playlist) => {
            const pId = playlist.encodeId || playlist._id || playlist.id;
            const pImg =
                playlist.thumbnail ||
                playlist.thumbnailUrl ||
                playlist.thumbnailM ||
                "./src/assets/images/default-album.jpg";

            return `
            <a href="/playlist/${pId}" data-navigo class="group cursor-pointer block">
                <div class="relative overflow-hidden rounded-lg aspect-square mb-3 shadow-lg bg-gray-800">
                    <img src="${pImg}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                    <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
                         <button class="w-12 h-12 rounded-full bg-green-500 text-black flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-xl">
                            <i class="fa-solid fa-play ml-1"></i>
                         </button>
                    </div>
                </div>
                <h3 class="text-white font-bold truncate group-hover:underline">${
                    playlist.title || playlist.name
                }</h3>
                <p class="text-gray-400 text-sm truncate mt-1">${
                    playlist.sortDescription || playlist.artistNames || ""
                }</p>
            </a>
        `;
        })
        .join("");

    return `
    <div class="animate-fade-in pb-32 bg-[#121212] min-h-screen px-6 md:px-10 pt-24">
        <h1 class="text-3xl md:text-5xl font-bold text-white mb-8">${title}</h1>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            ${renderPlaylistItems}
        </div>
    </div>
    `;
};

const renderPlaylistView = (title, thumbnail, songs, type) => {
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
                      const durationFormatted = formatTime(song.duration);

                      const songData = {
                          id: songId,
                          title: song.title || song.name,
                          artist: song.artists
                              ? song.artists.map((a) => a.name).join(", ")
                              : song.artist || "Unknown",
                          thumbnail: songThumb,
                          duration: song.duration || 0,
                          audioUrl: song.audioUrl || "",
                          link: song.link || "",
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
                <h1 class="text-2xl md:text-4xl font-bold text-white mb-2 leading-tight">${title}</h1>
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
            title: song.title || song.name,
            artist: song.artists
                ? song.artists.map((a) => a.name).join(", ")
                : song.artist || "Unknown",
            thumbnail: songThumb,
            duration: song.duration || 0,
            audioUrl: song.audioUrl || song.link || "",
        };
    });
}

function formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return "00:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m < 10 ? "0" + m : m}:${s < 10 ? "0" + s : s}`;
}

export default lineDetailPage;
