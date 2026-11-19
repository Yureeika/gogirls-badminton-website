
document.addEventListener('DOMContentLoaded', () => {

  
  (function mobileNav() {
    const toggles = document.querySelectorAll('.nav-toggle');
    const navs = document.querySelectorAll('.main-nav');

    toggles.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        
        const nav = document.querySelector('#main-nav');
        if (!nav) return;
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!expanded));
        nav.classList.toggle('show');
      });
    });

    
    document.addEventListener('click', (e) => {
      const nav = document.querySelector('#main-nav');
      const toggle = document.querySelector('.nav-toggle');
      if (!nav || !toggle) return;
      if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        nav.classList.remove('show');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  })();


 
  (function heroSlideshow() {
    const slideshow = document.getElementById('hero-slideshow');
    if (!slideshow) return;
    const slides = slideshow.querySelectorAll('img');
    if (!slides.length) return;
    let index = 0;
    slides.forEach((s, i) => s.classList.toggle('active', i === 0)); // ensure one active

    setInterval(() => {
      slides[index].classList.remove('active');
      index = (index + 1) % slides.length;
      slides[index].classList.add('active');
    }, 3500);
  })();


 
  (function countdownTimer() {
    const cd = document.getElementById('countdown');
    if (!cd) return;
    const targetISO = cd.dataset.target;
    if (!targetISO) return;
    const target = new Date(targetISO).getTime();
    if (Number.isNaN(target)) {
      cd.textContent = 'Date not set';
      return;
    }

    function update() {
      const now = Date.now();
      const diff = target - now;
      if (diff <= 0) {
        cd.innerHTML = '<strong>Event started!</strong>';
        clearInterval(interval);
        return;
      }
      const days = Math.floor(diff / (1000*60*60*24));
      const hours = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
      const minutes = Math.floor((diff % (1000*60*60)) / (1000*60));
      const seconds = Math.floor((diff % (1000*60)) / 1000);
      cd.innerHTML = `<span class="cd-part">${days}d ${hours}h ${minutes}m ${seconds}s</span>`;
    }
    update();
    const interval = setInterval(update, 1000);
  })();


 
  (function quickSignup() {
    const form = document.getElementById('quickSign');
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('q-name')?.value?.trim() || '';
      const email = document.getElementById('q-email')?.value?.trim() || '';
      if (!name || !email || !/.+@.+\..+/.test(email)) {
        alert('Please provide a valid name and email.');
        return;
      }
      // Simulate success (production should POST to backend)
      alert(`Thanks ${name}! We saved your reservation (simulation).`);
      form.reset();
    });
  })();


  
  (function joinForm() {
    const form = document.getElementById('joinForm');
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const fullName = document.getElementById('fullName');
      const email = document.getElementById('emailJoin');
      const year = document.getElementById('year');
      const pref = document.getElementById('prefProgram');

      let ok = true;
      // Clear old errors
      document.querySelectorAll('.error').forEach(el => el.textContent = '');

      if (!fullName.value.trim()) {
        document.getElementById('err-fullName').textContent = 'Please enter your name';
        ok = false;
      }
      if (!/.+@.+\..+/.test(email.value.trim())) {
        document.getElementById('err-emailJoin').textContent = 'Please enter a valid email';
        ok = false;
      }
      if (!year.value) ok = false;
      if (!pref.value) ok = false;

      if (!ok) return;

      // Simulated success: show success message and reset
      const success = document.getElementById('joinSuccess');
      if (success) {
        success.hidden = false;
        form.reset();
        setTimeout(() => { success.hidden = true; }, 6000);
      } else {
        alert('Application submitted (simulation).');
      }
    });
  })();


 
  (function contactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('c-name')?.value?.trim();
      const email = document.getElementById('c-email')?.value?.trim();
      const message = document.getElementById('c-message')?.value?.trim();

      if (!name || !email || !message || !/.+@.+\..+/.test(email)) {
        alert('Please complete the form with a valid email and message.');
        return;
      }
      const success = document.getElementById('contactSuccess');
      if (success) {
        success.hidden = false;
        form.reset();
        setTimeout(() => { success.hidden = true; }, 5000);
      } else {
        alert('Message sent (simulation).');
      }
    });
  })();



  (function lightbox() {
    const imgs = document.querySelectorAll('.gallery-img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');

    if (!imgs.length || !lightbox || !lightboxImg) return;

    imgs.forEach(img => {
      img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || '';
        lightboxCaption.textContent = img.alt || '';
        lightbox.setAttribute('aria-hidden', 'false');
        lightbox.focus();
      });
    });

    const close = () => {
      lightbox.setAttribute('aria-hidden', 'true');
      lightboxImg.src = '';
      lightboxCaption.textContent = '';
    };

    lightboxClose?.addEventListener('click', close);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) close();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });
  })();


  
  (function accordion() {
  const toggles = document.querySelectorAll('.accordion-toggle');
  if (!toggles.length) return;

  toggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const panel = btn.nextElementSibling;
      if (!panel) return;

      const isOpen = panel.style.display === 'block';

      // Close all panels
      document.querySelectorAll('.accordion .accordion-panel').forEach(p => {
        p.style.display = 'none';
        p.setAttribute('aria-hidden', 'true');
      });
      document.querySelectorAll('.accordion .accordion-toggle').forEach(b => {
        b.setAttribute('aria-expanded', 'false');
      });

      // Toggle the clicked one
      if (!isOpen) {
        panel.style.display = 'block';
        panel.setAttribute('aria-hidden', 'false');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
})();



  (function smoothLinks() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      });
    });
  })();

}); // DOMContentLoaded end
