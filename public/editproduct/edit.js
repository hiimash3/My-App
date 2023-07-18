const baseUrl = "http://localhost:8080";
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("productid");
const isAdmin = sessionStorage.getItem("isAdmin");

if (isAdmin === "false") {
  location.href = `${baseUrl}/home?category=all`; // Redirect to a non-admin page
} else if (!isAdmin) {
  location.href = `${baseUrl}/home?category=all`; // Redirect to the login page
}

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
    .catch((error) => console.log(error))
    .then(handlePage)
    .catch((error) => console.log(error));
};

const handlePage = (pageData) => {
  addProductInfo(pageData.items);
};
//Adding product to body
const addProductInfo = (product) => {
  document.getElementById("editProductName").innerHTML = product[0].productname;
  document.getElementById("productName").value = product[0].productname;
  document.getElementById("description").value = product[0].description;
  document.getElementById("price").value = product[0].price;
  document.getElementById("productImage").value = product[0].productimg;
  document.getElementById("type").value = product[0].type;
};

const updateProduct = (event) => {
  event.preventDefault();

  const productName = document.getElementById("productName").value;
  const description = document.getElementById("description").value;
  const price = document.getElementById("price").value;
  const productImage = document.getElementById("productImage").value;
  const type = document.getElementById("type").value;

  const productData = {
    productId,
    productName,
    description,
    price,
    productImage,
    type,
  };

  const address = `${baseUrl}/api/updateProduct`;
  const request = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  };

  fetch(address, request)
    .then((response) => response.json())
    .then((data) => {
      alert("Updated successfully");
    })
    .catch((error) => console.log(error));
};

document.getElementById("editProductForm").addEventListener("submit", updateProduct);

loadPage();
