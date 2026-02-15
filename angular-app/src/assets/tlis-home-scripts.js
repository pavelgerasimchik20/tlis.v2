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
  const themeToggle = document.getElementById('themeToggle');

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

  const supportedLangs = ['ru', 'be', 'zh'];
  const translations = {
    ru: {
      imageData: [
        {
          title: 'COLOR Mix "Кафель"',
          description: 'COLOR Mix "Кафель"'
        },
        {
          title: 'COLOR Mix "Ракушечник"',
          description: 'COLOR Mix "Ракушечник"'
        },
        {
          title: 'COLOR Mix "Старая Италия"',
          description: 'COLOR Mix "Старая Италия"'
        },
        {
          title: 'COLOR Mix "Капучино new"',
          description: 'COLOR Mix "Капучино new"'
        },
        {
          title: 'COLOR Mix "Новый закат"',
          description: 'COLOR Mix "Новый закат"'
        },
        {
          title: 'COLOR Mix "Луговая трава"',
          description: 'COLOR Mix "Луговая трава"'
        },
        {
          title: 'COLOR Mix "Пламя"',
          description: 'COLOR Mix "Пламя"'
        },
        {
          title: 'COLOR Mix "Осенние листья"',
          description: 'COLOR Mix "Осенние листья"'
        }
      ],
      formSubmit: 'Спасибо за заказ! Мы свяжемся с вами в ближайшее время для уточнения деталей.'
    },
    be: {
      imageData: [
        {
          title: 'COLOR Mix "Кафля"',
          description: 'COLOR Mix "Кафля"'
        },
        {
          title: 'COLOR Mix "Ракавіннік"',
          description: 'COLOR Mix "Ракавіннік"'
        },
        {
          title: 'COLOR Mix "Старая Італія"',
          description: 'COLOR Mix "Старая Італія"'
        },
        {
          title: 'COLOR Mix "Капучына new"',
          description: 'COLOR Mix "Капучына new"'
        },
        {
          title: 'COLOR Mix "Новы захад"',
          description: 'COLOR Mix "Новы захад"'
        },
        {
          title: 'COLOR Mix "Лугавая трава"',
          description: 'COLOR Mix "Лугавая трава"'
        },
        {
          title: 'COLOR Mix "Полымя"',
          description: 'COLOR Mix "Полымя"'
        },
        {
          title: 'COLOR Mix "Восеньскія лісце"',
          description: 'COLOR Mix "Восеньскія лісце"'
        }
      ],
      formSubmit: 'Дзякуй за замову! Мы звяжамся з вамі ў бліжэйшы час для ўдакладнення дэталяў.'
    },
    zh: {
      imageData: [
        {
          title: 'COLOR Mix "瓷砖"',
          description: 'COLOR Mix "瓷砖"'
        },
        {
          title: 'COLOR Mix "贝壳石"',
          description: 'COLOR Mix "贝壳石"'
        },
        {
          title: 'COLOR Mix "古老意大利"',
          description: 'COLOR Mix "古老意大利"'
        },
        {
          title: 'COLOR Mix "卡布奇诺 new"',
          description: 'COLOR Mix "卡布奇诺 new"'
        },
        {
          title: 'COLOR Mix "新日落"',
          description: 'COLOR Mix "新日落"'
        },
        {
          title: 'COLOR Mix "草地"',
          description: 'COLOR Mix "草地"'
        },
        {
          title: 'COLOR Mix "火焰"',
          description: 'COLOR Mix "火焰"'
        },
        {
          title: 'COLOR Mix "秋叶"',
          description: 'COLOR Mix "秋叶"'
        }
      ],
      formSubmit: '感谢您的订单！我们会尽快与您联系以确认详细信息。'
    }
  };

  function resolveLang(lang) {
    return supportedLangs.includes(lang) ? lang : 'ru';
  }

  function getActiveLang() {
    const stored = localStorage.getItem('lang');
    const htmlLang = document.documentElement.lang;
    return resolveLang(stored || htmlLang || 'ru');
  }

  let currentLang = getActiveLang();
  let imageData = translations[currentLang].imageData;

  // Create dots
  items.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.className = 'dot';
    dot.onclick = () => goToIndex(index);
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll('.dot');

  function updateTitleDescription() {
    const currentData = imageData[currentIndex];
    if (!currentData) return;

    currentTitle.textContent = currentData.title;
    currentDescription.textContent = currentData.description;

    currentTitle.style.animation = 'none';
    currentDescription.style.animation = 'none';
    setTimeout(() => {
      currentTitle.style.animation = 'fadeIn 0.6s forwards';
      currentDescription.style.animation = 'fadeIn 0.6s forwards';
    }, 10);
  }

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

    updateTitleDescription();

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
    alert(translations[currentLang].formSubmit);
    event.target.reset();
  }

  const orderForm = document.querySelector('.order-form');
  orderForm?.addEventListener('submit', handleSubmit);

  // Auto theme based on sunrise/sunset in Belarus (Minsk coordinates)
  // Coordinates: ~53.9°N, 27.6°E
  function calculateSunriseSunset(date) {
    const lat = 53.9; // Minsk latitude
    const lon = 27.6; // Minsk longitude
    
    // Day of year (1-365)
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const dayOfYear = Math.floor((date - startOfYear) / (1000 * 60 * 60 * 24)) + 1;
    
    // Solar declination angle in radians
    const declinationRad = 23.45 * (Math.PI / 180) * Math.sin((2 * Math.PI / 365) * (284 + dayOfYear));
    
    // Hour angle calculation
    const latRad = lat * (Math.PI / 180);
    const cosHourAngle = -Math.tan(latRad) * Math.tan(declinationRad);
    
    // Clamp to valid range [-1, 1]
    const hourAngleRad = Math.acos(Math.max(-1, Math.min(1, cosHourAngle)));
    
    // Convert to degrees
    const hourAngleDeg = hourAngleRad * (180 / Math.PI);
    
    // Calculate sunrise and sunset in minutes from midnight (local time)
    // Equation of time approximation (simplified)
    const B = (360 / 365) * (dayOfYear - 81);
    const equationOfTime = 9.87 * Math.sin(2 * B * Math.PI / 180) - 7.53 * Math.cos(B * Math.PI / 180) - 1.5 * Math.sin(B * Math.PI / 180);
    
    // Time offset for longitude (Minsk is UTC+3, so +3 hours = +180 minutes)
    const timeOffset = 3 * 60; // UTC+3 in minutes
    
    // Solar noon
    const solarNoon = 720 + equationOfTime - (lon * 4) + timeOffset;
    
    // Sunrise and sunset
    const sunriseMinutes = solarNoon - (hourAngleDeg * 4);
    const sunsetMinutes = solarNoon + (hourAngleDeg * 4);
    
    // Create date objects
    const sunrise = new Date(date);
    sunrise.setHours(0, Math.round(sunriseMinutes), 0, 0);
    
    const sunset = new Date(date);
    sunset.setHours(0, Math.round(sunsetMinutes), 0, 0);
    
    return { sunrise, sunset };
  }

  function getAutoTheme() {
    const now = new Date();
    const { sunrise, sunset } = calculateSunriseSunset(now);
    
    // Add 30 minutes buffer for twilight
    const sunriseWithBuffer = new Date(sunrise.getTime() + 30 * 60 * 1000);
    const sunsetWithBuffer = new Date(sunset.getTime() - 30 * 60 * 1000);
    
    // Debug info (can be removed later)
    console.log('Current time:', now.toLocaleTimeString('ru-BY'));
    console.log('Sunrise:', sunrise.toLocaleTimeString('ru-BY'));
    console.log('Sunset:', sunset.toLocaleTimeString('ru-BY'));
    console.log('Sunrise with buffer:', sunriseWithBuffer.toLocaleTimeString('ru-BY'));
    console.log('Sunset with buffer:', sunsetWithBuffer.toLocaleTimeString('ru-BY'));
    
    // Light theme during day (after sunrise + buffer, before sunset - buffer)
    const isDay = now >= sunriseWithBuffer && now < sunsetWithBuffer;
    const theme = isDay ? 'light' : 'dark';
    console.log('Auto theme determined:', theme);
    
    return theme;
  }

  function applyTheme(theme, isAuto = false) {
    const isLight = theme === 'light';
    document.body.classList.toggle('light-theme', isLight);
    if (themeToggle) {
      themeToggle.checked = isLight;
    }
    
    // Save theme mode (auto or manual)
    if (isAuto) {
      localStorage.setItem('themeMode', 'auto');
      localStorage.setItem('autoTheme', theme);
    } else {
      localStorage.setItem('themeMode', 'manual');
      localStorage.setItem('theme', theme);
    }
  }

  // Always use auto theme on page load, but respect manual override if user explicitly disabled it
  // Check if user has explicitly disabled auto theme
  const themeMode = localStorage.getItem('themeMode');
  const isAutoTheme = themeMode !== 'manual'; // Auto by default, unless explicitly set to manual
  
  // On page load, always check and apply auto theme
  const autoTheme = getAutoTheme();
  
  if (themeToggle) {
    let initialTheme;
    
    // Always use auto theme on page load
    initialTheme = autoTheme;
    applyTheme(initialTheme, true);
    
    if (isAutoTheme) {
      
      // Schedule theme updates at sunrise and sunset
      function scheduleThemeUpdate() {
        const now = new Date();
        const { sunrise, sunset } = calculateSunriseSunset(now);
        
        // Add 30 minutes buffer
        const sunriseWithBuffer = new Date(sunrise.getTime() + 30 * 60 * 1000);
        const sunsetWithBuffer = new Date(sunset.getTime() - 30 * 60 * 1000);
        
        let nextUpdate;
        if (now < sunriseWithBuffer) {
          // Before sunrise, update at sunrise
          nextUpdate = sunriseWithBuffer;
        } else if (now < sunsetWithBuffer) {
          // During day, update at sunset
          nextUpdate = sunsetWithBuffer;
        } else {
          // After sunset, update at next sunrise
          const tomorrow = new Date(now);
          tomorrow.setDate(tomorrow.getDate() + 1);
          const { sunrise: tomorrowSunrise } = calculateSunriseSunset(tomorrow);
          nextUpdate = new Date(tomorrowSunrise.getTime() + 30 * 60 * 1000);
        }
        
        const timeUntilUpdate = nextUpdate.getTime() - now.getTime();
        
        setTimeout(() => {
          if (localStorage.getItem('themeMode') === 'auto') {
            const newTheme = getAutoTheme();
            applyTheme(newTheme, true);
            scheduleThemeUpdate(); // Schedule next update
          }
        }, timeUntilUpdate);
      }
      
      scheduleThemeUpdate();
      
      // Also check every hour in case of timezone changes or system time changes
      setInterval(() => {
        if (localStorage.getItem('themeMode') === 'auto') {
          const newTheme = getAutoTheme();
          const currentTheme = localStorage.getItem('autoTheme') || 'dark';
          if (newTheme !== currentTheme) {
            applyTheme(newTheme, true);
          }
        }
      }, 60 * 60 * 1000); // Check every hour
      
    } else {
      // Manual mode was explicitly set, but we still applied auto theme on load
      // User can manually override if needed
      console.log('Manual mode detected, but auto theme applied on load');
    }

    themeToggle.addEventListener('change', () => {
      // When user manually toggles, switch to manual mode
      const nextTheme = themeToggle.checked ? 'light' : 'dark';
      localStorage.setItem('themeMode', 'manual');
      localStorage.setItem('theme', nextTheme);
      applyTheme(nextTheme, false);
    });
  } else {
    if (isAutoTheme) {
      applyTheme(getAutoTheme(), true);
    } else {
      applyTheme(localStorage.getItem('theme') || 'dark', false);
    }
  }

  // Initialize
  updateTitleDescription();
  updateCoverflow();
  // Remove auto-focus to prevent outline and shift issues
  // container.focus();
  startAutoplay();

  window.addEventListener('app:language-change', (event) => {
    const nextLang = resolveLang(event?.detail?.lang || 'ru');
    if (nextLang === currentLang) return;
    currentLang = nextLang;
    imageData = translations[currentLang].imageData;
    updateTitleDescription();
  });
});
