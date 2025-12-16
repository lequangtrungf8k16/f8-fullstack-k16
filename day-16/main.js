// Bài tập 1
// Học viên viết chương trình tiền điện hàng tháng theo yêu cầu sau
// Input: Số điện tiêu thụ hàng tháng
// Output: Hiển thị số tiền phải đóng
// Chi tiết giá điện theo bậc

const ELECTRO_PRICE_1 = 1678; // Giá điện bậc 1
const ELECTRO_PRICE_2 = 1734; // Giá điện bậc 2
const ELECTRO_PRICE_3 = 2014; // Giá điện bậc 3
const ELECTRO_PRICE_4 = 2536; // Giá điện bậc 4
const ELECTRO_PRICE_5 = 2927; // Giá điện bậc 5
const ELECTRO_PRICE_6 = 2927; // Giá điện bậc 6
const ENERGY_CONS_1 = 50; // Số kWh bậc 1: 0 - 50
const ENERGY_CONS_2 = 100; // Số kWh bậc 2: 51 - 100
const ENERGY_CONS_3 = 200; // Số kWh bậc 3: 101 - 200
const ENERGY_CONS_4 = 300; // Số kWh bậc 4: 201 - 300
const ENERGY_CONS_5 = 400; // Số kWh bậc 5: 301 - 400
// Còn lại số kWh bậc 6: 401 trở lên

let input = 700; // Số điện tiêu thụ hàng tháng
let output; // Số tiền phải đóng

if (input <= 0) {
    console.log("Không hợp lệ");
} else {
    if (input <= ENERGY_CONS_1) {
        output = input * ELECTRO_PRICE_1;
    } else if (input <= ENERGY_CONS_2) {
        output =
            ENERGY_CONS_1 * ELECTRO_PRICE_1 +
            (input - ENERGY_CONS_1) * ELECTRO_PRICE_2;
    } else if (input <= ENERGY_CONS_3) {
        output =
            ENERGY_CONS_1 * ELECTRO_PRICE_1 +
            (ENERGY_CONS_2 - ENERGY_CONS_1) * ELECTRO_PRICE_2 +
            (input - ENERGY_CONS_2 - ENERGY_CONS_1) * ELECTRO_PRICE_3;
    } else if (input <= ENERGY_CONS_4) {
        output =
            ENERGY_CONS_1 * ELECTRO_PRICE_1 +
            (ENERGY_CONS_2 - ENERGY_CONS_1) * ELECTRO_PRICE_2 +
            (ENERGY_CONS_3 - ENERGY_CONS_2) * ELECTRO_PRICE_3 +
            (input - ENERGY_CONS_3 - ENERGY_CONS_2 - ENERGY_CONS_1) *
                ELECTRO_PRICE_4;
    } else if (input <= ENERGY_CONS_5) {
        output =
            ENERGY_CONS_1 * ELECTRO_PRICE_1 +
            (ENERGY_CONS_2 - ENERGY_CONS_1) * ELECTRO_PRICE_2 +
            (ENERGY_CONS_3 - ENERGY_CONS_2) * ELECTRO_PRICE_3 +
            (ENERGY_CONS_4 - ENERGY_CONS_3) * ELECTRO_PRICE_4 +
            (input -
                ENERGY_CONS_4 -
                ENERGY_CONS_3 -
                ENERGY_CONS_2 -
                ENERGY_CONS_1) *
                ELECTRO_PRICE_5;
    } else {
        output =
            ENERGY_CONS_1 * ELECTRO_PRICE_1 +
            (ENERGY_CONS_2 - ENERGY_CONS_1) * ELECTRO_PRICE_2 +
            (ENERGY_CONS_3 - ENERGY_CONS_2) * ELECTRO_PRICE_3 +
            (ENERGY_CONS_4 - ENERGY_CONS_3) * ELECTRO_PRICE_4 +
            (ENERGY_CONS_5 - ENERGY_CONS_4) * ELECTRO_PRICE_5 +
            (input - ENERGY_CONS_5) * ELECTRO_PRICE_6;
    }
    console.log(`Bài 1: Số tiền điện phải đóng hàng tháng là: ${output} đồng`);
}

