const formEl = document.querySelector("#js-form");
const inputEl = document.querySelector(".js-input");
const todoListEl = document.querySelector("#js-todo-list");
const editTodoListEl = document.querySelector("#js-edit");

formEl.addEventListener("submit", (e) => {
    e.preventDefault();

    const task = inputEl.value.trim();
    if (task === "") {
        return alert("Không được để trống");
    }

    const tasks = Array.from(todoListEl.querySelectorAll("p"));
    if (
        tasks.some(
            (checkTask) =>
                checkTask.textContent.trim().toLowerCase() ===
                task.toLowerCase()
        )
    ) {
        return alert("Task này đã tồn tại");
    }

    const todoItemEl = document.createElement("div");
    todoItemEl.className =
        "todo-list flex items-center justify-between bg-violet-500 mt-8 px-2 py-2 rounded-md";
    todoItemEl.innerHTML = `<p class="flex-1 text-white">${task}</p>
    <div class="action flex gap-2 text-white justify-center">
        <i class="js-edit-task fa-solid fa-pen-to-square hover:cursor-pointer"></i>
        <i class="js-del-task fa-solid fa-trash hover:cursor-pointer"></i>        
    </div>    
    `;
    // console.log(todoItemEl);
    todoListEl.append(todoItemEl);

    todoListEl.classList.remove("hidden");
    inputEl.value = "";

    const editTaskEl = todoItemEl.querySelector(".js-edit-task");
    const delTaskEl = todoItemEl.querySelector(".js-del-task");
    const p = todoItemEl.querySelector("p");

    editTaskEl.addEventListener("click", () => {
        todoItemEl.classList.add("hidden");

        const editWrapper = document.createElement("div");
        editWrapper.className = "edit-wrapper";

        editWrapper.innerHTML = `
        <form class="flex justify-between mt-8">
            <input class="js-edit-input flex-2 border-2 border-violet-500 text-white px-2 py-1.5 placeholder:text-white-700 focus:outline-none" 
                   type="text" placeholder="What is the task today?" spellcheck="false" autocomplete="off" 
                   value="${p.textContent.trim()}">
            <button type="submit" class="js-btn flex-1 w-full bg-violet-500 text-white font-bold hover:cursor-pointer">Save Task</button>
        </form>
    `;
        todoItemEl.before(editWrapper);

        // console.log(editTodoListEl.innerHTML);

        const editForm = editWrapper.querySelector("form");
        const editInput = editForm.querySelector(".js-edit-input");

        editForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const newTask = editInput.value.trim();
            if (!newTask) return alert("Không được để trống");

            const allVisibleTasks = todoListEl.querySelectorAll(
                ".todo-list:not(.hidden) p"
            );
            const tasks = Array.from(allVisibleTasks);
            if (
                tasks.some(
                    (task) =>
                        task !== p &&
                        task.textContent.trim().toLowerCase() ===
                            newTask.trim().toLowerCase()
                )
            ) {
                return alert("Task này đã tồn tại");
            }

            p.textContent = newTask;

            editWrapper.remove();
            todoItemEl.classList.remove("hidden");
        });
    });

    delTaskEl.addEventListener("click", () => {
        const isConfirm = confirm("Bạn có chắc chắn muốn xóa không?");
        if (isConfirm) {
            todoItemEl.remove();
            if (todoListEl.children.length === 0) {
                todoListEl.classList.add("hidden");
            }
        }
    });
});
