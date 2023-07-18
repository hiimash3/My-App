const baseUrl = "http://localhost:8080";
const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", callbackOnLogin);
function callbackOnLogin(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const adress = `${baseUrl}/api/login`;

  const httpRequest = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  };

  fetch(adress, httpRequest)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Login failed");
      }
    })
    .then((data) => {
      const token = data.token;
      const isAdmin = data.isAdmin;
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("isAdmin", isAdmin);
      window.location.href = `${baseUrl}/home?category=all`;
    })
    .catch((error) => {
      document.getElementById("loginFailedL").style.display = "block";
      console.log(error);
    });
}
