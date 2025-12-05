import Navigo from "navigo";
import { playerService } from "../service/playerService";
import { updateActiveSidebar } from "../components/sidebar";

import homePage from "../pages/homePage";
import discoverPage from "../pages/discoverPage";
import categoryDetailPage from "../pages/categoryDetailPage";
import lineDetailPage from "../pages/lineDetailPage";
import searchPage from "../pages/searchPage";
import libraryPage from "../pages/libraryPage";
import upgradePage from "../pages/upgradePage";

export const router = new Navigo("/", { linksSelector: "a" });

export const initCategoryCarousel = () => {
    const containers = document.querySelectorAll(".js-scroll-container");

    containers.forEach((container) => {
        const sectionId = container.dataset.section;
        const prevBtn = document.getElementById(`btn-prev-${sectionId}`);
        const nextBtn = document.getElementById(`btn-next-${sectionId}`);

        if (!prevBtn || !nextBtn) return;

        container.scrollLeft = 0;

        const updateButtonState = () => {
            const tolerance = 10;

            prevBtn.disabled = container.scrollLeft <= tolerance;
            prevBtn.style.opacity = prevBtn.disabled ? "0.3" : "1";
            prevBtn.style.cursor = prevBtn.disabled ? "not-allowed" : "pointer";

            const maxScroll = container.scrollWidth - container.clientWidth;
            nextBtn.disabled = container.scrollLeft >= maxScroll - tolerance;
            nextBtn.style.opacity = nextBtn.disabled ? "0.3" : "1";
            nextBtn.style.cursor = nextBtn.disabled ? "not-allowed" : "pointer";
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

const setupGlobalEvents = () => {
    document.addEventListener("click", (e) => {
        const playBtn =
            e.target.closest(".js-play-btn") ||
            e.target.closest(".js-discover-play-btn") ||
            e.target.closest(".js-play-cate-item") ||
            e.target.closest(".js-play-all-line");

        if (playBtn) {
            e.preventDefault();
            e.stopPropagation();

            if (playBtn.classList.contains("js-play-all-line")) return;

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

        const cardItem =
            e.target.closest(".js-album-card") ||
            e.target.closest(".js-discover-item");
        if (cardItem && !e.target.closest("a")) {
            const id = cardItem.dataset.id;
            const type = cardItem.dataset.type || "playlist";
            playerService.loadPlaylistOnly(id, type);
            document.dispatchEvent(new CustomEvent("OPEN_FULL_PLAYER"));
        }

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
                    console.error(err);
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
            <p class="w-full h-[60vh] flex flex-col justify-center items-center text-gray-500">Đang tải dữ liệu...</p>
    `;

    try {
        const content = await contentFn(match);
        pageContainer.innerHTML = content;
        pageContainer.scrollTop = 0;

        const isScrollablePage =
            match.url === "" ||
            match.url === "/" ||
            match.url.startsWith("discoverPage");

        if (isScrollablePage) {
            setTimeout(initCategoryCarousel, 100);
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

export default initRouter;
