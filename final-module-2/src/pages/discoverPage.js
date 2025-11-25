import { discoverService } from "../service/discoverService";

const renderCarouselItem = (item, type) => {
    const title = item.title || item.name;
    const thumbnail =
        item.thumbnail ||
        item.thumb ||
        item.thumbnails?.[0] ||
        "https://via.placeholder.com/300";
    const subtitle =
        item.artists?.map((a) => a.name).join(", ") ||
        item.albumName ||
        "Tuyển chọn";

    const songData = encodeURIComponent(
        JSON.stringify({
            id: item._id || title,
            title: title,
            artists: item.artists,
            thumbnail: thumbnail,
            src: item.src || `/src/assets/music/song1.mp3`,
            duration: item.duration || 519,
        })
    );

    return `
        <div class="flex flex-col gap-3 cursor-pointer group w-[200px] shrink-0 js-play-song" data-song="${songData}">
            <div class="relative overflow-hidden rounded-lg aspect-square shadow-lg ${
                type === "video" ? "aspect-video" : "aspect-square"
            }">
                <img src="${thumbnail}" alt="${title}" class="w-full h-full object-cover rounded-lg transition-transform duration-500 group-hover:scale-105">
                
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
        </div>
    `;
};

const discoverPage = async () => {
    let categories = [];
    let lines = [];
    let isLoading = true;

    try {
        const [categoriesRes, linesRes] = await Promise.all([
            discoverService.getCategories(),
            discoverService.getLines(),
        ]);

        if (categoriesRes && categoriesRes.items) {
            categories = categoriesRes.items;
        }
        if (linesRes && linesRes.items) {
            lines = linesRes.items;
        }
    } catch (error) {
        console.error("Failed to load discover data", error);
    } finally {
        isLoading = false;
    }

    const renderLines = () => {
        if (isLoading) return "";
        if (lines.length === 0) return "";

        return lines
            .map(
                (line) => `
            <a href="/lines/${line.slug}" data-navigo
               class="js-lines-item flex flex-col gap-3 cursor-pointer group shrink-0" style="width: 250px;"> 
                <div class="relative overflow-hidden rounded-lg aspect-video shadow-md">
                    <img src="${line.thumbnailUrl}" alt="${line.name}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">
                    
                    <div class="absolute inset-0 opacity-20 group-hover:opacity-0 transition-opacity" style="background-color: ${line.color}"></div>
                </div>
                <div>
                    <h3 class="text-white font-bold text-base truncate hover:underline" title="${line.name}">${line.name}</h3>
                    <p class="text-gray-400 text-xs truncate" title="${line.description}">${line.description}</p>
                </div>
            </a>
        `
            )
            .join("");
    };

    const renderCategories = () => {
        const itemWidth = 170;

        if (isLoading) {
            return Array(12)
                .fill(0)
                .map(
                    () => `
                <div class="shrink-0 h-14 rounded animate-pulse border-l-[6px] border-gray-700" style="width: ${itemWidth}px;"></div>
            `
                )
                .join("");
        }

        if (categories.length === 0) {
            return `<div class="col-span-full text-gray-500 text-center py-4">Không có danh mục nào.</div>`;
        }

        return categories
            .map(
                (cat) => `
            <a href="/discoverPage/${cat.slug}" data-navigo 
               class="group relative bg-gray-800/60 hover:bg-gray-700 transition-colors h-14 rounded flex items-center px-4 border-l-[6px] cursor-pointer select-none overflow-hidden shrink-0"
               style="border-left-color: ${
                   cat.color || "#ccc"
               }; width: ${itemWidth}px;">
                <span class="text-white font-medium text-sm truncate relative z-10">${
                    cat.name
                }</span>
                <div class="absolute inset-0 bg-linear-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </a>
        `
            )
            .join("");
    };

    return `
        <div class="w-full pb-32">            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">                
                <button id="tab-new-releases" data-tab="new-releases" class="js-discover-tab bg-linear-to-br from-gray-800 to-gray-900 transition-all rounded-lg p-4 flex items-center gap-4 cursor-pointer h-24 border-t border-white/10 shadow-lg group">
                    <i class="fa-regular fa-circle-check text-gray-400 text-3xl transition-colors group-[.active-tab]:text-white"></i>
                    <span class="text-white font-bold text-lg">Bản phát hành mới</span>
                </button>
                
                <button id="tab-charts" data-tab="charts" class="js-discover-tab bg-linear-to-br from-gray-800 to-gray-900 transition-all rounded-lg p-4 flex items-center gap-4 cursor-pointer h-24 border-t border-white/10 shadow-lg group hover:to-gray-800">
                    <i class="fa-solid fa-arrow-trend-up text-gray-400 text-3xl transition-colors group-[.active-tab]:text-white"></i>
                    <span class="text-white font-bold text-lg">Bảng xếp hạng</span>
                </button>
                
                <button id="tab-meta" data-tab="meta" class="js-discover-tab bg-linear-to-br from-gray-800 to-gray-900 transition-all rounded-lg p-4 flex items-center gap-4 cursor-pointer h-24 border-t border-white/10 shadow-lg group hover:to-gray-800">
                    <i class="fa-regular fa-face-smile text-gray-400 text-3xl transition-colors group-[.active-tab]:text-white"></i>
                    <span class="text-white font-bold text-lg">Tâm trạng và thể loại</span>
                </button>
            </div>
            
            <div id="discover-content-area">                
                <div id="category-section">
                    <div class="flex justify-between items-end mb-6">
                        <h2 class="text-2xl md:text-4xl font-bold text-white tracking-tight">Tâm trạng và thể loại</h2>
                        <div class="flex items-center gap-2">
                            
                            <button id="category-scroll-left" class="js-category-scroll-btn w-9 h-9 rounded-full border border-gray-600 flex items-center justify-center hover:bg-gray-800 hover:border-white text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed" disabled>
                                <i class="fa-solid fa-chevron-left text-sm"></i>
                            </button>
                            
                            <button id="category-scroll-right" class="js-category-scroll-btn w-9 h-9 rounded-full border border-gray-600 flex items-center justify-center hover:bg-gray-800 hover:border-white text-white transition-colors">
                                <i class="fa-solid fa-chevron-right text-sm"></i>
                            </button>
                        </div>
                    </div>
                    <div id="category-carousel-wrapper" class="overflow-hidden">
                        
                        <div id="category-carousel" 
                             class="grid gap-4 overflow-x-auto scroll-smooth pb-2 scrollbar-hide"
                             style="grid-template-rows: repeat(2, 1fr); grid-auto-flow: column;"
                             data-view="carousel">
                            ${renderCategories()}
                        </div>
                    </div>
                </div>                
                ${
                    lines.length > 0
                        ? `
                <div id="lines-section" class="mt-12">
                    <div class="flex justify-between items-end mb-6">
                        <h2 class="text-2xl md:text-4xl font-bold text-white tracking-tight">Dòng nhạc tuyển chọn</h2>
                        
                        <div class="flex items-center gap-2">
                            <button id="lines-scroll-left" class="js-lines-scroll-btn w-9 h-9 rounded-full border border-gray-600 flex items-center justify-center hover:bg-gray-800 hover:border-white text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed" disabled>
                                <i class="fa-solid fa-chevron-left text-sm"></i>
                            </button>
                            <button id="lines-scroll-right" class="js-lines-scroll-btn w-9 h-9 rounded-full border border-gray-600 flex items-center justify-center hover:bg-gray-800 hover:border-white text-white transition-colors">
                                <i class="fa-solid fa-chevron-right text-sm"></i>
                            </button>
                            
                            <button id="lines-toggle-view" 
                                     class="js-toggle-view-lines px-4 py-1.5 rounded-full border border-gray-600 text-sm font-medium hover:bg-gray-800 hover:border-gray-500 transition-colors text-white">
                                Xem thêm
                            </button>
                        </div>
                    </div>
                    <div id="lines-carousel-wrapper" class="overflow-hidden">
                        <div id="lines-carousel" 
                             class="grid gap-4 overflow-x-auto scroll-smooth pb-2 scrollbar-hide"
                             style="grid-template-rows: repeat(2, 1fr); grid-auto-flow: column;"
                             data-view="carousel"> 
                            ${renderLines()}
                        </div>
                    </div>
                </div>
                `
                        : ""
                }
            </div>
        </div>
    `;
};

