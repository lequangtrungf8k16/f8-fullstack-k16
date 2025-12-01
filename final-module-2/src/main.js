import "./style.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import app from "./app";
import { initSidebarEvents } from "./components/sidebar";
import { initHeaderEvents } from "./components/header";
import { initAuthEvents } from "./components/authForm";
import { initUserModalEvents } from "./components/userModal";
import { initSearchEvents } from "./components/searchInput";
import { initPlayerControls } from "./components/musicPlayer";
import { initializePlayerService } from "./service/playerService";

import initRouter, { initCategoryCarousel } from "./router";

const render = async () => {
    document.querySelector("#app").innerHTML = app();

    initSidebarEvents();
    initHeaderEvents();
    initAuthEvents();
    initUserModalEvents();
    initSearchEvents();

    initCategoryCarousel();
    initializePlayerService();
    initPlayerControls();

    initRouter();
};

render();
