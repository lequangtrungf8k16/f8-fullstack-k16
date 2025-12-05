import { discoverService } from "../service/discoverService";
import { escapeHtml } from "../utils/htmlUtils";

const discoverPage = async () => {
    try {
        const [categories, lines] = await Promise.all([
            discoverService.getCategories(),
            discoverService.getLines(20),
        ]);

        const renderCategories = () => {
            if (!categories || categories.length === 0)
                return `<div class="col-span-full text-gray-500 text-center">Không có danh mục nào.</div>`;

            return categories
                .map(
                    (cat) => `
                <a href="/discoverPage/${cat.slug}" data-navigo 
                   class="relative flex items-center gap-4 bg-[#202020] hover:bg-[#303030] transition-all p-0 rounded-md overflow-hidden cursor-pointer group h-20 md:h-24">
                    <div class="w-2 h-full" style="background-color: ${
                        cat.color || "#888"
                    }"></div>
                    <div class="flex-1 py-2 pr-2">
                         <span class="text-white font-bold text-sm md:text-lg line-clamp-2">${escapeHtml(
                             cat.name
                         )}</span>
                    </div>
                    ${
                        cat.thumbnailUrl
                            ? `
                        <div class="h-full w-10 md:w-12 shrink-0 relative mr--10px overflow-hidden">
                            <img src="${cat.thumbnailUrl}" class="w-full h-full object-cover group-hover:scale-110 transition-transform origin-center">
                        </div>`
                            : ""
                    }
                </a>
            `
                )
                .join("");
        };

        const renderLines = () => {
            if (!lines || lines.length === 0) return "";
            return lines
                .map(
                    (line) => `
                <div class="js-discover-item group cursor-pointer block" data-id="${
                    line.slug
                }" data-type="line">
                    <div class="relative overflow-hidden rounded-lg aspect-video mb-3 shadow-lg bg-gray-800">
                        <img src="${
                            line.thumbnailUrl ||
                            "./src/assets/images/default-album.jpg"
                        }" 
                             alt="${escapeHtml(line.name)}"
                             class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                        <div class="absolute inset-0 opacity-20 group-hover:opacity-10 transition-opacity mix-blend-overlay" style="background-color: ${
                            line.color || "#000"
                        }"></div>
                        <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                             <button class="js-discover-play-btn w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform shadow-xl cursor-pointer">
                                <i class="fa-solid fa-play ml-1"></i>
                             </button>
                        </div>
                    </div>
                    <h3 class="text-white font-bold truncate group-hover:underline text-base">${escapeHtml(
                        line.name
                    )}</h3>
                    <p class="text-gray-400 text-xs truncate mt-1">${escapeHtml(
                        line.description || ""
                    )}</p>
                </div>
            `
                )
                .join("");
        };

        return `
            <div class="w-full pb-32 px-4 md:px-8 pt-8 max-w-[1600px] mx-auto animate-fade-in">
                <h1 class="text-3xl md:text-5xl font-black text-white mb-10 tracking-tight">Khám phá</h1>
                <div class="mb-16">
                    <h2 class="text-xl md:text-2xl font-bold text-white mb-6 border-b border-gray-800 pb-2">Tâm trạng & Thể loại</h2>
                    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                        ${renderCategories()}
                    </div>
                </div>
                ${
                    lines.length > 0
                        ? `
                <div class="mb-12">
                    <h2 class="text-xl md:text-2xl font-bold text-white mb-6 border-b border-gray-800 pb-2">Dòng nhạc tuyển chọn</h2>
                    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        ${renderLines()}
                    </div>
                </div>`
                        : ""
                }
            </div>
        `;
    } catch (error) {
        console.error("Lỗi trang Discover:", error);
        return `<div class="pt-20 text-center text-white">Lỗi tải trang khám phá.</div>`;
    }
};

export default discoverPage;
