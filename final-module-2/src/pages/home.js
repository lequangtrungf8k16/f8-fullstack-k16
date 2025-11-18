const home = () => {
    return `

      <!-- Main -->
      <div>   
        <!-- Start Navigation -->       
        <nav class="flex gap-2 text-sm overflow-x-auto scrollbar scrollbar-track-black scrollbar-thumb-gray-500 py-2">            
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
        </nav>
        <!-- End Navigation -->

        <!-- Start Music videos for you: Video âm nhạc dành cho bạn -->                
        <section class="mt-20">
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
          <div class="flex flex-nowrap gap-4 overflow-x-auto scrollbar scrollbar-track-black scrollbar-thumb-gray-500 py-4">

            <!-- Start article -->
            <article class="w-xs shrink-0">
              <div class="relative group overflow-hidden rounded-lg cursor-pointer hover:opacity-50">
                <img class="h-auto object-cover" src="./src/images/nature-1.webp" alt=""/>

                <button class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-4xl">
                  <i class="fa-solid fa-play"></i></button>
                </button>
                <button class="absolute top-1 right-1 w-10 h-10 rounded-full opacity-0 group-hover:opacity-100 hover:bg-gray-500 text-center group cursor-pointer transition-colors">
                <i class="fa-solid fa-ellipsis rotate-90"></i>
              </button>
              </div>
              <div class="mt-4">
                <p>Một người như bạn</p>
                <div class="text-gray-500 text-sm">
                <button class="cursor-pointer hover:underline">Adele</button>
                  <span>.</span>
                  <span>2,4 tỷ lượt xem</span>
                </div>
              </div>
            </article>
            <!-- End article -->
            <!-- Start article -->
            <article class="w-xs shrink-0">
              <div class="relative group overflow-hidden rounded-lg cursor-pointer hover:opacity-50">
                <img class="h-auto object-cover" src="./src/images/nature-1.webp" alt=""/>

                <button class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-4xl">
                  <i class="fa-solid fa-play"></i></button>
                </button>
                <button class="absolute top-1 right-1 w-10 h-10 rounded-full opacity-0 group-hover:opacity-100 hover:bg-gray-500 text-center group cursor-pointer transition-colors">
                <i class="fa-solid fa-ellipsis rotate-90"></i>
              </button>
              </div>
              <div class="mt-4">
                <p>Một người như bạn</p>
                <div class="text-gray-500 text-sm">
                <button class="cursor-pointer hover:underline">Adele</button>
                  <span>.</span>
                  <span>2,4 tỷ lượt xem</span>
                </div>
              </div>
            </article>
            <!-- End article -->
            <!-- Start article -->
            <article class="w-xs shrink-0">
              <div class="relative group overflow-hidden rounded-lg cursor-pointer hover:opacity-50">
                <img class="h-auto object-cover" src="./src/images/nature-1.webp" alt=""/>

                <button class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-4xl">
                  <i class="fa-solid fa-play"></i></button>
                </button>
                <button class="absolute top-1 right-1 w-10 h-10 rounded-full opacity-0 group-hover:opacity-100 hover:bg-gray-500 text-center group cursor-pointer transition-colors">
                <i class="fa-solid fa-ellipsis rotate-90"></i>
              </button>
              </div>
              <div class="mt-4">
                <p>Một người như bạn</p>
                <div class="text-gray-500 text-sm">
                <button class="cursor-pointer hover:underline">Adele</button>
                  <span>.</span>
                  <span>2,4 tỷ lượt xem</span>
                </div>
              </div>
            </article>
            <!-- End article -->
            <!-- Start article -->
            <article class="w-xs shrink-0">
              <div class="relative group overflow-hidden rounded-lg cursor-pointer hover:opacity-50">
                <img class="h-auto object-cover" src="./src/images/nature-1.webp" alt=""/>

                <button class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-4xl">
                  <i class="fa-solid fa-play"></i></button>
                </button>
                <button class="absolute top-1 right-1 w-10 h-10 rounded-full opacity-0 group-hover:opacity-100 hover:bg-gray-500 text-center group cursor-pointer transition-colors">
                <i class="fa-solid fa-ellipsis rotate-90"></i>
              </button>
              </div>
              <div class="mt-4">
                <p>Một người như bạn</p>
                <div class="text-gray-500 text-sm">
                <button class="cursor-pointer hover:underline">Adele</button>
                  <span>.</span>
                  <span>2,4 tỷ lượt xem</span>
                </div>
              </div>
            </article>
            <!-- End article -->
          </div>  
        </section>
        <!-- End Music videos for you: Video âm nhạc dành cho bạn -->        

        <!-- Start Quick picks: Lựa chọn nhanh -->
        <div class="mt-10">
          <div class="flex justify-between">
            <h3 class="text-2xl">Lựa chọn nhanh</h3>
            <div class="flex items-center gap-4">
              <button class="border border-gray-500 px-4 py-1 rounded-3xl cursor-pointer hover:bg-gray-500 transition-colors">Play all</button>
              <div class="flex items-center gap-3 text-xl">
                <button class="w-8 h-8 text-center border rounded-full cursor-pointer hover:bg-gray-500 transition-colors"><i class="fa-solid fa-angle-left"></i></button>
                <button class="w-8 h-8 text-center border rounded-full cursor-pointer hover:bg-gray-500 transition-colors"><i class="fa-solid fa-angle-right"></i></button>
              </div>
            </div>
          </div>
          
          <!-- Start Danh sách phát nhạc -->
          <div class="flex gap-4 overflow-x-auto scrollbar scrollbar-track-black scrollbar-thumb-gray-500 py-4">            
            
            <div class="w-2xs flex flex-col flex-nowrap shrink-0 gap-4">

              <!-- Start Bài nhạc -->
              <section class="flex gap-4 relative flex-nowrap shrink-0 group">
                <div class="relative w-12 h-12 bg-amber-300 hover:opacity-50 overflow-hidden rounded-md">
                  <button class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer">
                  <i class="fa-solid fa-play"></i></button>                
                  <img src="./src/images/nature-1.webp" class="w-full h-full object-cover"/>
                </div>

                <div class="flex flex-col flex-nowrap shrink-0">
                  <button class="cursor-pointer text-left">Đốt cháy cơn mưa</button>
                  <div class="text-gray-500 text-sm">
                    <button class="cursor-pointer">Adele</button>
                    <span class="cursor-pointer">.</span>
                    <span class="cursor-pointer">1,3 tỷ lượt chơi</span>
                    <span class="cursor-pointer">.</span>
                    <span class="cursor-pointer">21</span>
                  </div>
                </div>

                <!-- Start: Khi hover vào bài hát -->
                <div class="absolute top-1/2 -translate-y-1/2 right-1 flex items-center gap-4 text-2xl flex-nowrap shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button class="w-10 h-10 rounded-full hover:bg-gray-500 text-center cursor-pointer transition-colors"><i class="fa-regular fa-thumbs-down"></i></button>
                  <button class="w-10 h-10 rounded-full hover:bg-gray-500 text-center cursor-pointer transition-colors"><i class="fa-regular fa-thumbs-up"></i></button>
                  <button class="relative w-10 h-10 rounded-full hover:bg-gray-500 text-center group cursor-pointer transition-colors">
                    <i class="fa-solid fa-ellipsis rotate-90"></i>
                  </button> 
                  <!-- End: Khi hover vào bài hát --> 
                  
                    <!-- Start: Danh sách tùy chọn mở rộng -->
                    <ul class="hidden absolute top-full right-0 w-50 bg-gray-500 text-center rounded-lg text-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300">
                      <li>                        
                        <a href="#!" class="flex w-full text-white px-4 py-2 rounded-lg">Start mix</a>
                      </li>                     
                    </ul>
                    <!-- End: Danh sách tùy chọn mở rộng -->
                </div>
              </section>
              <!-- End Bài nhạc -->
              <!-- Start Bài nhạc -->
              <section class="flex gap-4 relative flex-nowrap shrink-0 group">
                <div class="relative w-12 h-12 bg-amber-300 hover:opacity-50 overflow-hidden rounded-md">
                  <button class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer">
                  <i class="fa-solid fa-play"></i></button>                
                  <img src="./src/images/nature-1.webp" class="w-full h-full object-cover"/>
                </div>

                <div class="flex flex-col flex-nowrap shrink-0">
                  <button class="cursor-pointer text-left">Đốt cháy cơn mưa</button>
                  <div class="text-gray-500 text-sm">
                    <button class="cursor-pointer">Adele</button>
                    <span class="cursor-pointer">.</span>
                    <span class="cursor-pointer">1,3 tỷ lượt chơi</span>
                    <span class="cursor-pointer">.</span>
                    <span class="cursor-pointer">21</span>
                  </div>
                </div>

                <!-- Start: Khi hover vào bài hát -->
                <div class="absolute top-1/2 -translate-y-1/2 right-1 flex items-center gap-4 text-2xl flex-nowrap shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button class="w-10 h-10 rounded-full hover:bg-gray-500 text-center cursor-pointer transition-colors"><i class="fa-regular fa-thumbs-down"></i></button>
                  <button class="w-10 h-10 rounded-full hover:bg-gray-500 text-center cursor-pointer transition-colors"><i class="fa-regular fa-thumbs-up"></i></button>
                  <button class="relative w-10 h-10 rounded-full hover:bg-gray-500 text-center group cursor-pointer transition-colors">
                    <i class="fa-solid fa-ellipsis rotate-90"></i>
                  </button> 
                  <!-- End: Khi hover vào bài hát --> 
                  
                    <!-- Start: Danh sách tùy chọn mở rộng -->
                    <ul class="hidden absolute top-full right-0 w-50 bg-gray-500 text-center rounded-lg text-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300">
                      <li>                        
                        <a href="#!" class="flex w-full text-white px-4 py-2 rounded-lg">Start mix</a>
                      </li>                     
                    </ul>
                    <!-- End: Danh sách tùy chọn mở rộng -->
                </div>
              </section>
              <!-- End Bài nhạc -->
              <!-- Start Bài nhạc -->
              <section class="flex gap-4 relative flex-nowrap shrink-0 group">
                <div class="relative w-12 h-12 bg-amber-300 hover:opacity-50 overflow-hidden rounded-md">
                  <button class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer">
                  <i class="fa-solid fa-play"></i></button>                
                  <img src="./src/images/nature-1.webp" class="w-full h-full object-cover"/>
                </div>

                <div class="flex flex-col flex-nowrap shrink-0">
                  <button class="cursor-pointer text-left">Đốt cháy cơn mưa</button>
                  <div class="text-gray-500 text-sm">
                    <button class="cursor-pointer">Adele</button>
                    <span class="cursor-pointer">.</span>
                    <span class="cursor-pointer">1,3 tỷ lượt chơi</span>
                    <span class="cursor-pointer">.</span>
                    <span class="cursor-pointer">21</span>
                  </div>
                </div>

                <!-- Start: Khi hover vào bài hát -->
                <div class="absolute top-1/2 -translate-y-1/2 right-1 flex items-center gap-4 text-2xl flex-nowrap shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button class="w-10 h-10 rounded-full hover:bg-gray-500 text-center cursor-pointer transition-colors"><i class="fa-regular fa-thumbs-down"></i></button>
                  <button class="w-10 h-10 rounded-full hover:bg-gray-500 text-center cursor-pointer transition-colors"><i class="fa-regular fa-thumbs-up"></i></button>
                  <button class="relative w-10 h-10 rounded-full hover:bg-gray-500 text-center group cursor-pointer transition-colors">
                    <i class="fa-solid fa-ellipsis rotate-90"></i>
                  </button> 
                  <!-- End: Khi hover vào bài hát --> 
                  
                    <!-- Start: Danh sách tùy chọn mở rộng -->
                    <ul class="hidden absolute top-full right-0 w-50 bg-gray-500 text-center rounded-lg text-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300">
                      <li>                        
                        <a href="#!" class="flex w-full text-white px-4 py-2 rounded-lg">Start mix</a>
                      </li>                     
                    </ul>
                    <!-- End: Danh sách tùy chọn mở rộng -->
                </div>
              </section>
              <!-- End Bài nhạc -->
              <!-- Start Bài nhạc -->
              <section class="flex gap-4 relative flex-nowrap shrink-0 group">
                <div class="relative w-12 h-12 bg-amber-300 hover:opacity-50 overflow-hidden rounded-md">
                  <button class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer">
                  <i class="fa-solid fa-play"></i></button>                
                  <img src="./src/images/nature-1.webp" class="w-full h-full object-cover"/>
                </div>

                <div class="flex flex-col flex-nowrap shrink-0">
                  <button class="cursor-pointer text-left">Đốt cháy cơn mưa</button>
                  <div class="text-gray-500 text-sm">
                    <button class="cursor-pointer">Adele</button>
                    <span class="cursor-pointer">.</span>
                    <span class="cursor-pointer">1,3 tỷ lượt chơi</span>
                    <span class="cursor-pointer">.</span>
                    <span class="cursor-pointer">21</span>
                  </div>
                </div>

                <!-- Start: Khi hover vào bài hát -->
                <div class="absolute top-1/2 -translate-y-1/2 right-1 flex items-center gap-4 text-2xl flex-nowrap shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button class="w-10 h-10 rounded-full hover:bg-gray-500 text-center cursor-pointer transition-colors"><i class="fa-regular fa-thumbs-down"></i></button>
                  <button class="w-10 h-10 rounded-full hover:bg-gray-500 text-center cursor-pointer transition-colors"><i class="fa-regular fa-thumbs-up"></i></button>
                  <button class="relative w-10 h-10 rounded-full hover:bg-gray-500 text-center group cursor-pointer transition-colors">
                    <i class="fa-solid fa-ellipsis rotate-90"></i>
                  </button> 
                  <!-- End: Khi hover vào bài hát --> 
                  
                    <!-- Start: Danh sách tùy chọn mở rộng -->
                    <ul class="hidden absolute top-full right-0 w-50 bg-gray-500 text-center rounded-lg text-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300">
                      <li>                        
                        <a href="#!" class="flex w-full text-white px-4 py-2 rounded-lg">Start mix</a>
                      </li>                     
                    </ul>
                    <!-- End: Danh sách tùy chọn mở rộng -->
                </div>
              </section>
              <!-- End Bài nhạc -->
            </div>
            <div class="w-2xs flex flex-col flex-nowrap shrink-0 gap-4">

              <!-- Start Bài nhạc -->
              <section class="flex gap-4 relative flex-nowrap shrink-0 group">
                <div class="relative w-12 h-12 bg-amber-300 hover:opacity-50 overflow-hidden rounded-md">
                  <button class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer">
                  <i class="fa-solid fa-play"></i></button>                
                  <img src="./src/images/nature-1.webp" class="w-full h-full object-cover"/>
                </div>

                <div class="flex flex-col flex-nowrap shrink-0">
                  <button class="cursor-pointer text-left">Đốt cháy cơn mưa</button>
                  <div class="text-gray-500 text-sm">
                    <button class="cursor-pointer">Adele</button>
                    <span class="cursor-pointer">.</span>
                    <span class="cursor-pointer">1,3 tỷ lượt chơi</span>
                    <span class="cursor-pointer">.</span>
                    <span class="cursor-pointer">21</span>
                  </div>
                </div>

                <!-- Start: Khi hover vào bài hát -->
                <div class="absolute top-1/2 -translate-y-1/2 right-1 flex items-center gap-4 text-2xl flex-nowrap shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button class="w-10 h-10 rounded-full hover:bg-gray-500 text-center cursor-pointer transition-colors"><i class="fa-regular fa-thumbs-down"></i></button>
                  <button class="w-10 h-10 rounded-full hover:bg-gray-500 text-center cursor-pointer transition-colors"><i class="fa-regular fa-thumbs-up"></i></button>
                  <button class="relative w-10 h-10 rounded-full hover:bg-gray-500 text-center group cursor-pointer transition-colors">
                    <i class="fa-solid fa-ellipsis rotate-90"></i>
                  </button> 
                  <!-- End: Khi hover vào bài hát --> 
                  
                    <!-- Start: Danh sách tùy chọn mở rộng -->
                    <ul class="hidden absolute top-full right-0 w-50 bg-gray-500 text-center rounded-lg text-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300">
                      <li>                        
                        <a href="#!" class="flex w-full text-white px-4 py-2 rounded-lg">Start mix</a>
                      </li>                     
                    </ul>
                    <!-- End: Danh sách tùy chọn mở rộng -->
                </div>
              </section>
              <!-- End Bài nhạc -->
              <!-- Start Bài nhạc -->
              <section class="flex gap-4 relative flex-nowrap shrink-0 group">
                <div class="relative w-12 h-12 bg-amber-300 hover:opacity-50 overflow-hidden rounded-md">
                  <button class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer">
                  <i class="fa-solid fa-play"></i></button>                
                  <img src="./src/images/nature-1.webp" class="w-full h-full object-cover"/>
                </div>

                <div class="flex flex-col flex-nowrap shrink-0">
                  <button class="cursor-pointer text-left">Đốt cháy cơn mưa</button>
                  <div class="text-gray-500 text-sm">
                    <button class="cursor-pointer">Adele</button>
                    <span class="cursor-pointer">.</span>
                    <span class="cursor-pointer">1,3 tỷ lượt chơi</span>
                    <span class="cursor-pointer">.</span>
                    <span class="cursor-pointer">21</span>
                  </div>
                </div>

                <!-- Start: Khi hover vào bài hát -->
                <div class="absolute top-1/2 -translate-y-1/2 right-1 flex items-center gap-4 text-2xl flex-nowrap shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button class="w-10 h-10 rounded-full hover:bg-gray-500 text-center cursor-pointer transition-colors"><i class="fa-regular fa-thumbs-down"></i></button>
                  <button class="w-10 h-10 rounded-full hover:bg-gray-500 text-center cursor-pointer transition-colors"><i class="fa-regular fa-thumbs-up"></i></button>
                  <button class="relative w-10 h-10 rounded-full hover:bg-gray-500 text-center group cursor-pointer transition-colors">
                    <i class="fa-solid fa-ellipsis rotate-90"></i>
                  </button> 
                  <!-- End: Khi hover vào bài hát --> 
                  
                    <!-- Start: Danh sách tùy chọn mở rộng -->
                    <ul class="hidden absolute top-full right-0 w-50 bg-gray-500 text-center rounded-lg text-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300">
                      <li>                        
                        <a href="#!" class="flex w-full text-white px-4 py-2 rounded-lg">Start mix</a>
                      </li>                     
                    </ul>
                    <!-- End: Danh sách tùy chọn mở rộng -->
                </div>
              </section>
              <!-- End Bài nhạc -->
              <!-- Start Bài nhạc -->
              <section class="flex gap-4 relative flex-nowrap shrink-0 group">
                <div class="relative w-12 h-12 bg-amber-300 hover:opacity-50 overflow-hidden rounded-md">
                  <button class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer">
                  <i class="fa-solid fa-play"></i></button>                
                  <img src="./src/images/nature-1.webp" class="w-full h-full object-cover"/>
                </div>

                <div class="flex flex-col flex-nowrap shrink-0">
                  <button class="cursor-pointer text-left">Đốt cháy cơn mưa</button>
                  <div class="text-gray-500 text-sm">
                    <button class="cursor-pointer">Adele</button>
                    <span class="cursor-pointer">.</span>
                    <span class="cursor-pointer">1,3 tỷ lượt chơi</span>
                    <span class="cursor-pointer">.</span>
                    <span class="cursor-pointer">21</span>
                  </div>
                </div>

                <!-- Start: Khi hover vào bài hát -->
                <div class="absolute top-1/2 -translate-y-1/2 right-1 flex items-center gap-4 text-2xl flex-nowrap shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button class="w-10 h-10 rounded-full hover:bg-gray-500 text-center cursor-pointer transition-colors"><i class="fa-regular fa-thumbs-down"></i></button>
                  <button class="w-10 h-10 rounded-full hover:bg-gray-500 text-center cursor-pointer transition-colors"><i class="fa-regular fa-thumbs-up"></i></button>
                  <button class="relative w-10 h-10 rounded-full hover:bg-gray-500 text-center group cursor-pointer transition-colors">
                    <i class="fa-solid fa-ellipsis rotate-90"></i>
                  </button> 
                  <!-- End: Khi hover vào bài hát --> 
                  
                    <!-- Start: Danh sách tùy chọn mở rộng -->
                    <ul class="hidden absolute top-full right-0 w-50 bg-gray-500 text-center rounded-lg text-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300">
                      <li>                        
                        <a href="#!" class="flex w-full text-white px-4 py-2 rounded-lg">Start mix</a>
                      </li>                     
                    </ul>
                    <!-- End: Danh sách tùy chọn mở rộng -->
                </div>
              </section>
              <!-- End Bài nhạc -->
              <!-- Start Bài nhạc -->
              <section class="flex gap-4 relative flex-nowrap shrink-0 group">
                <div class="relative w-12 h-12 bg-amber-300 hover:opacity-50 overflow-hidden rounded-md">
                  <button class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer">
                  <i class="fa-solid fa-play"></i></button>                
                  <img src="./src/images/nature-1.webp" class="w-full h-full object-cover"/>
                </div>

                <div class="flex flex-col flex-nowrap shrink-0">
                  <button class="cursor-pointer text-left">Đốt cháy cơn mưa</button>
                  <div class="text-gray-500 text-sm">
                    <button class="cursor-pointer">Adele</button>
                    <span class="cursor-pointer">.</span>
                    <span class="cursor-pointer">1,3 tỷ lượt chơi</span>
                    <span class="cursor-pointer">.</span>
                    <span class="cursor-pointer">21</span>
                  </div>
                </div>

                <!-- Start: Khi hover vào bài hát -->
                <div class="absolute top-1/2 -translate-y-1/2 right-1 flex items-center gap-4 text-2xl flex-nowrap shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button class="w-10 h-10 rounded-full hover:bg-gray-500 text-center cursor-pointer transition-colors"><i class="fa-regular fa-thumbs-down"></i></button>
                  <button class="w-10 h-10 rounded-full hover:bg-gray-500 text-center cursor-pointer transition-colors"><i class="fa-regular fa-thumbs-up"></i></button>
                  <button class="relative w-10 h-10 rounded-full hover:bg-gray-500 text-center group cursor-pointer transition-colors">
                    <i class="fa-solid fa-ellipsis rotate-90"></i>
                  </button> 
                  <!-- End: Khi hover vào bài hát --> 
                  
                    <!-- Start: Danh sách tùy chọn mở rộng -->
                    <ul class="hidden absolute top-full right-0 w-50 bg-gray-500 text-center rounded-lg text-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300">
                      <li>                        
                        <a href="#!" class="flex w-full text-white px-4 py-2 rounded-lg">Start mix</a>
                      </li>                     
                    </ul>
                    <!-- End: Danh sách tùy chọn mở rộng -->
                </div>
              </section>
              <!-- End Bài nhạc -->
            </div>
            <div class="w-2xs flex flex-col flex-nowrap shrink-0 gap-4">

              <!-- Start Bài nhạc -->
              <section class="flex gap-4 relative flex-nowrap shrink-0 group">
                <div class="relative w-12 h-12 bg-amber-300 hover:opacity-50 overflow-hidden rounded-md">
                  <button class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer">
                  <i class="fa-solid fa-play"></i></button>                
                  <img src="./src/images/nature-1.webp" class="w-full h-full object-cover"/>
                </div>

                <div class="flex flex-col flex-nowrap shrink-0">
                  <button class="cursor-pointer text-left">Đốt cháy cơn mưa</button>
                  <div class="text-gray-500 text-sm">
                    <button class="cursor-pointer">Adele</button>
                    <span class="cursor-pointer">.</span>
                    <span class="cursor-pointer">1,3 tỷ lượt chơi</span>
                    <span class="cursor-pointer">.</span>
                    <span class="cursor-pointer">21</span>
                  </div>
                </div>

                <!-- Start: Khi hover vào bài hát -->
                <div class="absolute top-1/2 -translate-y-1/2 right-1 flex items-center gap-4 text-2xl flex-nowrap shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button class="w-10 h-10 rounded-full hover:bg-gray-500 text-center cursor-pointer transition-colors"><i class="fa-regular fa-thumbs-down"></i></button>
                  <button class="w-10 h-10 rounded-full hover:bg-gray-500 text-center cursor-pointer transition-colors"><i class="fa-regular fa-thumbs-up"></i></button>
                  <button class="relative w-10 h-10 rounded-full hover:bg-gray-500 text-center group cursor-pointer transition-colors">
                    <i class="fa-solid fa-ellipsis rotate-90"></i>
                  </button> 
                  <!-- End: Khi hover vào bài hát --> 
                  
                    <!-- Start: Danh sách tùy chọn mở rộng -->
                    <ul class="hidden absolute top-full right-0 w-50 bg-gray-500 text-center rounded-lg text-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300">
                      <li>                        
                        <a href="#!" class="flex w-full text-white px-4 py-2 rounded-lg">Start mix</a>
                      </li>                     
                    </ul>
                    <!-- End: Danh sách tùy chọn mở rộng -->
                </div>
              </section>
              <!-- End Bài nhạc -->
              <!-- Start Bài nhạc -->
              <section class="flex gap-4 relative flex-nowrap shrink-0 group">
                <div class="relative w-12 h-12 bg-amber-300 hover:opacity-50 overflow-hidden rounded-md">
                  <button class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer">
                  <i class="fa-solid fa-play"></i></button>                
                  <img src="./src/images/nature-1.webp" class="w-full h-full object-cover"/>
                </div>

                <div class="flex flex-col flex-nowrap shrink-0">
                  <button class="cursor-pointer text-left">Đốt cháy cơn mưa</button>
                  <div class="text-gray-500 text-sm">
                    <button class="cursor-pointer">Adele</button>
                    <span class="cursor-pointer">.</span>
                    <span class="cursor-pointer">1,3 tỷ lượt chơi</span>
                    <span class="cursor-pointer">.</span>
                    <span class="cursor-pointer">21</span>
                  </div>
                </div>

                <!-- Start: Khi hover vào bài hát -->
                <div class="absolute top-1/2 -translate-y-1/2 right-1 flex items-center gap-4 text-2xl flex-nowrap shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button class="w-10 h-10 rounded-full hover:bg-gray-500 text-center cursor-pointer transition-colors"><i class="fa-regular fa-thumbs-down"></i></button>
                  <button class="w-10 h-10 rounded-full hover:bg-gray-500 text-center cursor-pointer transition-colors"><i class="fa-regular fa-thumbs-up"></i></button>
                  <button class="relative w-10 h-10 rounded-full hover:bg-gray-500 text-center group cursor-pointer transition-colors">
                    <i class="fa-solid fa-ellipsis rotate-90"></i>
                  </button> 
                  <!-- End: Khi hover vào bài hát --> 
                  
                    <!-- Start: Danh sách tùy chọn mở rộng -->
                    <ul class="hidden absolute top-full right-0 w-50 bg-gray-500 text-center rounded-lg text-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300">
                      <li>                        
                        <a href="#!" class="flex w-full text-white px-4 py-2 rounded-lg">Start mix</a>
                      </li>                     
                    </ul>
                    <!-- End: Danh sách tùy chọn mở rộng -->
                </div>
              </section>
              <!-- End Bài nhạc -->
              <!-- Start Bài nhạc -->
              <section class="flex gap-4 relative flex-nowrap shrink-0 group">
                <div class="relative w-12 h-12 bg-amber-300 hover:opacity-50 overflow-hidden rounded-md">
                  <button class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer">
                  <i class="fa-solid fa-play"></i></button>                
                  <img src="./src/images/nature-1.webp" class="w-full h-full object-cover"/>
                </div>

                <div class="flex flex-col flex-nowrap shrink-0">
                  <button class="cursor-pointer text-left">Đốt cháy cơn mưa</button>
                  <div class="text-gray-500 text-sm">
                    <button class="cursor-pointer">Adele</button>
                    <span class="cursor-pointer">.</span>
                    <span class="cursor-pointer">1,3 tỷ lượt chơi</span>
                    <span class="cursor-pointer">.</span>
                    <span class="cursor-pointer">21</span>
                  </div>
                </div>

                <!-- Start: Khi hover vào bài hát -->
                <div class="absolute top-1/2 -translate-y-1/2 right-1 flex items-center gap-4 text-2xl flex-nowrap shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button class="w-10 h-10 rounded-full hover:bg-gray-500 text-center cursor-pointer transition-colors"><i class="fa-regular fa-thumbs-down"></i></button>
                  <button class="w-10 h-10 rounded-full hover:bg-gray-500 text-center cursor-pointer transition-colors"><i class="fa-regular fa-thumbs-up"></i></button>
                  <button class="relative w-10 h-10 rounded-full hover:bg-gray-500 text-center group cursor-pointer transition-colors">
                    <i class="fa-solid fa-ellipsis rotate-90"></i>
                  </button> 
                  <!-- End: Khi hover vào bài hát --> 
                  
                    <!-- Start: Danh sách tùy chọn mở rộng -->
                    <ul class="hidden absolute top-full right-0 w-50 bg-gray-500 text-center rounded-lg text-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300">
                      <li>                        
                        <a href="#!" class="flex w-full text-white px-4 py-2 rounded-lg">Start mix</a>
                      </li>                     
                    </ul>
                    <!-- End: Danh sách tùy chọn mở rộng -->
                </div>
              </section>
              <!-- End Bài nhạc -->
              <!-- Start Bài nhạc -->
              <section class="flex gap-4 relative flex-nowrap shrink-0 group">
                <div class="relative w-12 h-12 bg-amber-300 hover:opacity-50 overflow-hidden rounded-md">
                  <button class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer">
                  <i class="fa-solid fa-play"></i></button>                
                  <img src="./src/images/nature-1.webp" class="w-full h-full object-cover"/>
                </div>

                <div class="flex flex-col flex-nowrap shrink-0">
                  <button class="cursor-pointer text-left">Đốt cháy cơn mưa</button>
                  <div class="text-gray-500 text-sm">
                    <button class="cursor-pointer">Adele</button>
                    <span class="cursor-pointer">.</span>
                    <span class="cursor-pointer">1,3 tỷ lượt chơi</span>
                    <span class="cursor-pointer">.</span>
                    <span class="cursor-pointer">21</span>
                  </div>
                </div>

                <!-- Start: Khi hover vào bài hát -->
                <div class="absolute top-1/2 -translate-y-1/2 right-1 flex items-center gap-4 text-2xl flex-nowrap shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button class="w-10 h-10 rounded-full hover:bg-gray-500 text-center cursor-pointer transition-colors"><i class="fa-regular fa-thumbs-down"></i></button>
                  <button class="w-10 h-10 rounded-full hover:bg-gray-500 text-center cursor-pointer transition-colors"><i class="fa-regular fa-thumbs-up"></i></button>
                  <button class="relative w-10 h-10 rounded-full hover:bg-gray-500 text-center group cursor-pointer transition-colors">
                    <i class="fa-solid fa-ellipsis rotate-90"></i>
                  </button> 
                  <!-- End: Khi hover vào bài hát --> 
                  
                    <!-- Start: Danh sách tùy chọn mở rộng -->
                    <ul class="hidden absolute top-full right-0 w-50 bg-gray-500 text-center rounded-lg text-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300">
                      <li>                        
                        <a href="#!" class="flex w-full text-white px-4 py-2 rounded-lg">Start mix</a>
                      </li>                     
                    </ul>
                    <!-- End: Danh sách tùy chọn mở rộng -->
                </div>
              </section>
              <!-- End Bài nhạc -->
            </div>
            <div class="w-2xs flex flex-col flex-nowrap shrink-0 gap-4">

              <!-- Start Bài nhạc -->
              <section class="flex gap-4 relative flex-nowrap shrink-0 group">
                <div class="relative w-12 h-12 bg-amber-300 hover:opacity-50 overflow-hidden rounded-md">
                  <button class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer">
                  <i class="fa-solid fa-play"></i></button>                
                  <img src="./src/images/nature-1.webp" class="w-full h-full object-cover"/>
                </div>

                <div class="flex flex-col flex-nowrap shrink-0">
                  <button class="cursor-pointer text-left">Đốt cháy cơn mưa</button>
                  <div class="text-gray-500 text-sm">
                    <button class="cursor-pointer">Adele</button>
                    <span class="cursor-pointer">.</span>
                    <span class="cursor-pointer">1,3 tỷ lượt chơi</span>
                    <span class="cursor-pointer">.</span>
                    <span class="cursor-pointer">21</span>
                  </div>
                </div>

                <!-- Start: Khi hover vào bài hát -->
                <div class="absolute top-1/2 -translate-y-1/2 right-1 flex items-center gap-4 text-2xl flex-nowrap shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button class="w-10 h-10 rounded-full hover:bg-gray-500 text-center cursor-pointer transition-colors"><i class="fa-regular fa-thumbs-down"></i></button>
                  <button class="w-10 h-10 rounded-full hover:bg-gray-500 text-center cursor-pointer transition-colors"><i class="fa-regular fa-thumbs-up"></i></button>
                  <button class="relative w-10 h-10 rounded-full hover:bg-gray-500 text-center group cursor-pointer transition-colors">
                    <i class="fa-solid fa-ellipsis rotate-90"></i>
                  </button> 
                  <!-- End: Khi hover vào bài hát --> 
                  
                    <!-- Start: Danh sách tùy chọn mở rộng -->
                    <ul class="hidden absolute top-full right-0 w-50 bg-gray-500 text-center rounded-lg text-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300">
                      <li>                        
                        <a href="#!" class="flex w-full text-white px-4 py-2 rounded-lg">Start mix</a>
                      </li>                     
                    </ul>
                    <!-- End: Danh sách tùy chọn mở rộng -->
                </div>
              </section>
              <!-- End Bài nhạc -->
              <!-- Start Bài nhạc -->
              <section class="flex gap-4 relative flex-nowrap shrink-0 group">
                <div class="relative w-12 h-12 bg-amber-300 hover:opacity-50 overflow-hidden rounded-md">
                  <button class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer">
                  <i class="fa-solid fa-play"></i></button>                
                  <img src="./src/images/nature-1.webp" class="w-full h-full object-cover"/>
                </div>

                <div class="flex flex-col flex-nowrap shrink-0">
                  <button class="cursor-pointer text-left">Đốt cháy cơn mưa</button>
                  <div class="text-gray-500 text-sm">
                    <button class="cursor-pointer">Adele</button>
                    <span class="cursor-pointer">.</span>
                    <span class="cursor-pointer">1,3 tỷ lượt chơi</span>
                    <span class="cursor-pointer">.</span>
                    <span class="cursor-pointer">21</span>
                  </div>
                </div>

                <!-- Start: Khi hover vào bài hát -->
                <div class="absolute top-1/2 -translate-y-1/2 right-1 flex items-center gap-4 text-2xl flex-nowrap shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button class="w-10 h-10 rounded-full hover:bg-gray-500 text-center cursor-pointer transition-colors"><i class="fa-regular fa-thumbs-down"></i></button>
                  <button class="w-10 h-10 rounded-full hover:bg-gray-500 text-center cursor-pointer transition-colors"><i class="fa-regular fa-thumbs-up"></i></button>
                  <button class="relative w-10 h-10 rounded-full hover:bg-gray-500 text-center group cursor-pointer transition-colors">
                    <i class="fa-solid fa-ellipsis rotate-90"></i>
                  </button> 
                  <!-- End: Khi hover vào bài hát --> 
                  
                    <!-- Start: Danh sách tùy chọn mở rộng -->
                    <ul class="hidden absolute top-full right-0 w-50 bg-gray-500 text-center rounded-lg text-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300">
                      <li>                        
                        <a href="#!" class="flex w-full text-white px-4 py-2 rounded-lg">Start mix</a>
                      </li>                     
                    </ul>
                    <!-- End: Danh sách tùy chọn mở rộng -->
                </div>
              </section>
              <!-- End Bài nhạc -->
              <!-- Start Bài nhạc -->
              <section class="flex gap-4 relative flex-nowrap shrink-0 group">
                <div class="relative w-12 h-12 bg-amber-300 hover:opacity-50 overflow-hidden rounded-md">
                  <button class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer">
                  <i class="fa-solid fa-play"></i></button>                
                  <img src="./src/images/nature-1.webp" class="w-full h-full object-cover"/>
                </div>

                <div class="flex flex-col flex-nowrap shrink-0">
                  <button class="cursor-pointer text-left">Đốt cháy cơn mưa</button>
                  <div class="text-gray-500 text-sm">
                    <button class="cursor-pointer">Adele</button>
                    <span class="cursor-pointer">.</span>
                    <span class="cursor-pointer">1,3 tỷ lượt chơi</span>
                    <span class="cursor-pointer">.</span>
                    <span class="cursor-pointer">21</span>
                  </div>
                </div>

                <!-- Start: Khi hover vào bài hát -->
                <div class="absolute top-1/2 -translate-y-1/2 right-1 flex items-center gap-4 text-2xl flex-nowrap shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button class="w-10 h-10 rounded-full hover:bg-gray-500 text-center cursor-pointer transition-colors"><i class="fa-regular fa-thumbs-down"></i></button>
                  <button class="w-10 h-10 rounded-full hover:bg-gray-500 text-center cursor-pointer transition-colors"><i class="fa-regular fa-thumbs-up"></i></button>
                  <button class="relative w-10 h-10 rounded-full hover:bg-gray-500 text-center group cursor-pointer transition-colors">
                    <i class="fa-solid fa-ellipsis rotate-90"></i>
                  </button> 
                  <!-- End: Khi hover vào bài hát --> 
                  
                    <!-- Start: Danh sách tùy chọn mở rộng -->
                    <ul class="hidden absolute top-full right-0 w-50 bg-gray-500 text-center rounded-lg text-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300">
                      <li>                        
                        <a href="#!" class="flex w-full text-white px-4 py-2 rounded-lg">Start mix</a>
                      </li>                     
                    </ul>
                    <!-- End: Danh sách tùy chọn mở rộng -->
                </div>
              </section>
              <!-- End Bài nhạc -->
              <!-- Start Bài nhạc -->
              <section class="flex gap-4 relative flex-nowrap shrink-0 group">
                <div class="relative w-12 h-12 bg-amber-300 hover:opacity-50 overflow-hidden rounded-md">
                  <button class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer">
                  <i class="fa-solid fa-play"></i></button>                
                  <img src="./src/images/nature-1.webp" class="w-full h-full object-cover"/>
                </div>

                <div class="flex flex-col flex-nowrap shrink-0">
                  <button class="cursor-pointer text-left">Đốt cháy cơn mưa</button>
                  <div class="text-gray-500 text-sm">
                    <button class="cursor-pointer">Adele</button>
                    <span class="cursor-pointer">.</span>
                    <span class="cursor-pointer">1,3 tỷ lượt chơi</span>
                    <span class="cursor-pointer">.</span>
                    <span class="cursor-pointer">21</span>
                  </div>
                </div>

                <!-- Start: Khi hover vào bài hát -->
                <div class="absolute top-1/2 -translate-y-1/2 right-1 flex items-center gap-4 text-2xl flex-nowrap shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button class="w-10 h-10 rounded-full hover:bg-gray-500 text-center cursor-pointer transition-colors"><i class="fa-regular fa-thumbs-down"></i></button>
                  <button class="w-10 h-10 rounded-full hover:bg-gray-500 text-center cursor-pointer transition-colors"><i class="fa-regular fa-thumbs-up"></i></button>
                  <button class="relative w-10 h-10 rounded-full hover:bg-gray-500 text-center group cursor-pointer transition-colors">
                    <i class="fa-solid fa-ellipsis rotate-90"></i>
                  </button> 
                  <!-- End: Khi hover vào bài hát --> 
                  
                    <!-- Start: Danh sách tùy chọn mở rộng -->
                    <ul class="hidden absolute top-full right-0 w-50 bg-gray-500 text-center rounded-lg text-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300">
                      <li>                        
                        <a href="#!" class="flex w-full text-white px-4 py-2 rounded-lg">Start mix</a>
                      </li>                     
                    </ul>
                    <!-- End: Danh sách tùy chọn mở rộng -->
                </div>
              </section>
              <!-- End Bài nhạc -->
            </div>
            <div class="w-2xs flex flex-col flex-nowrap shrink-0 gap-4">

              <!-- Start Bài nhạc -->
              <section class="flex gap-4 relative flex-nowrap shrink-0 group">
                <div class="relative w-12 h-12 bg-amber-300 hover:opacity-50 overflow-hidden rounded-md">
                  <button class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer">
                  <i class="fa-solid fa-play"></i></button>                
                  <img src="./src/images/nature-1.webp" class="w-full h-full object-cover"/>
                </div>

                <div class="flex flex-col flex-nowrap shrink-0">
                  <button class="cursor-pointer text-left">Đốt cháy cơn mưa</button>
                  <div class="text-gray-500 text-sm">
                    <button class="cursor-pointer">Adele</button>
                    <span class="cursor-pointer">.</span>
                    <span class="cursor-pointer">1,3 tỷ lượt chơi</span>
                    <span class="cursor-pointer">.</span>
                    <span class="cursor-pointer">21</span>
                  </div>
                </div>

                <!-- Start: Khi hover vào bài hát -->
                <div class="absolute top-1/2 -translate-y-1/2 right-1 flex items-center gap-4 text-2xl flex-nowrap shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button class="w-10 h-10 rounded-full hover:bg-gray-500 text-center cursor-pointer transition-colors"><i class="fa-regular fa-thumbs-down"></i></button>
                  <button class="w-10 h-10 rounded-full hover:bg-gray-500 text-center cursor-pointer transition-colors"><i class="fa-regular fa-thumbs-up"></i></button>
                  <button class="relative w-10 h-10 rounded-full hover:bg-gray-500 text-center group cursor-pointer transition-colors">
                    <i class="fa-solid fa-ellipsis rotate-90"></i>
                  </button> 
                  <!-- End: Khi hover vào bài hát --> 
                  
                    <!-- Start: Danh sách tùy chọn mở rộng -->
                    <ul class="hidden absolute top-full right-0 w-50 bg-gray-500 text-center rounded-lg text-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300">
                      <li>                        
                        <a href="#!" class="flex w-full text-white px-4 py-2 rounded-lg">Start mix</a>
                      </li>                     
                    </ul>
                    <!-- End: Danh sách tùy chọn mở rộng -->
                </div>
              </section>
              <!-- End Bài nhạc -->
              <!-- Start Bài nhạc -->
              <section class="flex gap-4 relative flex-nowrap shrink-0 group">
                <div class="relative w-12 h-12 bg-amber-300 hover:opacity-50 overflow-hidden rounded-md">
                  <button class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer">
                  <i class="fa-solid fa-play"></i></button>                
                  <img src="./src/images/nature-1.webp" class="w-full h-full object-cover"/>
                </div>

                <div class="flex flex-col flex-nowrap shrink-0">
                  <button class="cursor-pointer text-left">Đốt cháy cơn mưa</button>
                  <div class="text-gray-500 text-sm">
                    <button class="cursor-pointer">Adele</button>
                    <span class="cursor-pointer">.</span>
                    <span class="cursor-pointer">1,3 tỷ lượt chơi</span>
                    <span class="cursor-pointer">.</span>
                    <span class="cursor-pointer">21</span>
                  </div>
                </div>

                <!-- Start: Khi hover vào bài hát -->
                <div class="absolute top-1/2 -translate-y-1/2 right-1 flex items-center gap-4 text-2xl flex-nowrap shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button class="w-10 h-10 rounded-full hover:bg-gray-500 text-center cursor-pointer transition-colors"><i class="fa-regular fa-thumbs-down"></i></button>
                  <button class="w-10 h-10 rounded-full hover:bg-gray-500 text-center cursor-pointer transition-colors"><i class="fa-regular fa-thumbs-up"></i></button>
                  <button class="relative w-10 h-10 rounded-full hover:bg-gray-500 text-center group cursor-pointer transition-colors">
                    <i class="fa-solid fa-ellipsis rotate-90"></i>
                  </button> 
                  <!-- End: Khi hover vào bài hát --> 
                  
                    <!-- Start: Danh sách tùy chọn mở rộng -->
                    <ul class="hidden absolute top-full right-0 w-50 bg-gray-500 text-center rounded-lg text-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300">
                      <li>                        
                        <a href="#!" class="flex w-full text-white px-4 py-2 rounded-lg">Start mix</a>
                      </li>                     
                    </ul>
                    <!-- End: Danh sách tùy chọn mở rộng -->
                </div>
              </section>
              <!-- End Bài nhạc -->
              <!-- Start Bài nhạc -->
              <section class="flex gap-4 relative flex-nowrap shrink-0 group">
                <div class="relative w-12 h-12 bg-amber-300 hover:opacity-50 overflow-hidden rounded-md">
                  <button class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer">
                  <i class="fa-solid fa-play"></i></button>                
                  <img src="./src/images/nature-1.webp" class="w-full h-full object-cover"/>
                </div>

                <div class="flex flex-col flex-nowrap shrink-0">
                  <button class="cursor-pointer text-left">Đốt cháy cơn mưa</button>
                  <div class="text-gray-500 text-sm">
                    <button class="cursor-pointer">Adele</button>
                    <span class="cursor-pointer">.</span>
                    <span class="cursor-pointer">1,3 tỷ lượt chơi</span>
                    <span class="cursor-pointer">.</span>
                    <span class="cursor-pointer">21</span>
                  </div>
                </div>

                <!-- Start: Khi hover vào bài hát -->
                <div class="absolute top-1/2 -translate-y-1/2 right-1 flex items-center gap-4 text-2xl flex-nowrap shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button class="w-10 h-10 rounded-full hover:bg-gray-500 text-center cursor-pointer transition-colors"><i class="fa-regular fa-thumbs-down"></i></button>
                  <button class="w-10 h-10 rounded-full hover:bg-gray-500 text-center cursor-pointer transition-colors"><i class="fa-regular fa-thumbs-up"></i></button>
                  <button class="relative w-10 h-10 rounded-full hover:bg-gray-500 text-center group cursor-pointer transition-colors">
                    <i class="fa-solid fa-ellipsis rotate-90"></i>
                  </button> 
                  <!-- End: Khi hover vào bài hát --> 
                  
                    <!-- Start: Danh sách tùy chọn mở rộng -->
                    <ul class="hidden absolute top-full right-0 w-50 bg-gray-500 text-center rounded-lg text-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300">
                      <li>                        
                        <a href="#!" class="flex w-full text-white px-4 py-2 rounded-lg">Start mix</a>
                      </li>                     
                    </ul>
                    <!-- End: Danh sách tùy chọn mở rộng -->
                </div>
              </section>
              <!-- End Bài nhạc -->
              <!-- Start Bài nhạc -->
              <section class="flex gap-4 relative flex-nowrap shrink-0 group">
                <div class="relative w-12 h-12 bg-amber-300 hover:opacity-50 overflow-hidden rounded-md">
                  <button class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer">
                  <i class="fa-solid fa-play"></i></button>                
                  <img src="./src/images/nature-1.webp" class="w-full h-full object-cover"/>
                </div>

                <div class="flex flex-col flex-nowrap shrink-0">
                  <button class="cursor-pointer text-left">Đốt cháy cơn mưa</button>
                  <div class="text-gray-500 text-sm">
                    <button class="cursor-pointer">Adele</button>
                    <span class="cursor-pointer">.</span>
                    <span class="cursor-pointer">1,3 tỷ lượt chơi</span>
                    <span class="cursor-pointer">.</span>
                    <span class="cursor-pointer">21</span>
                  </div>
                </div>

                <!-- Start: Khi hover vào bài hát -->
                <div class="absolute top-1/2 -translate-y-1/2 right-1 flex items-center gap-4 text-2xl flex-nowrap shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button class="w-10 h-10 rounded-full hover:bg-gray-500 text-center cursor-pointer transition-colors"><i class="fa-regular fa-thumbs-down"></i></button>
                  <button class="w-10 h-10 rounded-full hover:bg-gray-500 text-center cursor-pointer transition-colors"><i class="fa-regular fa-thumbs-up"></i></button>
                  <button class="relative w-10 h-10 rounded-full hover:bg-gray-500 text-center group cursor-pointer transition-colors">
                    <i class="fa-solid fa-ellipsis rotate-90"></i>
                  </button> 
                  <!-- End: Khi hover vào bài hát --> 
                  
                    <!-- Start: Danh sách tùy chọn mở rộng -->
                    <ul class="hidden absolute top-full right-0 w-50 bg-gray-500 text-center rounded-lg text-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300">
                      <li>                        
                        <a href="#!" class="flex w-full text-white px-4 py-2 rounded-lg">Start mix</a>
                      </li>                     
                    </ul>
                    <!-- End: Danh sách tùy chọn mở rộng -->
                </div>
              </section>
              <!-- End Bài nhạc -->
            </div>
          </div>
          <!-- End Danh sách phát nhạc -->
        </div>
        <!-- End Quick picks: Lựa chọn nhanh -->
      </div>
     `;
};

export default home;
