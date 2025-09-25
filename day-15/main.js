// Bài tập buổi 15

// Bài tập 1: Viết chương trình khai báo một biến age và gán giá trị số tuổi của bạn.
// Sau đó, in ra câu:
// Tôi năm nay <age> tuổi.

const age = 41;
console.log("Tôi năm nay", age, "tuổi");

// Bài tập 2
// Khai báo hằng số PI = 3.14159. Tính diện tích hình tròn với bán kính r = 5.

const PI = 3.14159;
const r = 5;
const s = PI * r ** 2;
console.log("Diện tích hình tròn là:", s);

// Bài tập 3
// Viết chương trình tính:
// Tổng 2 số a = 7, b = 3
// Hiệu, tích, thương, số dư

const a = 7;
const b = 3;
const total = a + b;
const subtract = a - b;
const multiply = a * b;
const divide = a / b;
const remainder = a % b;
console.log("Tổng:", total);
console.log("Hiệu:", subtract);
console.log("Tích:", multiply);
console.log("Thương:", divide);
console.log("Chia lấy dư:", remainder);

// Bài tập 4
// Cho các biến
// let name = "";
// let defaultName = "Khách";
// Hãy gán cho biến displayName giá trị name nếu name có nội dung, ngược lại là defaultName

let name = "";
let defaultName = "Khách";
// test
const displayName = name || defaultName;
console.log(displayName);

// Bài tập 5
// Viết chương trình kiểm tra một người có đủ điều kiện lái xe không. Điều kiện:
// Tuổi ≥ 18 (age)
// Có bằng lái (hasLicense = true)
// Nếu đủ điều kiện thì in "Đủ điều kiện", ngược lại "Không đủ điều kiện".

const driveAge = 18;
const hasLicense = false;

if (driveAge >= 18 && hasLicense) {
    console.log("Đủ điều kiện");
} else {
    console.log("Không đủ điều kiện");
}

// Bài tập 6
// Cho 2 biến username và password.
// Dùng toán tử đã học để kiểm tra xem username và password khác rỗng không (In ra giá trị boolean)

let username = "";
let password = "";
const result = username !== "" && password !== "";
console.log(result);

// Bài tập 7
// Cho trước giá khuyến mãi (salePrice), tỷ lệ giảm giá (discountRate). Tính giá gốc của sản phẩm (price)
const salePrice = 200;
const discountRate = 10;
const price = salePrice / ((100 - discountRate) / 100);
console.log("Giá gốc của sản phẩm:", price);

// Bài tập 8
// Cho trước 2 biến a, b. Gán giá trị số cho 2 biến.
// Yêu cầu: Hoán vị giá trị biến nhưng không được dùng biến trung gian

let aa = 10;
let bb = 50;
console.log("Trước khi hoán đổi:", "aa là:", aa, "bb là:", bb);
aa = aa + bb;
bb = aa - bb;
aa = aa - bb;
console.log("Sau khi hoán đổi:", "aa là:", aa, "bb là:", bb);
