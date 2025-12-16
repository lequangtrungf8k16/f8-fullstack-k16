import { discoverService } from "../service/discoverService";
import { escapeHtml } from "../utils/htmlUtils";

const getImageUrl = (item) => {
    if (!item) return "./src/assets/images/default-album.jpg";

    if (item.thumbnailUrl) return item.thumbnailUrl;
    if (item.thumbnails && item.thumbnails.length > 0)
        return item.thumbnails[0];
    if (item.thumbnail) return item.thumbnail;
    if (item.thumb) return item.thumb;
    if (item.imageUrl) return item.imageUrl;

    return "./src/assets/images/default-album.jpg";
};

const renderSectionHeader = (title, sectionId) => {
    return `
        <div class="flex justify-between items-end mb-4 px-2">
            <h2 class="text-xl md:text-2xl font-bold text-white tracking-tight">${title}</h2>
            <div class="hidden md:flex gap-3">
                <button id="btn-prev-${sectionId}" class="w-9 h-9 rounded-full bg-black border border-gray-600 flex items-center justify-center hover:bg-gray-800 hover:border-white text-white transition-all active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed">
                    <i class="fa-solid fa-chevron-left"></i>
                </button>
                <button id="btn-next-${sectionId}" class="w-9 h-9 rounded-full bg-black border border-gray-600 flex items-center justify-center hover:bg-gray-800 hover:border-white text-white transition-all active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed">
                    <i class="fa-solid fa-chevron-right"></i>
                </button>
            </div>
        </div>
    `;
};

const discoverPage = async () => {
    try {
        const [categories, lines] = await Promise.all([
            discoverService.getCategories(),
            discoverService.getLines(20),
        ]);

        const renderCategories = () => {
            if (!categories || categories.length === 0)
                return `<div class="text-gray-500 text-center">Không có danh mục nào.</div>`;

            const itemsHtml = categories
                .map((cat) => {
                    const image = getImageUrl(cat);

                    return `
                <a href="/discoverPage/${cat.slug}" data-navigo 
                   class="snap-start shrink-0 relative flex items-center gap-3 bg-[#202020] hover:bg-[#303030] transition-all p-0 rounded-md overflow-hidden cursor-pointer group h-16 w-50">
                    
                    <div class="w-2 h-full shrink-0" style="background-color: ${
                        cat.color || "#888"
                    }"></div>
                    
                    <div class="flex-1 py-2 pr-1 overflow-hidden">
                         <span class="text-white font-bold text-sm md:text-base line-clamp-2">${escapeHtml(
                             cat.name
                         )}</span>
                    </div>

                    <div class="h-full w-20 md:w-24 shrink-0 relative overflow-hidden">
                        <img src="${image}" class="w-full h-full object-cover group-hover:scale-110 transition-transform origin-center" onerror="this.src='./src/assets/images/default-album.jpg'">
                        <div class="absolute inset-0 bg-linear-to-r from-[#202020] via-transparent to-transparent opacity-50"></div>
                    </div>
                </a>
            `;
                })
                .join("");

            return `
                <div class="mb-12 group/section">
                    ${renderSectionHeader("Tâm trạng & Thể loại", "moods")}
                    <div id="scroll-moods" 
                         class="js-scroll-container grid grid-rows-2 grid-flow-col gap-4 overflow-x-auto pb-4 px-2 scroll-smooth snap-x snap-mandatory scrollbar-custom" 
                         data-section="moods">
                        ${itemsHtml}
                    </div>
                </div>
            `;
        };

        const renderLines = () => {
            if (!lines || lines.length === 0) return "";

            const itemsHtml = lines
                .map((line) => {
                    const image = getImageUrl(line);

                    return `
                    <a href="/lines/${line.slug}" data-navigo 
                        class="js-discover-item w-[180px] md:w-[220px] shrink-0 snap-start group cursor-pointer block" 
                        data-id="${line.slug}" 
                        data-type="line">
                        <div class="relative overflow-hidden rounded-lg aspect-video mb-3 shadow-lg bg-gray-800">
                            <img src="${image}" 
                                alt="${escapeHtml(line.name)}"
                                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                onerror="this.src='./src/assets/images/default-album.jpg'">
                            <div class="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
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
                            line.description || "Tuyển tập đặc biệt"
                        )}</p>
                    </a>
                `;
                })
                .join("");

            return `
                <div class="mb-12 group/section">
                    ${renderSectionHeader("Dòng nhạc tuyển chọn", "lines")}
                    <div id="scroll-lines" 
                         class="js-scroll-container flex gap-5 overflow-x-auto pb-4 px-2 scroll-smooth snap-x snap-mandatory scrollbar-custom" 
                         data-section="lines">
                        ${itemsHtml}
                    </div>
                </div>
            `;
        };

        return `
            <div class="w-full pb-32 px-4 md:px-8 pt-8 max-w-[1600px] mx-auto animate-fade-in">
                <h1 class="text-3xl md:text-4xl font-black text-white mb-8 tracking-tight border-b border-gray-800 pb-4">Khám phá</h1>
                
                ${renderCategories()}
                ${renderLines()}
            </div>
        `;
    } catch (error) {
        console.error("Lỗi trang Discover:", error);
        return `<div class="pt-20 text-center text-white">Lỗi tải trang khám phá: ${error.message}</div>`;
    }
};

export default discoverPage;
