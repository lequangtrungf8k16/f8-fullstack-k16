import "./style.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import app from "./app";
import { toggleMenu } from "./components/header";
import { togglePlayList } from "./components/player";
import initRouter from "./router/router";
import login, { loginFormEl } from "./components/login";
import sidebar from "./components/sidebar";

const render = async () => {
    document.querySelector("#app").innerHTML = await app();
    sidebar();
    login();
    initRouter();
    toggleMenu();
    loginFormEl();
    togglePlayList();
};
render();
