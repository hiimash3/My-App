const baseUrl = "http://procomputers:8080";
const token = sessionStorage.getItem("token");

//NAVIGATION BAR
window.addEventListener("scroll", () => {
  const navBar = document.getElementById("navBar");
  navBar.classList.toggle("sticky", window.scrollY > 0);
  const arrowDiv = document.getElementById("arrowDiv");
  arrowDiv.classList.toggle("dnone", window.scrollY > 0);
});

//LOGIN AS GUEST BUTTON
const guestButton = document.getElementById("guest");
guestButton.addEventListener("click", () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("isAdmin");
  location.href = "http://localhost:8080/home?category=all";
});

//SignUp BUTTON
const signUpButton = document.getElementById("signUp");
signUpButton.addEventListener("click", () => {
  location.href = "http://localhost:8080/signup";
});

//SignIn BUTTON
const signInButton = document.getElementById("signIn");
signInButton.addEventListener("click", () => {
  location.href = "http://localhost:8080/signin";
});

//FADE IN ELEMENTS
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
});
const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => {
  observer.observe(el);
});
