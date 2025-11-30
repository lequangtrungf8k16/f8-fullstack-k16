import { homeService } from "../service/homeService";
import { discoverService } from "../service/discoverService";
import { getPlaylistsByCountry } from "../service/playlistService";
import { storageService } from "../service/storageService";
import { playerService } from "../service/playerService";

const renderCard = (item, type) => {
    const title = item.title || item.name || "Không tiêu đề";

    let subtitle = "Tuyển tập";
    if (item.artists && Array.isArray(item.artists)) {
        if (typeof item.artists[0] === "string") {
            subtitle = item.artists.join(", ");
        } else {
            subtitle = item.artists.map((a) => a.name).join(", ");
        }
    } else if (item.description) {
        subtitle = item.description;
    }

    let image = "./src/assets/images/default-album.jpg";
    if (item.thumbnails && item.thumbnails.length > 0) {
        image = item.thumbnails[0];
    } else if (item.thumbnailUrl) {
        image = item.thumbnailUrl;
    } else if (item.thumbnail) {
        image = item.thumbnail;
    }

    const id = item.slug || item.encodeId || item._id || item.id;

    if (type === "mood") {
        return `
            <a href="/discoverPage/${id}" data-navigo class="block w-[200px] h-[100px] shrink-0 relative rounded-lg overflow-hidden group hover:scale-105 transition-transform duration-300 snap-start">
                <img src="${image}" class="w-full h-full object-cover brightness-75 group-hover:brightness-100 transition-all" alt="${title}">
                <div class="absolute inset-0 flex items-center justify-center">
                    <h3 class="text-white font-bold text-lg text-center drop-shadow-md px-2">${title}</h3>
                </div>
            </a>
        `;
    }

    return `
        <div class="w-[170px] md:w-[200px] shrink-0 group snap-start">
            <div class="relative w-full aspect-square rounded-md overflow-hidden mb-3 shadow-lg bg-gray-800">
                <img src="${image}" alt="${title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                
                <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <button class="js-play-home-item w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform shadow-xl cursor-pointer"
                        data-id="${id}" data-type="${type}">
                        <i class="fa-solid fa-play ml-1 text-xl"></i>
                    </button>
                </div>
            </div>
            <h4 class="text-white font-bold text-sm md:text-base truncate cursor-pointer hover:underline" title="${title}">${title}</h4>
            <p class="text-gray-400 text-xs md:text-sm truncate mt-1">${subtitle}</p>
        </div>
    `;
};

const renderSection = (title, items, type, sectionId) => {
    if (!items || !Array.isArray(items) || items.length === 0) return "";

    return `
        <section class="mb-12 animate-fade-in group/section" id="section-${sectionId}">
            <div class="flex justify-between items-end mb-4 px-2">
                <h2 class="text-2xl md:text-3xl font-bold text-white tracking-tight">${title}</h2>
                
                <div class="hidden md:flex gap-3">
                    <button id="btn-prev-${sectionId}" class="js-scroll-btn w-9 h-9 rounded-full bg-black border border-gray-600 flex items-center justify-center hover:bg-gray-800 hover:border-white text-white transition-all active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed" 
                        data-target="scroll-${sectionId}" data-dir="left" title="Cuộn trái">
                        <i class="fa-solid fa-chevron-left"></i>
                    </button>
                    <button id="btn-next-${sectionId}" class="js-scroll-btn w-9 h-9 rounded-full bg-black border border-gray-600 flex items-center justify-center hover:bg-gray-800 hover:border-white text-white transition-all active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed" 
                        data-target="scroll-${sectionId}" data-dir="right" title="Cuộn phải">
                        <i class="fa-solid fa-chevron-right"></i>
                    </button>
                </div>
            </div>

            <div id="scroll-${sectionId}" 
                 class="js-scroll-container flex gap-6 overflow-x-auto pb-4 px-2 scroll-smooth snap-x snap-mandatory scrollbar-custom"
                 data-section="${sectionId}">
                
                <style>
                    #scroll-${sectionId}::-webkit-scrollbar {
                        height: 8px;
                    }
                    #scroll-${sectionId}::-webkit-scrollbar-track {
                        background: #181818; 
                        border-radius: 4px;
                    }
                    #scroll-${sectionId}::-webkit-scrollbar-thumb {
                        background: #444; 
                        border-radius: 4px;
                    }
                    #scroll-${sectionId}::-webkit-scrollbar-thumb:hover {
                        background: #666; 
                    }
                </style>

                ${items.map((item) => renderCard(item, type)).join("")}
            </div>
        </section>
    `;
};

