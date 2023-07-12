const express = require("express");
const cors = require("cors");
const path = require("path");

const port = 8080;
const baseUrl = "http://localhost:8080";

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "../public")));

app.get("/:page", (req, res) => {
  const page = req.params.page;
  res.sendFile(`${page}.html`, { root: "../public" }, (err) => {
    if (err) {
      console.log(err);
      res.sendStatus(404);
    }
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port} `);
});
