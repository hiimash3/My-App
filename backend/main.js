const express = require("express");
const cors = require("cors");
const path = require("path");
const router = require("./router");

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

const port = 8080;

app.listen(port, () => {
  console.log(`listening on port ${port} `);
});