const homePage = async () => {
    const user = storageService.getUserInfo();
    const isLoggedIn = !!user;

    let content = `
        <div class="w-full h-[60vh] flex flex-col justify-center items-center text-gray-500">
            <i class="fa-solid fa-circle-notch fa-spin text-4xl mb-4 text-white"></i>
            <p>Đang tải thư viện nhạc...</p>
        </div>
    `;

    try {
        const [personalized, albums, hits, vnPlaylists, moods] =
            await Promise.all([
                homeService.getPersonalized(),
                homeService.getAlbumsForYou(),
                homeService.getTodaysHits(),
                getPlaylistsByCountry("VN"),
                discoverService.getMoods(),
            ]);

        let sectionsHtml = "";

        if (personalized && personalized.length > 0) {
            sectionsHtml += renderSection(
                `Gợi ý cho ${user.name}`,
                personalized,
                "playlist",
                "personalized"
            );
        }

        sectionsHtml += renderSection(
            "Album thịnh hành",
            albums,
            "album",
            "albums"
        );
        sectionsHtml += renderSection(
            "Tuyển tập Hits hôm nay",
            hits,
            "playlist",
            "hits"
        );
        sectionsHtml += renderSection(
            "Playlist Việt Nam",
            vnPlaylists,
            "playlist",
            "vn"
        );
        sectionsHtml += renderSection(
            "Tâm trạng & Thể loại",
            moods,
            "mood",
            "moods"
        );

        if (!sectionsHtml) {
            sectionsHtml = `
                <div class="text-center text-gray-400 mt-20">
                    <i class="fa-solid fa-face-frown-open text-4xl mb-4"></i>
                    <p>Không có dữ liệu hiển thị.</p>
                </div>`;
        }

        content = `
            <div class="pb-32 px-4 md:px-8 pt-8 max-w-[1600px] mx-auto">
                <div class="mb-8 px-2">
                    <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">${
                        isLoggedIn
                            ? `Chào mừng ${user.name} trở lại!`
                            : "Khám phá thế giới âm nhạc"
                    }</h1>
                    <p class="text-gray-400 text-sm md:text-base">${
                        isLoggedIn
                            ? "Nghe lại những bài hát yêu thích của bạn."
                            : "Đăng nhập để nhận playlist gợi ý riêng cho bạn."
                    }</p>
                    
                    ${
                        !isLoggedIn
                            ? `
                        <button class="js-open-login-modal mt-4 bg-white text-black font-bold py-2 px-6 rounded-full hover:scale-105 transition-transform cursor-pointer">
                            Đăng nhập ngay
                        </button>
                    `
                            : ""
                    }
                </div>

                ${sectionsHtml}
            </div>
        `;
    } catch (e) {
        console.error("Home Page Critical Error:", e);
        content = `<div class="pt-20 text-center text-white">Lỗi tải trang: ${e.message}</div>`;
    }

    setTimeout(() => {
        document.querySelectorAll(".js-play-home-item").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                const id = btn.dataset.id;
                const type = btn.dataset.type;
                playerService.playAlbumOrPlaylist(id, type);
            });
        });

        const scrollContainers = document.querySelectorAll(
            ".js-scroll-container"
        );

        scrollContainers.forEach((container) => {
            const sectionId = container.dataset.section;
            const prevBtn = document.getElementById(`btn-prev-${sectionId}`);
            const nextBtn = document.getElementById(`btn-next-${sectionId}`);

            const updateButtonState = () => {
                if (!prevBtn || !nextBtn) return;

                const isAtStart = container.scrollLeft <= 5;
                prevBtn.disabled = isAtStart;
                prevBtn.style.opacity = isAtStart ? "0.3" : "1";

                const maxScroll = container.scrollWidth - container.clientWidth;
                const isAtEnd = container.scrollLeft >= maxScroll - 5;
                nextBtn.disabled = isAtEnd;
                nextBtn.style.opacity = isAtEnd ? "0.3" : "1";
            };

            container.addEventListener("scroll", updateButtonState);

            [prevBtn, nextBtn].forEach((btn) => {
                if (!btn) return;
                btn.addEventListener("click", (e) => {
                    const direction = btn.id.includes("prev")
                        ? "left"
                        : "right";
                    const scrollAmount = container.clientWidth * 0.7;

                    let newScrollPosition;

                    if (direction === "left") {
                        newScrollPosition = Math.max(
                            0,
                            container.scrollLeft - scrollAmount
                        );
                    } else {
                        newScrollPosition = container.scrollLeft + scrollAmount;
                    }

                    container.scrollTo({
                        left: newScrollPosition,
                        behavior: "smooth",
                    });

                    setTimeout(updateButtonState, 400);
                });
            });

            updateButtonState();

            window.addEventListener("resize", updateButtonState);
        });

        const loginBtn = document.querySelector(".js-open-login-modal");
        if (loginBtn) {
            loginBtn.addEventListener("click", () => {
                const modal = document.querySelector(".js-auth-modal");
                const overlay = document.querySelector(".js-auth-overlay");
                if (modal && overlay) {
                    modal.classList.remove("hidden");
                    overlay.classList.remove("hidden");
                }
            });
        }
    }, 100);

    return content;
};

export default homePage;
