const express = require("express");
const os = require("os");
const fetch = require("node-fetch");

const app = express();

app.use(express.static("dist"));
app.use(express.json());


app.get("/api/test", (req, res) =>
  res.send({ "message": "Hello" })
);


app.get("/api/profile",async (req, res) =>{
  let page = req.query.page;
  const count = 30;
  let url = `http://localhost:8008/profile_page=1`;
  let next = 'http://localhost:8008/profile_page=2';
  let previous = null

  switch(page){
    case "1":
      url = `http://localhost:8008/profile_page=1`;
      next = 'http://localhost:8008/profile_page=2';
      previous = null
      break

    case "2":
      url = `http://localhost:8008/profile_page=2`;
      next = 'http://localhost:8008/profile_page=3';
      previous = 'http://localhost:8008/profile_page=1';
      break

    case "3":
      url = `http://localhost:8008/profile_page=3`;
      next = null;
      previous = 'http://localhost:8008/profile_page=2';
      break
  }
  const data = await fetch(url);
  const profiles = await data.json();


  return res.status(200).json({ "count": count, "next":next, "previous":previous, "data":profiles });
}
);

app.listen(8000, () =>
  console.log(`Listening on port ${8000}!`)
);
