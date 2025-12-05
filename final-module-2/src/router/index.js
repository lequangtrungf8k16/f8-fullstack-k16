import Navigo from "navigo";
import { playerService } from "../service/playerService";
import { updateActiveSidebar } from "../components/sidebar";

import homePage from "../pages/homePage";
import discoverPage from "../pages/discoverPage";
import categoryDetailPage from "../pages/categoryDetailPage";
import playlistDetailPage from "../pages/playlistDetailPage";
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
            const maxScroll = container.scrollWidth - container.clientWidth;
            nextBtn.disabled = container.scrollLeft >= maxScroll - tolerance;
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

const setupGlobalEvents = () => {
    document.addEventListener("click", (e) => {
        const playBtn =
            e.target.closest(".js-play-btn") ||
            e.target.closest(".js-discover-play-btn");

        if (playBtn) {
            e.preventDefault();
            e.stopPropagation();

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
        <p class="text-center text-3xl text-white">Đang tải dữ liệu...</p>
        
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

    router.on("/lines/:slug", (match) => render(playlistDetailPage, match));
    router.on("/playlist/:slug", (match) => render(playlistDetailPage, match));
    router.on("/album/:slug", (match) => render(playlistDetailPage, match));

    router.on("/searchPage", (match) => render(searchPage, match));
    router.on("/libraryPage", (match) => render(libraryPage, match));
    router.on("/upgradePage", (match) => render(upgradePage, match));

    router.resolve();
};

export default initRouter;