export const initDiscoverEvents = (initCarousel) => {
    if (typeof initCarousel === "function") {
        initCarousel(
            "lines-carousel",
            "lines-scroll-left",
            "lines-scroll-right",
            "lines-carousel-wrapper"
        );
        initCarousel(
            "category-carousel",
            "category-scroll-left",
            "category-scroll-right",
            "category-carousel-wrapper"
        );
    }

    const contentArea = document.getElementById("discover-content-area");
    const tabButtons = document.querySelectorAll(".js-discover-tab");

    const renderContent = (tabName, initCarousel) => {
        let html = "";

        if (tabName === "meta") {
            html = `
                <div class="p-10 text-center text-gray-500">
                    <p>Nội dung "Tâm trạng và thể loại" đã được hiển thị bên dưới. Vui lòng thêm logic ẩn/hiện nếu muốn tab hoạt động.</p>
                </div>
            `;
        } else {
            html = `<div class="mb-12"><h2 class="text-3xl md:text-5xl font-black text-white tracking-tight mb-8">${
                tabName === "new-releases"
                    ? "Bản phát hành mới nhất"
                    : "Bảng xếp hạng"
            }</h2><p class="text-gray-400">Placeholder: Vui lòng thêm hàm render chi tiết cho tab này.</p></div>`;
        }

        contentArea.innerHTML = html;

        if (tabName === "meta" && typeof initCarousel === "function") {
            initCarousel(
                "lines-carousel",
                "lines-scroll-left",
                "lines-scroll-right",
                "lines-carousel-wrapper"
            );
            initCarousel(
                "category-carousel",
                "category-scroll-left",
                "category-scroll-right",
                "category-carousel-wrapper"
            );
        }
    };

    tabButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            tabButtons.forEach((b) => {
                b.classList.remove(
                    "active-tab",
                    "from-gray-700",
                    "to-gray-800"
                );
                b.classList.add("to-gray-900", "hover:to-gray-800");
            });
            btn.classList.add("active-tab", "from-gray-700", "to-gray-800");
            btn.classList.remove("to-gray-900", "hover:to-gray-800");
        });
    });
};

export default discoverPage;
