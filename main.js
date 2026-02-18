// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Contact form submission
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector("textarea").value;

    // Validate
    if (name && email && message) {
      // Show success message
      alert(
        `Thank you ${name}! Your message has been received successfully. We will contact you soon at ${email}`,
      );

      // Reset form
      this.reset();
    } else {
      alert("Please fill in all fields");
    }
  });
}

// Add scroll animation for elements
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = "fadeInUp 0.6s ease forwards";
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe cards for animation
document
  .querySelectorAll(".project-card, .about-card, .skill-item")
  .forEach((el) => {
    el.style.opacity = "0";
    observer.observe(el);
  });

// Add animation styles dynamically
const style = document.createElement("style");
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Active nav link indicator
window.addEventListener("scroll", function () {
  let current = "";

  const sections = document.querySelectorAll("section");
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.style.color = "";
    if (link.getAttribute("href").slice(1) === current) {
      link.style.color = "var(--primary-color)";
      link.style.fontWeight = "bold";
    }
  });
});

// Mobile menu toggle (if you add a hamburger menu in the future)
function toggleMobileMenu() {
  const navLinks = document.querySelector(".nav-links");
  if (navLinks) {
    navLinks.style.display =
      navLinks.style.display === "flex" ? "none" : "flex";
  }
}

// Optional: Dark mode toggle
function toggleDarkMode() {
  document.body.style.backgroundColor =
    document.body.style.backgroundColor === "rgb(51, 51, 51)" ? "#fff" : "#333";
}

console.log("Portfolio loaded successfully!");
