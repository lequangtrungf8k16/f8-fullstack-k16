// Bài 1
// Cho trước mảng sau:
const users = [
    { name: "An", age: 25 },
    { name: "Bình", age: 30 },
    { name: "Chi", age: 22 },
];

// Yêu cầu:
// - In ra tên của tất cả người dùng.
console.log("Bài 1:");
console.log("- Tên của tất cả người dùng");
users.forEach((users) => {
    console.log(users.name);
});

// - Tìm người có tuổi lớn nhất.
function oldest(users) {
    return users.reduce(function (max, cur) {
        return max.age > cur.age ? max : cur;
    }, {});
}
console.log("- Người có tuổi lớn nhất:", oldest(users));

// - Tính tuổi trung bình của tất cả người dùng.
function averageAge(users) {
    return users.reduce(function (sum, cur) {
        return sum + cur.age / users.length;
    }, 0);
}
console.log("- Tuổi trung bình:", averageAge(users));

// Bài 2
// Cho trước mảng sau:
const products = [
    { name: "Laptop", price: 15000000 },
    { name: "Mouse", price: 250000 },
    { name: "Keyboard", price: 800000 },
];

// Yêu cầu:
// - Tạo mảng mới chỉ chứa tên sản phẩm.
console.log("Bài 2:");
console.log("- Mảng mới chỉ chứa tên sản phẩm:");
const newProducts = products.map((products) => products.name);
console.log(newProducts);

// - Tính tổng giá trị tất cả sản phẩm.
function totalPrice(products) {
    return products.reduce(function (sum, cur) {
        return sum + cur.price;
    }, 0);
}
console.log("- Tổng giá trị tất cả sản phẩm:");
console.log(totalPrice(products));

// - Lọc ra sản phẩm có giá lớn hơn 1 triệu.
function priceThanMillion(products) {
    return products.filter(function (products) {
        return products.price > 1000000;
    }, 0);
}
console.log("- Sản phẩm có giá hơn 1tr:");
console.log(priceThanMillion(products));

// Bài 3
// Cho trước mảng sau
const students = [
    { name: "Lan", scores: [8, 9, 7] },
    { name: "Huy", scores: [6, 5, 7] },
    { name: "Minh", scores: [9, 8, 10] },
];
console.log("Bài 3:");
// Yêu cầu:
// - Tính điểm trung bình của từng học sinh.
for (let student of students) {
    const TotalScore = student.scores.reduce((sum, cur) => sum + cur, 0);
    const averageScore = TotalScore / student.scores.length;
    student.averageScore = averageScore;
}
console.log("- Điểm trung bình từng học viên:");
console.log(students);

// - Trả về danh sách học sinh đạt loại giỏi (điểm TB >= 8).
const excellentStudent = students.filter(
    (student) => student.averageScore >= 8
);
console.log("- Danh sách học viên đạt điểm TB >= 8:");
console.log(excellentStudent);

// - Sắp xếp học sinh theo điểm trung bình giảm dần.
const sortAverageStudent = [...students].sort((studentA, studentB) => {
    return studentB.averageScore - studentA.averageScore;
});
console.log("- Sắp sếp điểm trung bình giảm dần:");
console.log(sortAverageStudent);

// Bài 4
// Cho trước mảng sau:
const posts = [
    {
        id: 1,
        title: "JavaScript cơ bản",
        tags: ["js", "basic"],
        comments: [
            { user: "An", text: "Hay quá!" },
            { user: "Bình", text: "Rất dễ hiểu" },
        ],
    },
    {
        id: 2,
        title: "Học React không khó",
        tags: ["react", "js"],
        comments: [{ user: "Chi", text: "Cảm ơn chia sẻ" }],
    },
];
console.log("Bài 4:");

// Yêu cầu:
// - In ra tất cả title kèm số lượng comments của từng bài viết.
console.log("- Tất cả title kèm số lượng comments của từng bài viết:");
posts.forEach((post) => {
    console.log(`Post: ${post.title}, với: ${post.comments.length} comments`);
});

// - Tạo mảng mới chứa tất cả tags (không trùng lặp).
const newTags = posts.reduce((acc, post) => {
    post.tags.forEach((tag) => {
        if (!acc.includes(tag)) {
            acc.push(tag);
        }
    });
    return acc;
}, []);
console.log("- Mảng mới chứa tất cả tags:");
console.log(newTags);

// - Tìm tất cả các bình luận của user "An".
const allComments = posts.flatMap((post) => post.comments);
const anComments = allComments.filter((comment) => comment.user === "An");
console.log("- Tất cả bình luận của An:");
console.log(anComments);
