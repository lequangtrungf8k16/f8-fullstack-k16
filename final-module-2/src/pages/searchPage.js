import { searchService } from "../service/searchService";

const searchPage = async (match) => {
    let queryString = "";
    if (match && match.queryString) {
        queryString = match.queryString;
    } else {
        queryString = window.location.search;
    }

    if (queryString && !queryString.startsWith("?")) {
        queryString = "?" + queryString;
    }

    const urlParams = new URLSearchParams(queryString);
    const keyword = urlParams.get("q");

    if (!keyword) {
        return `<div class="text-white text-center mt-24 text-lg">Vui lòng nhập từ khóa tìm kiếm.</div>`;
    }

    const data = await searchService.search(keyword);

    const items = data?.results || data?.data?.items || [];

    if (items.length === 0) {
        return `<div class="text-white text-center mt-24 text-lg">Không tìm thấy kết quả nào cho "<span class="text-green-500 font-bold">${keyword}</span>".</div>`;
    }

    const renderItems = items
        .map((item) => {
            let thumbUrl = "./src/assets/images/default-album.jpg";
            if (item.thumbnails && item.thumbnails.length > 0)
                thumbUrl = item.thumbnails[0];
            else if (item.thumbnail) thumbUrl = item.thumbnail;

            let artistName = "Nghệ sĩ";
            if (item.artists && Array.isArray(item.artists)) {
                artistName = item.artists
                    .map((a) => (typeof a === "string" ? a : a.name))
                    .join(", ");
            } else if (item.artist) artistName = item.artist;

            const isPlaylist =
                item.type === "playlist" ||
                item.duration === 0 ||
                item.duration === undefined;
            const id = item.encodeId || item.id;

            // PLAYLIST
            if (isPlaylist) {
                return `
                <a href="/lines/${id}" class="flex items-center gap-4 p-3 hover:bg-[#2a2a2a] rounded-lg cursor-pointer transition-colors group" data-navigo>
                    <div class="relative w-16 h-16 rounded overflow-hidden shrink-0">
                        <img src="${thumbUrl}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                        <div class="absolute inset-0 bg-black/40 flex items-center justify-center">
                             <i class="fa-solid fa-list-ul text-white text-xl"></i>
                        </div>
                    </div>
                    <div class="flex-1 min-w-0">
                        <h4 class="text-white font-bold truncate group-hover:text-green-500 transition-colors">
                            ${item.title} <span class="text-xs text-gray-500 border border-gray-600 rounded px-1 ml-2">Playlist</span>
                        </h4>
                        <p class="text-sm text-gray-400 truncate mt-1">Playlist • ${artistName}</p>
                    </div>
                    <div class="mr-2 text-gray-400">
                        <i class="fa-solid fa-chevron-right"></i>
                    </div>
                </a>
                `;
            }

            // BÀI HÁT
            const songData = {
                id: id,
                title: item.title,
                artist: artistName,
                thumbnail: thumbUrl,
                duration: item.duration || 0,
            };
            const dataSongStr = encodeURIComponent(JSON.stringify(songData));

            return `
            <div class="flex items-center gap-4 p-3 hover:bg-[#2a2a2a] rounded-lg cursor-pointer transition-colors js-play-song group" 
                 data-song="${dataSongStr}">
                
                <div class="relative w-16 h-16 rounded overflow-hidden shrink-0">
                    <img src="${thumbUrl}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                    <div class="absolute inset-0 bg-black/40 hidden group-hover:flex items-center justify-center animate-fade-in">
                         <i class="fa-solid fa-play text-white text-xl"></i>
                    </div>
                </div>

                <div class="flex-1 min-w-0">
                    <h4 class="text-white font-bold truncate group-hover:text-green-500 transition-colors">${item.title}</h4>
                    <p class="text-sm text-gray-400 truncate mt-1">Bài hát • ${artistName}</p>
                </div>
                 
                 <button class="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition ml-2 opacity-0 group-hover:opacity-100">
                    <i class="fa-solid fa-play ml-0.5"></i>
                </button>
            </div>
            `;
        })
        .join("");

    return `
        <div class="container mx-auto px-4 pb-32 pt-8 animate-fade-in">
            <h2 class="text-2xl text-white font-bold mb-6 border-b border-gray-800 pb-4">
                Kết quả tìm kiếm: "<span class="text-green-500">${keyword}</span>"
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                ${renderItems}
            </div>
        </div>
    `;
};

export default searchPage;
