const baseUrl = "http://localhost:8080";
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("productId");

const loadPage = () => {
  const adress = `${baseUrl}/api/sProduct?productId=${productId}`;
  const request = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const promise = fetch(adress, request);
  promise
    .then((response) => response.json())
    .catch((error) => alert(error))
    .then(handlePage)
    .catch((error) => alert(error));
};

const handlePage = (pageData) => {
  addProductInfo(pageData.items);
  selectCategory();
};

const addProductInfo = (product) => {
  const productName = document.getElementById("productName");
  productName.innerHTML = "";
  productName.innerHTML = product[0].productname;
  const productPrice = document.getElementById("productPrice");
  productPrice.innerHTML = "";
  productPrice.innerHTML = product[0].price + " KM";
  const productDescription = document.getElementById("productDescription");
  productDescription.innerHTML = "";
  productDescription.innerHTML = product[0].description;
  const productImage = document.getElementById("productImage");
  productImage.src = "";
  productImage.src = product[0].productimg;
};

const selectCategory = () => {
  const home = document.getElementById("home");
  home.addEventListener("click", () => {
    location.href = "http://localhost:8080/home?category=all";
  });
  const categoryComputers = document.getElementById("categoryComputers");
  categoryComputers.addEventListener("click", () => {
    location.href = "http://localhost:8080/home?category=PC";
  });
  const categoryMonitors = document.getElementById("categoryMonitors");
  categoryMonitors.addEventListener("click", () => {
    location.href = "http://localhost:8080/home?category=Monitor";
  });
  const categoryKeyboards = document.getElementById("categoryKeyboards");
  categoryKeyboards.addEventListener("click", () => {
    location.href = "http://localhost:8080/home?category=Keyboard";
  });
  const categoryMouses = document.getElementById("categoryMouses");
  categoryMouses.addEventListener("click", () => {
    location.href = "http://localhost:8080/home?category=Mouse";
  });
  const categoryHeadphones = document.getElementById("categoryHeadphones");
  categoryHeadphones.addEventListener("click", () => {
    location.href = "http://localhost:8080/home?category=Headphones";
  });
};

loadPage();