// Bài tập 2
// Viết chương trình kiểm tra 1 số có phải số nguyên tố hay không?

let number = 4;
let primeNumber = true;
if (number <= 1) {
    console.log(`Số ${number} không phải là số nguyên tố`);
} else {
    for (let i = 2; i < number; i++) {
        if (number % i === 0) {
            primeNumber = false;
            break;
        }
    }
    if (primeNumber) {
        console.log(`Số ${number} là số nguyên tố`);
    } else {
        console.log(`Bài 2: Số ${number} không phải là số nguyên tố`);
    }
}

// Bài tập 3
// Cho 1 số nguyên bất kỳ, hiển thị danh sách các số chẵn và số lẻ
// Input:
// var n = 10;
// Output:
// Số lẻ: 1, 3, 5, 7, 9
// Số chẵn: 2, 4, 6, 8, 10
var x = 10;
let evenNumber = "";
let oddNumber = "";
for (let i = 1; i <= x; i++) {
    if (i % 2 === 0) {
        evenNumber = evenNumber + i + ", ";
    } else {
        oddNumber = oddNumber + i + ", ";
    }
}
console.log(`Bài 3: Dãy số chẵn là: ${evenNumber}\nDãy số lẻ là: ${oddNumber}`);
// \n: Dấu xuống dòng

// Bài tập 4
// Cho trước số nguyên n. Tính giá trị biểu thức sau
// S= 1*2 + 2*3 + 3*4 + ... + n*(n+1)
let n = 10;
let result = 0;
for (let i = 1; i <= n; i++) {
    result = result + i * (i + 1);
}
console.log(`Bài 4: Giá trị biểu thức là: ${result}`);

// Bài tập 5
// Cho trước 2 số a, b. Tính tổng số chẵn và số lẻ trong khoảng từ a đến b
// Input:
// var a = 5, b = 9;
// Output:
// Tổng số lẻ: 21
// Tổng số chẵn: 14

var a = 5,
    b = 9;
let evenTotal = 0;
let oddTotal = 0;

if (a > b) {
    console.log("Không hợp lệ");
} else {
    for (let i = a; i <= b; i++)
        if (i % 2 === 0) {
            evenTotal = evenTotal + i;
        } else {
            oddTotal = oddTotal + i;
        }
    console.log(
        `Bài 5: Tổng số chẵn là: ${evenTotal} \nTổng số lẻ là: ${oddTotal}`
    );
}

// Bài tập 6
// Vẽ bàn cờ vua bằng cách dùng vòng lặp
let chessBoard = 8;
let html = `<h2>Bài tập 6</h2>`;
html = html + `<table>`;
for (let i = 1; i <= chessBoard; i++) {
    html = html + `<tr>`;
    for (let j = 1; j <= chessBoard; j++) {
        if ((i + j) % 2 === 0) {
            html = html + `<td class="square_even"></td>`;
        } else {
            html = html + `<td class="square_odd"></td>`;
        }
    }
    html = html + `</tr>`;
}
html = html + `</table>`;

document.body.innerHTML = html;

// Bài tập 8
// Vẽ tam giác số với n dòng
// Ví dụ n = 5
// 1
// 2 3
// 4 5 6
// 7 8 9 10
// 11 12 13 14 15

let rowNumber = 4;
let currentNumber = 1;
console.log(`Bài 8: vẽ tam giác ${rowNumber} hàng`);
let result1 = ""; // Tính số lần

for (let i = 1; i <= rowNumber; i++) {
    for (let j = 1; j <= i; j++) {
        result1 = result1 + currentNumber + " ";
        currentNumber++; // Khi lặp xong thì tăng thêm 1 đến khi = row thì dừng
    }
    result1 = result1 + "\n";
}
console.log(result1);
