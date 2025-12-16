// Toán tử

// Kiểu dữ liệu
// number
// string
// boolean
// object
// null
// undefined
// bigInt
// symbol


// let age = 40;
// console.log(typeof age);

// console.log(typeof(age));


// let user = null;
// console.log(typeof user);

// // bigInt
// let price = 12000n;
// console.log(price);

// let a = "10";
// let b = 20;

// // ép kiểu
// a = Number(a); // hoặc a = +a;

// let c = a + b;
// console.log(c);

// let d = 10;
// let e = 0;
// let f = d / e;
// console.log(f);


// // Trừ phép + còn lại tự động ép kiểu

// let g = 10;
// let h = "20";
// let i = g * h;
// console.log(i);


// // NaN là kiểu number không xác định: not a number
// // khi ép kiểu không thành công sẽ chuyển về NaN


// // chia lấy dư
// let k = 1.5 % 1;
// console.log(k);

// // Lũy thừa
// let j = 10 ** 3;
// console.log(j);


// let l = -(10 ** 3);
// console.log(l);

// // Tăng, giảm 1 đơn vị
// let count = 0;
// count++;
// ++count;
// console.log(count);


// let total;
// let counts = 1;
// total = counts++;
// total = ++counts;

// console.log("total: ", total);
// console.log("counts: ", counts);

// Toán tử so sánh
let a = 20;
let b = "20";
let c = a == b;
console.log(c);

let d = a === b;
console.log(d);

// So sánh chuỗi
let str1 = "quangtrung";
let str2 = "trung;"
console.log(str1 < str2); // So sánh theo vần abc: t > q, in hoa lớn hơn  in thường A > a

// truthy và falsy
let e = 10;
if (e > 0) {
    console.log("Đúng");

} else {
    console.log("Sai");
    
}
    
// Toán tử luận lý: and = &&; or = ||; not = !
let f = 10;
let result = f && 5 && 5 < 0 && 1 && "F8";
console.log(f);

let g = 10;
let results = null || 0 || 5 > 0 || 10 || undefined;
console.log(results);

let h = 10;

let total1 = !h;
console.log(total1);

let total2 = !!h
console.log(total2);

// Toán tử nullish: ??

let i = null;
let j = 20;
let result1 = i ?? j;
console.log(result1);


