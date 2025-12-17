import { useEffect, useRef, useState } from "react";

function Text() {
    const [sidebarWidth, setSidebarWidth] = useState(200);
    const isResizeRef = useRef(false);

    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!isResizeRef.current) return;

            let newSidebarWidth = e.clientX;
            if (newSidebarWidth > 400) {
                newSidebarWidth = 400;
            }
            if (newSidebarWidth < 80) {
                newSidebarWidth = 80;
            }

            setSidebarWidth(newSidebarWidth);
            document.body.style.userSelect = "none";
        };

        const handleMouseUp = () => {
            if (isResizeRef.current) {
                isResizeRef.current = false;

                document.body.style.cursor = "default";
                document.body.style.userSelect = "auto";
            }
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, []);

    const startResize = (e) => {
        e.preventDefault();

        isResizeRef.current = true;

        document.body.style.userSelect = "none";
    };

    const handleOpenSidebar = () => {
        setIsOpen(true);
    };

    const handleCloseSidebar = () => {
        setIsOpen(false);

        document.body.style.userSelect = "none";
    };

    return (
        <div className="flex items-start justify-between">
            <button
                onClick={handleOpenSidebar}
                className={`p-4 align-top text-2xl text-black cursor-pointer ${
                    isOpen ? "hidden" : "inline-block"
                }`}
            >
                <i className="fa-solid fa-bars"></i>
            </button>
            <div
                style={{ width: isOpen ? `${sidebarWidth}px` : 0 }}
                className={`relative z-40 h-screen text-white p-4 overflow-x-scroll overflow-y-hidden shrink-0 bg-gray-400 group ${
                    isOpen ? "" : "hidden"
                }`}
            >
                <h2 className="font-bold">Sidebar</h2>
                <p className="mt-2">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Inventore, fuga!
                </p>
                {isOpen && (
                    <>
                        <button
                            onClick={handleCloseSidebar}
                            onMouseDown={(e) => {
                                e.stopPropagation();
                            }}
                            className="absolute top-5 right-2 text-xl cursor-pointer animate-bounce-x transition-all duration-200 opacity-0 group-hover:opacity-100"
                        >
                            <i className="fa-solid fa-angles-left"></i>
                        </button>
                        <div
                            onMouseDown={startResize}
                            className="absolute top-0 right-0 z-50 h-screen w-2 bg-gray-500 hover:cursor-col-resize transition-opacity duration-200 opacity-0 group-hover:opacity-100"
                        ></div>
                    </>
                )}
            </div>
            <div className="h-screen flex-1 p-4 overflow-x-auto shrink-0">
                <h2 className="font-bold">Notion</h2>
                <p className="mt-2">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Sit maxime placeat ea dolorem vitae tempore recusandae
                    numquam veniam ratione reprehenderit?
                </p>
            </div>
        </div>
    );
}

export default Text;
