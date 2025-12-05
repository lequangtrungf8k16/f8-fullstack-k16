import Navigo from "navigo";
import { playerService } from "../service/playerService";
import { updateActiveSidebar } from "../components/sidebar";
// Import các pages
import homePage from "../pages/homePage";
import discoverPage from "../pages/discoverPage";
import categoryDetailPage from "../pages/categoryDetailPage";
import lineDetailPage from "../pages/lineDetailPage";
import searchPage from "../pages/searchPage";
import libraryPage from "../pages/libraryPage";
import upgradePage from "../pages/upgradePage";

export const router = new Navigo("/", { linksSelector: "a" });

// XỬ LÝ SỰ KIỆN TOÀN CỤC
const setupGlobalEvents = () => {
    document.addEventListener("click", (e) => {
        // 1. Nút Play trên Card
        const playBtn =
            e.target.closest(".js-play-btn") ||
            e.target.closest(".js-discover-play-btn") ||
            e.target.closest(".js-play-cate-item") ||
            e.target.closest(".js-play-all-line");

        if (playBtn) {
            e.preventDefault();
            e.stopPropagation();

            if (playBtn.classList.contains("js-play-all-line")) {
                return;
            }

            // Nút play từ Card
            const card =
                playBtn.closest(".js-album-card") ||
                playBtn.closest(".js-discover-item") ||
                playBtn;
            if (card && card.dataset.id) {
                const id = card.dataset.id;
                const type = card.dataset.type || "playlist";
                playerService.playAlbumOrPlaylist(id, type);
                document.dispatchEvent(new CustomEvent("OPEN_FULL_PLAYER"));
            }
            return;
        }

        // 2. Nút Card để xem chi tiết
        const cardItem =
            e.target.closest(".js-album-card") ||
            e.target.closest(".js-discover-item");
        if (cardItem && !e.target.closest("a")) {
            // Nút card (Trừ thẻ a)
            const id = cardItem.dataset.id;
            const type = cardItem.dataset.type || "playlist";
            playerService.loadPlaylistOnly(id, type);
            document.dispatchEvent(new CustomEvent("OPEN_FULL_PLAYER"));
        }

        // 3. Nút Play từng bài
        const songItem = e.target.closest(".js-play-song");
        if (songItem) {
            e.preventDefault();
            e.stopPropagation();
            const songDataStr = songItem.dataset.song;
            if (songDataStr) {
                try {
                    const song = JSON.parse(decodeURIComponent(songDataStr));
                    playerService.setPlaylist([song], 0);
                    document.dispatchEvent(new CustomEvent("OPEN_FULL_PLAYER"));
                } catch (err) {
                    console.error("Lỗi parse dữ liệu bài hát:", err);
                }
            }
        }
    });
};

const render = async (contentFn, match) => {
    const pageContainer = document.querySelector("#page");

    setTimeout(updateActiveSidebar, 0);

    if (!pageContainer) return;

    pageContainer.innerHTML = `
        <div class="w-full h-[60vh] flex flex-col justify-center items-center text-gray-500">
            <i class="fa-solid fa-circle-notch fa-spin text-4xl mb-4 text-white"></i>
            <p>Đang tải dữ liệu...</p>
        </div>
    `;

    try {
        const content = await contentFn(match);
        pageContainer.innerHTML = content;
        pageContainer.scrollTop = 0;

        if (match.url === "" || match.url === "/") {
            setTimeout(initCategoryCarousel, 500);
        }
    } catch (error) {
        console.error("Lỗi render trang:", error);
        pageContainer.innerHTML = `<div class="text-white text-center mt-10">Có lỗi xảy ra tải trang.</div>`;
    }
};

const initRouter = () => {
    setupGlobalEvents();

    router.on("/", (match) => render(homePage, match));
    router.on("/discoverPage", (match) => render(discoverPage, match));
    router.on("/discoverPage/:slug", (match) =>
        render(categoryDetailPage, match)
    );
    router.on("/lines/:slug", (match) => render(lineDetailPage, match));
    router.on("/playlist/:slug", (match) => render(lineDetailPage, match));
    router.on("/album/:slug", (match) => render(lineDetailPage, match));
    router.on("/searchPage", (match) => render(searchPage, match));
    router.on("/libraryPage", (match) => render(libraryPage, match));
    router.on("/upgradePage", (match) => render(upgradePage, match));

    router.resolve();
};

export const initCategoryCarousel = () => {
    const containers = document.querySelectorAll(".js-scroll-container");

    containers.forEach((container) => {
        const sectionId = container.dataset.section;
        const prevBtn = document.getElementById(`btn-prev-${sectionId}`);
        const nextBtn = document.getElementById(`btn-next-${sectionId}`);

        if (!prevBtn || !nextBtn) return;

        const updateButtonState = () => {
            prevBtn.disabled = container.scrollLeft <= 5;
            prevBtn.style.opacity = prevBtn.disabled ? "0.3" : "1";
            const maxScroll = container.scrollWidth - container.clientWidth;
            nextBtn.disabled = container.scrollLeft >= maxScroll - 5;
            nextBtn.style.opacity = nextBtn.disabled ? "0.3" : "1";
        };

        container.addEventListener("scroll", updateButtonState);

        prevBtn.addEventListener("click", () => {
            container.scrollBy({
                left: -container.clientWidth * 0.7,
                behavior: "smooth",
            });
        });

        nextBtn.addEventListener("click", () => {
            container.scrollBy({
                left: container.clientWidth * 0.7,
                behavior: "smooth",
            });
        });

        updateButtonState();
    });
};

export default initRouter;
