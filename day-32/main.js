const container = ReactDOM.createRoot(document.querySelector("#root"));

const TodoList = () => {
    const [inputValue, setInputValue] = React.useState("");
    const [msg, setMsg] = React.useState("");
    const [data, setData] = React.useState([]);

    const handleChangeValue = (e) => {
        setInputValue(e.target.value);
    };

    const handleClickBtn = () => {
        if (!inputValue) {
            setMsg("Vui lòng nhập nội dung");
        } else {
            setMsg("");
            setData([...data, inputValue]);
            setInputValue("");
        }
    };

    const handleDelete = (index) => {
        setData(data.filter((item, _index) => _index !== index)); // Tham số không dùng đến có thể để dấu gạch dưới "_"
    };

    return (
        <section>
            <h2>Get Things Done !</h2>
            <div>
                <div className="container">
                    <input
                        type="text"
                        placeholder="What is the task todays?"
                        value={inputValue}
                        onChange={handleChangeValue}
                    />
                    <button onClick={handleClickBtn} className="add-btn">
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
