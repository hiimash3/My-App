const baseUrl = "http://localhost:8080";
const token = sessionStorage.getItem("token");
const isAdmin = sessionStorage.getItem("isAdmin");

if (isAdmin === "false") {
  location.href = `${baseUrl}/home?category=all`; // Redirect to a non-admin page
} else if (!isAdmin) {
  location.href = `${baseUrl}/home?category=all`; // Redirect to the login page
}

const loadPage = (page, pageSize) => {
  //Sends the data to a link thats connected to the DB
  const adress = `${baseUrl}/api/product?page=${page}&pageSize=${pageSize}&category=all`;
  const request = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    Authorization: `Bearer ${token}`,
  };
  const promise = fetch(adress, request);
  promise
    .then((response) => response.json())
    .catch((error) => alert(error))
    .then(handlePage)
    .catch((error) => alert(error));
};

const handlePage = (pageData) => {
  addProductsToBody(pageData.items);
  createPagination(pageData.totalPageNumber);
};

const addProductsToBody = (products) => {
  const tBody = document.getElementById("tBody");
  tBody.innerHTML = "";
  for (let product of products) {
    const productRow = document.createElement("tr");
    const productId = document.createElement("td");
    productId.innerHTML = product.productid;
    const productName = document.createElement("td");
    productName.innerHTML = product.productname;
    const productDescription = document.createElement("td");
    productDescription.innerHTML = product.description;
    const productPrice = document.createElement("td");
    productPrice.innerHTML = product.price;
    const productType = document.createElement("td");
    productType.innerHTML = product.type;
    const editProduct = document.createElement("td");
    const editButton = document.createElement("button");
    editButton.classList.add("editButton");
    editButton.innerHTML = "Edit    ";
    editButton.addEventListener("click", () => {
      location.href = `${baseUrl}/edititem?productid=${product.productid}`;
    });
    editProduct.appendChild(editButton);
    productRow.appendChild(productId);
    productRow.appendChild(productName);
    productRow.appendChild(productDescription);
    productRow.appendChild(productPrice);
    productRow.appendChild(productType);
    productRow.appendChild(editProduct);
    tBody.appendChild(productRow);
  }
};

function createPagination(totalPageNumber) {
  const numberOfShownPageButtons = 10;
  let start;
  let end;

  const paginationDiv = document.getElementById("paginationDiv");
  paginationDiv.innerHTML = "";
  start = start ? start : 1;
  end = end ? end : numberOfShownPageButtons;
  end = end > totalPageNumber ? totalPageNumber : end;
  if (start > numberOfShownPageButtons) {
    const leftArrowLink = document.createElement("a");
    leftArrowLink.style = "cursor: pointer;";
    leftArrowLink.textContent = "<<";
    leftArrowLink.addEventListener("click", () => {
      start = start - numberOfShownPageButtons;
      end = start + numberOfShownPageButtons - 1;
      end = totalPageNumber < end ? totalPageNumber : end;
      createPagination(totalPageNumber);
    });
    paginationDiv.appendChild(leftArrowLink);
  }
  for (let i = start; i <= end; i++) {
    const pageButtonLink = document.createElement("a");
    pageButtonLink.href = "#";
    pageButtonLink.textContent = i;
    pageButtonLink.addEventListener("click", () => loadPage(i, 16));
    paginationDiv.appendChild(pageButtonLink);
  }
  if (end < totalPageNumber) {
    const rightArrowLink = document.createElement("a");
    rightArrowLink.style = "cursor: pointer;";
    rightArrowLink.textContent = ">>";
    rightArrowLink.addEventListener("click", () => {
      start = start + numberOfShownPageButtons;
      end = end + numberOfShownPageButtons;
      end = totalPageNumber < end ? totalPageNumber : end;
      createPagination(totalPageNumber);
    });
    paginationDiv.appendChild(rightArrowLink);
  }
}

loadPage(1, 15);
