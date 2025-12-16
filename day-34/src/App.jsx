import { useEffect, useRef, useState } from "react";

function App() {
    const [sidebarWidth, setSidebarWidth] = useState("200");
    const isResizingRef = useRef(false);

    const [isOpen, setIsOpen] = useState(true);
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!isResizingRef.current) return;

            let newResize = e.clientX;
            if (newResize < 80) {
                newResize = 80;
            }
            if (newResize > 300) {
                newResize = 300;
            }

            setSidebarWidth(newResize);
            document.body.style.userSelect = "none";
        };

        const handleMouseStop = () => {
            if (isResizingRef.current) {
                isResizingRef.current = false;
                setIsDragging(false);

                document.body.style.cursor = "default";
                document.body.style.userSelect = "auto";
            }
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseStop);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseStop);
        };
    }, []);

    const startResizing = () => {
        isResizingRef.current = true;
        setIsDragging(true);

        document.body.style.userSelect = "none";
    };

    const closeSidebar = () => {
        setIsOpen(false);
    };

    const openSidebar = () => {
        setIsOpen(true);
    };

    return (
        <div className="relative flex justify-between">
            {/* Button open sidebar */}
            <button
                onClick={openSidebar}
                className={`z-50 text-2xl cursor-pointer transition-all duration-300 hover:text-blue-600 ${
                    !isOpen ? "opacity-100" : "opacity-0"
                }`}
            >
                <i className="fa-solid fa-bars absolute top-5 left-2"></i>
            </button>

            {/* Sidebar */}
            <div
                style={{ width: isOpen ? `${sidebarWidth}px` : "0px" }}
                className={`flex flex-col shrink-0 overflow-x-auto h-screen p-4 bg-gray-500 text-white text-justify ${
                    isOpen ? "opacity-100" : "opacity-0"
                } ${
                    isDragging
                        ? "transition-none"
                        : "transition-all duration-300"
                }`}
            >
                <h2 className="font-bold">Sidebar</h2>
                <p className="pt-2 wr">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
            </div>

            {/* Resize */}
            <div
                onMouseDown={startResizing}
                className={`relative border-2 border-gray-700 transition-opacity opacity-0 cursor-col-resize ${
                    isOpen
                        ? "hover:opacity-100"
                        : "border-none opacity-0 pointer-events-none"
                }`}
            >
                {/* Button close sidebar */}
                <button
                    onClick={closeSidebar}
                    onMouseDown={(e) => e.stopPropagation()}
                    className="absolute top-2 right-2 text-white cursor-pointer"
                >
                    <i className="fa-solid fa-angles-left transition-all hover:-translate-x-1"></i>
                </button>
            </div>

            {/* Main Content */}
            <div className="h-screen flex-1 p-4 text-justify shrink-0 overflow-x-auto">
                <h2 className="font-bold">Notion</h2>
                <p className="pt-2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Iure voluptatibus odit porro repellat at similique fuga
                    dolore placeat soluta. Neque!
                </p>
            </div>
        </div>
    );
}
export default App;
