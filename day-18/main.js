// Bài 1
// Cho trước mảng:
// const arr = [1, 2, 3, 4, 5, 6];
// - Tạo mảng mới chứa bình phương của từng phần tử.
// - Tạo mảng mới chứa các số chẵn trong mảng.
// - Tạo mảng mới chứa các số bình phương nhưng chỉ lấy số lẻ.
const arr = [1, 2, 3, 4, 5, 6];
const newArrDouble = [];
const newArrEven = [];
const newArrOddDouble = [];
for (let i = 0; i < arr.length; i++) {
    // - Tạo mảng mới chứa bình phương của từng phần tử.
    newArrDouble.push(arr[i] * arr[i]);
    // - Tạo mảng mới chứa các số chẵn trong mảng.
    if (i % 2 !== 0) {
        newArrEven.push(arr[i]);
    }
    // - Tạo mảng mới chứa các số bình phương nhưng chỉ lấy số lẻ.
    if (i % 2 === 0) {
        newArrOddDouble.push(arr[i] * arr[i]);
    }
}
console.log("Bài 1");
console.log(newArrDouble);
console.log(newArrEven);
console.log(newArrOddDouble);

// Bài 2
// Cho trước mảng:
// const names = ["   hoang ", "AN", "  f8   ", "Education"];
// - Tạo mảng mới chứa các phần tử đã được xoá khoảng trắng thừa và viết thường toàn bộ.
// Kết quả: `["hoang", "an", "f8", "education"]`
// - Tạo mảng mới viết chữ cái đầu hoa (Hoang, An, F8, Education)
const names = ["   hoang ", "AN", "  f8   ", "Education"];
const newArrLowerCase = [];
const newArrUpperCase = [];
// - Tạo mảng mới chứa các phần tử đã được xoá khoảng trắng thừa và viết thường toàn bộ.
for (let i = 0; i < names.length; i++) {
    newArrLowerCase.push(names[i].trim().toLowerCase());
}
// - Tạo mảng mới viết chữ cái đầu hoa (Hoang, An, F8, Education)
for (let j = 0; j < newArrLowerCase.length; j++) {
    let temp = newArrLowerCase[j];
    let result = temp.charAt(0).toUpperCase() + temp.slice(1);
    newArrUpperCase.push(result);
}
console.log("Bài 2");
console.log(newArrLowerCase);
console.log(newArrUpperCase);

// Bài 3
// Cho trước mảng:
// const nums = [3, 7, 2, 9, 12, 15, 18];
// - Lấy ra mảng mới chỉ chứa số lớn hơn hoặc bằng 10.
// - Từ mảng mới trên, tạo mảng chỉ chứa số chia hết cho 3.
// - Với mảng ban đầu, tạo mảng mới tăng gấp đôi nhưng chỉ giữ lại số lẻ.
const nums = [3, 7, 2, 9, 12, 15, 18];
const numberUpTo10 = [];
const numberDivBy3 = [];
const numberOddDouble = [];
for (let i = 0; i < nums.length; i++) {
    // - Lấy ra mảng mới chỉ chứa số lớn hơn hoặc bằng 10.
    if (nums[i] >= 10) {
        numberUpTo10.push(nums[i]);
    }
}
// - Từ mảng mới trên, tạo mảng chỉ chứa số chia hết cho 3.
for (let j = 0; j < numberUpTo10.length; j++) {
    if (numberUpTo10[j] % 3 === 0) {
        numberDivBy3.push(numberUpTo10[j]);
    }
}
// - Với mảng ban đầu, tạo mảng mới tăng gấp đôi nhưng chỉ giữ lại số lẻ.
for (let i = 0; i < nums.length; i++) {
    if (nums[i] % 2 !== 0) {
        numberOddDouble.push(nums[i] * 2);
    }
}
console.log("Bài 3");
console.log(numberUpTo10);
console.log(numberDivBy3);
console.log(numberOddDouble);

// Bài 4
// Cho trước mảng
// const words = ["javascript", "php", "css", "html", "python", "java"];
// - Lọc ra các từ có độ dài >= 5.
// - Tạo mảng mới viết hoa toàn bộ.
// - Tạo mảng mới viết ngược từng chuỗi (tpircsavaj, avaj...)
const words = ["javascript", "php", "css", "html", "python", "java"];
const wordsThan5 = [];
const wordsUpperCaseAll = [];
const wordsReverse = [];
for (let i = 0; i < words.length; i++) {
    // - Lọc ra các từ có độ dài >= 5.
    if (words[i].length >= 5) {
        wordsThan5.push(words[i]);
    }
}
// - Tạo mảng mới viết hoa toàn bộ.
for (let i = 0; i < words.length; i++) {
    wordsUpperCaseAll.push(words[i].toUpperCase());
}
// - Tạo mảng mới viết ngược từng chuỗi (tpircsavaj, avaj...)
for (let i = 0; i < words.length; i++) {
    let temp = words[i];
    // console.log(words[i]);
    let reverseString = "";
    // console.log(reverseString);
    for (let j = temp.length - 1; j >= 0; j--) {
        reverseString = reverseString + temp[j];
    }
    wordsReverse.push(reverseString);
}
console.log("Bài 4");
console.log(wordsThan5);
console.log(wordsUpperCaseAll);
console.log(wordsReverse);

