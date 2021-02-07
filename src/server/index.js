const express = require("express");
const os = require("os");
const fetch = require("node-fetch");

const app = express();

app.use(express.static("dist"));
app.use(express.json());


app.get("/api/test", (req, res) =>
  res.send({ "message": "Hello" })
);

app.listen(8000, () =>
  console.log(`Listening on port ${8000}!`)
);
