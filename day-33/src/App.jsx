import { useEffect, useState, useCallback } from "react";
import { instance } from "./Utils/axios";

import { SearchInput } from "./Components/SearchInput";
import { SortPosts } from "./Components/SortPosts";
import { Pagination } from "./Components/Pagination";

export default function App() {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [post, setPost] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const limit = 9;

    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");

    const handleSearch = useCallback((value) => {
        setSearchQuery(value);
        setPage(1);
    }, []);

    const handleSort = (order) => {
        setSortOrder(order);
        setPage(1);
    };

    useEffect(() => {
        const getPosts = async () => {
            try {
                setIsLoading(true);

                const skip = (page - 1) * limit;

                let queryParams = `/posts?limit=${limit}&skip=${skip}&sortBy=title&order=${sortOrder}`;

                let url = "";
                if (searchQuery) {
                    const paramsOnly = `limit=${limit}&skip=${skip}&sortBy=title&order=${sortOrder}`;
                    url = `/posts/search?q=${searchQuery}&${paramsOnly}`;
                } else {
                    url = `/posts?limit=${limit}&skip=${skip}&sortBy=title&order=${sortOrder}`;
                }

                const res = await instance.get(url);
                setPosts(res.data.posts);

                setTotalPages(Math.ceil(res.data.total / limit));
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        getPosts();
    }, [page, searchQuery, sortOrder]);

    useEffect(() => {
        const handlePress = (e) => {
            if (e.key === "Escape") {
                setShowModal(false);
            }
        };
        if (showModal) {
            window.addEventListener("keyup", handlePress);
        }
        return () => {
            window.removeEventListener("keyup", handlePress);
        };
    }, [showModal]);

    if (isLoading && !posts.length) {
        return (
            <div className="flex flex-col items-center gap-3 p-4">
                <div className="w-16 h-16 border-4 border-dashed border-blue-500 rounded-full animate-spin"></div>
                <span className="text-3xl font-bold ">Đang tải dữ liệu...</span>
            </div>
        );
    }

    if (error) {
        return <span className="text-red-500">Lỗi: {error}</span>;
    }

    const handleDetail = async (id) => {
        setPost(null);
        setShowModal(true);
        const res = await instance.get(`/posts/${id}`);
        setPost(res.data);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setPost(null);
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <>
            <div className="max-w-7xl mx-auto">
                <h2 className="text-6xl text-center font-bold py-4">Blogs</h2>
                <div>
                    <SearchInput search={handleSearch} />
                    <div className="m-4">
                        <button className="p-2 border border-gray-400 shadow-md rounded-sm hover:bg-blue-500 hover:text-white cursor-pointer">
                            Thêm mới
                        </button>
                    </div>
                    <SortPosts
                        currentOrder={sortOrder}
                        onSortChange={handleSort}
                    />
                </div>

                {isLoading ? (
                    <div className="flex flex-col justify-baseline items-center gap-3 p-4 bg-white">
                        <span className="w-16 h-16 border-4 border-dashed border-blue-500 rounded-full animate-spin"></span>
                        <span className="text-3xl font-bold ">
                            Đang tải dữ liệu...
                        </span>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-2 lg:grid-cols-3 lg:gap-4">
                        {posts?.map((post) => (
                            <div
                                key={post?.id}
                                className="flex flex-col p-5 m-4 border border-gray-500 shadow-lg rounded-sm hover:-translate-y-1 transition-all hover:shadow-gray-400"
                            >
                                <h3
                                    onClick={() => handleDetail(post?.id)}
                                    className="text-2xl text-blue-700 font-bold line-clamp-1 cursor-pointer hover:text-blue-500"
                                    title={post?.title}
                                >
                                    {post?.title}
                                </h3>
                                <p className="pt-4 flex-1 line-clamp-4">
                                    {post?.body}
                                </p>
                                <button
                                    onClick={() => handleDetail(post?.id)}
                                    className="w-fit mt-4 text-blue-500 underline cursor-pointer hover:text-blue-700"
                                >
                                    Xem chi tiết
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {isLoading && posts.length === 0 && (
                    <div>Không tìm thấy bài viết</div>
                )}

                {showModal && (
                    <div className="fixed inset-0 z-40 flex justify-center items-center">
                        <div
                            onClick={handleCloseModal}
                            className="absolute inset-0 z-40 bg-black opacity-45"
                        ></div>
                        <div className="absolute z-50 w-full max-w-5xl px-6 mx-4">
                            {!post ? (
                                <div className="flex flex-col justify-baseline items-center gap-3 p-4 bg-white">
                                    <span className="w-16 h-16 border-4 border-dashed border-blue-500 rounded-full animate-spin"></span>
                                    <span className="text-3xl font-bold ">
                                        Đang tải dữ liệu...
                                    </span>
                                </div>
                            ) : (
                                <div className="p-8 bg-white border border-gray-400 rounded-md shadow-2xl">
                                    <h3 className="pb-4 font-bold text-2xl text-blue-700">
                                        {post?.title}
                                    </h3>
                                    <hr />
                                    <p className="py-4">{post?.body}</p>
                                    <div className="flex justify-between items-center gap-3 mt-2">
                                        <span>
                                            <b>Id: </b>
                                            <i className="fa-solid fa-user text-blue-700"></i>
                                            {post?.id ?? 0}
                                        </span>
                                        <span>
                                            <b>UserId: </b>
                                            <i className="fa-solid fa-user text-blue-700"></i>
                                            {post?.userId ?? 0}
                                        </span>
                                        <span>
                                            <b>Views: </b>
                                            <i className="fa-solid fa-eye text-blue-700"></i>{" "}
                                            {post?.views ?? 0}
                                        </span>
                                        <div className="flex justify-between items-center gap-3">
                                            <span>
                                                <b>Likes: </b>
                                                <i className="fa-solid fa-thumbs-up text-blue-700"></i>
                                                {post?.reactions?.likes ?? 0}{" "}
                                            </span>
                                            <span>
                                                <b>Dislikes: </b>
                                                <i className="fa-solid fa-thumbs-down text-blue-700"></i>
                                                {post?.reactions?.dislikes ?? 0}{" "}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="mt-4 py-2 border-t border-t-gray-500 font-bold">
                                        <span>Stags: </span>
                                        {post?.tags?.map((stag, index) => (
                                            <span
                                                key={index}
                                                className="px-2 text-blue-400"
                                            >
                                                #{stag ?? ""}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <Pagination
                page={page}
                totalPages={totalPages}
                onChangePage={handlePageChange}
            />
        </>
    );
}
