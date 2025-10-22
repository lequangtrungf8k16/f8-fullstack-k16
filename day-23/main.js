const inputUsernameEl = document.querySelector(".username");
const inputEmailEl = document.querySelector(".email");
const inputPassEl = document.querySelector(".pass");
const inputRePassEl = document.querySelector(".re-pass");
const btnEl = document.querySelector(".btn");

const errorUsernameEl = document.querySelector(".error-username");
const errorEmailEl = document.querySelector(".error-email");
const errorPassEl = document.querySelector(".error-pass");
const errorRePassEl = document.querySelector(".error-repass");

btnEl.addEventListener("click", (e) => {
    e.preventDefault();
    errorUsernameEl.innerText = "";
    errorEmailEl.innerText = "";
    errorPassEl.innerText = "";
    errorRePassEl.innerText = "";

    let hasError = false;

    if (!inputUsernameEl.value.trim()) {
        errorUsernameEl.innerText = "Vui lòng nhập tên";
        hasError = true;
    }
    if (
        !inputEmailEl.value.trim() ||
        !/^[\w.-]+@[\w.-]+\.\w+$/.test(inputEmailEl.value)
    ) {
        errorEmailEl.innerText = "Vui lòng nhập email hợp lệ";
        hasError = true;
    }
    if (!inputPassEl.value.trim()) {
        errorPassEl.innerText = "Vui lòng nhập mật khẩu";
        hasError = true;
    }
    if (inputPassEl.value !== inputRePassEl.value) {
        errorRePassEl.innerText = "Mật khẩu không khớp";
        hasError = true;
    }
    if (!hasError) {
        console.log("Đăng ký thành công");
    }
});
