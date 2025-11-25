import Navigo from "navigo";

import homePage from "../pages/homePage";
import discoverPage from "../pages/discoverPage";
import libraryPage from "../pages/libraryPage";
import upgradePage from "../pages/upgradePage";

import categoryDetailPage from "../pages/categoryDetailPage";
import lineDetailPage from "../pages/lineDetailPage";

const mockPage = (title) =>
    `<div class="p-10 text-2xl font-bold text-white">${title}</div>`;

export const router = new Navigo("/", {
    hash: false,
    linksSelector: "a",
});

const setActiveLink = (path) => {
    const links = document.querySelectorAll(".js-menu a");
    links.forEach((link) => {
        const href = link.getAttribute("href");
        if (href === path) {
            link.classList.add("bg-gray-800");
        } else {
            link.classList.remove("bg-gray-800");
        }
    });
};

export const initCategoryCarousel = () => {
    const carousel = document.getElementById("category-carousel");
    const scrollLeftBtn = document.getElementById("category-scroll-left");
    const scrollRightBtn = document.getElementById("category-scroll-right");
    const wrapper = document.getElementById("category-carousel-wrapper");

    if (!carousel || !scrollLeftBtn || !scrollRightBtn || !wrapper) return;

    const scrollStep = wrapper.clientWidth * 0.8;

    const checkScrollButtons = () => {
        scrollLeftBtn.disabled = carousel.scrollLeft <= 5;

        const maxScroll = carousel.scrollWidth - carousel.clientWidth;
        scrollRightBtn.disabled = carousel.scrollLeft >= maxScroll - 5;

        if (carousel.scrollWidth <= carousel.clientWidth) {
            scrollLeftBtn.disabled = true;
            scrollRightBtn.disabled = true;
        }
    };

    const handleScroll = (direction) => {
        if (direction === "left") {
            carousel.scrollLeft -= scrollStep;
        } else {
            carousel.scrollLeft += scrollStep;
        }

        setTimeout(checkScrollButtons, 300);
    };

    scrollLeftBtn.addEventListener("click", () => handleScroll("left"));
    scrollRightBtn.addEventListener("click", () => handleScroll("right"));

    carousel.addEventListener("scroll", checkScrollButtons);
    window.addEventListener("resize", checkScrollButtons);

    checkScrollButtons();
};

const initRouter = () => {
    const page = document.querySelector("#page");

    page.addEventListener("click", (e) => {
        const songItem = e.target.closest(".js-play-song");
        if (songItem) {
            try {
                const rawData = songItem.dataset.song;
                if (rawData) {
                    const songData = JSON.parse(decodeURIComponent(rawData));
                    const playEvent = new CustomEvent("play-song", {
                        detail: songData,
                    });
                    document.dispatchEvent(playEvent);
                }
            } catch (err) {
                console.error(err);
            }
        }

        const scrollBtn = e.target.closest(".js-scroll-btn");
        if (scrollBtn) {
            const targetId = scrollBtn.dataset.target;
            const direction = scrollBtn.dataset.direction;
            const container = document.getElementById(targetId);

            if (container) {
                const scrollAmount = container.clientWidth * 0.7;
                if (direction === "left") {
                    container.scrollLeft -= scrollAmount;
                } else {
                    container.scrollLeft += scrollAmount;
                }
            }
        }

        const toggleBtn = e.target.closest(".js-toggle-view");
        if (toggleBtn) {
            const targetId = toggleBtn.dataset.target;
            const container = document.getElementById(targetId);
            const controls = document.getElementById(`controls-${targetId}`);

            if (container) {
                const currentView = container.dataset.view;

                if (currentView === "carousel") {
                    container.className =
                        "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 animate-fade-in";
                    container.dataset.view = "grid";

                    toggleBtn.innerText = "Thu gọn";
                    if (controls) controls.classList.add("hidden");

                    Array.from(container.children).forEach((child) => {
                        child.classList.remove("w-[220px]", "shrink-0");
                        child.classList.add("w-full");
                    });
                } else {
                    container.className =
                        "flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4 transition-all";
                    container.dataset.view = "carousel";

                    toggleBtn.innerText = "Xem tất cả";
                    if (controls) controls.classList.remove("hidden");

                    Array.from(container.children).forEach((child) => {
                        child.classList.add("w-[220px]", "shrink-0");
                        child.classList.remove("w-full");
                    });
                }
            }
        }
    });

    router.on("/", async () => {
        page.innerHTML =
            typeof homePage === "function"
                ? await homePage()
                : mockPage("Trang chủ");
        setActiveLink("/");
    });

    router.on("/discoverPage", async () => {
        page.innerHTML = `<div class="p-10 text-center text-gray-500"><i class="fa-solid fa-circle-notch fa-spin text-2xl"></i><p class="mt-2">Đang tải...</p></div>`;
        const content = await discoverPage();
        page.innerHTML = content;
        setActiveLink("/discoverPage");
    });

    router.on("/discoverPage/:slug", async (match) => {
        page.innerHTML = `<div class="p-10 text-center text-gray-500"><i class="fa-solid fa-circle-notch fa-spin text-2xl"></i><p class="mt-2">Đang tải danh mục...</p></div>`;
        const content = await categoryDetailPage(match);
        page.innerHTML = content;
        setActiveLink("/discoverPage");
    });

    router.on("/lines/:slug", async (match) => {
        page.innerHTML = `<div class="p-10 text-center text-gray-500"><i class="fa-solid fa-circle-notch fa-spin text-2xl"></i><p class="mt-2">Đang tải chi tiết dòng nhạc...</p></div>`;
        const content = await lineDetailPage(match);
        page.innerHTML = content;

        setActiveLink("/discoverPage");
    });

    router.on("/libraryPage", () => {
        page.innerHTML = libraryPage("Thư viện");
        setActiveLink("/libraryPage");
    });

    router.on("/upgradePage", () => {
        page.innerHTML = upgradePage();
        setActiveLink("/upgradePage");
    });

    router.on("/searchPage", async (match) => {
        page.innerHTML = `<div class="p-10 text-center text-gray-500"><i class="fa-solid fa-circle-notch fa-spin text-2xl"></i><p class="mt-2">Đang tìm kiếm...</p></div>`;
        const content = await searchPage(match);
        page.innerHTML = content;
        setActiveLink("");
    });

    router.notFound(() => {
        page.innerHTML = mockPage("404 - Không tìm thấy trang");
    });

    router.resolve();
};

export default initRouter;
