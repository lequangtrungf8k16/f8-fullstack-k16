import { discoverService } from "../service/discoverService";
import { escapeHtml } from "../utils/htmlUtils";

const getImageUrl = (item) => {
    if (!item) return "./src/assets/images/default-album.jpg";
    if (item.thumbnailUrl) return item.thumbnailUrl;
    if (item.thumbnails && item.thumbnails.length > 0)
        return item.thumbnails[0];
    if (item.thumbnail) return item.thumbnail;
    if (item.thumb) return item.thumb;
    return "./src/assets/images/default-album.jpg";
};

const categoryDetailPage = async (match) => {
    const slug = match.data.slug;

    try {
        const data = await discoverService.getCategoryDetail(slug);

        const renderBanner = () => {
            return `
                <div class="relative w-full h-[300px] md:h-[400px] mb-8 group rounded-xl overflow-hidden shadow-2xl">
                     <div class="absolute inset-0 bg-linear-to-b from-transparent to-black/90 z-10"></div>
                     <img src="${getImageUrl(
                         data
                     )}" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="${escapeHtml(
                data.name
            )}">
                     
                     <div class="absolute bottom-0 left-0 p-6 md:p-10 z-20 w-full">
                        <h1 class="text-4xl md:text-6xl font-black text-white mb-2 tracking-tight drop-shadow-lg">${escapeHtml(
                            data.name
                        )}</h1>
                        ${
                            data.description
                                ? `<p class="text-gray-300 text-sm md:text-lg max-w-2xl drop-shadow-md line-clamp-2">${escapeHtml(
                                      data.description
                                  )}</p>`
                                : ""
                        }
                     </div>
                </div>
            `;
        };

        const renderPlaylistCard = (playlist) => {
            const image = getImageUrl(playlist);
            const title = escapeHtml(
                playlist.title || playlist.name || "Tuyển tập"
            );
            const desc = escapeHtml(
                playlist.description ||
                    playlist.sortDescription ||
                    "Playlist tuyển chọn"
            );

            const id = playlist.encodeId || playlist._id || playlist.id;

            return `
                <a href="/playlist/${id}" data-navigo 
                    class="js-album-card w-full cursor-pointer group block no-underline" 
                    data-id="${id}" 
                    data-type="playlist">
                    
                    <div class="relative w-full aspect-square rounded-md overflow-hidden mb-3 shadow-lg bg-gray-800">
                        <img src="${image}" alt="${title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                        
                        <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                            <button class="js-play-btn w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform shadow-xl cursor-pointer z-20" title="Phát ngay">
                                <i class="fa-solid fa-play ml-1 text-xl"></i>
                            </button>
                        </div>
                    </div>

                    <h4 class="text-white font-bold text-sm md:text-base truncate group-hover:underline" title="${title}">${title}</h4>
                    <p class="text-gray-400 text-xs md:text-sm truncate mt-1">${desc}</p>
                </a>
            `;
        };

        const renderSubcategories = () => {
            if (!data.subcategories || data.subcategories.length === 0)
                return "";

            return data.subcategories
                .map((sub) => {
                    if (!sub.playlists || sub.playlists.length === 0) return "";

                    return `
                    <section class="mb-10">
                        <h2 class="text-xl md:text-2xl font-bold text-white mb-4 border-b border-gray-800 pb-2">
                            ${escapeHtml(sub.name)}
                        </h2>
                        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            ${sub.playlists
                                .map((playlist) => renderPlaylistCard(playlist))
                                .join("")}
                        </div>
                    </section>
                `;
                })
                .join("");
        };

        return `
            <div class="w-full pb-32 px-4 md:px-8 pt-4 max-w-[1600px] mx-auto animate-fade-in">
                <div class="text-xs text-gray-400 mb-4 flex gap-2 items-center">
                    <a href="/discoverPage" data-navigo class="hover:text-white">Khám phá</a>
                    <span>/</span>
                    <span class="text-white">${escapeHtml(data.name)}</span>
                </div>

                ${renderBanner()}
                ${renderSubcategories()}
            </div>
        `;
    } catch (error) {
        console.error("Lỗi trang chi tiết category:", error);
        return `<div class="pt-20 text-center text-white">Không tìm thấy danh mục hoặc có lỗi xảy ra.</div>`;
    }
};

export default categoryDetailPage;
