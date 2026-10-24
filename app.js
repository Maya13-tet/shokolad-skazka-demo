// Меню-гамбургер на узких экранах
(function(){
  const b = document.getElementById("burger");
  const m = document.getElementById("menu");
  if (!b || !m) return;
  function set(open){
    m.classList.toggle("open", open);
    b.setAttribute("aria-expanded", open);
    b.setAttribute("aria-label", open ? "Закрыть меню" : "Открыть меню");
  }
  b.addEventListener("click", () => set(!m.classList.contains("open")));
  m.addEventListener("click", e => { if (e.target.tagName === "A") set(false); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") set(false); });
})();

// Лиса-спутник: появляется после первого экрана и плавно едет вдоль страницы
(function(){
  const guide = document.querySelector(".guide");
  const hero = document.querySelector(".hero");
  if (!guide || !hero) return;
  function tick(){
    const y = window.scrollY;
    const h = hero.offsetHeight;
    guide.classList.toggle("on", y > h * 0.7);
    const max = document.documentElement.scrollHeight - innerHeight;
    const p = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
    // лиса поднимается и опускается по ходу прокрутки
    guide.style.transform = "translateY(" + (-Math.sin(p * Math.PI * 3) * 28).toFixed(1) + "px) scaleX(" + (Math.cos(p * Math.PI * 3) >= 0 ? 1 : -1) + ")";
  }
  addEventListener("scroll", tick, { passive: true });
  addEventListener("resize", tick);
  tick();
})();

// Шапка становится плотной, когда страница прокручена: белый текст всегда читается
(function(){
  const top = document.querySelector(".top");
  if (!top) return;
  function s(){ top.classList.toggle("solid", window.scrollY > 40); }
  addEventListener("scroll", s, { passive: true });
  s();
})();

// Бесконечные анимации первого экрана ставятся на паузу, когда экран не виден
(function(){
  const hero = document.querySelector(".hero");
  if (!hero || !("IntersectionObserver" in window)) return;
  new IntersectionObserver(function(e){ hero.classList.toggle("is-off", !e[0].isIntersecting); }).observe(hero);
})();
