import { searchService } from "../service/searchService";

const searchPage = async (params) => {
    const urlParams = new URLSearchParams(window.location.search);
    const keyword = urlParams.get("q");

    if (!keyword) {
        return `<div class="text-white text-center mt-10">Vui lòng nhập từ khóa tìm kiếm.</div>`;
    }

    const data = await searchService.search(keyword);

    if (!data || !data.data || data.data.length === 0) {
        return `<div class="text-white text-center mt-10">Không tìm thấy kết quả nào cho "${keyword}".</div>`;
    }

    const renderItems = data.data
        .map((item) => {
            return `
            <div class="flex items-center gap-4 p-2 hover:bg-gray-800 rounded-lg cursor-pointer transition-colors">
                <div class="w-12 h-12 rounded overflow-hidden shrink-0">
                    <img src="${
                        item.thumbnail ||
                        "./src/assets/images/default-album.jpg"
                    }" alt="${item.title}" class="w-full h-full object-cover">
                </div>
                <div class="flex-1 min-w-0">
                    <h4 class="text-white font-medium truncate">${
                        item.title
                    }</h4>
                    <p class="text-sm text-gray-400 truncate">${
                        item.description ||
                        item.artists?.map((a) => a.name).join(", ") ||
                        "Nghệ sĩ"
                    }</p>
                </div>
            </div>
        `;
        })
        .join("");

    return `
        <div class="container mx-auto px-4 pb-20">
            <h2 class="text-2xl text-white font-bold mb-6 mt-4">Kết quả tìm kiếm cho: "${keyword}"</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                ${renderItems}
            </div>
        </div>
    `;
};

export default searchPage;
