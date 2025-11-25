import { discoverService } from "../service/discoverService";

const categoryDetailPage = async (params) => {
    const slug = params?.data?.slug;

    if (!slug) {
        return `<div class="text-white p-10 text-center">Không tìm thấy danh mục.</div>`;
    }

    let data = null;
    try {
        data = await discoverService.getCategoryDetail(slug);
    } catch (error) {
        console.error(error);
    }

    if (!data) {
        return `<div class="text-white p-10 text-center">Lỗi tải dữ liệu hoặc danh mục không tồn tại.</div>`;
    }

    const bgColor = data.color || "#555";
    const headerStyle = `background: linear-gradient(to bottom, ${bgColor}CC, #000000)`;

    const renderPlaylistCard = (pl) => {
        const thumbnail =
            pl.thumbnails?.[0] || "https://via.placeholder.com/300";

        return `
            <div class="flex flex-col gap-3 cursor-pointer group w-[220px] shrink-0">
                <!-- Image Wrapper -->
                <div class="relative overflow-hidden rounded-md aspect-video shadow-lg">
                    <img src="${thumbnail}" alt="${
            pl.title
        }" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">                    
                    <!-- Overlay & Play Icon -->
                    <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                         <div class="w-10 h-10 bg-black/60 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 hover:scale-110 hover:bg-black/80 transition-transform">
                            <i class="fa-solid fa-play text-white text-sm ml-1"></i>
                         </div>
                    </div>
                </div>
                <!-- Info -->
                <div>
                    <h4 class="text-white font-bold text-sm truncate hover:underline" title="${
                        pl.title
                    }">${pl.title}</h4>
                    <p class="text-gray-400 text-xs truncate mt-1" title="${
                        pl.description
                    }">${pl.description || "Youtube Music"}</p>
                </div>
            </div>
        `;
    };

    const renderSubcategories = () => {
        if (!data.subcategories || data.subcategories.length === 0) {
            return `<div class="text-gray-400 mt-10">Không có nội dung chi tiết.</div>`;
        }

        return data.subcategories
            .map((sub) => {
                const containerId = `sub-${sub._id}`;
                const hasManyItems = sub.playlists && sub.playlists.length > 4;

                return `
            <div class="mb-10 group/section">
                <!-- Header Section -->
                <div class="flex justify-between items-end mb-4 border-b border-gray-800 pb-2">
                    <h3 class="text-xl md:text-2xl font-bold text-white">${
                        sub.name
                    }</h3>
                    
                    <div class="flex items-center gap-3">
                        ${
                            hasManyItems
                                ? `                            
                            <button class="js-toggle-view text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white transition-colors border border-gray-700 px-3 py-1 rounded-full hover:border-gray-500"
                                    data-target="${containerId}">
                                Xem tất cả
                            </button>
                            
                            <div class="js-scroll-controls flex gap-2" id="controls-${containerId}">
                                <button class="js-scroll-btn w-8 h-8 rounded-full border border-gray-700 flex items-center justify-center hover:bg-gray-800 hover:border-white text-white transition-colors"
                                        data-target="${containerId}" data-direction="left">
                                    <i class="fa-solid fa-chevron-left text-xs"></i>
                                </button>
                                <button class="js-scroll-btn w-8 h-8 rounded-full border border-gray-700 flex items-center justify-center hover:bg-gray-800 hover:border-white text-white transition-colors"
                                        data-target="${containerId}" data-direction="right">
                                    <i class="fa-solid fa-chevron-right text-xs"></i>
                                </button>
                            </div>
                        `
                                : ""
                        }
                    </div>
                </div>
                
                <div id="${containerId}" 
                     class="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4 transition-all"
                     data-view="carousel">
                    ${
                        sub.playlists && sub.playlists.length > 0
                            ? sub.playlists
                                  .map((pl) => renderPlaylistCard(pl))
                                  .join("")
                            : '<p class="text-gray-500 text-sm">Chưa có playlist nào.</p>'
                    }
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
                            data.thumbnailUrl ||
                            "https://via.placeholder.com/400x240"
                        }" class="w-full h-full object-cover">
                     </div>
                     <div>
                        <p class="text-xs font-bold uppercase tracking-wider text-white/80 mb-2">${
                            data.type === "mood" ? "Tâm trạng" : "Thể loại"
                        }</p>
                        <h1 class="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">${
                            data.name
                        }</h1>
                        <p class="text-white/80 text-sm md:text-base max-w-2xl">${
                            data.description || ""
                        }</p>
                     </div>
                </div>
            </div>

            <div class="px-0 md:px-4">
                ${renderSubcategories()}
            </div>
        </div>
    `;
};

export default categoryDetailPage;
