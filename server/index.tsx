import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import path from "path";
import cors from "cors";
import fs from "fs";

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("<h1>Hello World From the Typescript Server!</h1>");
});

const port = process.env.PORT || 8000;

app.post("/ideadata", (req: Request, res: Response) => {
  const data: {}[] = req.body;

  for (let i = 0; i < data.length; i++) {
    const element = data[i];

    const elementData = JSON.stringify(element);

    fs.appendFileSync("idea-data.jsonl", elementData);
  }
});

app.post("/demanddata", (req: Request, res: Response) => {
  const data: {}[] = req.body;

  for (let i = 0; i < data.length; i++) {
    const element = data[i];

    const elementData = JSON.stringify(element);

    fs.appendFileSync("demand-data.jsonl", elementData);
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
  fs.appendFileSync("student-2.json", data);
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
