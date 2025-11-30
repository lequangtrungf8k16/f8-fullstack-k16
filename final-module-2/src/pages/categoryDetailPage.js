import { discoverService } from "../service/discoverService";
import { playerService } from "../service/playerService";

const categoryDetailPage = async (params) => {
    const slug = params?.slug || params?.data?.slug;

    if (!slug)
        return `<div class="pt-20 text-center text-white">Lỗi đường dẫn</div>`;

    const category = await discoverService.getCategoryDetail(slug);

    if (!category) {
        return `<div class="pt-20 text-center text-white">Không tìm thấy danh mục này.</div>`;
    }

    const renderSubcategories = () => {
        if (!category.subcategories || category.subcategories.length === 0)
            return "";

        return category.subcategories
            .map(
                (sub) => `
            <div class="mb-12">
                <h3 class="text-2xl font-bold text-white mb-4 pl-4 md:pl-0">${
                    sub.name
                }</h3>
                <div class="flex gap-6 overflow-x-auto scrollbar-hide pb-4 pl-4 md:pl-0">
                    ${sub.playlists
                        .map(
                            (pl) => `
                        <div class="w-[180px] shrink-0 cursor-pointer group">
                            <div class="relative w-full aspect-square rounded-md overflow-hidden mb-3">
                                <img src="${pl.thumbnail}" alt="${
                                pl.title
                            }" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                                
                                <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <button class="js-play-playlist w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                                        data-id="${
                                            pl._id || pl.encodeId
                                        }" data-type="playlist">
                                        <i class="fa-solid fa-play"></i>
                                    </button>
                                </div>
                            </div>
                            <h4 class="text-white font-bold text-sm truncate">${
                                pl.title
                            }</h4>
                            <p class="text-gray-400 text-xs truncate mt-1">${
                                pl.artists
                                    ? pl.artists.map((a) => a.name).join(", ")
                                    : "Tuyển tập"
                            }</p>
                        </div>
                    `
                        )
                        .join("")}
                </div>
            </div>
        `
            )
            .join("");
    };

    setTimeout(() => {
        document.querySelectorAll(".js-play-playlist").forEach((btn) => {
            btn.addEventListener("click", () => {
                const id = btn.dataset.id;
                console.log("Playing playlist:", id);
                playerService.playAlbumOrPlaylist(id, "playlist");
            });
        });
    }, 100);

    return `
        <div class="w-full pb-32">
            <div class="relative pt-20 pb-10 px-6 md:px-12 bg-linear-to-b from-[${
                category.color || "#555"
            }] to-black">
                <h1 class="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter">${
                    category.name
                }</h1>
            </div>

            <div class="px-4 md:px-12 mt-8">
                ${renderSubcategories()}
            </div>
        </div>
    `;
};

export default categoryDetailPage;
