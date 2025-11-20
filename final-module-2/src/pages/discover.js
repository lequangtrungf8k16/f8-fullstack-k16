const discover = () => {
    return `
    <div class="max-w-7xl mx-auto">
      <div class="flex justify-between gap-4">
        <button class="flex-1 px-4 py-4 text-xl text-left bg-gray-700 border border-gray-500 rounded-lg cursor-pointer">
          <i class="fa-solid fa-gear"></i>
          New releases
        </button>
        <button class="flex-1 px-4 py-4 text-xl text-left bg-gray-700 border border-gray-500 rounded-lg cursor-pointer">
          <i class="fa-solid fa-chart-line"></i>
          Charts
        </button>
        <button class="flex-1 px-4 py-4 text-xl text-left bg-gray-700 border border-gray-500 rounded-lg cursor-pointer">
          <i class="fa-regular fa-face-smile"></i>
          Moods & genres
        </button>
      </div>
      <div>
        <!-- Start: Tiêu đề Moods & genres -->
        <div class="flex justify-between mt-10">
          <h3 class="text-2xl">Moods & genres</h3>
          <div>
            <div class="flex items-center gap-4">
              <button class="border border-gray-500 px-4 py-1 rounded-3xl cursor-pointer hover:bg-gray-500 transition-colors">More</button>
              <div class="flex items-center gap-3 text-xl">
                <button class="w-8 h-8 text-center border rounded-full cursor-pointer hover:bg-gray-500 transition-colors"><i class="fa-solid fa-angle-left"></i></button>
                <button class="w-8 h-8 text-center border rounded-full cursor-pointer hover:bg-gray-500 transition-colors"><i class="fa-solid fa-angle-right"></i></button>
              </div>
            </div>
          </div>
        </div>
        <!-- End: Tiêu đề Moods & genres -->
        <!-- Start: Danh sách Moods & genres -->
        <div class="grid grid-rows-4 grid-flow-col gap-4 mt-4 overflow-x-auto scrollbar py-2">
          <button class="w-40 text-left bg-gray-700 border-l-6 border-l-amber-500 rounded-lg px-4 py-3 cursor-pointer">Chill</button>
          <button class="w-40 text-left bg-gray-700 border-l-6 border-l-amber-500 rounded-lg px-4 py-3 cursor-pointer">Chill</button>
          <button class="w-40 text-left bg-gray-700 border-l-6 border-l-amber-500 rounded-lg px-4 py-3 cursor-pointer">Chill</button>
          <button class="w-40 text-left bg-gray-700 border-l-6 border-l-amber-500 rounded-lg px-4 py-3 cursor-pointer">Chill</button>
          <button class="w-40 text-left bg-gray-700 border-l-6 border-l-amber-500 rounded-lg px-4 py-3 cursor-pointer">Chill</button>
          <button class="w-40 text-left bg-gray-700 border-l-6 border-l-amber-500 rounded-lg px-4 py-3 cursor-pointer">Chill</button>
          <button class="w-40 text-left bg-gray-700 border-l-6 border-l-amber-500 rounded-lg px-4 py-3 cursor-pointer">Chill</button>
          <button class="w-40 text-left bg-gray-700 border-l-6 border-l-amber-500 rounded-lg px-4 py-3 cursor-pointer">Chill</button>
          <button class="w-40 text-left bg-gray-700 border-l-6 border-l-amber-500 rounded-lg px-4 py-3 cursor-pointer">Chill</button>
          <button class="w-40 text-left bg-gray-700 border-l-6 border-l-amber-500 rounded-lg px-4 py-3 cursor-pointer">Chill</button>
          <button class="w-40 text-left bg-gray-700 border-l-6 border-l-amber-500 rounded-lg px-4 py-3 cursor-pointer">Chill</button>
          <button class="w-40 text-left bg-gray-700 border-l-6 border-l-amber-500 rounded-lg px-4 py-3 cursor-pointer">Chill</button>
          <button class="w-40 text-left bg-gray-700 border-l-6 border-l-amber-500 rounded-lg px-4 py-3 cursor-pointer">Chill</button>
          <button class="w-40 text-left bg-gray-700 border-l-6 border-l-amber-500 rounded-lg px-4 py-3 cursor-pointer">Chill</button>
          <button class="w-40 text-left bg-gray-700 border-l-6 border-l-amber-500 rounded-lg px-4 py-3 cursor-pointer">Chill</button>
          <button class="w-40 text-left bg-gray-700 border-l-6 border-l-amber-500 rounded-lg px-4 py-3 cursor-pointer">Chill</button>
          <button class="w-40 text-left bg-gray-700 border-l-6 border-l-amber-500 rounded-lg px-4 py-3 cursor-pointer">Chill</button>
          <button class="w-40 text-left bg-gray-700 border-l-6 border-l-amber-500 rounded-lg px-4 py-3 cursor-pointer">Chill</button>
          <button class="w-40 text-left bg-gray-700 border-l-6 border-l-amber-500 rounded-lg px-4 py-3 cursor-pointer">Chill</button>
          <button class="w-40 text-left bg-gray-700 border-l-6 border-l-amber-500 rounded-lg px-4 py-3 cursor-pointer">Chill</button>
          <button class="w-40 text-left bg-gray-700 border-l-6 border-l-amber-500 rounded-lg px-4 py-3 cursor-pointer">Chill</button>
          <button class="w-40 text-left bg-gray-700 border-l-6 border-l-amber-500 rounded-lg px-4 py-3 cursor-pointer">Chill</button>
          <button class="w-40 text-left bg-gray-700 border-l-6 border-l-amber-500 rounded-lg px-4 py-3 cursor-pointer">Chill</button>
          <button class="w-40 text-left bg-gray-700 border-l-6 border-l-amber-500 rounded-lg px-4 py-3 cursor-pointer">Chill</button>
          <button class="w-40 text-left bg-gray-700 border-l-6 border-l-amber-500 rounded-lg px-4 py-3 cursor-pointer">Chill</button>
          <button class="w-40 text-left bg-gray-700 border-l-6 border-l-amber-500 rounded-lg px-4 py-3 cursor-pointer">Chill</button>
          <button class="w-40 text-left bg-gray-700 border-l-6 border-l-amber-500 rounded-lg px-4 py-3 cursor-pointer">Chill</button>
          <button class="w-40 text-left bg-gray-700 border-l-6 border-l-amber-500 rounded-lg px-4 py-3 cursor-pointer">Chill</button>
          <button class="w-40 text-left bg-gray-700 border-l-6 border-l-amber-500 rounded-lg px-4 py-3 cursor-pointer">Chill</button>
          <button class="w-40 text-left bg-gray-700 border-l-6 border-l-amber-500 rounded-lg px-4 py-3 cursor-pointer">Chill</button>
          <button class="w-40 text-left bg-gray-700 border-l-6 border-l-amber-500 rounded-lg px-4 py-3 cursor-pointer">Chill</button>
          <button class="w-40 text-left bg-gray-700 border-l-6 border-l-amber-500 rounded-lg px-4 py-3 cursor-pointer">Chill</button>
          <button class="w-40 text-left bg-gray-700 border-l-6 border-l-amber-500 rounded-lg px-4 py-3 cursor-pointer">Chill</button>
          <button class="w-40 text-left bg-gray-700 border-l-6 border-l-amber-500 rounded-lg px-4 py-3 cursor-pointer">Chill</button>
          <button class="w-40 text-left bg-gray-700 border-l-6 border-l-amber-500 rounded-lg px-4 py-3 cursor-pointer">Chill</button>
          <button class="w-40 text-left bg-gray-700 border-l-6 border-l-amber-500 rounded-lg px-4 py-3 cursor-pointer">Chill</button>
          <button class="w-40 text-left bg-gray-700 border-l-6 border-l-amber-500 rounded-lg px-4 py-3 cursor-pointer">Chill</button>
          <button class="w-40 text-left bg-gray-700 border-l-6 border-l-amber-500 rounded-lg px-4 py-3 cursor-pointer">Chill</button>
          <button class="w-40 text-left bg-gray-700 border-l-6 border-l-amber-500 rounded-lg px-4 py-3 cursor-pointer">Chill</button>
          <button class="w-40 text-left bg-gray-700 border-l-6 border-l-amber-500 rounded-lg px-4 py-3 cursor-pointer">Chill</button>
          <button class="w-40 text-left bg-gray-700 border-l-6 border-l-amber-500 rounded-lg px-4 py-3 cursor-pointer">Chill</button>
          <button class="w-40 text-left bg-gray-700 border-l-6 border-l-amber-500 rounded-lg px-4 py-3 cursor-pointer">Chill</button>
          <button class="w-40 text-left bg-gray-700 border-l-6 border-l-amber-500 rounded-lg px-4 py-3 cursor-pointer">Chill</button>
          <button class="w-40 text-left bg-gray-700 border-l-6 border-l-amber-500 rounded-lg px-4 py-3 cursor-pointer">Chill</button>
          <button class="w-40 text-left bg-gray-700 border-l-6 border-l-amber-500 rounded-lg px-4 py-3 cursor-pointer">Chill</button>
          <button class="w-40 text-left bg-gray-700 border-l-6 border-l-amber-500 rounded-lg px-4 py-3 cursor-pointer">Chill</button>
          <button class="w-40 text-left bg-gray-700 border-l-6 border-l-amber-500 rounded-lg px-4 py-3 cursor-pointer">Chill</button>
          <button class="w-40 text-left bg-gray-700 border-l-6 border-l-amber-500 rounded-lg px-4 py-3 cursor-pointer">Chill</button>
        </div>
      </div>
      <!-- End: Danh sách Moods & genres -->        
      <!-- Start: Music Video -->
      <div class="mt-10">
        <!-- Start: Tiêu đề Music Video -->
        <div class="flex justify-between">
          <h3 class="text-2xl">Video âm nhạc dành cho bạn</h3>
          <div class="flex items-center gap-4">
            <button class="border border-gray-500 px-4 py-1 rounded-3xl cursor-pointer hover:bg-gray-500 transition-colors">Play all</button>
            <div class="flex items-center gap-3 text-xl">
              <button class="w-8 h-8 text-center border rounded-full cursor-pointer hover:bg-gray-500 transition-colors"><i class="fa-solid fa-angle-left"></i></button>
              <button class="w-8 h-8 text-center border rounded-full cursor-pointer hover:bg-gray-500 transition-colors"><i class="fa-solid fa-angle-right"></i></button>
            </div>
          </div>
        </div>
        <!-- End: Tiêu đề Music Video -->
        <!-- Start: Danh sách Music Video -->
        <div class="flex flex-nowrap gap-4 overflow-x-auto scrollbar scrollbar-track-black scrollbar-thumb-gray-500 py-4">
          <!-- Start article -->
          <article class="w-xs h-xs shrink-0">
            <div class="relative w-full aspect-video bg-gray-800 group overflow-hidden rounded-lg cursor-pointer hover:opacity-50">              
                <img class="absolute top-0 left-0 w-full h-full object-cover" src="./src/assets/images/hq720.jpg" alt=""/>
              <button class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-4xl cursor-pointer">
                <i class="fa-solid fa-play"></i></button>
              </button>
              <button class="absolute top-1 right-1 w-10 h-10 rounded-full opacity-0 group-hover:opacity-100 hover:bg-gray-500 text-center group cursor-pointer transition-colors">
                <i class="fa-solid fa-ellipsis rotate-90"></i>
              </button>
            </div>
            <div class="mt-4">
              <a class="cursor-pointer"><p>VĂN MAI HƯƠNG - VƯỜN HỒNG (feat. CHI PU, HÀ TRẦN) [prod. by J4RDIN, 2pillz] | Official MV</p></a>
              <div class="text-gray-500 text-sm">
              <button class="cursor-pointer hover:underline">Van Mai Huong</button>
                <span>.</span>
                <span>650K lượt xem</span>
              </div>
            </div>
          </article>
          <!-- End article -->
          <!-- Start article -->
          <article class="w-xs shrink-0">
            <div class="relative w-full aspect-video bg-gray-800 group overflow-hidden rounded-lg cursor-pointer hover:opacity-50">              
                <img class="absolute top-0 left-0 w-full h-full object-cover" src="./src/assets/images/hq720.jpg" alt=""/>
              <button class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-4xl cursor-pointer">
                <i class="fa-solid fa-play"></i></button>
              </button>
              <button class="absolute top-1 right-1 w-10 h-10 rounded-full opacity-0 group-hover:opacity-100 hover:bg-gray-500 text-center group cursor-pointer transition-colors">
              <i class="fa-solid fa-ellipsis rotate-90"></i>
            </button>
            </div>
            <div class="mt-4">
              <a class="cursor-pointer"><p>VĂN MAI HƯƠNG - VƯỜN HỒNG (feat. CHI PU, HÀ TRẦN) [prod. by J4RDIN, 2pillz] | Official MV</p></a>
              <div class="text-gray-500 text-sm">
              <button class="cursor-pointer hover:underline">Van Mai Huong</button>
                <span>.</span>
                <span>650K lượt xem</span>
              </div>
            </div>
          </article>
          <!-- End article -->
          <!-- Start article -->
          <article class="w-xs shrink-0">
            <div class="relative w-full aspect-video bg-gray-800 group overflow-hidden rounded-lg cursor-pointer hover:opacity-50">              
                <img class="absolute top-0 left-0 w-full h-full object-cover" src="./src/assets/images/hq720.jpg" alt=""/>
              <button class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-4xl cursor-pointer">
                <i class="fa-solid fa-play"></i></button>
              </button>
              <button class="absolute top-1 right-1 w-10 h-10 rounded-full opacity-0 group-hover:opacity-100 hover:bg-gray-500 text-center group cursor-pointer transition-colors">
              <i class="fa-solid fa-ellipsis rotate-90"></i>
            </button>
            </div>
            <div class="mt-4">
              <a class="cursor-pointer"><p>VĂN MAI HƯƠNG - VƯỜN HỒNG (feat. CHI PU, HÀ TRẦN) [prod. by J4RDIN, 2pillz] | Official MV</p></a>
              <div class="text-gray-500 text-sm">
              <button class="cursor-pointer hover:underline">Van Mai Huong</button>
                <span>.</span>
                <span>650K lượt xem</span>
              </div>
            </div>
          </article>
          <!-- End article -->
          <!-- Start article -->
          <article class="w-xs shrink-0">
            <div class="relative w-full aspect-video bg-gray-800 group overflow-hidden rounded-lg cursor-pointer hover:opacity-50">              
                <img class="absolute top-0 left-0 w-full h-full object-cover" src="./src/assets/images/hq720.jpg" alt=""/>
              <button class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-4xl cursor-pointer">
                <i class="fa-solid fa-play"></i></button>
              </button>
              <button class="absolute top-1 right-1 w-10 h-10 rounded-full opacity-0 group-hover:opacity-100 hover:bg-gray-500 text-center group cursor-pointer transition-colors">
              <i class="fa-solid fa-ellipsis rotate-90"></i>
            </button>
            </div>
            <div class="mt-4">
              <a class="cursor-pointer"><p>VĂN MAI HƯƠNG - VƯỜN HỒNG (feat. CHI PU, HÀ TRẦN) [prod. by J4RDIN, 2pillz] | Official MV</p></a>
              <div class="text-gray-500 text-sm">
              <button class="cursor-pointer hover:underline">Van Mai Huong</button>
                <span>.</span>
                <span>650K lượt xem</span>
              </div>
            </div>
          </article>
          <!-- End article -->
          <!-- Start article -->
          <article class="w-xs shrink-0">
            <div class="relative w-full aspect-video bg-gray-800 group overflow-hidden rounded-lg cursor-pointer hover:opacity-50">              
                <img class="absolute top-0 left-0 w-full h-full object-cover" src="./src/assets/images/hq720.jpg" alt=""/>
              <button class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-4xl cursor-pointer">
                <i class="fa-solid fa-play"></i></button>
              </button>
              <button class="absolute top-1 right-1 w-10 h-10 rounded-full opacity-0 group-hover:opacity-100 hover:bg-gray-500 text-center group cursor-pointer transition-colors">
              <i class="fa-solid fa-ellipsis rotate-90"></i>
            </button>
            </div>
            <div class="mt-4">
              <a class="cursor-pointer"><p>VĂN MAI HƯƠNG - VƯỜN HỒNG (feat. CHI PU, HÀ TRẦN) [prod. by J4RDIN, 2pillz] | Official MV</p></a>
              <div class="text-gray-500 text-sm">
              <button class="cursor-pointer hover:underline">Van Mai Huong</button>
                <span>.</span>
                <span>650K lượt xem</span>
              </div>
            </div>
          </article>
          <!-- End article -->          
        </div>
        <!-- End: Danh sách Music Video -->        
      </div>
      <!-- End: Music Video -->
    </div>
    `;
};

export default discover;
