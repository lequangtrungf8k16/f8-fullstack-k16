import "./style.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import app from "./app";
import { toggleMenu } from "./components/header";
import { togglePlayList } from "./components/player";
import initRouter from "./router/router";
import { loginFormEl } from "./components/login";

const render = async () => {
    document.querySelector("#app").innerHTML = await app();
    initRouter();
    toggleMenu();
    loginFormEl();
    togglePlayList();
};
render();
