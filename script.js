// 1. Mobile menu
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});
// close the menu after tapping a link
nav.querySelectorAll("a").forEach(link =>
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  })
);

// 2. Dark / light theme (remembers your choice)
const themeBtn = document.getElementById("themeBtn");
const root = document.documentElement;

function setTheme(theme) {
  root.setAttribute("data-theme", theme);
  themeBtn.textContent = theme === "dark" ? "Light" : "Dark";
  localStorage.setItem("theme", theme);
}
setTheme(localStorage.getItem("theme") || "light");
themeBtn.addEventListener("click", () => {
  setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
});

// 3. Contact form validation
const form = document.getElementById("contactForm");
const formMsg = document.getElementById("formMsg");

form.addEventListener("submit", event => {
  event.preventDefault();
  const fields = ["name", "email", "message"].map(id => document.getElementById(id));
  let problem = "";

  fields.forEach(field => {
    field.classList.remove("error");
    if (field.value.trim() === "") {
      field.classList.add("error");
      problem = problem || `Please fill in your ${field.id}.`;
    }
  });

  const email = fields[1];
  if (!problem && !/^\S+@\S+\.\S+$/.test(email.value)) {
    email.classList.add("error");
    problem = "That email address doesn't look right. Check it and try again.";
  }

  if (problem) {
    formMsg.textContent = problem;
    formMsg.className = "bad";
    return;
  }

  // NOTE: this only shows a message. To really receive emails,
  // connect the form to Formspree or EmailJS (both have free plans).
  formMsg.textContent = "Thanks! Your message is ready to send once the form is connected.";
  formMsg.className = "ok";
  form.reset();
});

// 4. Footer year
document.getElementById("year").textContent = new Date().getFullYear();