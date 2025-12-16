const ul = document.querySelector("ul");
const menu = document.querySelector("#context-menu");

let currentItem = null;

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

document.addEventListener("click", (e) => {
    if (!menu.contains(e.target)) {
        removeSelected();
        menu.style.display = "none";
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.style.display === "flex") {
        menu.style.display = "none";
    }
});

ul.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    if (e.target.tagName === "LI") {
        currentItem = e.target;
    } else if (
        e.target.parentElement?.tagName === "LI" &&
        !e.target.classList.contains("up") &&
        !e.target.classList.contains("down")
    ) {
        currentItem = e.target.parentElement;
    } else {
        menu.style.display = "none";
        return;
    }

    menu.style.display = "flex";
    menu.style.left = e.clientX + "px";
    menu.style.top = e.clientY + "px";
});

const overlay = document.querySelector("#overlay");
const renameInput = document.querySelector("#rename-input");
const saveRenameBtn = document.querySelector("#save-rename");

document.getElementById("rename").addEventListener("click", () => {
    if (!currentItem) return;

    menu.style.display = "none";
    overlay.style.display = "flex";

    let temp = currentItem.cloneNode(true);
    temp.querySelectorAll("span").forEach((span) => span.remove());
    let text = temp.textContent.trim();

    renameInput.value = text;
    renameInput.focus();
});

saveRenameBtn.addEventListener("click", () => {
    const newName = renameInput.value.trim();
    if (newName && currentItem) {
        currentItem.innerHTML = `
            ${newName}
            <span class="up">Up</span>
            <span class="down">Down</span>
        `;
    }
    overlay.style.display = "none";
});

renameInput.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        overlay.style.display = "none"; // Ẩn popup khi nhấn Esc
    }
});

overlay.addEventListener("click", (e) => {
    if (e.target === overlay) overlay.style.display = "none";
});

document.getElementById("delete").addEventListener("click", () => {
    if (!currentItem) return;
    currentItem.remove();
    menu.style.display = "none";
});
