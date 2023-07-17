const baseUrl = "http://localhost:8080";

const createNewUser = async (event) => {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const name = document.getElementById("name").value;
  const surname = document.getElementById("surname").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("cPassword").value;
  const email = document.getElementById("email").value;

  if (password !== confirmPassword) {
    const confirmPasswordLabel = document.getElementById("cPasswordL");
    confirmPasswordLabel.style.display = "block";
    return;
  }
  //IF PASSWORD IS MATCHING CONTINUE
  const confirmPasswordLabel = document.getElementById("cPasswordL");
  confirmPasswordLabel.style.display = "none";

  try {
    const response = await fetch(`${baseUrl}/api/checkusername?username=${username}`);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      if (data.users.length > 0) {
        document.getElementById("cUsernameL").style.display = "block";
        return;
      }

      // IF USERNAME IS AVAILABLE REGISTER

      document.getElementById("cUsernameL").style.display = "none";

      const registerResponse = await fetch(`${baseUrl}/api/newuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, name, surname, password, email }),
      });
      if (registerResponse.ok) {
        alert("Account succesfully made");
        location.href = `${baseUrl}/signin`;
        document.getElementById("username").value = "";
        document.getElementById("name").value = "";
        document.getElementById("surname").value = "";
        document.getElementById("password").value = "";
        document.getElementById("cPassword").value = "";
        document.getElementById("email").value = "";
      } else {
        throw new Error("Failed to register user");
      }
    } else {
      throw new Error("Failed to check username availability");
    }
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
};

const form = document.querySelector("form");
form.addEventListener("submit", createNewUser);
