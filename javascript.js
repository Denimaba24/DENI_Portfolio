// DOM Elements
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const navLinksItems = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section");
const skillBars = document.querySelectorAll(".level-bar");
const contactForm = document.querySelector(".contact-form");
const heroTitle = document.querySelector(".hero-content h1");
const ctaButton = document.querySelector(".cta-button");

// Typing Effect for Hero Title
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = "";
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// Initialize Typing Effect
const originalText = "Hello, I'm DENI";
window.addEventListener("load", () => {
  setTimeout(() => {
    typeWriter(heroTitle, originalText);
  }, 500);
});

// Hamburger Menu Toggle
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("active");
});

// Close mobile menu when clicking on a link
navLinksItems.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    hamburger.classList.remove("active");
  });
});

// Smooth Scrolling for Navigation Links
navLinksItems.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);
    const offsetTop = targetSection.offsetTop - 80; // Adjust for fixed header

    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });
  });
});

// Intersection Observer for Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
    }
  });
}, observerOptions);

// Observe sections for fade-in animation
sections.forEach((section) => {
  observer.observe(section);
});

// Animate skill bars on scroll
const skillsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const bars = entry.target.querySelectorAll(".level-bar");
        bars.forEach((bar, index) => {
          setTimeout(() => {
            bar.style.width = bar.style.width || "0%";
          }, index * 200);
        });
      }
    });
  },
  { threshold: 0.5 },
);

const skillsSection = document.querySelector(".skills");
if (skillsSection) {
  skillsObserver.observe(skillsSection);
}

// Form Validation and Submission
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = contactForm.querySelector('input[type="text"]').value.trim();
  const email = contactForm.querySelector('input[type="email"]').value.trim();
  const message = contactForm.querySelector("textarea").value.trim();

  if (!name || !email || !message) {
    alert("Please fill in all fields.");
    return;
  }

  if (!isValidEmail(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Simulate form submission
  const submitBtn = contactForm.querySelector(".submit-btn");
  const originalText = submitBtn.textContent;
  submitBtn.textContent = "Sending...";
  submitBtn.disabled = true;

  setTimeout(() => {
    alert("Thank you for your message! I will get back to you soon.");
    contactForm.reset();
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }, 2000);
});

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Parallax Effect for Hero Section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const heroImage = document.querySelector(".hero-image");
  if (heroImage) {
    heroImage.style.transform = `translateY(${scrolled * 0.2}px)`;
  }
});

// Dynamic Header Background on Scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY > 100) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Project Cards Hover Effect
const projectCards = document.querySelectorAll(".project-card");
projectCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-15px) scale(1.02)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)";
  });
});

// Skill Cards Animation
const skillCards = document.querySelectorAll(".skill-card");
skillCards.forEach((card, index) => {
  card.style.animationDelay = `${index * 0.1}s`;
});

// Particle Background Effect
function createParticles() {
  const hero = document.querySelector(".hero");
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 20 + "s";
    particle.style.animationDuration = Math.random() * 10 + 10 + "s";
    hero.appendChild(particle);
  }
}

// Dark Mode Toggle
const darkModeToggle = document.createElement("button");
darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
darkModeToggle.className = "dark-mode-toggle";
document.body.appendChild(darkModeToggle);

darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const icon = darkModeToggle.querySelector("i");
  if (document.body.classList.contains("dark-mode")) {
    icon.className = "fas fa-sun";
    localStorage.setItem("darkMode", "enabled");
  } else {
    icon.className = "fas fa-moon";
    localStorage.setItem("darkMode", "disabled");
  }
});

// Check for saved dark mode preference
if (localStorage.getItem("darkMode") === "enabled") {
  document.body.classList.add("dark-mode");
  darkModeToggle.querySelector("i").className = "fas fa-sun";
}

// Scroll to Top Button
const scrollToTopBtn = document.createElement("button");
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = "scroll-to-top";
document.body.appendChild(scrollToTopBtn);

scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Show/Hide Scroll to Top Button
window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.classList.add("show");
  } else {
    scrollToTopBtn.classList.remove("show");
  }
});

// Enhanced Project Cards with Modal
projectCards.forEach((card) => {
  card.addEventListener("click", () => {
    const modal = document.createElement("div");
    modal.className = "project-modal";
    modal.innerHTML = `
      <div class="modal-content">
        <span class="close-modal">&times;</span>
        <h3>${card.querySelector("h3").textContent}</h3>
        <p>${card.querySelector("p").textContent}</p>
        <div class="modal-tech">${card.querySelector(".project-tech").innerHTML}</div>
      </div>
    `;
    document.body.appendChild(modal);

    modal.addEventListener("click", (e) => {
      if (e.target === modal || e.target.classList.contains("close-modal")) {
        modal.remove();
      }
    });
  });
});

// Typing Effect for Subtitle
function typeSubtitle(element, text, speed = 50) {
  let i = 0;
  element.innerHTML = "";
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  setTimeout(() => type(), 1000);
}

const subtitle = document.querySelector(".subtitle");
if (subtitle) {
  const originalSubtitle = subtitle.textContent;
  typeSubtitle(subtitle, originalSubtitle);
}

// Enhanced Skill Bars Animation
function animateSkillBars() {
  const skillBars = document.querySelectorAll(".level-bar");
  skillBars.forEach((bar, index) => {
    setTimeout(() => {
      bar.style.width =
        bar.parentElement.previousElementSibling.textContent.includes("95%")
          ? "95%"
          : bar.parentElement.previousElementSibling.textContent.includes("90%")
            ? "90%"
            : bar.parentElement.previousElementSibling.textContent.includes(
                  "85%",
                )
              ? "85%"
              : bar.parentElement.previousElementSibling.textContent.includes(
                    "80%",
                  )
                ? "80%"
                : "75%";
    }, index * 300);
  });
}

// Trigger skill bars animation when skills section is in view
const skillsObserverEnhanced = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateSkillBars();
      }
    });
  },
  { threshold: 0.5 },
);

if (skillsSection) {
  skillsObserverEnhanced.observe(skillsSection);
}

// Initialize particles on load
window.addEventListener("load", createParticles);
