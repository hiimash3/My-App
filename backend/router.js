const express = require("express");
const { fetchProductPage, getSingleProduct } = require("./requestHandler");
const path = require("path");

const router = express.Router();

router.get("/api/product", fetchProductPage);
router.get("/api/sProduct", getSingleProduct);

//This is used for loading html based on the URL
router.use(express.static(path.join(__dirname, "../public")));
router.get("/:page", (req, res) => {
  const page = req.params.page;
  if (page.endsWith("/")) {
    page = page.slice(0, -1);
  }
  res.sendFile(`${page}.html`, { root: "../public" }, (err) => {
    if (err) {
      console.log(`Error sending file in router. Error: ${err}`);
      res.sendStatus(404);
    }
  });
});

module.exports = router;
