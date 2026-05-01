document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".counter");
  
    if (!counters.length) return;
  
    const animateCounter = (counter) => {
      const target = Number(counter.dataset.target) || 0;
      const duration = 1800;
      const startTime = performance.now();
  
      function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
  
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(target * easedProgress);
  
        if (target === 49) {
          counter.textContent = (currentValue / 10).toFixed(1);
        } else {
          counter.textContent = currentValue.toLocaleString();
        }
  
        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        }
      }
  
      requestAnimationFrame(updateCounter);
    };
  
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
  
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        });
      },
      {
        threshold: 0.5,
      }
    );
  
    counters.forEach((counter) => observer.observe(counter));
  });