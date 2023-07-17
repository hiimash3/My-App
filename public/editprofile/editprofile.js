const baseUrl = "http://localhost:8080";
const token = sessionStorage.getItem("token");

let oldUsername;
let image;

//Selecting category
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

//Load the user data
const loadProfileData = () => {
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
        oldUsername = data.username;
        document.getElementById("usersName").innerHTML = "User: " + data.username;
        document.getElementById("name").value = data.name;
        document.getElementById("surname").value = data.surname;
        document.getElementById("email").value = data.email;
        document.getElementById("phone").value = data.phone;
        document.getElementById("post").value = data.post;
        document.getElementById("homeAddress").value = data.address;
      })
      .catch((error) => console.log(error));
  } else {
    document.getElementById("profileName").innerHTML = "Sign In";
    document.getElementById("userName").innerHTML = "Sign In";
  }
};

//Change information / Update user
const handleFormSubmit = async (event) => {
  event.preventDefault();

  // Get the form inputs
  const username = document.getElementById("username").value;
  const name = document.getElementById("name").value;
  const surname = document.getElementById("surname").value;
  const password = document.getElementById("password").value;
  const newPassword = document.getElementById("newPassword").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const post = document.getElementById("post").value;
  const homeAddress = document.getElementById("homeAddress").value;

  // Check if the password field is empty
  if (!password) {
    document.getElementById("cPasswordL").style.display = "block";
    document.getElementById("cUsernameL").style.display = "none";
    return; // Exit the function to prevent further execution
  } else {
    document.getElementById("cPasswordL").style.display = "none";
    document.getElementById("cUsernameL").style.display = "block";
  }

  // Check username availability
  try {
    const response = await fetch(`${baseUrl}/api/checkusername?username=${username}`);
    if (response.ok) {
      const data = await response.json();
      if (data.users.length > 0) {
        document.getElementById("cUsernameL").style.display = "block";
        return;
      }
      // Username is available, proceed with form submission
      document.getElementById("cUsernameL").style.display = "none";

      // Send the form data to the server
      const address = `${baseUrl}/api/updateUser`;
      const request = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          oldUsername,
          username,
          name,
          surname,
          email,
          phone,
          post,
          homeAddress,
          password,
          newPassword,
        }),
      };

      const submitResponse = await fetch(address, request);
      if (submitResponse.ok) {
        // Form submission successful
        alert("User data updated successfully");
        //New token
        const responseData = await submitResponse.json();
        const newToken = responseData.token;
        sessionStorage.setItem("token", newToken);
        //Reload page
        location.reload();
      } else if (submitResponse.status === 401) {
        //Say that password is incorrect
        document.getElementById("cPasswordLMatch").style.display = "block";
      } else {
        throw new Error(`First else. Request failed with status ${submitResponse.status}`);
      }
    }
  } catch (error) {
    console.log("Error updating profile:", error);
  }
};
// Attach the form submit event listener
const form = document.querySelector("form");
form.addEventListener("submit", handleFormSubmit);

loadProfileData();
selectCategory();
