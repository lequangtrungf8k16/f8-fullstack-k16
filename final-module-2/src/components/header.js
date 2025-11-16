import searchBar from "./searchBar";
import authAction from "./authAction";

const header = () => {
    return `
        <header class="flex items-center justify-between border-r border-gray-600 px-4 py-3 bg-black sticky top-0 z-50">            
            <!-- Logo -->
          <div class="flex items-center gap-3 w-56">
                <i class="fa-solid fa-bars text-xl cursor-pointer"></i>

                <a href="#!" class="flex items-center">
                    <img 
                        src="./src/images/logo_youtube-music-dark.svg" 
                        alt="logo"
                        class="h-6"
                    >
                </a>
            </div>

            <!-- Thanh tìm kiếm -->
            ${searchBar()}

            <!-- >Người dùng -->
            ${authAction()}            
        </header>
    `;
};

export default header;
