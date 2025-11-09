const API_DUM = "https://dummyjson.com/posts";

let allPosts = [];
let filteredPosts = [];
let currentSort = "newest";
let currentPage = 1;
const postsPerPage = 5;

// DOM
document.addEventListener("DOMContentLoaded", () => {
    createLayout();
    initElements();
    loadPosts();
    setupEventListeners();
});

// Main
function createLayout() {
    const main = document.querySelector("main");
    main.className = "max-w-[1200px] max-md:px-4 max-sm:px-2 mx-auto my-10";
    const div = main.querySelector("div");
    div.innerHTML = `
        <h1 class="text-5xl font-bold text-center">Blogs</h1>
        <div class="search mt-10">
            <input
                id="search-input"
                class="w-full text-gray-600 border border-gray-600 px-2 py-2"
                type="text"
                name="search"
                placeholder="Search..."
            />
        </div>
        <div>
            <button
                id="add-btn"
                class="border border-gray-400 mt-4 px-4 py-2 hover:cursor-pointer hover:bg-blue-500 hover:text-white"
            >
                Thêm mới
            </button>
        </div>
        <div class="flex gap-3 mt-4">
            <button
                id="sort-newest-btn"
                class="sort-btn border border-gray-400 px-4 py-2 hover:cursor-pointer"
            >
                Mới nhất
            </button>
            <button
                id="sort-oldest-btn"
                class="sort-btn border border-gray-400 px-4 py-2 hover:cursor-pointer"
            >
                Cũ nhất
            </button>
        </div>
    `;
}

let postsContainer,
    searchInput,
    btnAdd,
    sortNewest,
    sortOldest,
    paginationContainer;
let modalOverlay, modalContent;

function initElements() {
    postsContainer = document.querySelector("#container");
    searchInput = document.querySelector("#search-input");
    btnAdd = document.querySelector("#add-btn");
    sortNewest = document.querySelector("#sort-newest-btn");
    sortOldest = document.querySelector("#sort-oldest-btn");
    paginationContainer = document.querySelector("#pagination");
    modalOverlay = document.querySelector("#overlay");
    modalContent = document.querySelector("#content");
}

// Call API
async function loadPosts() {
    try {
        const response = await fetch(`${API_DUM}?limit=100`);
        const data = await response.json();

        allPosts = data.posts || [];
        filteredPosts = [...allPosts];

        applySort();
        showPosts();
        renderPagination();
        ActiveSort();
    } catch (error) {
        console.error("Error loading posts:", error);
        postsContainer.innerHTML =
            '<div class="text-center py-10 text-red-500">Lỗi khi tải dữ liệu...</div>';
        paginationContainer.innerHTML = "";
    }
}

// Filter
function setupEventListeners() {
    sortNewest.addEventListener("click", () => {
        currentSort = "newest";
        applySort();
        showPosts();
        renderPagination();
        ActiveSort();
    });

    sortOldest.addEventListener("click", () => {
        currentSort = "oldest";
        applySort();
        showPosts();
        renderPagination();
        ActiveSort();
    });

    searchInput.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase();
        filteredPosts = allPosts.filter((post) =>
            post.title.toLowerCase().includes(query)
        );
        showPosts();
        renderPagination();
    });
}

function applySort() {
    if (currentSort === "newest") {
        filteredPosts.sort((a, b) => b.id - a.id);
    } else if (currentSort === "oldest") {
        filteredPosts.sort((a, b) => a.id - b.id);
    }
}

function ActiveSort() {
    const allSortBtns = document.querySelectorAll(".sort-btn");
    allSortBtns.forEach((btn) => {
        btn.classList.remove(
            "border-b-4",
            "border-b-red-400",
            "bg-blue-500",
            "text-white"
        );
    });

    if (currentSort === "newest") {
        sortNewest.classList.add(
            "border-b-4",
            "border-b-red-400",
            "bg-blue-500",
            "text-white"
        );
    } else {
        sortOldest.classList.add(
            "border-b-4",
            "border-b-red-400",
            "bg-blue-500",
            "text-white"
        );
    }
}

