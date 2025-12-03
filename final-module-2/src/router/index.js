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

const render = async (contentFn, match) => {
    const pageContainer = document.querySelector("#page");

    setTimeout(() => {
        updateActiveSidebar();
    }, 0);

    if (!pageContainer) return;

    // Hiển thị loading
    pageContainer.innerHTML = `
        <p class="text-center text-4xl">Đang tải dữ liệu...</p>
    `;

    try {
        const content = await contentFn(match);
        pageContainer.innerHTML = content;
        pageContainer.scrollTop = 0;
    } catch (error) {
        console.error("Lỗi render trang:", error);
        pageContainer.innerHTML = `<div class="text-white text-center mt-10">Có lỗi xảy ra tải trang.</div>`;
    }
};

const initRouter = () => {
    router.on("/", (match) => {
        render(homePage, match).then(() =>
            setTimeout(initCategoryCarousel, 500)
        );
    });

    router.on("/discoverPage", (match) => render(discoverPage, match));
    router.on("/discoverPage/:slug", (match) =>
        render(categoryDetailPage, match)
    );
    router.on("/lines/:slug", (match) => render(lineDetailPage, match));
    router.on("/searchPage", (match) => render(searchPage, match));
    router.on("/libraryPage", (match) => render(libraryPage, match));
    router.on("/upgradePage", (match) => render(upgradePage, match));

    document.addEventListener("click", (e) => {
        const playBtn = e.target.closest(".js-play-song");

        if (playBtn) {
            e.preventDefault();
            e.stopPropagation();

            const songDataStr = playBtn.dataset.song;
            if (songDataStr) {
                try {
                    const song = JSON.parse(decodeURIComponent(songDataStr));

                    console.log("Đang phát từ Search:", song);

                    playerService.setPlaylist([song], 0);
                } catch (err) {
                    console.error("Lỗi parse dữ liệu bài hát:", err);
                }
            }
        }
    });

    router.resolve();
};

export const initCategoryCarousel = () => {
    const container = document.querySelector(".js-category-carousel");
    const prevBtn = document.querySelector(".js-carousel-prev");
    const nextBtn = document.querySelector(".js-carousel-next");

    if (!container || !prevBtn || !nextBtn) return;

    nextBtn.addEventListener("click", () => {
        container.scrollBy({ left: 300, behavior: "smooth" });
    });

    prevBtn.addEventListener("click", () => {
        container.scrollBy({ left: -300, behavior: "smooth" });
    });
};

export default initRouter;
