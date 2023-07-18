const baseUrl = "http://localhost:8080";
const token = sessionStorage.getItem("token");
const isAdmin = sessionStorage.getItem("isAdmin");
const adminButton = document.getElementById("adminButton");

if (isAdmin === "1") {
  adminButton.classList.remove("hide"); // Show the button
  adminButton.addEventListener("click", () => {
    location.href = `${baseUrl}/admin`;
  });
} else if (isAdmin === "false") {
  adminButton.classList.add("hide"); // Hide the button
}
//sticky navBar
window.addEventListener("scroll", () => {
  const navBar = document.getElementById("navBar");
  navBar.classList.toggle("sticky", window.scrollY > 0);
  const profileTab = document.getElementById("profileTab");
  profileTab.classList.remove("openMenu", window.scrollY > 0);
});

//Click to get dropdown profile
const profileBar = document.getElementById("profileBar");
profileBar.addEventListener("click", () => {
  if (token) {
    const profileTab = document.getElementById("profileTab");
    profileTab.classList.toggle("openMenu");
  } else {
    location.href = `${baseUrl}/signin`;
  }
});
//Edit profile
const editProfileLink = document.getElementById("editProfileLink");
editProfileLink.addEventListener("click", (event) => {
  event.preventDefault();
  location.href = `${baseUrl}/edituser`;
});

//Log out
const logout = () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("isAdmin");
  location.reload();
};

const logoutLink = document.getElementById("logoutLink");
logoutLink.addEventListener("click", (event) => {
  event.preventDefault();
  logout();
});

//Slider counter
var counter = 1;
setInterval(() => {
  document.getElementById("radio" + counter).checked = true;
  counter++;
  if (counter > 4) {
    counter = 1;
  }
}, 5000);

//Loading products onto page

const loadPage = (page, pageSize, category) => {
  //Used to remove the # that the pagination adds to go to the top of the page
  category = category || "all";

  //Sends the data to a link thats connected to the DB
  const adress = `${baseUrl}/api/product?page=${page}&pageSize=${pageSize}&category=${category}`;
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
  selectCategory();
};

const addProductsToBody = (products) => {
  const mainProductDiv = document.getElementById("mainProductDiv");
  mainProductDiv.innerHTML = "";
  for (let product of products) {
    const productDiv = document.createElement("div");
    productDiv.classList.add("sProductDiv");
    productDiv.addEventListener("click", () => {
      location.href = `${baseUrl}/item?productId=${product.productid}`;
    });
    const description = document.createElement("div");
    description.classList.add("description");
    const title = document.createElement("h1");
    title.classList.add("title");
    title.innerHTML = `
              <p>${product.productname}</p>
          `;
    const priceDiv = document.createElement("div");
    priceDiv.classList.add("priceDiv");
    const price = document.createElement("p");
    price.innerHTML = `${product.price}` + " KM";

    const img = document.createElement("img");
    img.src = `${product.productimg}`;

    priceDiv.appendChild(price);
    description.appendChild(title);
    description.appendChild(priceDiv);
    productDiv.appendChild(img);
    productDiv.appendChild(description);
    mainProductDiv.appendChild(productDiv);
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

const selectCategory = () => {
  const home = document.getElementById("home");
  home.addEventListener("click", () => {
    location.href = `${baseUrl}/home?category=all`;
  });
  const categoryComputers = document.getElementById("categoryComputers");
  categoryComputers.addEventListener("click", () => {
    location.href = `${baseUrl}/home?category=PC`;
  });
  const categoryMonitors = document.getElementById("categoryMonitors");
  categoryMonitors.addEventListener("click", () => {
    location.href = `${baseUrl}/home?category=Monitor`;
  });
  const categoryKeyboards = document.getElementById("categoryKeyboards");
  categoryKeyboards.addEventListener("click", () => {
    location.href = `${baseUrl}/home?category=Keyboard`;
  });
  const categoryMouses = document.getElementById("categoryMouses");
  categoryMouses.addEventListener("click", () => {
    location.href = `${baseUrl}/home?category=Mouse`;
  });
  const categoryHeadphones = document.getElementById("categoryHeadphones");
  categoryHeadphones.addEventListener("click", () => {
    location.href = `${baseUrl}/home?category=Headphones`;
  });
};
const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category");

const loadProfileTab = () => {
  if (token) {
    const address = `${baseUrl}/api/getUsername`;
    const request = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    fetch(address, request)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const username = data.username;
        document.getElementById("profileName").innerHTML = username;
        document.getElementById("userName").innerHTML = "User: " + username;
      })
      .catch((error) => console.log(error));
  } else {
    document.getElementById("profileName").innerHTML = "Sign In";
    document.getElementById("userName").innerHTML = "Sign In";
  }
};

loadProfileTab();
loadPage(1, 16, category);
