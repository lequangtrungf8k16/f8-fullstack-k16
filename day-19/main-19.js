// - Luyện tập định nghĩa hàm
// - Kết hợp các phương thức xử lý mảng đã học (Hạn chế sử dụng các phương pháp vòng lặp, logic thuần)

// Bài 1
// Viết hàm hasNegative(numbers) trả về true nếu trong mảng có ít nhất một số âm.
function hasNegative(numbersEx01) {
    return numbersEx01.some(function (value, index) {
        return value < 0;
    });
}
// Kiểm tra
console.log(
    "Bài tập 1: Trong mảng có ít nhất 1 số âm?",
    hasNegative([1, 3, 4, 7, 6, -4, 7, 8])
);

// Bài 2
// Viết hàm isAllEven(numbers) để kiểm tra tất cả các phần tử có phải là số chẵn.
function isAllEven(numbersEx02) {
    return numbersEx02.every(function (value, index) {
        return value % 2 === 0;
    });
}
// Kiểm tra
console.log(
    "Bài tập 2: Các phần tử trong mảng có phải số chẵn",
    isAllEven([1, 2, 3, 4, 5, 6, 7, 8, 9])
);

// Bài 3
// Viết hàm findDivisibleBy5(numbers) trả về phần tử đầu tiên chia hết cho 5.
function findDivisibleBy5(numbersEx03) {
    return numbersEx03.find(function (value, index) {
        return value % 5 === 0;
    });
}
// Kiểm tra
console.log(
    "Bài tập 3: Phần tử đầu tiên trong mảng chia hết cho 5 là",
    findDivisibleBy5([3, 6, 8, 15, 2, 5, 10])
);

// Bài 4
// Viết hàm findLastNegative(numbers) trả về phần tử âm cuối cùng trong mảng.
function findLastNegative(numbersEx04) {
    return numbersEx04.findLast(function (value, index) {
        return value < 0;
    });
}
// Kiểm tra
console.log(
    "Bài tập 4: Phần tử âm cuối cùng trong mảng là",
    findLastNegative([3, 6, 8, 5, 2, -10, 9])
);

// Bài 5
// Viết hàm findFirstOddIndex(numbers) trả về index của phần tử lẻ đầu tiên.
function findFirstOddIndex(numbersEx05) {
    return numbersEx05.findIndex(function (value, index) {
        return value % 2 !== 0;
    });
}
// Kiểm tra
console.log(
    "Bài tập 5: Index của phần tử lẻ đầu tiên là",
    findFirstOddIndex([4, 3, 6, 8, 5, 2, -10])
);

// Bài 6
// Viết hàm findLastGreaterThan50(numbers) trả về index của phần tử cuối cùng > 50.
function findLastGreaterThan50(numbersEx06) {
    return numbersEx06.findLastIndex(function (value, index) {
        return value > 50;
    });
}
// Kiểm tra
console.log(
    "Bài tập 6: Index của phần tử cuối lớn hơn 50 là",
    findLastGreaterThan50([4, 3, 6, 80, 5, 62, -10, 5])
);

// Bài 7
// Viết hàm sum(numbers) để tính tổng tất cả các phần tử trong mảng.
function sum(numbersEx07) {
    return numbersEx07.reduce(function (acc, cur) {
        return acc + cur;
    }, 0);
}
// Kiểm tra
console.log(
    "Bài tập 7: Tổng của các phần tử trong mảng là",
    sum([4, 3, 6, 5, 7])
);

// Bài 8
// Viết hàm multiplyAll(numbers) để tính tích của các phần tử trong mảng.
function multiplyAll(numbersEx08) {
    return numbersEx08.reduce(function (acc, cur) {
        return acc * cur;
    }, 1);
}
// Kiểm tra
console.log(
    "Bài tập 8: Tích của các phần tử trong mảng là",
    multiplyAll([1, 2, 3, 4, 5])
);

// Bài 9
// Viết hàm longestStringLength(strings) để trả về độ dài của chuỗi dài nhất trong mảng.
function longestStringLength(strings) {
    return strings.reduce(function (acc, cur) {
        return acc < cur.length ? cur.length : acc;
    }, 0);
}
// Kiểm tra
console.log(
    "Bài tập 9: Độ dài của chuỗi dài nhất là",
    longestStringLength(["Java", "PHP", "Javascript", "Python"])
);

// Bài 10
// Viết hàm hasPrime(numbers) để kiểm tra xem trong mảng có số nguyên tố hay không
function hasPrime(numbers) {
    return numbers.some(function (value, index) {
        if (value < 2) {
            return false;
        } else {
            for (let i = 2; i < value; i++) {
                if (value % i === 0) {
                    return false;
                }
            }
            return true;
        }
    });
}

// Kiểm tra
console.log(
    "Bài tập 10: Trong mảng có chứa số nguyên tố không?",
    hasPrime([4, 3, 6, 5, 7])
);
