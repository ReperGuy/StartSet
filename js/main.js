// Инициализация Swiper (слайдера)
const swiper = new Swiper(".newsSwiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  autoplay: {
    delay: 2000,
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

// Мобильное меню
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navMenu = document.getElementById("navMenu");

mobileMenuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("nav__menu--active");
  mobileMenuBtn.innerHTML = navMenu.classList.contains("nav__menu--active")
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
});

// Закрытие меню при клике на ссылку
document.querySelectorAll(".nav__link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("nav__menu--active");
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
  });
});

// Изменение шапки при прокрутке
const header = document.getElementById("header");
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header.classList.add("header--scrolled");
    backToTop.classList.add("back-to-top--active");
  } else {
    header.classList.remove("header--scrolled");
    backToTop.classList.remove("back-to-top--active");
  }

  // Активная ссылка в навигации при прокрутке
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav__link");

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("nav__link--active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("nav__link--active");
    }
  });
});

// Анимации при скролле
const animateElements = document.querySelectorAll(".animate-on-scroll");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-on-scroll--animated");
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }
);

animateElements.forEach((element) => {
  observer.observe(element);
});

// Обработка формы
const contactForm = document.getElementById("contactForm");
const successModal = document.getElementById("successModal");
const modalClose = document.getElementById("modalClose");
const modalOk = document.getElementById("modalOk");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // В реальном проекте здесь отправка данных на сервер
  // Для демонстрации просто показываем модальное окно
  successModal.classList.add("modal--active");
  contactForm.reset();
});

// Закрытие модального окна
modalClose.addEventListener("click", () => {
  successModal.classList.remove("modal--active");
});

modalOk.addEventListener("click", () => {
  successModal.classList.remove("modal--active");
});

successModal.addEventListener("click", (e) => {
  if (e.target === successModal) {
    successModal.classList.remove("modal--active");
  }
});

// Плавная прокрутка
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 100,
        behavior: "smooth",
      });
    }
  });
});

// Анимация чисел в статистике
const statNumbers = document.querySelectorAll(".stats__number");

const animateNumbers = () => {
  statNumbers.forEach((statNumber) => {
    const target = parseInt(statNumber.textContent);
    const increment = target / 100;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        statNumber.textContent =
          target + (statNumber.textContent.includes("+") ? "+" : "");
        clearInterval(timer);
      } else {
        statNumber.textContent =
          Math.floor(current) +
          (statNumber.textContent.includes("+") ? "+" : "");
      }
    }, 20);
  });
};

// Запуск анимации чисел при скролле до секции "О нас"
const aboutSection = document.getElementById("about");

const aboutObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateNumbers();
        aboutObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

aboutObserver.observe(aboutSection);

// Обновление года в футере
function updateFooterYear() {
  const currentYear = new Date().getFullYear();
  const yearElement = document.getElementById("currentYear");

  if (yearElement) {
    // Если уже отображается текущий год, не обновляем
    if (parseInt(yearElement.textContent) !== currentYear) {
      yearElement.textContent = currentYear;

      // Добавляем анимацию обновления
      yearElement.style.opacity = "0";
      yearElement.style.transform = "translateY(-10px)";

      setTimeout(() => {
        yearElement.style.transition = "all 0.3s ease";
        yearElement.style.opacity = "1";
        yearElement.style.transform = "translateY(0)";
      }, 50);
    }
  }
}

// Запускаем при загрузке страницы
document.addEventListener("DOMContentLoaded", updateFooterYear);

// Также обновляем при смене года (если страница долго открыта)
setInterval(updateFooterYear, 3600000); // Проверяем каждый час
