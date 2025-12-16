const container = ReactDOM.createRoot(document.querySelector("#root"));

document.addEventListener("click", (e) => {
    e.preventDefault();
});

const TodoList = () => {
    const [data, setData] = React.useState([]);
    const [addInputValue, setAddInputValue] = React.useState("");
    const [msg, setMsg] = React.useState("");
    const [editIndex, setEditIndex] = React.useState(-1);
    const [editValue, setEditValue] = React.useState("");

    const [toast, setToast] = React.useState({
        show: false,
        msg: "",
        type: "success",
    });
    const ToggleToast = (message, type = "success") => {
        setToast({ show: true, msg: message, type: type });
        setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 2000);
    };

    const checkDuplicate = (text, excludeIndex = -1) => {
        const normalizedText = text.trim().toLowerCase();

        return data.some((item, index) => {
            if (index === excludeIndex) return false;

            return item.trim().toLowerCase() === normalizedText;
        });
    };

    const handleChangeValue = (e) => {
        setAddInputValue(e.target.value);
    };

    const handleAddTask = () => {
        if (editIndex !== -1) {
            ToggleToast("Hoàn tất chỉnh sửa khi thêm mới", "error");
            return;
        }

        if (!addInputValue.trim()) {
            setMsg("Không được để trống");
            return;
        }

        if (checkDuplicate(addInputValue)) {
            ToggleToast("Task này đã tồn tại", "error");
            return;
        }

        setMsg("");
        setData([...data, addInputValue]);
        setAddInputValue("");
        ToggleToast("Thêm mới thành công");
    };

    const handleStartEdit = (index) => {
        if (editIndex !== -1 && editIndex !== index) {
            ToggleToast("Hoàn thành trước khi qua dòng khác", "error");
            return;
        }
        setEditIndex(index);
        setEditValue(data[index]);
    };

    const handleSaveEdit = (e) => {
        if (!editValue.trim()) {
            ToggleToast("Vui lòng nhập nội dung", "error");
            return;
        }

        if (checkDuplicate(editValue, editIndex)) {
            ToggleToast("Task này đã tồn tại", "error");
            return;
        }

        const newData = [...data];
        newData[editIndex] = editValue;
        setData(newData);
        setEditIndex(-1);
        ToggleToast("Sửa nội dung thành công");
    };

    const handleDelete = (index) => {
        if (editIndex !== -1) {
            ToggleToast("Hoàn tất chỉnh sửa trước khi xóa", "error");
            return;
        }
        if (window.confirm("Bạn có chắc chắn muốn xóa không")) {
            setData(data.filter((item, _index) => _index !== index)); // Tham số không dùng đến có thể để dấu gạch dưới "_"
            ToggleToast("Xóa thành công");
        }
    };

    return (
        <section>
            <div
                className={`toast-notification ${toast.show ? "show" : ""} ${
                    toast.type
                }`}
            >
                {toast.msg}
            </div>
            <h2>Get Things Done !</h2>
            <div>
                <form action="#!" className="todo-form">
                    <input
                        className="todo-input"
                        type="text"
                        placeholder="What is the task todays?"
                        value={addInputValue}
                        onChange={handleChangeValue}
                        onFocus={() => setMsg("")}
                    />
                    <button onClick={handleAddTask} className="todo-btn">
                        Add Task
                    </button>
                </form>
                <div>{msg && <span>{msg}</span>}</div>
            </div>

            <ul>
                {data.map((item, index) => (
                    <li
                        key={index}
                        className={editIndex === index ? "editing" : ""}
                    >
                        {editIndex === index ? (
                            <form action="#!" className="form-edit">
                                <input
                                    className="input-edit"
                                    type="text"
                                    placeholder="What is the task todays?"
                                    value={editValue}
                                    onChange={(e) =>
                                        setEditValue(e.target.value)
                                    }
                                    autoFocus
                                />
                                <button
                                    onClick={handleSaveEdit}
                                    className="todo-btn"
                                >
                                    Add Task
                                </button>
                            </form>
                        ) : (
                            <>
                                {item}
                                <div className="action-btn">
                                    <i
                                        className="fa-regular fa-pen-to-square"
                                        onClick={() => handleStartEdit(index)}
                                    ></i>
                                    <i
                                        className="fa-solid fa-trash"
                                        onClick={() => handleDelete(index)}
                                    ></i>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </section>
    );
};
const wrapper = (
    <>
        <div>
            <TodoList />
        </div>
    </>
);

container.render(wrapper);
