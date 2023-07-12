const baseUrl = "http://procomputers:8080";

const signInButton = document.getElementById("signIn");
const signUpButtoon = document.getElementById("signUp");
const guestButton = document.getElementById("guest");

//NAVIGATION BAR
window.addEventListener("scroll", () => {
  const navBar = document.getElementById("navBar");
  navBar.classList.toggle("sticky", window.scrollY > 0);
  const arrowDiv = document.getElementById("arrowDiv");
  arrowDiv.classList.toggle("dnone", window.scrollY > 0);
});

//LOGIN AS GUEST BUTTON
guestButton.addEventListener("click", () => {
  location.href = "http://localhost:8080/home";
});

//FADE IN ELEMENTS
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry);
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
