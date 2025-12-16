import header from "./components/header";
import sidebar from "./components/sidebar";
import authForm from "./components/authForm";
import userModals from "./components/userModal";
import musicPlayer from "./components/musicPlayer";

const app = () => {
    return `
    <div class="relative h-screen flex overflow-hidden bg-black text-white font-sans">        
        <aside class="sticky top-0 z-40 h-full">
            ${sidebar()}
        </aside>
        <div class="flex-1 flex flex-col h-full overflow-hidden relative">            
            <header class="sticky top-0 z-30"> 
                ${header()}
            </header>
            <main id="page" class="flex-1 overflow-y-auto bg-black p-4 md:p-8 pb-32 scrollbar-thin scrollbar-thumb-gray-700">
            </main>
            ${musicPlayer()}
        </div>
        ${authForm()}
        ${userModals()}
    </div>
    `;
};

export default app;
