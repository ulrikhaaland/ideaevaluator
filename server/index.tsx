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

app.post("/savedata", (req: Request, res: Response) => {
  console.log(req.body.name);

  res.send("<h1>Hello World From the Typescript Server!</h1>");
});

function writeJson() {
  let student = {
    name: "Mike",
    age: 23,
    gender: "Male",
    department: "English",
    car: "Honda",
  };

  let data = JSON.stringify(student);
  fs.writeFileSync("student-2.json", data);
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
