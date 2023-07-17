const express = require("express");
const { fetchProductPage, getSingleProduct, registerNewUser, getUsers, logIn, getUsername, updateUser } = require("./requestHandler");
const path = require("path");

const router = express.Router();

router.get("/api/checkusername", getUsers);
router.get("/api/product", fetchProductPage);
router.get("/api/sProduct", getSingleProduct);
router.post("/api/newuser", registerNewUser);
router.post("/api/login", logIn);
router.get("/api/getUsername", getUsername);
router.put("/api/updateUser", updateUser);

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
