const BASE_URL = "https://dummyjson.com";

const POSTS_PER_PAGE = 5;
let currentPage = 1;
let totalPosts = 100;
let sortOrder = "";

const renderPagination = () => {
    const paginationEl = document.querySelector(".js-pagination");
    if (!paginationEl) return;

    const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
    let html = "";

    const maxButtons = 5;
    let startPage = Math.max(currentPage - Math.floor(maxButtons / 2), 1);
    let endPage = startPage + maxButtons - 1;

    if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(endPage - maxButtons + 1, 1);
    }

    if (currentPage > 1) {
        html += `<button class="page-btn px-2 py-1 border border-gray-300 rounded-sm hover:bg-blue-500 hover:text-white transition-colors hover:cursor-pointer" data-page="${
            currentPage - 1
        }"><i class="fa-solid fa-chevron-left"></i></button>`;
    }

    for (let i = startPage; i <= endPage; i++) {
        html += `<button class="page-btn w-[33px] h-[33px] border rounded-sm hover:cursor-pointer hover:bg-blue-700 hover:text-white transition-colors ${
            i === currentPage ? "bg-blue-500 text-white" : "bg-white"
        }" data-page="${i}">${i}</button>`;
    }

    if (currentPage < totalPages) {
        html += `<button class="page-btn px-2 py-1 border border-gray-300 rounded-sm hover:bg-blue-500 hover:text-white transition-colors hover:cursor-pointer" data-page="${
            currentPage + 1
        }"><i class="fa-solid fa-chevron-right"></i></button>`;
    }

    paginationEl.innerHTML = html;

    document.querySelector(".js-pagination").addEventListener("click", (e) => {
        const btn = e.target.closest(".page-btn");
        if (!btn) return;
        const page = Number(btn.dataset.page);
        if (!isNaN(page)) {
            currentPage = page;
            loadPosts();
        }
    });
};

const fetchPostsWithPage = async (page = 1, order = "") => {
    try {
        setLoading();
        sortOrder = order;

        let url = `${BASE_URL}/posts?limit=${POSTS_PER_PAGE}&skip=${
            (page - 1) * POSTS_PER_PAGE
        }`;

        if (query.search) {
            url = `${BASE_URL}/posts/search?q=${
                query.search
            }&limit=${POSTS_PER_PAGE}&skip=${(page - 1) * POSTS_PER_PAGE}`;
        }

        if (sortOrder) {
            url += `&sortBy=id&order=${sortOrder}`;
        }

        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch posts");
        const data = await response.json();
        totalPosts = data.total || 100;

        renderPosts(data.posts);
        renderPagination();
        return data.posts;
    } catch (error) {
        renderError("Đã có lỗi khi tải dữ liệu: " + error.message);
    } finally {
        setLoading(false);
    }
};

const renderPosts = (posts) => {
    const postListEl = document.querySelector(".js-post-list");
    const html = posts
        .map(
            (post) => `
            <div class="border border-gray-400 rounded-sm mt-4 px-4 py-4 shadow-lg" data-id="${post.id}">
                <h2 class="font-bold">${post.title}</h2>
                <p class="mt-4">
                    ${post.body}
                </p>
                <div class="flex justify-between justify-items-center mt-4">
                    <button
                        class="js-view-btn text-blue-700 font-bold hover:text-shadow-lg hover:cursor-pointer"
                        data-id="${post.id}"
                    >
                        Xem chi tiết
                    </button>
                    <div>
                        <button
                            class="js-edit-btn border border-gray-300 rounded-sm px-3 py-2 bg-yellow-500 text-white hover:bg-yellow-700 hover:cursor-pointer transition-colors"
                            data-id="${post.id}"
                        >
                            Sửa
                        </button>
                        <button
                            class="js-delete-btn border border-gray-300 rounded-sm px-3 py-2 bg-red-500 text-white hover:bg-red-700 hover:cursor-pointer transition-colors"
                            data-id="${post.id}"
                        >
                            Xóa
                        </button>
                    </div>
                </div>
            </div>
        `
        )
        .join("");
    postListEl.innerHTML = html;
};

const localPosts = [];

const postListEl = document.querySelector(".js-post-list");

