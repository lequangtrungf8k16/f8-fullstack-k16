const container = ReactDOM.createRoot(document.querySelector("#root"));

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

    const handleChangeValue = (e) => {
        setAddInputValue(e.target.value);
    };

    const handleAddTask = () => {
        if (!addInputValue) {
            setMsg("Không được để trống");
        } else {
            setMsg("");
            setData([...data, addInputValue]);
            setAddInputValue("");
            ToggleToast("Thêm mới thành công");
        }
    };

    const handleEdit = (e) => {
        if (!setEditValue) {
            setMsg("");
        }
    };

    const handleDelete = (index) => {
        setData(data.filter((item, _index) => _index !== index)); // Tham số không dùng đến có thể để dấu gạch dưới "_"
        if (index === editIndex) {
            return setEditIndex(-1);
        }
        ToggleToast("Xóa thành công");
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
                <div className="container">
                    <input
                        type="text"
                        placeholder="What is the task todays?"
                        value={addInputValue}
                        onChange={handleChangeValue}
                        onFocus={() => setMsg("")}
                    />
                    <button onClick={handleAddTask} className="add-btn">
                        Add Task
                    </button>
                </div>
                <div>{msg && <span>{msg}</span>}</div>
            </div>

            <ul>
                {data.map((item, index) => (
                    <li key={index}>
                        {item}
                        <div className="action-btn">
                            <i className="fa-regular fa-pen-to-square"></i>

                            <i
                                className="fa-solid fa-trash"
                                key={index}
                                onClick={() => handleDelete(index)}
                            ></i>
                        </div>
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
console.log(wrapper);

container.render(wrapper);

// const container = ReactDOM.createRoot(document.querySelector("#root"));

// const TodoList = () => {
//     const [addInputValue, setAddInputValue] = React.useState("");
//     const [data, setData] = React.useState([]);

//     // State Edit
//     const [editIndex, setEditIndex] = React.useState(-1);
//     const [editValue, setEditValue] = React.useState("");

//     const [toast, setToast] = React.useState({
//         show: false,
//         msg: "",
//         type: "success",
//     });

//     // Helper: Toast
//     const triggerToast = (message, type = "success") => {
//         setToast({ show: true, msg: message, type: type });
//         setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 2000);
//     };

//     // --- HÀM KIỂM TRA TRÙNG LẶP (MỚI) ---
//     const checkDuplicate = (text, excludeIndex = -1) => {
//         // Chuẩn hóa text: xóa khoảng trắng 2 đầu và chuyển về chữ thường
//         const normalizedText = text.trim().toLowerCase();

//         return data.some((item, index) => {
//             // Nếu index trùng với excludeIndex (đang sửa chính dòng đó) thì bỏ qua
//             if (index === excludeIndex) return false;

//             // So sánh nội dung
//             return item.trim().toLowerCase() === normalizedText;
//         });
//     };

//     // --- Action: Add ---
//     const handleAddTask = () => {
//         if (!addInputValue.trim()) {
//             triggerToast("Vui lòng nhập nội dung!", "error");
//             return;
//         }

//         // Kiểm tra trùng
//         if (checkDuplicate(addInputValue)) {
//             triggerToast("Task này đã tồn tại!", "error");
//             return;
//         }

//         setData([...data, addInputValue]);
//         setAddInputValue("");
//         triggerToast("Thêm thành công!");
//     };

//     // --- Action: Edit ---
//     const handleStartEdit = (index) => {
//         setEditIndex(index);
//         setEditValue(data[index]);
//     };

//     const handleSaveEdit = () => {
//         if (!editValue.trim()) {
//             triggerToast("Nội dung không được để trống!", "error");
//             return;
//         }

//         // Kiểm tra trùng (truyền vào index hiện tại để loại trừ chính nó)
//         if (checkDuplicate(editValue, editIndex)) {
//             triggerToast("Task này đã tồn tại!", "error");
//             return;
//         }

//         const newData = [...data];
//         newData[editIndex] = editValue;
//         setData(newData);
//         setEditIndex(-1);
//         triggerToast("Sửa thành công!");
//     };

//     // --- Action: Delete ---
//     const handleDelete = (index) => {
//         setData(data.filter((_, i) => i !== index));
//         if (index === editIndex) setEditIndex(-1);
//         triggerToast("Xóa thành công!");
//     };

//     return (
//         <section>
//             <div
//                 className={`toast-notification ${toast.show ? "show" : ""} ${
//                     toast.type
//                 }`}
//             >
//                 {toast.msg}
//             </div>

//             <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
//                 Get Things Done!
//             </h2>

//             <div className="todo-form">
//                 <input
//                     className="todo-input"
//                     type="text"
//                     placeholder="What is the task today?"
//                     value={addInputValue}
//                     onChange={(e) => setAddInputValue(e.target.value)}
//                 />
//                 <button className="todo-btn" onClick={handleAddTask}>
//                     Add Task
//                 </button>
//             </div>

//             <ul>
//                 {data.map((item, index) => (
//                     <li
//                         key={index}
//                         className={editIndex === index ? "editing" : ""}
//                     >
//                         {editIndex === index ? (
//                             <div className="todo-form">
//                                 <input
//                                     className="todo-input"
//                                     type="text"
//                                     value={editValue}
//                                     onChange={(e) =>
//                                         setEditValue(e.target.value)
//                                     }
//                                     autoFocus
//                                 />
//                                 <button
//                                     className="todo-btn"
//                                     onClick={handleSaveEdit}
//                                 >
//                                     Add Task
//                                 </button>
//                             </div>
//                         ) : (
//                             <>
//                                 <span>{item}</span>
//                                 <div>
//                                     <i
//                                         className="fa-regular fa-pen-to-square"
//                                         onClick={() => handleStartEdit(index)}
//                                         style={{
//                                             cursor: "pointer",
//                                             marginRight: "15px",
//                                         }}
//                                     ></i>
//                                     <i
//                                         className="fa-solid fa-trash"
//                                         onClick={() => handleDelete(index)}
//                                         style={{ cursor: "pointer" }}
//                                     ></i>
//                                 </div>
//                             </>
//                         )}
//                     </li>
//                 ))}
//             </ul>
//         </section>
//     );
// };

// container.render(<TodoList />);
