// JavaScript Document
document.addEventListener('DOMContentLoaded', () => {
  // Coverflow functionality
  const items = document.querySelectorAll('.coverflow-item');
  const dotsContainer = document.getElementById('dots');
  const currentTitle = document.getElementById('current-title');
  const currentDescription = document.getElementById('current-description');
  const container = document.querySelector('.coverflow-container');
  const menuToggle = document.getElementById('menuToggle');
  const mainMenu = document.getElementById('mainMenu');
  const emailElement = document.querySelector('.contacts .email');
  const workingHoursElements = document.querySelectorAll('.contacts .working-hours');
  const sections = document.querySelectorAll('.section');
  const menuItems = document.querySelectorAll('.menu-item');
  const header = document.getElementById('header');
  const scrollToTopBtn = document.getElementById('scrollToTop');
  const playIcon = document.querySelector('.play-icon');
  const pauseIcon = document.querySelector('.pause-icon');

  if (!items.length || !dotsContainer || !currentTitle || !currentDescription || !container) {
    return;
  }

  let currentIndex = 3;
  let isAnimating = false;
  let autoplayInterval = null;
  let isPlaying = true;

  // Mobile menu toggle
  if (menuToggle && mainMenu) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      mainMenu.classList.toggle('active');
    });
  }

  // Close mobile menu when clicking on menu items (except external links)
  document.querySelectorAll('.menu-item:not(.external)').forEach(item => {
    item.addEventListener('click', () => {
      menuToggle?.classList.remove('active');
      mainMenu?.classList.remove('active');
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (menuToggle && mainMenu && !menuToggle.contains(e.target) && !mainMenu.contains(e.target)) {
      menuToggle.classList.remove('active');
      mainMenu.classList.remove('active');
    }
  });

  // Image data with titles and descriptions
  const imageData = [
    {
      title: "Парковка во дворе жилого дома",
      description: "Коллекция `Ice latte`"
    },
    {
      title: "Площадь перед частным домом",
      description: "Коллекция `Южный город`"
    },
    {
      title: "Крупноформатные плиты для отмостки",
      description: "Коллекция `Мраморные ступени` с черной окантовкой"
    },
    {
      title: "Благоустройство территории частного дома плитами 60 * 30 см",
      description: "Коллекция `Метель`"
    },
    {
      title: "Реконструкция улицы Раковская",
      description: "Коллекция `Осенний костёр`"
    },
    {
      title: "Входная зона жилого дома",
      description: "Коллекция `Зимний лес`"
    },
    {
      title: "Ступени на входе в частный дом",
      description: "Коллекция `Вулканический ландшафт`"
    },
    {
      title: "Отмостка вокруг дома",
      description: "Коллекция `Ледяное озеро`"
    }
  ];

  // Create dots
  items.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.className = 'dot';
    dot.onclick = () => goToIndex(index);
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll('.dot');

  function updateCoverflow() {
    if (isAnimating) return;
    isAnimating = true;

    items.forEach((item, index) => {
      let offset = index - currentIndex;

      if (offset > items.length / 2) {
        offset = offset - items.length;
      } else if (offset < -items.length / 2) {
        offset = offset + items.length;
      }

      const absOffset = Math.abs(offset);
      const sign = Math.sign(offset);

      let translateX = offset * 253;
      let translateZ = -absOffset * 200;
      let rotateY = -sign * Math.min(absOffset * 60, 60);
      let opacity = 1 - (absOffset * 0.2);
      let scale = 1 - (absOffset * 0.1);

      if (absOffset > 3) {
        opacity = 0;
        translateX = sign * 920;
      }

      item.style.transform = `
        translateX(${translateX}px) 
        translateZ(${translateZ}px) 
        rotateY(${rotateY}deg)
        scale(${scale})
      `;
      item.style.opacity = opacity;
      item.style.zIndex = 100 - absOffset;
      item.classList.toggle('active', index === currentIndex);
    });

    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });

    const currentData = imageData[currentIndex];
    currentTitle.textContent = currentData.title;
    currentDescription.textContent = currentData.description;

    currentTitle.style.animation = 'none';
    currentDescription.style.animation = 'none';
    setTimeout(() => {
      currentTitle.style.animation = 'fadeIn 0.6s forwards';
      currentDescription.style.animation = 'fadeIn 0.6s forwards';
    }, 10);

    setTimeout(() => {
      isAnimating = false;
    }, 600);
  }

  function navigate(direction) {
    if (isAnimating) return;

    currentIndex = currentIndex + direction;

    if (currentIndex < 0) {
      currentIndex = items.length - 1;
    } else if (currentIndex >= items.length) {
      currentIndex = 0;
    }

    updateCoverflow();
  }

  function goToIndex(index) {
    if (isAnimating || index === currentIndex) return;
    currentIndex = index;
    updateCoverflow();
  }

  // Keyboard navigation
  container.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  });

  // Click on items to select
  items.forEach((item, index) => {
    item.addEventListener('click', () => goToIndex(index));
  });

  // Touch/swipe support
  let touchStartX = 0;
  let touchEndX = 0;
  let touchStartY = 0;
  let touchEndY = 0;
  let isSwiping = false;

  container.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
    isSwiping = true;
  }, { passive: true });

  container.addEventListener('touchmove', (e) => {
    if (!isSwiping) return;

    const currentX = e.changedTouches[0].screenX;
    const diff = currentX - touchStartX;

    if (Math.abs(diff) > 10) {
      e.preventDefault();
    }
  }, { passive: false });

  container.addEventListener('touchend', (e) => {
    if (!isSwiping) return;

    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
    isSwiping = false;
  }, { passive: true });

  function handleSwipe() {
    const swipeThreshold = 30;
    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY - touchEndY;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > swipeThreshold) {
      handleUserInteraction();

      if (diffX > 0) {
        navigate(1);
      } else {
        navigate(-1);
      }
    }
  }

  // Initialize images and reflections
  items.forEach((item) => {
    const img = item.querySelector('img');
    const reflection = item.querySelector('.reflection');

    if (!img || !reflection) return;

    img.onload = function() {
      this.parentElement?.classList.remove('image-loading');
      reflection.style.setProperty('--bg-image', `url(${this.src})`);
      reflection.style.backgroundImage = `url(${this.src})`;
      reflection.style.backgroundSize = 'cover';
      reflection.style.backgroundPosition = 'center';
    };

    img.onerror = function() {
      this.parentElement?.classList.add('image-loading');
    };
  });

  // Autoplay functionality
  function startAutoplay() {
    autoplayInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % items.length;
      updateCoverflow();
    }, 4000);
    isPlaying = true;
    if (playIcon && pauseIcon) {
      playIcon.style.display = 'none';
      pauseIcon.style.display = 'block';
    }
  }

  function stopAutoplay() {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
      autoplayInterval = null;
    }
    isPlaying = false;
    if (playIcon && pauseIcon) {
      playIcon.style.display = 'block';
      pauseIcon.style.display = 'none';
    }
  }

  function toggleAutoplay() {
    if (isPlaying) {
      stopAutoplay();
    } else {
      startAutoplay();
    }
  }

  function handleUserInteraction() {
    stopAutoplay();
  }

  // Add event listeners to stop autoplay on manual navigation
  items.forEach((item) => {
    item.addEventListener('click', handleUserInteraction);
  });

  document.querySelector('.nav-button.prev')?.addEventListener('click', () => {
    handleUserInteraction();
    navigate(-1);
  });
  document.querySelector('.nav-button.next')?.addEventListener('click', () => {
    handleUserInteraction();
    navigate(1);
  });

  document.getElementById('playPauseBtn')?.addEventListener('click', () => {
    toggleAutoplay();
  });

  dots.forEach((dot) => {
    dot.addEventListener('click', handleUserInteraction);
  });

  container.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      handleUserInteraction();
    }
  });

  // Update active menu item on scroll
  function updateActiveMenuItem() {
    const scrollPosition = window.scrollY + 100;

    sections.forEach((section, index) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        menuItems.forEach(item => {
          if (!item.classList.contains('external')) {
            item.classList.remove('active');
          }
        });
        if (menuItems[index] && !menuItems[index].classList.contains('external')) {
          menuItems[index].classList.add('active');
        }
      }
    });

    if (header) {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
        if (emailElement) {
          emailElement.style.display = 'none';
        }
        workingHoursElements.forEach(element => {
          element.style.fontSize = '14px';
        });
      } else {
        header.classList.remove('scrolled');
        if (emailElement) {
          emailElement.style.display = '';
        }
        workingHoursElements.forEach(element => {
          element.style.fontSize = '16px';
        });
      }
    }

    if (scrollToTopBtn) {
      if (window.scrollY > 500) {
        scrollToTopBtn.classList.add('visible');
      } else {
        scrollToTopBtn.classList.remove('visible');
      }
    }
  }

  window.addEventListener('scroll', updateActiveMenuItem);

  // Smooth scroll to section
  menuItems.forEach(item => {
    item.addEventListener('click', (e) => {
      const targetId = item.getAttribute('href');

      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // Logo click to scroll to top
  document.querySelector('.logo-container')?.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Scroll to top button
  scrollToTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Form submission
  function handleSubmit(event) {
    event.preventDefault();
    alert('Thank you for your message! We\'ll get back to you soon.');
    event.target.reset();
  }

  const contactForm = document.querySelector('.contact-form');
  contactForm?.addEventListener('submit', handleSubmit);

  // Initialize
  updateCoverflow();
  container.focus();
  startAutoplay();
});
