import { discoverService } from "../service/discoverService";

const categoryDetailPage = async (match) => {
    const slug = match?.data?.slug;

    if (!slug) {
        return `<div class="pt-24 text-center text-white">Không tìm thấy danh mục.</div>`;
    }

    let categoryData = null;
    try {
        categoryData = await discoverService.getCategoryDetail(slug);
    } catch (error) {
        console.error("Error loading category:", error);
    }

    if (!categoryData) {
        return `<div class="pt-24 text-center text-white">Lỗi tải dữ liệu hoặc danh mục không tồn tại.</div>`;
    }

    const renderPlaylistCard = (item) => {
        const title = item.title || item.name;
        const thumb =
            item.thumbnailUrl ||
            (item.thumbnails && item.thumbnails[0]) ||
            "./src/assets/images/default-album.jpg";
        const id = item.slug || item.encodeId || item._id;
        const desc = item.sortDescription || item.description || "Tuyển tập";

        return `
            <div class="w-[180px] shrink-0 group cursor-pointer">
                <div class="relative w-full aspect-square rounded-md overflow-hidden mb-3 bg-zinc-800 shadow-lg">
                    <img src="${thumb}" alt="${title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                    
                    <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                         <button class="js-play-cate-item w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform shadow-xl cursor-pointer"
                            data-id="${id}" data-type="playlist">
                            <i class="fa-solid fa-play ml-1 text-lg"></i>
                        </button>
                    </div>
                </div>
                <h4 class="text-white font-bold text-sm truncate hover:underline" title="${title}">${title}</h4>
                <p class="text-gray-400 text-xs truncate mt-1">${desc}</p>
            </div>
        `;
    };

    const renderSubCategories = () => {
        if (
            !categoryData.subcategories ||
            categoryData.subcategories.length === 0
        ) {
            return `<div class="text-gray-400 mt-8">Không có playlist nào trong danh mục này.</div>`;
        }

        return categoryData.subcategories
            .map((sub) => {
                if (!sub.playlists || sub.playlists.length === 0) return "";

                return `
                <div class="mb-12 animate-fade-in">
                    <div class="flex items-end justify-between mb-4 border-b border-gray-800 pb-2">
                        <h2 class="text-xl md:text-2xl font-bold text-white tracking-tight">${
                            sub.name
                        }</h2>
                    </div>
                    <div class="flex gap-6 overflow-x-auto scrollbar-hide pb-4 scroll-smooth">
                        ${sub.playlists
                            .map((playlist) => renderPlaylistCard(playlist))
                            .join("")}
                    </div>
                </div>
            `;
            })
            .join("");
    };

    const bgColor = categoryData.color || "#555";
    const headerStyle = `background: linear-gradient(to bottom, ${bgColor}, #000000)`;

    return `
        <div class="w-full min-h-screen bg-black pb-32 animate-fade-in">
            <div class="pt-24 pb-10 px-6 md:px-12 flex flex-col md:flex-row items-end gap-8" style="${headerStyle}">
                 <div class="w-40 h-40 md:w-52 md:h-52 shrink-0 shadow-2xl rounded-lg overflow-hidden hidden md:block rotate-3 hover:rotate-0 transition-transform duration-500">
                    <img src="${
                        categoryData.thumbnailUrl ||
                        "./src/assets/images/default-album.jpg"
                    }" class="w-full h-full object-cover">
                </div>
                
                <div class="flex flex-col gap-4 w-full">
                    <p class="text-xs font-bold uppercase tracking-wider text-white/80">DANH MỤC</p>
                    <h1 class="text-4xl md:text-6xl font-black text-white tracking-tight drop-shadow-lg">${
                        categoryData.name
                    }</h1>
                    <p class="text-white/80 text-sm md:text-lg max-w-2xl font-medium line-clamp-2">
                        ${
                            categoryData.description ||
                            "Tuyển tập những bài hát hay nhất dành cho bạn."
                        }
                    </p>
                </div>
            </div>

            <div class="px-6 md:px-12 mt-8 max-w-[1600px] mx-auto">
                ${renderSubCategories()}
            </div>
        </div>
    `;
};

export default categoryDetailPage;
