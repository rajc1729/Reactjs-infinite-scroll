const express = require("express");
const fetch = require("node-fetch");

const app = express();

app.use(express.static("dist"));
app.use(express.json());

app.get("/api/test", (req, res) => res.send({ message: "Hello" }));

app.get("/api/profile", async (req, res) => {
  let page = req.query.page;
  if (!page) page = "1";
  const count = 30;

  let next = null;
  let previous = null;

  switch (page) {
    case "1":
      next = "http://localhost:3000/api/profile?page=2";
      previous = null;
      break;

    case "2":
      next = "http://localhost:3000/api/profile?page=3";
      previous = "http://localhost:3000/api/profile?page=1";
      break;

    case "3":
      next = null;
      previous = "http://localhost:3000/api/profile?page=2";
      break;

    default:
      next = null;
      previous = null;
  }
  const data = await fetch(`http://localhost:8008/profile_page=${page}`);
  const profiles = await data.json();
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  await delay(500);

  return res
    .status(200)
    .json({ count: count, next: next, previous: previous, data: profiles });
});

app.listen(8000, () => console.log(`Listening on port ${8000}!`));
