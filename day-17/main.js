// Bài 1: Xây dựng chức năng highlight
// Khai báo 2 biến:
// - content: Chứa 1 đoạn văn bản dài bất kỳ
// - keyword: Chứa 1 từ khóa nào đó
let content =
    "Lorem ipsum dolor sit, amet trung consectetur adipisicing elit. Quo, consectetur quang trung assumenda mollitia dolorem trung harum quasi voluptatem reprehenderit trung sapiente illum natus iste, tenetur laborum nesciunt facilis trung iusto ad tempore facere trung reiciendis!";

let lightContent = content;
let keyword = "trung";
let countKeyword = 0;

for (let i = 0; i <= content.length - keyword.length; i++) {
    let word = "";

    for (let j = 0; j < keyword.length; j++) {
        word = word + content[i + j];
    }
    if (word === keyword) {
        countKeyword++;
    }
}

lightContent = lightContent.replaceAll(
    keyword,
    `<span style="background-color: yellow;">${keyword}</span>`
);
document.body.innerHTML =
    `<h2>Bài tập 1</h2>` +
    lightContent +
    `<p>Số từ <span style="color: red;">"${keyword}"</span> lặp lại là: <span style="color: red;">${countKeyword}</span></p>`;

console.log(`Bài tập 2: Từ "${keyword}", lặp lại ${countKeyword} lần`);

// Bài 2: Kiểm tra độ mạnh yếu mật khẩu, đáp ứng tiêu chí
// - Độ dài >= 8
// - Có ít nhất 2 chữ HOA
// - Có ít nhất 2 chữ thường
// - Có ít nhất 1 số
// - Có ít nhất 1 ký tự đặc biệt: !@#$%^&*()
// Chữ hoa 65 - 90; Chữ thường 97 - 122; Số 48 - 57

let password = "Trung@12Lequang";

let uppercaseCount = 0;
let lowercaseCount = 0;
let numberCount = 0;
let characterCount = 0;
for (let i = 0; i < password.length; i++) {
    let temp = password.charCodeAt(i);
    if (temp >= 65 && temp <= 90) {
        uppercaseCount++;
    } else if (temp >= 97 && temp <= 122) {
        lowercaseCount++;
    } else if (temp >= 48 && temp <= 57) {
        numberCount++;
    } else {
        characterCount++;
        // console.log(characterCount);
    }
}

if (
    password.length < 8 ||
    uppercaseCount < 2 ||
    lowercaseCount < 2 ||
    numberCount < 1 ||
    characterCount < 1
) {
    console.log("Mật khẩu yếu");
}
if (password.length < 8) {
    console.log("Mật khẩu phải ít nhất 8 ký tự");
} else if (uppercaseCount < 2) {
    console.log("Mật khẩu phải ít nhất 2 chữ hoa");
} else if (lowercaseCount < 2) {
    console.log("Mật khẩu phải ít nhất 2 chữ thường");
} else if (numberCount < 1) {
    console.log("Mật khẩu phải ít nhất 1 số");
} else if (characterCount < 1) {
    console.log("Mật khẩu phải ít nhất 1 ký tự đặt biệt");
} else {
    console.log("Mật khẩu mạnh");
}

// Bài 3: Lọc trùng mảng
// const users = ['User 1', 'User 2', 'User 3', 'User 2', 'User 4'];
// Output:
// ['User 1', 'User 2', 'User 3', 'User 4'];

const users = ["User 1", "User 2", "User 3", "User 2", "User 4"];
const output = [];
let temp = 0;

for (let i = 0; i < users.length; i++) {
    let exist = false;
    for (let j = 0; j < temp; j++) {
        if (users[i] === output[j]) {
            exist = true;
            break;
        }
    }
    if (!exist) {
        output[temp] = users[i];
        temp++;
    }
}
console.log(`Bài 3: ${output}`);

// Bài 4: Tìm số lớn thứ hai trong mảng
// const numbers = [5, 2, 1, 9, 8, 0];
const numbers = [5, 2, 1, 9, 8, 0];
let maxNumber1 = [];
let maxNumber2 = [];

if (numbers[0] > numbers[1]) {
    maxNumber1 = numbers[0];
    maxNumber2 = numbers[1];
} else {
    maxNumber1 = numbers[1];
    maxNumber2 = numbers[0];
}

for (let i = 0; i <= numbers.length; i++) {
    let temp = numbers[i];
    if (temp > maxNumber1) {
        maxNumber2 = maxNumber1;
        maxNumber1 = temp;
    } else if (temp > maxNumber2 && temp < maxNumber1) {
        maxNumber2 = temp;
    }
}
console.log(`Bài 4: Số lớn thứ hai là: ${maxNumber2}`);

// Bài 5: Chèn phần tử vào mảng không làm thay đổi thứ tự sắp xếp
// const numbers =  [1, 3, 5, 7, 9, 11];
// const newNumber = 4; //Giá trị này có thể thay đổi
// Viết chương trình chèn vào mảng numbers mà không làm thay đổi thứ tự tăng dần của mảng
const numbersArr = [1, 3, 5, 7, 9, 11];
const newNumber = 4;

numbersArr[numbersArr.length] = newNumber; // Độ dài mảng sau khi thêm newNumber

const tempArr = numbersArr.length; // Tạo biến tạm chứa độ dài mảng mới
for (let i = 0; i < tempArr - 1; i++) {
    for (let j = 0; j < tempArr - 1; j++) {
        // Lặp và dịch chuyển vị trí, các phần tử lớn nhất chuyển dần về cuối
        if (numbersArr[j] > numbersArr[j + 1]) {
            let temp = numbersArr[j];
            numbersArr[j] = numbersArr[j + 1];
            numbersArr[j + 1] = temp;
        }
    }
}
console.log(`Bài 5: ${numbersArr}`);
