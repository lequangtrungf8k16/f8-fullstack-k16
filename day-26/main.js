const ul = document.querySelector("ul");

ul.addEventListener("click", (e) => {
    // console.log(e.target);
    if (e.target.classList.contains("down")) {
        // console.log("down");
        // Lấy li tương ứng
        // insert vào sau phần tử kế tiếp (Item 2: Insert sau Item 3)
        const li = e.target.parentElement;
        const nextEl = li.nextElementSibling;
        // console.log(nextLi);
        if (!nextEl) {
            return;
        }
        ul.insertBefore(nextEl, li);
    }

    if (e.target.classList.contains("up")) {
        // console.log("up");
        // Lấy li tương ứng
        // insert vào trước phần tử kế tiếp (Item 3: Insert trước Item 2)
        const li = e.target.parentElement;
        const prevEl = li.previousElementSibling;
        // console.log(prevLi);
        if (!prevEl) {
            return;
        }
        ul.insertBefore(li, prevEl);
    }

    if (e.target.nodeName === "LI") {
        e.stopPropagation(); // Tránh sự kiện nổi bọt
        removeSelected();
        e.target.classList.add("selected");
        const item = e.target;
        document.onkeyup = (e) => {
            handleDuplicate(e, item);
        };
    }
});
const removeSelected = () => {
    const itemSelected = document.querySelector("ul li.selected");
    if (itemSelected) {
        itemSelected.classList.remove("selected");
    }
};

const handleDuplicate = (e, item) => {
    if (e.altKey && e.shiftKey && e.key === "ArrowDown") {
        const itemClone = item.cloneNode(true);
        itemClone.classList.remove("selected");
        const nextElement = item.nextElementSibling;

        if (nextElement) {
            ul.insertBefore(itemClone, nextElement);
        } else {
            ul.append(itemClone);
        }
    }
    if (e.key === "ArrowUp") {
        const itemClone = item.cloneNode(true);
        itemClone.classList.remove("selected");
        ul.insertBefore(itemClone, item);
    }
};

document.addEventListener("click", removeSelected);
