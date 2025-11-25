import { discoverService } from "../service/discoverService";
import { formatUtils } from "../utils/formatUtils";

const lineDetailPage = async (params) => {
    const slug = params?.data?.slug;

    if (!slug) {
        return `<div class="text-white p-10 text-center">Không tìm thấy dòng nhạc.</div>`;
    }

    let lineDetail = null;
    let songData = null;
    let playlistData = null;
    let albumData = null;
    let videoData = null;

    try {
        [lineDetail, songData, playlistData, albumData, videoData] =
            await Promise.all([
                discoverService.getLineDetail(slug),
                discoverService.getLineSongs(slug, 50),
                discoverService.getLinePlaylists(slug, 10),
                discoverService.getLineAlbums(slug, 10),
                discoverService.getLineVideos(slug, 10),
            ]);
    } catch (error) {
        console.error("Lỗi tải dữ liệu chi tiết dòng nhạc:", error);
    }

    if (!lineDetail) {
        return `<div class="text-white p-10 text-center">Lỗi tải dữ liệu hoặc dòng nhạc không tồn tại.</div>`;
    }

    const bgColor = lineDetail.color || "#555";
    const headerStyle = `background: linear-gradient(to bottom, ${bgColor}CC, #000000)`;

    const songs = songData?.items || [];
    const playlists = playlistData?.items || [];
    const albums = albumData?.items || [];
    const videos = videoData?.items || [];

    const renderCarouselItems = (items, type) => {
        if (items.length === 0) {
            return `<div class="p-4 text-gray-500 col-span-full">Không có ${type} nào.</div>`;
        }

        return items
            .map((item) => {
                const title = item.title || item.name;
                const thumbnail =
                    item.thumbnails?.[0] ||
                    item.thumb ||
                    "https://via.placeholder.com/300";
                const subtitle =
                    item.artists?.map((a) => a.name).join(", ") ||
                    item.albumName ||
                    "Tuyển chọn";
                const link = item.slug ? `/${type}/${item.slug}` : "#";

                return `
                <a href="${link}" data-navigo 
                   class="flex flex-col gap-3 cursor-pointer group w-[200px] shrink-0">
                    <div class="relative overflow-hidden rounded-md aspect-square shadow-lg">
                        <img src="${thumbnail}" alt="${title}" class="w-full h-full object-cover rounded-md transition-transform duration-500 group-hover:scale-105">
                        <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div class="w-10 h-10 bg-black/60 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 hover:scale-110 hover:bg-black/80 transition-transform">
                                <i class="fa-solid fa-play text-white text-sm ml-1"></i>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4 class="text-white font-bold text-sm truncate hover:underline" title="${title}">${title}</h4>
                        <p class="text-gray-400 text-xs truncate mt-1" title="${subtitle}">${subtitle}</p>
                    </div>
                </a>
            `;
            })
            .join("");
    };

    const renderSection = (title, id, content) => {
        if (!content || content.includes("Không có")) return "";

        return `
            <div class="mt-10">
                <h2 class="text-2xl md:text-3xl font-bold text-white mb-6">${title}</h2>
                <div id="${id}-carousel" class="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4">
                    ${content}
                </div>
            </div>
        `;
    };

    const renderSongList = () => {
        if (songs.length === 0) {
            return `<div class="text-gray-400 p-4 text-center">Dòng nhạc này hiện chưa có bài hát nào.</div>`;
        }

        return songs
            .map((song, index) => {
                const mockSongObject = {
                    id: song.name,
                    title: song.name,
                    artists: [{ name: song.albumName || "Không biết" }],
                    thumbnail: song.thumb || "https://via.placeholder.com/150",
                    src: `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${
                        (index % 4) + 1
                    }.mp3`,
                    duration: 240 + index * 5,
                };
                const itemJson = encodeURIComponent(
                    JSON.stringify(mockSongObject)
                );

                return `
                <div class="group flex items-center gap-4 p-2 rounded-md hover:bg-gray-800 transition-colors cursor-pointer js-play-song" 
                     data-song="${itemJson}">
                    
                    <span class="text-gray-400 font-medium w-4 text-center text-sm">${
                        index + 1
                    }</span>

                    <div class="flex items-center flex-1 min-w-0 gap-4">
                        <div class="relative w-12 h-12 shrink-0">
                            <img src="${mockSongObject.thumbnail}" alt="${
                    song.name
                }" class="w-full h-full object-cover rounded">
                        </div>
                        <div class="flex-1 min-w-0">
                            <h4 class="text-white font-medium truncate group-hover:underline text-sm md:text-base">
                                ${song.name}
                            </h4>
                            <p class="text-xs text-gray-400 truncate">${
                                song.albumName || "Tuyển chọn"
                            }</p>
                        </div>
                    </div>

                    <div class="hidden md:block text-sm text-gray-400 w-16 text-right">
                        ${formatUtils.formatNumber(song.views)} views
                    </div>
                    
                    <div class="hidden md:block text-sm text-gray-400 w-12 text-right">
                        ${formatUtils.formatTime(mockSongObject.duration)}
                    </div>

                    <div class="hidden group-hover:flex items-center gap-4 text-gray-400">
                        <button class="hover:text-white" title="Thêm vào thư viện"><i class="fa-regular fa-heart"></i></button>
                    </div>
                </div>
            `;
            })
            .join("");
    };

    return `
        <div class="w-full pb-32">
            <div class="relative -mx-8 -mt-10 px-8 pt-20 pb-10 mb-8" style="${headerStyle}">
                <div class="flex items-end gap-6">
                     <div class="w-32 h-32 md:w-48 md:h-28 rounded-lg shadow-2xl overflow-hidden hidden md:block">
                        <img src="${
                            lineDetail.thumbnailUrl ||
                            "https://via.placeholder.com/480x270"
                        }" class="w-full h-full object-cover">
                     </div>
                     <div>
                        <p class="text-xs font-bold uppercase tracking-wider text-white/80 mb-2">DÒNG NHẠC</p>
                        <h1 class="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">${
                            lineDetail.name
                        }</h1>
                        <p class="text-white/80 text-sm md:text-base max-w-2xl">${
                            lineDetail.description ||
                            "Tuyển chọn các playlist và bài hát thuộc dòng nhạc này."
                        }</p>
                        
                        <button class="js-play-songs mt-4 bg-white text-black font-bold py-2 px-6 rounded-full hover:bg-gray-200 transition-colors flex items-center gap-2">
                             <i class="fa-solid fa-play"></i>
                             PHÁT TẤT CẢ (${songs.length})
                        </button>
                     </div>
                </div>
            </div>

            <div class="px-0 md:px-4">
                <div class="mt-10">
                    <h2 class="text-3xl font-bold text-white mb-6">Danh sách bài hát (${
                        songs.length
                    })</h2>
                    
                    <div class="flex items-center gap-4 p-2 mb-2 text-gray-400 border-b border-gray-800">
                        <span class="w-4 text-center text-xs">#</span>
                        <span class="flex-1 min-w-0 text-xs uppercase font-bold">Bài hát</span>
                        <span class="hidden md:block text-xs uppercase font-bold w-16 text-right">Views</span>
                        <span class="hidden md:block text-xs uppercase font-bold w-12 text-right"><i class="fa-regular fa-clock"></i></span>
                        <span class="w-10"></span>
                    </div>

                    <div class="space-y-1">
                        ${renderSongList()}
                    </div>
                </div>

                ${renderSection(
                    "Playlist nổi bật",
                    "line-playlists",
                    renderCarouselItems(playlists, "playlists")
                )}

                <!-- SECTION: ALBUMS -->
                ${renderSection(
                    "Albums mới",
                    "line-albums",
                    renderCarouselItems(albums, "albums")
                )}
                
                <!-- SECTION: VIDEOS -->
                ${renderSection(
                    "Videos được xem nhiều",
                    "line-videos",
                    renderCarouselItems(videos, "videos")
                )}

            </div>
        </div>
    `;
};

export default lineDetailPage;
