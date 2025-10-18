// Nếu yêu cầu cho trước:
// - Gọi hàm: Thì bên trong phải log.
// - log: Thì trong phải return

// Bài tập 1
// Viết một hệ thống quản lý nhân viên gồm:
// - Class Employee có các thuộc tính: name, age, salary và phương thức getInfo().
class Employee {
    // Viết code ở đây
    constructor(name, age, salary) {
        this.name = name;
        this.age = age;
        this.salary = salary;
    }
    getInfo() {
        console.log(`${this.name} - Tuổi: ${this.age} - Lương: ${this.salary}`);
    }
}
// - Class Developer kế thừa từ Employee, thêm thuộc tính programmingLanguage.
class Developer extends Employee {
    // Viết code ở đây
    constructor(name, age, salary, programmingLanguage) {
        super(name, age, salary);
        this.programmingLanguage = programmingLanguage;
    }
    getLangInfo() {
        if (this.programmingLanguage) {
            return `${this.name}, Ngôn ngữ: ${this.programmingLanguage}`;
        }
        return `${this.name}, Ngôn ngữ: Chưa có`;
    }
}
// - Class Manager kế thừa từ Employee, thêm thuộc tính employees (mảng các nhân viên mà họ quản lý).
class Manager extends Employee {
    // Viết code ở đây
    constructor(name, age, salary) {
        super(name, age, salary);
        this.employee = [];
    }
    // - Manager có phương thức addEmployee(employee) để thêm nhân viên vào danh sách.
    addEmployee(employee) {
        this.employee.push(employee);
    }
    getInfo() {
        super.getInfo();
        console.log("Quản lý nhân viên:");
        this.employee.forEach((employee) => {
            if (employee instanceof Developer) {
                console.log(`${employee.getLangInfo()}`);
            } else {
                console.log(`${employee.name}`);
            }
        });
    }
}

const dev1 = new Developer("John", 28, 5000, "JavaScript");
const dev2 = new Developer("Jane", 30, 5500, "Python");
const manager = new Manager("Alice", 35, 8000);
manager.addEmployee(dev1);
manager.addEmployee(dev2);
manager.getInfo();
// Output:
// Alice - Tuổi: 35 - Lương: 8000
// Quản lý nhân viên:
//  - John, Ngôn ngữ: JavaScript
//  - Jane, Ngôn ngữ: Python

// Bài tập 2
// Viết một class Car và Bicycle, cả hai đều có phương thức move().
class Car {
    // Viết code ở đây
    // constructor() {}
    move() {
        console.log("Xe hơi đang chạy...");
    }
}
class Bicycle {
    // Viết code ở đây
    // constructor() {}
    move() {
        console.log("Xe đạp đang chạy...");
    }
}
// Sau đó, viết một hàm start(vehicle) chỉ nhận những object có phương thức move().
function start(vehicle) {
    if (typeof vehicle.move === "function") {
        vehicle.move();
    } else {
        console.log("Không thể di chuyển!");
    }
}
const car = new Car();
const bike = new Bicycle();
start(car); // Xe hơi đang chạy...
start(bike); // Xe đạp đang chạy...
start({}); // Không thể di chuyển!

// Bài tập 3
// Cho trước mảng sau:

const menus = [
    {
        id: 1,
        title: "Menu 1",
        parent: 0,
    },
    {
        id: 2,
        title: "Menu 2",
        parent: 0,
    },
    {
        id: 3,
        title: "Menu 3",
        parent: 0,
    },
    {
        id: 4,
        title: "Menu 2.1",
        parent: 2,
    },
    {
        id: 5,
        title: "Menu 2.2",
        parent: 2,
    },
    {
        id: 6,
        title: "Menu 2.3",
        parent: 2,
    },
    {
        id: 7,
        title: "Menu 2.2.1",
        parent: 5,
    },
    {
        id: 8,
        title: "Menu 2.2.2",
        parent: 5,
    },
];
// Viết hàm đệ quy để chuyển mảng trên thành mảng sau:
// const nested = [
//   {
//     id: 1,
//     title: "Menu 1",
//     parent: 0,
//   },
//   {
//     id: 2,
//     title: "Menu 2",
//     parent: 0,
//     children: [
//       {
//         id: 4,
//         title: "Menu 2.1",
//         parent: 2,
//       },
//       {
//         id: 5,
//         title: "Menu 2.2",
//         parent: 2,
//         children: [
//           {
//             id: 7,
//             title: "Menu 2.2.1",
//             parent: 5,
//           },
//           {
//             id: 8,
//             title: "Menu 2.2.2",
//             parent: 5,
//           },
//         ],
//       },
//       {
//         id: 6,
//         title: "Menu 2.3",
//         parent: 2,
//       },
//     ],
//   },
//   {
//     id: 3,
//     title: "Menu 3",
//     parent: 0,
//   },
// ];
function getMenuTree(arr, parentId = 0) {
    const childOfParent = arr.filter((item) => {
        return item.parent === parentId;
    });
    // console.log(childOfParent);
    const currentTree = childOfParent.map((item) => {
        // const menuItem = Object.assign({}, item);
        // console.log(menuItem);

        // const menuItem = { ...item };
        // console.log(menuItem);

        const json = JSON.stringify(item);
        const menuItem = JSON.parse(json);
        // console.log(menuItem);
        const children = getMenuTree(arr, menuItem.id);
        if (children.length > 0) {
            menuItem.children = children;
            // console.log(menuItem.length);
        }
        return menuItem;
    });
    return currentTree;
}
// Ví dụ:
const result = getMenuTree(menus);
console.log(result); //Sẽ hiển thị mảng nested
