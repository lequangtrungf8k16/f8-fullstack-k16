import Navigo from "navigo";
import home from "../pages/home";
import discover from "../pages/discover";
import library from "../pages/library";
import upgrade from "../pages/upgrade";

const router = new Navigo("/", {
    hash: false,
    linksSelector: "a",
});

const setActiveLink = (path) => {
    const links = document.querySelectorAll(".js-menu a");
    links.forEach((link) => {
        if (link.getAttribute("href") === path) {
            link.classList.add("bg-gray-500");
        } else {
            link.classList.remove("bg-gray-500");
        }
    });
};

const initRouter = async () => {
    const page = document.querySelector("#page");
    router.on("/", () => {
        page.innerHTML = home();
        setActiveLink("/");
    });
    router.on("/discover", () => {
        page.innerHTML = discover();
        setActiveLink("/discover");
    });
    router.on("/library", () => {
        page.innerHTML = library();
        setActiveLink("/library");
    });
    router
        .on("/upgrade", () => {
            page.innerHTML = upgrade();
            setActiveLink("/upgrade");
        })
        .resolve();
};

export default initRouter;
