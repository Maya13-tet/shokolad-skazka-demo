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
