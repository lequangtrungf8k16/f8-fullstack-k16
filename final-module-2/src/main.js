import "./style.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import app from "./app";

document.querySelector("#app").innerHTML = app();

document.addEventListener("click", (e) => {
    const menu = document.querySelector(".js-authMenu");
    if (!menu) return;

    if (e.target.closest(".js-authMenuBtn")) {
        menu.classList.toggle("hidden");
        return;
    }
    if (!e.target.closest(".js-authMenu")) {
        menu.classList.add("hidden");
    }
});
