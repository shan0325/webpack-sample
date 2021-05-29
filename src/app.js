import { sum } from "./sum.js";
import { sub } from "./sub.js";
import data from "./data.js";
import "./style.css";

document.addEventListener("DOMContentLoaded", () => {
  let result = sum(10, 20);
  console.log(`더하기 : ${result}`);

  let result2 = sub(100, 30);
  console.log(`빼기 : ${result2}`);

  console.log(data);

  console.log(process.env.NODE_ENV);

  document.getElementById("app").innerHTML = data.template;
});
