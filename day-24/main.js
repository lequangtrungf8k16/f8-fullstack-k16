const formEl = document.querySelector("#js-form");
const inputEl = document.querySelector(".js-input");
const btnEl = document.querySelector(".js-btn");
const todoListEl = document.querySelector("#js-todo-list");
const editTodoListEl = document.querySelector("#js-edit");

formEl.addEventListener("submit", (e) => {
    e.preventDefault();

    const task = inputEl.value.trim();
    if (task === "") {
        return alert("Không được để trống");
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
    if (task === task) {
        todoListEl.append(todoItemEl);
    }

    todoListEl.classList.remove("hidden");

    inputEl.value = "";

    const editTaskEl = todoItemEl.querySelector(".js-edit-task");
    const delTaskEl = todoItemEl.querySelector(".js-del-task");
    const p = todoItemEl.querySelector("p");
    const editFormEl = editTaskEl.addEventListener("click", () => {
        todoListEl.classList.add("hidden");
        editTodoListEl.classList.remove("hidden");

        editTodoListEl.innerHTML = `
        <form class="flex justify-between mt-8">
        <input class="js-input flex-1 border-2 border-violet-500 text-white px-2 py-1.5 placeholder:text-white-700 focus:outline-none" type="text" placeholder="What is the task today?" spellcheck="false" autocomplete="off" value="${p.textContent.trim()}">
        <button type="submit" class="js-btn bg-violet-500 text-white font-bold px-3 hover:cursor-pointer"> Add Task </button>
        </form>   
        `;
    });
    const editForm = document.querySelector("#edit-form");
    const editInput = document.querySelector(".edit-input");
    editForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const newTask = editInput.value.trim();
        if (newTask === p.textContent.trim()) {
            alert("Nội dung này đã có");
        }
        if (newTask === "") {
            return alert("Không được để trống");
        }
        p.textContent = newTask;

        editTodoListEl.classList.add("hidden");
        todoListEl.classList.remove("hidden");
    });

    delTaskEl.addEventListener("click", () => {
        todoItemEl.remove();
        if (todoListEl.children.length === 0) {
            alert("Bạn có chắc chắn muốn xóa không?");
            todoListEl.classList.add("hidden");
        }
    });
});
