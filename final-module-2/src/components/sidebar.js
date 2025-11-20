import logo from "../assets/icon/logo_youtube-music-dark.svg";

const sidebar = () => {
    return `
        <div class="js-sidebar p-4">

            <!-- Logo Youtube Music -->
            <div class="flex items-center gap-3 pl-2 py-2">
                    <i class="fa-solid fa-bars text-xl cursor-pointer"></i>
                    <a href="#!" class="flex items-center">
                        <img 
                            src=${logo} 
                            alt="logo_youtube-music-dark"
                            class="h-6"
                        >
                    </a>
            </div>

            <!-- Thanh điều hướng -->
            <div class="mt-4">
               <a class="w-full flex items-center gap-3 pl-2 py-3 rounded-lg cursor-pointer transition-colors hover:bg-gray-800" href="/">
               <i class="fa-regular fa-house"></i>
               Trang chủ
               </a>
               <a class="w-full flex items-center gap-3 pl-2 py-3 rounded-lg cursor-pointer transition-colors hover:bg-gray-800" href="/discover">
               <i class="fa-regular fa-compass"></i>
               Khám phá
               </a>
               <a class="w-full flex items-center gap-3 pl-2 py-3 rounded-lg cursor-pointer transition-colors hover:bg-gray-800" href="/library">
               <i class="fa-regular fa-bookmark"></i>
               Thư viện
               </a>
               <a class="w-full flex items-center gap-3 pl-2 py-3 rounded-lg cursor-pointer transition-colors hover:bg-gray-800" href="/upgrade">
               <i class="fa-regular fa-circle-play"></i>
               Cập nhật
               </a>
            </div>
            <div class="border-b border-gray-500 mx-2 pb-7"></div>

            <!-- Nút đăng nhập -->
            <div class="mt-6 px-2">
                <button 
                    class="w-full text-center text-sm bg-gray-800 px-4 py-2 rounded-3xl cursor-pointer transition-colors hover:bg-gray-500"
                >
                    Đăng nhập
                </button>
                <p 
                    class="w-full text-gray-500 text-left text-xs pr-1 py-1"
                >
                    Đăng nhập để tạo và chia sẻ danh sách phát, nhận đề xuất được cá nhân hóa và nhiều hơn thế nữa.
                </p>
            </div>
        </div>
    `;
};

export default sidebar;
