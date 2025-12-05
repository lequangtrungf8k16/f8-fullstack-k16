import { searchService } from "../service/searchService";
import { router } from "../router/index";
import { escapeHtml } from "../utils/htmlUtils";

const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(null, args);
        }, delay);
    };
};

const searchInput = () => {
    return `
        <div class="relative lg:flex lg:justify-between lg:flex-1 hidden group/search z-50">
            <div class="js-search-container w-full max-w-xl relative">
                <div class="flex items-center w-full bg-zinc-800 border border-gray-700 rounded-lg overflow-hidden focus-within:border-white focus-within:bg-black transition-colors">
                    <button class="px-4 text-gray-400 cursor-default"><i class="fa-solid fa-magnifying-glass"></i></button>
                    <input type="text" class="js-search-input w-full bg-transparent py-3 text-white placeholder-gray-400 focus:outline-none text-sm" placeholder="Tìm bài hát, nghệ sĩ..." autocomplete="off" />
                    <button class="js-clear-search px-4 text-gray-400 hover:text-white hidden cursor-pointer"><i class="fa-solid fa-xmark"></i></button>
                </div>
                <div class="js-search-suggestions hidden absolute top-full left-0 w-full mt-2 bg-[#212121] rounded-lg shadow-2xl border border-gray-700 overflow-hidden z-50 max-h-[400px] overflow-y-auto"></div>
            </div>
        </div>
        <button class="lg:hidden ml-auto px-4 text-white hover:text-white"><i class="fa-solid fa-magnifying-glass"></i></button>
    `;
};

export const initSearchEvents = () => {
    const searchInputEl = document.querySelector(".js-search-input");
    const suggestionBox = document.querySelector(".js-search-suggestions");
    const clearBtn = document.querySelector(".js-clear-search");

    if (!searchInputEl || !suggestionBox) return;

    const navigateToSearch = (query) => {
        if (!query.trim()) return;
        suggestionBox.classList.add("hidden");
        router.navigate(`/searchPage?q=${encodeURIComponent(query)}`);
    };

    const renderSuggestions = (items) => {
        if (!items || items.length === 0) {
            suggestionBox.classList.add("hidden");
            suggestionBox.innerHTML = "";
            return;
        }

        const html = items
            .slice(0, 6)
            .map((item) => {
                let thumbUrl = "./src/assets/images/default-album.jpg";
                if (item.thumbnails && item.thumbnails.length > 0)
                    thumbUrl = item.thumbnails[0];
                else if (item.thumbnail) thumbUrl = item.thumbnail;

                let artistName = item.artists
                    ? item.artists
                          .map((a) => (typeof a === "string" ? a : a.name))
                          .join(", ")
                    : item.artist || "Nghệ sĩ";

                return `
            <div class="js-suggestion-item flex items-center gap-4 px-4 py-3 hover:bg-zinc-700 cursor-pointer border-b border-gray-800 last:border-none" 
                 data-keyword="${escapeHtml(item.title || item.name)}">
                <div class="w-10 h-10 rounded overflow-hidden shrink-0 bg-gray-600">
                    <img src="${thumbUrl}" class="w-full h-full object-cover">
                </div>
                <div class="flex-1 min-w-0">
                    <p class="text-white text-sm font-medium truncate">${escapeHtml(
                        item.title || item.name
                    )}</p>
                    <p class="text-xs text-gray-400 truncate">${escapeHtml(
                        artistName
                    )}</p>
                </div>
            </div>`;
            })
            .join("");

        suggestionBox.innerHTML = html;
        suggestionBox.classList.remove("hidden");

        document.querySelectorAll(".js-suggestion-item").forEach((item) => {
            item.addEventListener("click", () => {
                const keyword = item.dataset.keyword;
                searchInputEl.value = keyword;
                navigateToSearch(keyword);
            });
        });
    };

    const handleInput = debounce(async (e) => {
        const query = e.target.value.trim();
        if (query.length > 0) {
            clearBtn.classList.remove("hidden");
            const res = await searchService.getSuggestions(query);
            const items = res?.results || res?.data?.items || [];
            renderSuggestions(items);
        } else {
            clearBtn.classList.add("hidden");
            suggestionBox.classList.add("hidden");
        }
    }, 300);

    searchInputEl.addEventListener("input", handleInput);
    searchInputEl.addEventListener("keypress", (e) => {
        if (e.key === "Enter") navigateToSearch(searchInputEl.value);
    });

    clearBtn?.addEventListener("click", () => {
        searchInputEl.value = "";
        suggestionBox.classList.add("hidden");
        clearBtn.classList.add("hidden");
        searchInputEl.focus();
    });

    document.addEventListener("click", (e) => {
        if (!e.target.closest(".js-search-container")) {
            suggestionBox.classList.add("hidden");
        }
    });
};

export default searchInput;