postListEl.addEventListener("click", async (e) => {
    const btn = e.target.closest(".js-view-btn, .js-edit-btn, .js-delete-btn");
    if (!btn) return;

    const postId = btn.dataset.id;

    // Hiển thị chi tiết bài viết
    if (btn.classList.contains("js-view-btn")) {
        try {
            let post = localPosts.find((p) => p.id == postId);

            if (!post) {
                const response = await fetch(`${BASE_URL}/posts/${postId}`);
                if (!response.ok) throw new Error("Không thể tải bài viết");
                post = await response.json();
            }

            openModal(() => ({
                modalTitle: post.title,
                modalContent: `
                    <p>${post.body}</p>
                    <div class="flex justify-between gap-2 w-full mt-4 max-lg:px-2">
                        <span><strong>User ID</strong>: ${
                            post.userId || "N/A"
                        }</span> 
                        <span><strong>Likes</strong>: ${
                            post.reactions?.likes || 0
                        }</span>
                        <span><strong>Dislikes</strong>: ${
                            post.reactions?.dislikes || 0
                        }</span>
                        <span><strong>Views</strong>: ${post.views || 0}</span>
                    </div>
                    <div class="border-t border-t-gray-300 mt-4 pt-2">
                        <span><strong>Tags</strong>: ${
                            post.tags?.join(", ") || "N/A"
                        }</span>
                    </div>
                `,
            }));
        } catch (error) {
            openModal(() => ({
                modalTitle: "Đã có lỗi xảy ra",
                modalContent: `<p class="text-red-600">${error.message}</p>`,
            }));
        }
    }

    // Sửa bài viết
    else if (btn.classList.contains("js-edit-btn")) {
        try {
            let post = localPosts.find((p) => p.id == postId);
            if (!post) {
                const response = await fetch(`${BASE_URL}/posts/${postId}`);
                if (!response.ok) throw new Error("Không thể tải bài viết");
                post = await response.json();
            }

            openModal(() => ({
                modalTitle: `<input
                            type="text"
                            id="edit-title-${post.id}"
                            value="${post.title}"
                            class="w-full border border-gray-200 rounded-sm px-2 py-2 text-3xl/normal"
                        />`,
                modalContent: `
                <form id="edit-post-form-${post.id}" class="flex flex-col gap-2">
                    <textarea id="edit-body-${post.id}" class="h-50 border border-gray-200 rounded-sm px-2 py-2">${post.body}</textarea>
                    <div class="flex justify-end mt-2">
                        <button type="submit" class="px-4 py-2 bg-green-500 text-white rounded-sm hover:bg-green-700">Lưu</button>
                    </div>
                </form>
            `,
            }));

            const form = document.getElementById(`edit-post-form-${post.id}`);
            form.addEventListener("submit", async (e) => {
                e.preventDefault();

                const updatedPost = {
                    title: document.getElementById(`edit-title-${post.id}`)
                        .value,
                    body: document.getElementById(`edit-body-${post.id}`).value,
                };

                try {
                    if (localPosts.find((p) => p.id == postId)) {
                        const idx = localPosts.findIndex((p) => p.id == postId);
                        localPosts[idx].title = updatedPost.title;
                        localPosts[idx].body = updatedPost.body;
                    } else {
                        const res = await fetch(`${BASE_URL}/posts/${postId}`, {
                            method: "PUT",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(updatedPost),
                        });
                        if (!res.ok) throw new Error("Cập nhật thất bại");
                        const result = await res.json();
                        updatedPost.title = result.title;
                        updatedPost.body = result.body;
                    }

                    const postEl = postListEl.querySelector(
                        `[data-id="${postId}"]`
                    );
                    if (postEl) {
                        postEl.querySelector("h2").innerText =
                            updatedPost.title;
                        postEl.querySelector("p").innerText = updatedPost.body;
                    }

                    closeModal();
                } catch (error) {
                    alert("Lỗi khi cập nhật bài viết: " + error.message);
                }
            });
        } catch (error) {
            openModal(() => ({
                modalTitle: "Lỗi",
                modalContent: `<p class="text-red-600">${error.message}</p>`,
            }));
        }
    }

    // Xóa bài viết
    else if (btn.classList.contains("js-delete-btn")) {
        if (!confirm("Bạn có chắc muốn xóa bài viết này không?")) return;

        try {
            const localIdx = localPosts.findIndex((p) => p.id == postId);
            if (localIdx !== -1) {
                localPosts.splice(localIdx, 1);
            } else {
                const response = await fetch(`${BASE_URL}/posts/${postId}`, {
                    method: "DELETE",
                });
                if (!response.ok) throw new Error("Xóa bài viết thất bại");
            }

            const postEl = postListEl.querySelector(`[data-id="${postId}"]`);
            if (postEl) postEl.remove();

            alert("Bài viết đã được xóa!");
        } catch (error) {
            alert("Lỗi khi xóa bài viết: " + error.message);
        }
    }
});

