const baseUrl = "http://localhost:8080";
const token = sessionStorage.getItem("token");
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("productId");
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

//Purchase
document.getElementById("buyButton").addEventListener("click", () => {
  document.getElementById("orderDiv").classList.remove("hide");
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

//Load page
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
//Adding product to body
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
//Category selection
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
//Profile tab
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
//Create order
const createOrder = async (productId, userFullName, homeAddress, postalCode) => {
  try {
    const address = `${baseUrl}/api/orderItem`;
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        productId: productId,
        userFullName: userFullName,
        address: homeAddress,
        postalCode: postalCode,
      }),
    };

    const response = await fetch(address, request);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    alert(data.message);
  } catch (error) {
    console.error(`Failed to create order: ${error}`);
  }
};

const handleOrderSubmit = (event) => {
  event.preventDefault();

  const userFullName = document.getElementById("fullName").value;
  const address = document.getElementById("address").value;
  const postalCode = document.getElementById("post").value;

  createOrder(productId, userFullName, address, postalCode);

  document.getElementById("orderDiv").classList.add("hide");
};

const orderForm = document.getElementById("orderForm");
orderForm.addEventListener("submit", handleOrderSubmit);

//Get data if possible
const getUsername = async () => {
  try {
    const response = await fetch(`${baseUrl}/api/getUsername`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      throw new Error(data.error);
    }

    const fullName = data.name + " " + data.surname;
    document.getElementById("fullName").value = fullName;
    document.getElementById("address").value = data.address;
    document.getElementById("post").value = data.post;
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

getUsername();
loadProfileTab();
loadPage();
