import Navigo from "navigo";
import home from "../pages/home";
import discover from "../pages/discover";
import library from "../pages/library";
import upgrade from "../pages/upgrade";

const router = new Navigo("/", {
    hash: false,
    linksSelector: "a",
});

const initRouter = async () => {
    const page = document.querySelector("#page");
    router.on("/", () => {
        page.innerHTML = home();
    });
    router.on("/discover", () => {
        page.innerHTML = discover();
    });
    router.on("/library", () => {
        page.innerHTML = library();
    });
    router
        .on("/upgrade", () => {
            page.innerHTML = upgrade();
        })
        .resolve();
};

export default initRouter;
