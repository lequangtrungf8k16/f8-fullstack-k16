import { discoverService } from "../service/discoverService";
import { playerService } from "../service/playerService";
import { formatUtils } from "../utils/formatUtils";

const lineDetailPage = async (params) => {
    const slug = params?.slug || params?.data?.slug;

    if (!slug) {
        return `<div class="text-white p-20 text-center">Không tìm thấy đường dẫn dòng nhạc.</div>`;
    }

    let lineDetail = null;
    let songs = [],
        playlists = [],
        albums = [],
        videos = [];

    try {
        const [detailRes, songRes, plRes, albRes, vidRes] = await Promise.all([
            discoverService.getLineDetail(slug),
            discoverService.getLineSongs(slug, 20),
            discoverService.getLinePlaylists(slug, 10),
            discoverService.getLineAlbums(slug, 10),
            discoverService.getLineVideos(slug, 10),
        ]);

        lineDetail = detailRes;
        songs = songRes || [];
        playlists = plRes || [];
        albums = albRes || [];
        videos = vidRes || [];
    } catch (error) {
        console.error("Lỗi tải chi tiết dòng nhạc:", error);
    }

    if (!lineDetail) {
        return `<div class="text-white p-20 text-center">Không tải được thông tin dòng nhạc "${slug}".</div>`;
    }

    const bgColor = lineDetail.color || "#555";
    const headerStyle = `background: linear-gradient(to bottom, ${bgColor}, #000000)`;

    const renderCarouselItems = (items, type) => {
        if (!items || items.length === 0)
            return `<div class="text-gray-500 pl-4">Đang cập nhật...</div>`;

        return items
            .map((item) => {
                const title = item.title || item.name || "Không tiêu đề";
                const thumb =
                    item.thumbnailUrl ||
                    (item.thumbnails && item.thumbnails[0]) ||
                    item.thumbnails ||
                    "./src/assets/images/default-album.jpg";
                const id = item.slug || item._id || item.encodeId;

                const aspectRatio =
                    type === "videos" ? "aspect-video" : "aspect-square";
                const playType =
                    type === "videos"
                        ? "video"
                        : type === "playlists"
                        ? "playlist"
                        : "album";

                return `
                <div class="w-[180px] shrink-0 cursor-pointer group">
                    <div class="relative w-full ${aspectRatio} rounded-md overflow-hidden mb-3 bg-gray-800 shadow-lg">
                        <img src="${thumb}" alt="${title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                        
                        <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                             <button class="js-play-item w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform shadow-xl"
                                data-id="${id}" data-type="${playType}">
                                <i class="fa-solid fa-play ml-1"></i>
                            </button>
                        </div>
                    </div>
                    <h4 class="text-white font-bold text-sm truncate hover:underline" title="${title}">${title}</h4>
                </div>
            `;
            })
            .join("");
    };

    const renderSongList = () => {
        if (songs.length === 0)
            return `<div class="text-gray-400 p-4">Chưa có bài hát nổi bật.</div>`;

        return songs
            .map((song, index) => {
                const title = song.name || "Unknown";
                const artist = song.albumName || "Nhiều nghệ sĩ";
                const thumb =
                    song.thumb || "./src/assets/images/default-album.jpg";
                const id = song._id || song.encodeId || "";

                return `
                <div class="group flex items-center gap-4 p-2 rounded-md hover:bg-white/10 transition-colors cursor-pointer js-play-song-item" 
                     data-index="${index}">
                    
                    <span class="text-gray-400 font-medium w-6 text-center text-sm group-hover:hidden">${
                        index + 1
                    }</span>
                    <button class="hidden group-hover:block w-6 text-center text-white"><i class="fa-solid fa-play text-xs"></i></button>

                    <div class="relative w-10 h-10 shrink-0">
                        <img src="${thumb}" alt="${title}" class="w-full h-full object-cover rounded">
                    </div>
                    
                    <div class="flex-1 min-w-0">
                        <h4 class="text-white font-medium truncate text-sm">${title}</h4>
                        <p class="text-xs text-gray-400 truncate">${artist}</p>
                    </div>

                    <div class="hidden md:block text-xs text-gray-400 w-20 text-right">
                        ${
                            song.views
                                ? formatUtils.formatNumber(song.views)
                                : 0
                        } <i class="fa-regular fa-eye ml-1"></i>
                    </div>
                    
                    <button class="text-gray-400 hover:text-white px-2"><i class="fa-regular fa-heart"></i></button>
                </div>
            `;
            })
            .join("");
    };

    const renderSection = (title, content) => {
        return `
            <div class="mb-12 animate-fade-in">
                <h2 class="text-xl md:text-2xl font-bold text-white mb-4 pl-4 md:pl-0 border-l-4 border-white md:border-none ml-4 md:ml-0">
                    ${title}
                </h2>
                <div class="flex gap-6 overflow-x-auto scrollbar-hide pb-4 pl-4 md:pl-0 scroll-smooth">
                    ${content}
                </div>
            </div>
        `;
    };

    setTimeout(() => {
        document.querySelectorAll(".js-play-item").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                e.stopPropagation();
                const id = btn.dataset.id;
                const type = btn.dataset.type;
                if (type === "video") {
                    alert("Tính năng phát video đang phát triển");
                } else {
                    playerService.playAlbumOrPlaylist(id, type);
                }
            });
        });

        document.querySelectorAll(".js-play-song-item").forEach((item) => {
            item.addEventListener("click", () => {
                const index = parseInt(item.dataset.index);
                const mappedSongs = songs.map((s) => ({
                    id: s._id || s.encodeId || "",
                    title: s.name,
                    artist: s.albumName || "Nhiều nghệ sĩ",
                    thumbnail: s.thumb,
                    duration: 0,
                    link: "",
                }));
                playerService.setPlaylist(mappedSongs, index);
            });
        });

        document
            .querySelector(".js-play-all")
            ?.addEventListener("click", () => {
                if (songs.length > 0) {
                    const mappedSongs = songs.map((s) => ({
                        id: s._id || s.encodeId || "",
                        title: s.name,
                        artist: s.albumName || "Nhiều nghệ sĩ",
                        thumbnail: s.thumb,
                        duration: 0,
                        link: "",
                    }));
                    playerService.setPlaylist(mappedSongs, 0);
                }
            });
    }, 200);

    return `
        <div class="w-full pb-32 min-h-screen bg-black">
            <div class="relative pt-24 pb-10 px-6 md:px-12 flex flex-col md:flex-row items-end gap-8" style="${headerStyle}">
                <div class="w-40 h-40 md:w-52 md:h-52 shrink-0 shadow-2xl rounded-lg overflow-hidden hidden md:block">
                    <img src="${
                        lineDetail.thumbnailUrl
                    }" class="w-full h-full object-cover">
                </div>
                
                <div class="flex flex-col gap-4 w-full">
                    <p class="text-xs font-bold uppercase tracking-wider text-white/80">DÒNG NHẠC</p>
                    <h1 class="text-4xl md:text-6xl font-black text-white tracking-tight drop-shadow-lg">${
                        lineDetail.name
                    }</h1>
                    <p class="text-white/80 text-sm md:text-lg max-w-2xl font-medium">${
                        lineDetail.description || ""
                    }</p>
                    
                    ${
                        songs.length > 0
                            ? `
                        <button class="js-play-all mt-2 bg-red-600 text-white font-bold py-3 px-8 rounded-full hover:scale-105 transition-transform w-max flex items-center gap-2 shadow-lg cursor-pointer">
                            <i class="fa-solid fa-play"></i> PHÁT TẤT CẢ
                        </button>
                    `
                            : ""
                    }
                </div>
            </div>

            <div class="px-0 md:px-12 mt-8 flex flex-col lg:flex-row gap-12">
                <div class="flex-1">
                    <h2 class="text-xl md:text-2xl font-bold text-white mb-6 pl-4 md:pl-0">Bài hát nổi bật</h2>
                    <div class="flex flex-col px-2 md:px-0">
                        ${renderSongList()}
                    </div>
                </div>
            </div>
            
            <div class="px-0 md:px-12 mt-12">
                ${renderSection(
                    "Playlist tuyển chọn",
                    renderCarouselItems(playlists, "playlists")
                )}
                ${renderSection("Album", renderCarouselItems(albums, "albums"))}
                ${renderSection(
                    "Video liên quan",
                    renderCarouselItems(videos, "videos")
                )}
            </div>
        </div>
    `;
};

export default lineDetailPage;
