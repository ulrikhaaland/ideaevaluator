"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const fs_1 = __importDefault(require("fs"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get("/", (req, res) => {
    res.send("<h1>Hello World From the Typescript Server!</h1>");
});
const port = process.env.PORT || 8000;
app.post("/ideadata", (req, res) => {
    const data = req.body;
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        const elementData = JSON.stringify(element);
        fs_1.default.appendFileSync("idea-data.jsonl", elementData);
    }
});
app.post("/demanddata", (req, res) => {
    const data = req.body;
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        const elementData = JSON.stringify(element);
        fs_1.default.appendFileSync("demand-data.jsonl", elementData);
    }
});
function writeJson() {
    let student = {
        name: "Mike",
        age: 23,
        gender: "Male",
        department: "English",
        car: "Toyota",
    };
    let data = JSON.stringify(student);
    fs_1.default.appendFileSync("student-2.json", data);
}
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
