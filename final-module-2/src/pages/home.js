const home = () => {
    return `

      <!-- Section -->
       <div class="mt-10">   
            <!-- Navigation -->       
            <div class="flex gap-2 text-sm overflow-x-auto scrollbar scrollbar-track-black scrollbar-thumb-gray-500">            
              <button class="shrink-0 bg-gray-700 text-white overflow-hidden px-4 py-2 rounded-lg">Thư giãn</button>              
              <button class="shrink-0 bg-gray-700 text-white overflow-hidden px-4 py-2 rounded-lg">Dễ ngủ</button>
              <button class="shrink-0 bg-gray-700 text-white overflow-hidden px-4 py-2 rounded-lg">Lãng mạn</button>
              <button class="shrink-0 bg-gray-700 text-white overflow-hidden px-4 py-2 rounded-lg">Buồn</button>
              <button class="shrink-0 bg-gray-700 text-white overflow-hidden px-4 py-2 rounded-lg">Nạp năng lượng</button>
              <button class="shrink-0 bg-gray-700 text-white overflow-hidden px-4 py-2 rounded-lg">Vui tươi</button>
              <button class="shrink-0 bg-gray-700 text-white overflow-hidden px-4 py-2 rounded-lg">Tiệc tùng</button>
              <button class="shrink-0 bg-gray-700 text-white overflow-hidden px-4 py-2 rounded-lg">Tập thể dục</button>
              <button class="shrink-0 bg-gray-700 text-white overflow-hidden px-4 py-2 rounded-lg">Trên đường đi làm</button>
              <button class="shrink-0 bg-gray-700 text-white overflow-hidden px-4 py-2 rounded-lg">Tập trung</button>            
            </div>

            <!-- Quick picks -->
            <div class="js-quick-picks mt-10">
              <div class="flex justify-between">
                <span class="text-4xl">Quick picks</span>
                <div class="flex items-center gap-4">
                  <button class="border border-gray-500 px-4 py-1 rounded-3xl cursor-pointer hover:bg-gray-500 transition-colors">Play all</button>
                    <div class="flex items-center gap-3 text-xl">
                      <button class="w-8 h-8 text-center border rounded-full cursor-pointer hover:bg-gray-500 transition-colors"><i class="fa-solid fa-angle-left"></i></button>
                      <button class="w-8 h-8 text-center border rounded-full cursor-pointer hover:bg-gray-500 transition-colors"><i class="fa-solid fa-angle-right"></i></button>
                    </div>
                </div>
              </div>
            </div>

            <div class="js-play-list flex justify-start gap-6 mt-4 scrollbar scrollbar-track-black scrollbar-thumb-gray-500">
              <div class="flex gap-2 relative flex-nowrap shrink-0 group">
                <div class="relative w-12 h-12 bg-amber-300 opacity-50 rounded-md">
                <button class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer">
                <i class="fa-solid fa-play"></i></button>
                
                <img src="./src/images/nature-1.webp" class="w-full h-full object-cover"/>
                </div>

                <div class="flex flex-col flex-nowrap shrink-0">
                  <button class="cursor-pointer text-left">ANH LÀ THẰNG TỒI</button>
                  <div class="text-gray-500 text-sm">
                    <button class="cursor-pointer">Phùng Khánh Linh</button>
                    <button class="cursor-pointer">.</button>
                    <button class="cursor-pointer">Giữa một vạn người</button>
                  </div>
                </div>

                <div class="absolute top-1/2 -translate-y-1/2 right-1 flex items-center gap-4 text-2xl flex-nowrap shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button class="w-10 h-10 rounded-full hover:bg-gray-500 text-center cursor-pointer transition-colors"><i class="fa-regular fa-thumbs-down"></i></button>
                  <button class="w-10 h-10 rounded-full hover:bg-gray-500 text-center cursor-pointer transition-colors"><i class="fa-regular fa-thumbs-up"></i></button>
                  <button class="relative w-10 h-10 rounded-full hover:bg-gray-500 text-center group cursor-pointer transition-colors">
                    <i class="fa-solid fa-ellipsis rotate-90"></i>
                  </button>                  
                    <ul class="hidden absolute top-full right-0 w-50 bg-gray-500 text-center rounded-lg text-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300">
                      <li>
                        
                        <a href="#!" class="flex w-full text-white px-4 py-2 rounded-lg">Start mix</a>
                      </li>
                     
                    </ul>
                </div>
              </div>              
              
            </div>

       </div>
     `;
};

export default home;
