const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 24);
});

menuToggle.addEventListener("click", () => {
  const open = menuToggle.classList.toggle("active");
  mobileNav.classList.toggle("open", open);
  document.body.classList.toggle("menu-open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
});

mobileNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    menuToggle.classList.remove("active");
    mobileNav.classList.remove("open");
    document.body.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
  });
});

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -40px" });

document.querySelectorAll(".reveal").forEach(element => revealObserver.observe(element));

document.querySelectorAll(".faq-list details").forEach(item => {
  item.addEventListener("toggle", () => {
    if (!item.open) return;
    document.querySelectorAll(".faq-list details").forEach(other => {
      if (other !== item) other.open = false;
    });
  });
});

contactForm.addEventListener("submit", event => {
  event.preventDefault();
  const submitButton = contactForm.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  submitButton.textContent = "Inquiry prepared";
  formStatus.textContent = "Thank you. This front-end demo has validated your details. Connect the form to your preferred service before publishing.";
  contactForm.reset();
  setTimeout(() => {
    submitButton.disabled = false;
    submitButton.textContent = "Send inquiry";
  }, 2600);
});

document.getElementById("year").textContent = new Date().getFullYear();
