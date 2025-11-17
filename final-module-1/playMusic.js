// const audio = document.getElementById("audio");
// const playBtn = document.getElementById("play-btn");
// const nextBtn = document.getElementById("next-btn");
// const prevBtn = document.getElementById("prev-btn");
// const shuffleBtn = document.getElementById("shuffle-btn");
// const progressBar = document.getElementById("progress-bar");
// const songTitle = document.getElementById("song-title");
// const currentTimeEl = document.getElementById("current-time");
// const durationEl = document.getElementById("duration");
// const playlistPopup = document.getElementById("playlist-popup");
// const playlistBtn = document.getElementById("open-playlist");
// const playlistList = document.getElementById("playlist-list");

// let isPlaying = false;
// let isShuffle = false;

// const playlist = [
//     { title: "Song 1 – Demo", src: "/music/song1.mp3" },
//     { title: "Song 2 – Demo", src: "/music/song2.mp3" },
//     { title: "Song 3 – Demo", src: "/music/song3.mp3" },
// ];

// let currentIndex = 0;

// // Format thời gian (70s -> 1:10)
// function formatTime(sec) {
//     if (isNaN(sec)) return "0:00";
//     const m = Math.floor(sec / 60);
//     const s = Math.floor(sec % 60)
//         .toString()
//         .padStart(2, "0");
//     return `${m}:${s}`;
// }

// // Load bài hát
// function loadSong(index) {
//     const song = playlist[index];
//     audio.src = song.src;
//     songTitle.textContent = song.title;

//     saveState();
// }

// // Play / Pause
// function playSong() {
//     audio.play();
//     isPlaying = true;
//     playBtn.textContent = "⏸️";
//     saveState();
// }
// function pauseSong() {
//     audio.pause();
//     isPlaying = false;
//     playBtn.textContent = "▶️";
//     saveState();
// }

// playBtn.addEventListener("click", () => {
//     isPlaying ? pauseSong() : playSong();
// });

// // Next / Prev
// nextBtn.addEventListener("click", () => {
//     currentIndex = isShuffle
//         ? Math.floor(Math.random() * playlist.length)
//         : (currentIndex + 1) % playlist.length;

//     loadSong(currentIndex);
//     playSong();
// });

// prevBtn.addEventListener("click", () => {
//     currentIndex = isShuffle
//         ? Math.floor(Math.random() * playlist.length)
//         : (currentIndex - 1 + playlist.length) % playlist.length;

//     loadSong(currentIndex);
//     playSong();
// });

// // Shuffle On/Off
// shuffleBtn.addEventListener("click", () => {
//     isShuffle = !isShuffle;
//     shuffleBtn.classList.toggle("text-blue-400");
//     saveState();
// });

// // Update progress bar + time
// audio.addEventListener("timeupdate", () => {
//     progressBar.max = audio.duration;
//     progressBar.value = audio.currentTime;

//     currentTimeEl.textContent = formatTime(audio.currentTime);
//     durationEl.textContent = formatTime(audio.duration);

//     saveState();
// });

// // Seek
// progressBar.addEventListener("input", () => {
//     audio.currentTime = progressBar.value;
// });

// // ---------------------------
// // PLAYLIST POPUP
// // ---------------------------
// playlistBtn.addEventListener("click", () => {
//     playlistPopup.classList.toggle("hidden");
// });

// // Render playlist list
// function renderPlaylist() {
//     playlistList.innerHTML = "";

//     playlist.forEach((song, index) => {
//         const li = document.createElement("li");
//         li.className =
//             "p-2 rounded-lg hover:bg-gray-700 cursor-pointer flex justify-between";

//         li.innerHTML = `
//             <span>${song.title}</span>
//             <span>${index === currentIndex ? "🎧" : ""}</span>
//         `;

//         li.addEventListener("click", () => {
//             currentIndex = index;
//             loadSong(index);
//             playSong();
//         });

//         playlistList.appendChild(li);
//     });
// }

// renderPlaylist();

// // ---------------------------
// // LOCAL STORAGE
// // ---------------------------
// function saveState() {
//     const state = {
//         currentIndex,
//         currentTime: audio.currentTime,
//         isPlaying,
//         isShuffle,
//     };
//     localStorage.setItem("musicPlayerState", JSON.stringify(state));
// }

// function loadState() {
//     const state = JSON.parse(localStorage.getItem("musicPlayerState"));
//     if (!state) return;

//     currentIndex = state.currentIndex || 0;
//     isShuffle = state.isShuffle || false;
//     if (isShuffle) shuffleBtn.classList.add("text-blue-400");

//     loadSong(currentIndex);

//     audio.addEventListener("loadedmetadata", () => {
//         audio.currentTime = state.currentTime || 0;
//         if (state.isPlaying) playSong();
//     });
// }

// loadState();
