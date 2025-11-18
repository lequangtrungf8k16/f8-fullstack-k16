import header from "./components/header";
import sidebar from "./components/sidebar";
import player from "./components/player";
import home from "./pages/home";
import discover from "./pages/discover";
import library from "./pages/library";
import upgrade from "./pages/upgrade";

const app = () => {
    return `
    <div class="h-screen flex overflow-hidden">
        <!-- SIDEBAR BÊN TRÁI -->
        <aside class="w-60 h-full sticky top-0 bg-black border-r border-gray-700">
            ${sidebar()}
        </aside>
        <!-- PANEL BÊN PHẢI -->
        <div class="flex-1 flex flex-col overflow-hidden">
            <!-- HEADER -->
            ${header()}
            <!-- MAIN -->
            <main id="page" class="flex-1 overflow-auto px-20 pt-10 pb-40 bg-black text-white">
            
            ${home()}
            </main>

            <!-- PLAYER -->
            ${player()}
        </div>
    </div>
    `;
};

export default app;