// Bài 5
// Cho trước mảng
// const myArr = [
//   [1, 2, 3],
//   [4, 5, 6],
//   [7, 8, 9]
// ];
// - Tạo mảng chứa tổng từng hàng => [6, 15, 24]
// - Tạo mảng chứa tổng từng cột => [12, 15, 18]
// - Lọc ra các hàng có tổng > 10.
const myArr = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
];
const totalRow = [];
const totalCol = [];
const rowSum10 = [];
// - Tạo mảng chứa tổng từng hàng => [6, 15, 24]
for (let i = 0; i < myArr.length; i++) {
    let temp = 0;
    for (let j = 0; j < myArr[i].length; j++) {
        temp = temp + myArr[i][j];
    }
    totalRow.push(temp);
}
// - Tạo mảng chứa tổng từng cột => [12, 15, 18]

// - Lọc ra các hàng có tổng > 10.
for (let i = 0; i < myArr.length; i++) {
    let temp = 0;
    for (let j = 0; j < myArr[i].length; j++) {
        temp = temp + myArr[i][j];
    }
    if (temp > 10) {
        rowSum10.push(temp);
    }
}
console.log("Bài 5");
console.log(totalRow);
console.log(totalCol);
console.log(rowSum10);

// Bài 6
// Cho trước mảng
// const myArr = [
//   ["hello", "world"],
//   ["javascript", "php"],
//   ["css", "html"]
// ]
// - Tạo mảng mới viết hoa tất cả từ.
// - Lọc ra các từ có độ dài > 4.
// - Ghép tất cả thành 1 mảng 1 chiều.
const myArray = [
    ["hello", "world"],
    ["javascript", "php"],
    ["css", "html"],
];
const myArrayUppercase = [];
const myArrayThan4 = [];
const newArray = [];

for (let i = 0; i < myArray.length; i++) {
    // - Tạo mảng mới viết hoa tất cả từ.
    let temp = myArray[i];
    for (let j = 0; j < myArray[i].length; j++) {
        myArrayUppercase.push(myArray[i][j].toUpperCase());
        // - Lọc ra các từ có độ dài > 4.
        if (myArray[i][j].length > 4) {
            myArrayThan4.push(myArray[i][j]);
        }
        // - Ghép tất cả thành 1 mảng 1 chiều.
        newArray.push(myArray[i][j]);
    }
}
console.log("Bài 6");
console.log(myArrayUppercase);
console.log(myArrayThan4);
console.log(newArray);

// Bài 7
// const myArr = [
//   [2, 4, 6],
//   [8, 10, 12],
//   [14, 16, 18]
// ]
// - Lấy ra các phần tử trên đường chéo chính => [2, 10, 18].
// - Lấy ra các phần tử trên đường chéo phụ => [6, 10, 14].
// - Tính tổng của đường chéo chính và phụ.
const myArray2 = [
    [2, 4, 6],
    [8, 10, 12],
    [14, 16, 18],
];
const sum1 = [];
// - Lấy ra các phần tử trên đường chéo chính => [2, 10, 18].
for (let i = 0; i < myArray2.length; i++) {
    sum1.push(myArray2[i][i]);
}
// - Lấy ra các phần tử trên đường chéo phụ => [6, 10, 14].

// - Tính tổng của đường chéo chính và phụ.

console.log("Bài 7");
console.log(sum1);

// Bài 8
// Cho mảng 2 chiều (điểm số của học sinh):
// const scores = [
//   [8, 9, 7],   // học sinh 1
//   [6, 5, 7],   // học sinh 2
//   [10, 9, 8]   // học sinh 3
// ]
// - Tính điểm trung bình của từng học sinh => [8, 6, 9].
// - Lọc ra những học sinh có điểm trung bình >= 8.
// - Tạo mảng mới tăng tất cả điểm thêm 1 (nếu chưa vượt quá 10).
const scores = [
    [8, 9, 7], // học sinh 1
    [6, 5, 7], // học sinh 2
    [10, 9, 8], // học sinh 3
];

const scoresAverage = [];
// - Tính điểm trung bình của từng học sinh => [8, 6, 9].
for (let i = 0; i < scores.length; i++) {
    let sumScores = 0;
    const temp = scores[i];
    // console.log(temp);
    for (let j = 0; j < temp.length; j++) {
        sumScores = sumScores + temp[j];
        // console.log(sum);
    }
    const average = sumScores / temp.length;
    scoresAverage.push(average);
}
// - Lọc ra những học sinh có điểm trung bình >= 8.

// - Tạo mảng mới tăng tất cả điểm thêm 1 (nếu chưa vượt quá 10).

console.log("Bài 8");
console.log(scoresAverage);
