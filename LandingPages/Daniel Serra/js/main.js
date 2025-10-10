const nav = document.querySelector(".site-nav");
const menu = document.querySelector(".site-nav__menu");
const toggle = document.querySelector(".site-nav__toggle");

if (nav) {
  const updateNavState = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
    const scrolled = scrollTop > 20;
    nav.classList.toggle("is-scrolled", scrolled);
    if (!scrolled && menu && toggle) {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  };
  updateNavState();
  window.addEventListener("scroll", updateNavState, { passive: true });
  window.addEventListener("load", updateNavState);
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".progress__fill").forEach((fill, i) => {
    const pct = +fill.dataset.progress || 0;
    const bar = fill.closest(".progress");
    if (bar) {
      bar.role = "progressbar";
      bar.ariaValueMin = "0";
      bar.ariaValueMax = "100";
    }
    fill.style.width = "0%";
    setTimeout(() => {
      fill.style.width = `${pct}%`;
      if (bar) bar.ariaValueNow = String(pct);
    }, 120 * i);
  });
});

if (toggle && menu) {
  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  menu.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (!link) return;
    menu.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  });
}

const scrollBtns = document.querySelectorAll("[data-scroll-target]");
if (scrollBtns.length > 0) {
  scrollBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const sel = btn.getAttribute("data-scroll-target");
      const target = sel && document.querySelector(sel);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

const revealEls = document.querySelectorAll("[data-reveal]");
if (revealEls.length > 0) {
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25, rootMargin: "0px 0px -10% 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }
}

const form = document.querySelector(".form");
const success = form?.querySelector(".form__success");

if (form && success) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const fd = new FormData(form);
    const name = fd.get("name")?.toString().trim();
    const email = fd.get("email")?.toString().trim();
    const location = fd.get("location")?.toString().trim();
    const message = fd.get("message")?.toString().trim();

    if (!name || !email) {
      showMessage("Por favor, preenche os campos obrigatórios.", false);
      return;
    }
    const namePattern = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]{2,}$/;
    if (!namePattern.test(name)) {
      showMessage("O nome só pode conter letras e espaços.", false);
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      showMessage("Por favor, insere um email válido.", false);
      return;
    }

    if (message && message.length < 5) {
      showMessage("A mensagem é muito curta.", false);
      return;
    }

    form.reset();
    showMessage(
      "Obrigado! Receberás no email as instruções para te juntares à EcoMar.",
      true
    );
  });

  function showMessage(text, successState = true) {
    success.textContent = text;
    success.style.color = successState ? "var(--color-highlight)" : "#ff8585";
    if (successState) setTimeout(() => (success.textContent = ""), 6000);
  }
}

(function () {
  const btn = document.getElementById("toTop");
  const SHOW_AFTER = 200;

  function onScroll() {
    if (window.innerWidth <= 880 && window.pageYOffset > SHOW_AFTER) {
      btn.classList.add("is-visible");
    } else {
      btn.classList.remove("is-visible");
    }
  }

  function scrollToTop(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  btn.addEventListener("click", scrollToTop);

  onScroll();
})();
