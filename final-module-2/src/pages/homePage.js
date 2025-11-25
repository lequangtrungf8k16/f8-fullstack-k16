import {
    getAlbumsForYou,
    getTodaysHits,
    getAlbumOrPlaylistDetails,
} from "../service/albumService";

import { playerService } from "../service/playerService";
import { getPersonalized } from "../service/homeService";
import { getPlaylistsByCountry } from "../service/playlistService";
import { discoverService } from "../service/discoverService";
import { storageService } from "../service/storageService";

const renderAlbumOrPlaylistCard = (item, type) => {
    if (!item || !item.slug) return "";

    const title = item.title || item.name;
    let subtitle =
        item.artistsText ||
        item.description ||
        (type === "category" ? "Khám phá" : "");
    const slug = item.slug || item.id;
    const itemType = type;

    const placeholderUrl = "http://via.placeholder.com/300";
    const thumbnail = item.thumbnail || placeholderUrl;

    if (itemType === "category") {
        return `
            <div class="w-[220px] h-[100px] shrink-0 cursor-pointer group bg-gray-800 rounded-lg overflow-hidden shadow-xl relative transition-transform duration-300 hover:scale-105">
                <a href="#/discoverPage/${slug}" class="absolute inset-0 p-4 flex items-center justify-between">
                    <h4 class="text-white font-bold text-lg">${title}</h4>
                    <img src="${thumbnail}" alt="${title}" class="w-16 h-16 object-cover rounded shadow-md">
                </a>
            </div>
        `;
    }
    return `
        <div class="w-[220px] shrink-0 cursor-pointer group">
            <div class="relative w-full aspect-square rounded-lg overflow-hidden shadow-xl">
                <img src="${thumbnail}" alt="${title}" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105">
                <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
                    <button data-uri="${slug}" data-type="${itemType}" class="js-play-btn w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                        <i class="fa-solid fa-play"></i>
                    </button>
                </div>
            </div>
            <h4 class="text-white font-semibold mt-3 truncate">${title}</h4>
            <p class="text-gray-400 text-sm truncate">${subtitle}</p>
        </div>
    `;
};

export const renderSection = (title, items, type) => {
    const dataItems =
        items && items.data ? items.data : Array.isArray(items) ? items : [];

    if (!dataItems || dataItems.length === 0) return "";

    const renderItem = (item) => renderAlbumOrPlaylistCard(item, type);

    return `
    <div class="mt-10">
        <div class="flex justify-between items-center mb-4">
            <h3 class="text-2xl font-bold">${title}</h3>
            <button class="border border-gray-500 px-4 py-1 rounded-3xl cursor-pointer hover:bg-gray-500 transition-colors text-sm">Xem thêm</button>
        </div>
        <div class="flex flex-nowrap gap-6 overflow-x-auto scrollbar-thin scrollbar-track-black scrollbar-thumb-gray-600 py-4">
            ${dataItems.map(renderItem).join("")}
        </div>
    </div>
    `;
};

export const initPlayButtons = () => {
    document.addEventListener("click", async (e) => {
        const playBtn = e.target.closest(".js-play-btn");
        if (!playBtn) return;
        e.preventDefault();

        const uri = playBtn.dataset.uri;
        const type = playBtn.dataset.type;
        const trackIndex = parseInt(playBtn.dataset.trackIndex) || 0;

        let playlist = [];

        try {
            playBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';

            if (uri) {
                const details = await getAlbumOrPlaylistDetails(uri, type);

                if (details && details.songs && details.songs.length > 0) {
                    playlist = details.songs;
                }
            }

            if (playlist.length > 0) {
                playerService.setPlaylist(playlist, trackIndex);
            } else {
                console.warn("Không có bài hát nào để phát từ URI:", uri);
                alert("Không tìm thấy bài hát nào trong Album/Playlist này.");
            }
        } catch (error) {
            console.error("Lỗi khi phát nhạc từ Card:", error);
            alert("Lỗi khi cố gắng phát nhạc. Vui lòng thử lại.");
        } finally {
            playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        }
    });
};

const homePage = async () => {
    const userInfo = storageService.getUserInfo();
    const isLoggedIn = !!userInfo && !!userInfo.name;
    const userName = userInfo?.name || "";

    let greetingTitle = "";
    if (isLoggedIn) {
        greetingTitle = `Chào mừng ${userName} quay trở lại!`;
    } else {
        greetingTitle = `Khám Phá Âm Nhạc`;
    }

    let pageContent = `
        <div class="max-w-7xl mx-auto">
            <h2 class="text-3xl font-bold mb-6">${greetingTitle}</h2>
            <div class="text-center py-20 text-gray-400">
                <i class="fa-solid fa-spinner fa-spin fa-2x"></i>
                <p class="mt-3">Đang tải nội dung Trang chủ...</p>
            </div>
        </div>
    `;

    try {
        const [albums, hits, personalized, vnPlaylists, categories] =
            await Promise.all([
                getAlbumsForYou(),
                getTodaysHits(),
                getPersonalized(),
                getPlaylistsByCountry("VN", 10),
                discoverService.getCategories(),
            ]);

        let personalizedHtml = "";
        if (personalized && personalized.length > 0) {
            personalizedHtml = renderSection(
                "Gợi ý Theo Lịch sử Nghe",
                personalized,
                "playlist"
            );
        } else if (isLoggedIn) {
            personalizedHtml = `
                <div class="mt-10 text-gray-500 border border-dashed border-gray-700 p-4 rounded-lg">
                    <h3 class="text-xl font-bold mb-2">Gợi ý Cá nhân</h3>
                    <p>Bạn chưa có đủ lịch sử nghe. Hãy bắt đầu thưởng thức nhạc để nhận được gợi ý tốt hơn!</p>
                </div>`;
        }

        const albumsForYouHtml = renderSection(
            "Album Dành Cho Bạn",
            albums,
            "album"
        );
        const todaysHitsHtml = renderSection(
            "Tuyển tập Hit Hôm Nay",
            hits,
            "playlist"
        );

        const vnPlaylistsHtml = renderSection(
            "Danh sách phát Việt Nam Hot",
            vnPlaylists,
            "playlist"
        );

        const categoriesData = categories?.items || [];
        const moodsHtml = renderSection(
            "Khám phá theo Tâm trạng & Hoạt động",
            categoriesData,
            "category"
        );

        pageContent = `
            <div class="max-w-7xl mx-auto">
                <h2 class="text-3xl font-bold mb-6">${greetingTitle}</h2>
                
                ${personalizedHtml}
                ${albumsForYouHtml}
                ${todaysHitsHtml}
                
                ${vnPlaylistsHtml} 
                ${moodsHtml} 

                <div class="mt-10 text-gray-500">
                    <h3 class="text-2xl font-bold mb-4">Trang chủ đã sẵn sàng!</h3>
                    <p>Bạn có thể phát nhạc từ các Album/Playlist trên hoặc đăng nhập để nhận gợi ý cá nhân hóa.</p>
                </div>
            </div>
        `;
    } catch (error) {
        console.error("Lỗi khi tải Trang chủ:", error);
        pageContent = `
            <div class="max-w-7xl mx-auto text-center py-20 text-red-500">
                <i class="fa-solid fa-triangle-exclamation fa-2x"></i>
                <p class="mt-3">Lỗi kết nối hoặc tải nội dung.</p>
            </div>
        `;
    }

    setTimeout(initPlayButtons, 0);

    return pageContent;
};

export default homePage;
