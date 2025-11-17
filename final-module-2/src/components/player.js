const player = () => {
    return `
    <div id="music-player" class="fixed bottom-0 left-0 right-0 bg-gray-900 text-white shadow-xl z-50 border-t border-gray-700">

        <div class="absolute -top-4 left-0 w-full">
            <input
                id="progress-bar"
                type="range"
                min="0"
                value="0"
                class="w-full accent-red-500 cursor-pointer h-1 opacity-0 hover:opacity-100"
            />
        </div>

        <!-- Controls -->
        <div class="flex items-center justify-between gap-4 px-4 py-2">
            <div class="flex items-center gap-4">
                <div class="flex items-center gap-4">                
                <button id="prev-btn" class="w-10 h-10 rounded-full text-xl cursor-pointer hover:bg-gray-500">
                    <i class="fa-solid fa-backward-step"></i>
                </button>
                <button id="play-btn" class="w-12 h-12 rounded-full text-4xl cursor-pointer hover:bg-gray-500">
                    <i class="fa-solid fa-play"></i>
                </button>
                <button id="next-btn" class="w-10 h-10 rounded-full text-xl cursor-pointer hover:bg-gray-500">
                    <i class="fa-solid fa-forward-step"></i></i></i>
                </button>
                </div>
                <div class="text-sm">
                    <span>00.00</span>
                    <span>/</span>
                    <span>04.30</span>
                </div>                
            </div>
            <div class="flex gap-2">
                <span>Sponsored</span>
                <span>.</span>
                <span class="text-gray-500">Video will play after ad</span>
            </div>
            <div class="flex items-center">
                <div class="flex items-center group">
                    <div class="w-30">
                        <input
                            type="range"
                            min="0"
                            value="0"
                            class="js-vol-bar w-full accent-red-500 cursor-pointer h-1 opacity-0 group-hover:opacity-100"
                        />
                    </div>
                    
                    <button class="js-volume-btn w-10 h-10 rounded-full text-xl cursor-pointer hover:bg-gray-500">
                        <i class="fa-solid fa-volume-xmark"></i>
                        <!-- <i class="fa-solid fa-volume-low"></i> -->
                        <!-- <i class="fa-solid fa-volume-high"></i> -->
                    </button>
                </div>

                <button id="repeat-btn" class="w-10 h-10 rounded-full text-xl cursor-pointer hover:bg-gray-500">
                    <i class="fa-solid fa-repeat"></i>
                </button>

                <button id="shuffle-btn" class="w-10 h-10 rounded-full text-xl cursor-pointer hover:bg-gray-500">
                    <i class="fa-solid fa-shuffle"></i>
                </button>
                                
                <button id="open-playlist" class="relative text-center w-10 h-10 rounded-full text-xl cursor-pointer hover:bg-gray-500">
                    <i class="fa-solid fa-sort-up"></i>
                    <!-- <i class="fa-solid fa-sort-down"></i> -->
                </button>
            </div>
        </div>

        <!-- Audio -->
        <audio id="audio"></audio>
    </div>

    <!-- Playlist Popup -->
    <div
    class="js-playlist-popup hidden absolute bottom-20 right-4 w-140 bg-gray-800 text-white rounded-lg p-4 max-h-96 overflow-y-auto z-50">
        <h3 class="text-lg font-bold mb-3">UP NEXT</h3>
        <ul id="playlist-list" class="space-y-2"></ul>
    </div>
    `;
};
export default player;
