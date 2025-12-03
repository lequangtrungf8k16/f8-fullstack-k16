import { discoverService } from "../service/discoverService";
import { playerService } from "../service/playerService";

const discoverPage = async () => {
    let content = `
        <div class="w-full h-screen flex justify-center items-center">
             <i class="fa-solid fa-circle-notch fa-spin text-3xl text-gray-500"></i>
        </div>
    `;

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
                   class="relative flex items-center shrink-0 gap-4 bg-[#202020] hover:bg-[#303030] transition-all p-0 rounded-md overflow-hidden cursor-pointer group w-40 h-14 mb-2">
                    <div class="w-2 h-full" style="background-color: ${
                        cat.color || "#888"
                    }"></div>
                    <div class="flex-1 py-2 pr-2">
                         <span class="text-white font-bold text-sm md:text-lg line-clamp-2">${
                             cat.name
                         }</span>
                    </div>
                    ${
                        cat.thumbnailUrl
                            ? `
                        <div class="h-full w-10 md:w-12 shrink-0 relative mr--10px overflow-hidden">
                            <img src="${cat.thumbnailUrl}" class="w-full h-full object-cover group-hover:scale-110 transition-transform origin-center">
                        </div>`
                            : `
                        <div class="h-full w-10 md:w-12 shrink-0 relative mr--10px overflow-hidden">
                            <img src="./src/assets/images/default-album.jpg" class="w-full h-full object-cover group-hover:scale-110 transition-transform origin-center">
                        </div>`
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
        <div class="js-discover-item group cursor-pointer block mb-2" 
             data-id="${line._id}"  data-type="line">
             
            <div class="relative overflow-hidden rounded-lg h-40 aspect-video mb-3 shadow-lg bg-gray-800">
                <img src="${
                    line.thumbnailUrl || "./src/assets/images/default-album.jpg"
                }" 
                     alt="${line.name}"
                     class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                
                <div class="absolute inset-0 opacity-20 group-hover:opacity-10 transition-opacity mix-blend-overlay" 
                     style="background-color: ${line.color || "#000"}"></div>
                     
                <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                     <button class="js-discover-play-btn w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform shadow-xl">
                        <i class="fa-solid fa-play ml-1"></i>
                     </button>
                </div>
            </div>
            <h3 class="text-white font-bold truncate group-hover:underline text-base">${
                line.name
            }</h3>
            <p class="text-gray-400 text-xs truncate mt-1">${
                line.description || ""
            }</p>
        </div>
    `
                )
                .join("");
        };

        content = `
            <div class="w-full pb-32 px-4 md:px-8 pt-8 max-w-[1600px] mx-auto animate-fade-in">
                <h1 class="text-3xl md:text-5xl font-black text-white mb-10 tracking-tight">Khám phá</h1>
                <div class="mb-16">
                    <h2 class="text-xl md:text-2xl font-bold text-white mb-6 border-b border-gray-800 pb-2">Tâm trạng & Thể loại</h2>
                    <div class="grid grid-flow-col grid-rows-2 gap-4 overflow-x-auto">
                        ${renderCategories()}
                    </div>
                </div>
                ${
                    lines.length > 0
                        ? `
                <div class="mb-12">
                    <h2 class="text-xl md:text-2xl font-bold text-white mb-6 border-b border-gray-800 pb-2">Dòng nhạc tuyển chọn</h2>
                    <div class="grid  grid-flow-col grid-rows-1 gap-4 overflow-x-auto">
                        ${renderLines()}
                    </div>
                </div>`
                        : ""
                }
            </div>
        `;
    } catch (error) {
        console.error("Lỗi trang Discover:", error);
        content = `<div class="pt-20 text-center text-white">Lỗi tải trang khám phá.</div>`;
    }

    setTimeout(() => {
        document.querySelectorAll(".js-discover-play-btn").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                e.stopPropagation();
                const item = btn.closest(".js-discover-item");
                playerService.playAlbumOrPlaylist(
                    item.dataset.id,
                    item.dataset.type
                );
                document.dispatchEvent(new CustomEvent("OPEN_FULL_PLAYER"));
            });
        });

        document.querySelectorAll(".js-discover-item").forEach((item) => {
            item.addEventListener("click", () => {
                playerService.loadPlaylistOnly(
                    item.dataset.id,
                    item.dataset.type
                );
                document.dispatchEvent(new CustomEvent("OPEN_FULL_PLAYER"));
            });
        });
    }, 100);

    return content;
};

export const initDiscoverEvents = () => {};

export default discoverPage;
