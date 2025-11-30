import { searchService } from "../service/searchService";
import { router } from "../router/index";

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
        <div class="relative lg:flex lg:justify-between lg:flex-1 hidden group/search">
            <div class="js-search-container w-full max-w-xl relative">
                
                <div class="flex items-center w-full bg-gray-800 border border-gray-600 rounded-lg overflow-hidden focus-within:border-white focus-within:bg-black transition-colors">
                    <button class="px-4 text-gray-400">
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </button>
                    <input
                        type="text"
                        class="js-search-input w-full bg-transparent py-3 text-white placeholder-gray-400 focus:outline-none text-sm"
                        placeholder="Tìm bài hát, nghệ sĩ, podcast..."
                        autocomplete="off" 
                    />
                    <button class="js-clear-search px-4 text-gray-400 hover:text-white hidden">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>

                <div class="js-search-suggestions hidden absolute top-full left-0 w-full mt-2 bg-gray-800 rounded-lg shadow-xl border border-gray-700 overflow-hidden z-50 max-h-[400px] overflow-y-auto">
                    </div>

            </div>
        </div>
        
        <button class="lg:hidden ml-auto px-4 text-white hover:text-white">
            <i class="fa-solid fa-magnifying-glass"></i>
        </button>
    `;
};

export const initSearchEvents = () => {
    const searchInput = document.querySelector(".js-search-input");
    const suggestionBox = document.querySelector(".js-search-suggestions");
    const clearBtn = document.querySelector(".js-clear-search");

    if (!searchInput || !suggestionBox) return;

    const navigateToSearch = (query) => {
        if (!query.trim()) return;
        suggestionBox.classList.add("hidden");
        router.navigate(`/searchPage?q=${encodeURIComponent(query)}`);
    };

    const handleInput = debounce(async (e) => {
        const query = e.target.value.trim();

        if (query.length > 0) {
            clearBtn.classList.remove("hidden");
        } else {
            clearBtn.classList.add("hidden");
            suggestionBox.classList.add("hidden");
            return;
        }

        const res = await searchService.getSuggestions(query);

        const items = res?.data?.items || res?.data || [];

        if (items && items.length > 0) {
            renderSuggestions(items, query);
            suggestionBox.classList.remove("hidden");
        } else {
            suggestionBox.classList.add("hidden");
        }
    }, 500);

    const renderSuggestions = (items, query) => {
        const html = items
            .slice(0, 6)
            .map(
                (item) => `
            <div class="js-suggestion-item flex items-center gap-3 px-4 py-3 hover:bg-gray-700 cursor-pointer text-white" data-keyword="${
                item.keyword || item.title || item
            }">
                <i class="fa-solid fa-magnifying-glass text-gray-400 text-sm"></i>
                <span class="text-sm flex-1 truncate">
                    ${item.keyword || item.title || item} 
                </span>
            </div>
        `
            )
            .join("");
        suggestionBox.innerHTML = html;

        document.querySelectorAll(".js-suggestion-item").forEach((item) => {
            item.addEventListener("click", () => {
                const keyword = item.getAttribute("data-keyword");
                searchInput.value = keyword;
                navigateToSearch(keyword);
            });
        });
    };

    searchInput.addEventListener("input", handleInput);

    searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            navigateToSearch(searchInput.value);
        }
    });

    clearBtn?.addEventListener("click", () => {
        searchInput.value = "";
        suggestionBox.classList.add("hidden");
        clearBtn.classList.add("hidden");
        searchInput.focus();
    });

    document.addEventListener("click", (e) => {
        if (!e.target.closest(".js-search-container")) {
            suggestionBox.classList.add("hidden");
        }
    });

    searchInput.addEventListener("focus", () => {
        if (searchInput.value.trim().length > 0) {
            handleInput({ target: searchInput });
        }
    });
};

export default searchInput;