// Thêm bài viết mới
const addNewPostEvent = () => {
    const addBtn = document.querySelector(".js-add-btn");
    addBtn.addEventListener("click", () => {
        openModal(() => ({
            modalTitle: `<input type="text" id="add-title" placeholder="Tiêu đề" class="w-full border border-gray-400 rounded-sm px-2 py-2"/>`,
            modalContent: `<form id="add-post-form" class="flex flex-col gap-2">
                <textarea id="add-body" placeholder="Nội dung" class="h-50 border border-gray-400 rounded-sm px-2 py-2"></textarea>
                <div class="flex justify-end">
                    <button type="submit" class="mt-2 px-4 py-2 bg-green-500 text-white rounded-sm hover:cursor-pointer hover:bg-green-700">Thêm mới</button>
                </div>
            </form>`,
        }));

        const form = document.getElementById("add-post-form");
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const title = document.getElementById("add-title").value.trim();
            const body = document.getElementById("add-body").value.trim();
            if (!title) return alert("Vui lòng nhập tiêu đề");
            if (!body) return alert("Vui lòng nhập nội dung");

            const id = Date.now().toString();

            const newPost = { id, title, body, userId: 1 };
            localPosts.push(newPost);

            const newPostEl = document.createElement("div");
            newPostEl.className =
                "border border-gray-400 mt-4 px-4 py-4 shadow-lg";
            newPostEl.dataset.id = id;
            newPostEl.innerHTML = `
                <h2 class="font-bold">${title}</h2>
                <p class="mt-4">${body}</p>
                <div class="flex justify-between">
                    <button class="js-view-btn border border-gray-300 rounded-sm mt-4 px-4 py-2 bg-blue-500 text-white hover:bg-blue-700 hover:cursor-pointer transition-colors" data-id="${id}">Xem chi tiết</button>
                    <div>
                        <button class="js-edit-btn border border-gray-300 rounded-sm mt-4 px-4 py-2 bg-yellow-500 text-white hover:bg-yellow-700 hover:cursor-pointer transition-colors" data-id="${id}">Sửa</button>
                        <button class="js-delete-btn border border-gray-300 rounded-sm mt-4 px-4 py-2 bg-red-500 text-white hover:bg-red-700 hover:cursor-pointer transition-colors" data-id="${id}">Xóa</button>
                    </div>
                </div>
            `;
            postListEl.prepend(newPostEl);

            closeModal();
        });
    });
};
addNewPostEvent();

const setLoading = (status = true) => {
    const loadingEl = document.querySelector(".js-loading");
    loadingEl.innerHTML = status
        ? `<span class="text-3xl block text-center">Loading...</span>`
        : "";
};

const renderError = (message) => {
    const postListEl = document.querySelector(".js-post-list");
    postListEl.innerHTML = `<span class="text-3xl block text-center text-red-600 my-4 underline">${message}</span>`;
};

// Hàm kiểm tra nhập ký tự tìm kiếm
const query = {};
const debounce = (callback, timeout = 500) => {
    let timeoutId;
    return (...args) => {
        // rest parameter
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            callback(...args); // spread
        }, timeout);
    };
};

// Tìm kiếm
const addSearchEvent = () => {
    const searchEl = document.querySelector(".js-search");
    searchEl.addEventListener(
        "input",
        debounce((e) => {
            const value = e.target.value;
            // Call api với keyword là value
            query.search = value;
            fetchPosts();
        })
    );
};

const openModal = (callback) => {
    if (typeof callback !== "function") {
        return;
    }
    const modalEl = document.querySelector(".js-modal");
    const modalTitle = modalEl.querySelector(".js-modal-title");
    const modalContent = modalEl.querySelector(".js-modal-content");
    modalEl.classList.remove("hidden");
    const option = callback();
    modalTitle.innerHTML = option.modalTitle;
    modalContent.innerHTML = option.modalContent;
    document.body.style.overflow = "hidden";
};
const closeModal = () => {
    const modalEl = document.querySelector(".js-modal");
    const modalTitle = modalEl.querySelector(".js-modal-title");
    const modalContent = modalEl.querySelector(".js-modal-content");
    modalEl.classList.add("hidden");
    modalTitle.innerText = "";
    modalContent.innerText = "";
    document.body.style.overflow = "";
};

const addEventCloseModal = () => {
    const overlay = document.querySelector(".js-overlay");
    overlay.addEventListener("click", closeModal);
    document.addEventListener("keyup", (e) => {
        if (e.key === "Escape") {
            closeModal();
        }
    });
};
addEventCloseModal();

const sortNewestBtn = document.querySelector(".js-newest");
const sortOldestBtn = document.querySelector(".js-oldest");
let currentSortBtn = sortNewestBtn; // mặc định Mới nhất
currentSortBtn.classList.add("bg-blue-500", "text-white");

sortNewestBtn.addEventListener("click", () => {
    currentPage = 1;
    sortOrder = "desc";
    loadPosts();

    currentSortBtn.classList.remove("bg-blue-500", "text-white");
    currentSortBtn = sortNewestBtn;
    currentSortBtn.classList.add("bg-blue-500", "text-white");
});

sortOldestBtn.addEventListener("click", () => {
    currentPage = 1;
    sortOrder = "asc";
    loadPosts();

    currentSortBtn.classList.remove("bg-blue-500", "text-white");
    currentSortBtn = sortOldestBtn;
    currentSortBtn.classList.add("bg-blue-500", "text-white");
});

const loadPosts = async () => {
    await fetchPostsWithPage(currentPage, sortOrder);
};

loadPosts();
addSearchEvent();