// Hiển thị bài viết
function showPosts() {
    if (!filteredPosts || filteredPosts.length === 0) {
        postsContainer.innerHTML = `
            <div class="text-center text-gray-500 py-10">
                Không tìm thấy bài viết nào.
            </div>
        `;
        return;
    }

    const start = (currentPage - 1) * postsPerPage;
    const end = start + postsPerPage;
    const postsToShow = filteredPosts.slice(start, end);

    postsContainer.innerHTML = postsToShow
        .map(
            (post) => `
                <article class="border border-gray-300 mt-4 px-4 py-4 shadow-lg">
                    <h2 class="text-xl font-semibold text-gray-800">${post.title}</h2>
                    <p class="text-gray-600 mt-1">${post.body}</p>
                    <div class="flex justify-between gap-2 mt-3">
                        <button class="bg-blue-500 text-white px-3 py-2 hover:cursor-pointer hover:bg-blue-700 transition-colors" onclick="viewPost(${post.id})">Xem thêm</button>
                        <div class="flex gap-2">
                            <button class="bg-yellow-500 text-white px-5 py-2 hover:cursor-pointer hover:bg-yellow-700 transition-colors">Sửa</button>
                            <button class="bg-red-500 text-white px-5 py-2 hover:cursor-pointer hover:bg-red-700 transition-colors">Xóa</button>
                        </div>
                    </div>
                </article>
            `
        )
        .join("");
}

// Hiển thị phân trang
function renderPagination() {
    let totalPages = filteredPosts.length / postsPerPage;
    if (filteredPosts.length % postsPerPage !== 0) {
        totalPages = parseInt(totalPages) + 1;
    }
    let html = "";
    for (let i = 1; i <= totalPages; i++) {
        html += `
            <button
                class="inline-block w-10 py-1 border hover:cursor-pointer hover:border-black hover:bg-blue-700 hover:text-white transition-colors ${
                    i === currentPage
                        ? "bg-blue-500 border border-black text-white"
                        : ""
                }"
                onclick="goToPage(${i})"
            >${i}</button>
        `;
    }
    paginationContainer.innerHTML = html;
}

function goToPage(page) {
    currentPage = page;
    showPosts();
    renderPagination();
}

function viewPost(id) {
    const post = allPosts.find((p) => p.id === id);
    if (!post) return;

    modalContent.innerHTML = `
        <div class="relative bg-white px-8 py-6 max-w-[1000px] max-lg:mx-12 max-md:mx-8 max-sm:mx-4 shadow-lg">           
            <span
                id="close-modal-btn"
                class="absolute top-1 right-3 text-black hover:text-red-600 text-3xl font-bold hover:cursor-pointer"
                title="Đóng"
            >
                &times;
            </span>
            <h2 class="text-2xl font-bold my-4">${post.title}</h2>
            <p class="text-gray-600 leading-relaxed">${post.body}</p>
            <div class="mt-4">
            <span class="text-gray-600 leading-relaxed">Tags: ${post.tags}</span>            
            </div>
            <div class="mt-4">
            <span class="text-gray-600 leading-relaxed mr-10">Likes: ${post.reactions.likes}</span>
            <span class="text-gray-600 leading-relaxed">Dislikes: ${post.reactions.dislikes}</span>
            </div><div class="mt-4">
            <span class="text-gray-600 leading-relaxed mr-10">Views: ${post.views}</span>
            <span class="text-gray-600 leading-relaxed">User: ${post.userId}</span>
            </div>
        </div>
    `;

    modalOverlay.classList.remove("hidden");
    modalContent.classList.remove("hidden");

    document
        .querySelector("#close-modal-btn")
        .addEventListener("click", closeModal);
    modalOverlay.addEventListener("click", (e) => {
        if (e.target === modalOverlay) closeModal();
    });
}

function closeModal() {
    modalOverlay.classList.add("hidden");
    modalContent.classList.add("hidden");
}
