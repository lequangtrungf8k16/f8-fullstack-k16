import { useState } from "react";

export const PostDetailModal = () => {
    const [post, setPost] = useState(null);
    const [showModal, setShowModal] = useState(false);

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

    return <div>PostDetailModal</div>;
};
