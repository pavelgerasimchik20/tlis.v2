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

  // Check if mobile view (tablets and phones)
  function isMobileView() {
    return window.innerWidth <= 768;
  }

  function updateCoverflow() {
    if (isAnimating) return;
    isAnimating = true;

    const isMobile = isMobileView();

    items.forEach((item, index) => {
      const isActive = index === currentIndex;
      item.classList.toggle('active', isActive);

      if (isMobile) {
        // Mobile: show only active item, centered
        if (isActive) {
          item.style.display = 'block';
          item.style.opacity = '1';
          item.style.transform = 'translateX(0) translateZ(0) rotateY(0deg) scale(1)';
          item.style.zIndex = '100';
        } else {
          item.style.display = 'none';
          item.style.opacity = '0';
        }
      } else {
        // Desktop: original coverflow effect
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

        item.style.display = 'block';
        item.style.transform = `
          translateX(${translateX}px) 
          translateZ(${translateZ}px) 
          rotateY(${rotateY}deg)
          scale(${scale})
        `;
        item.style.opacity = opacity;
        item.style.zIndex = 100 - absOffset;
      }
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

  // Handle catalog item click
  function handleCatalogItemClick(index, item) {
    // Empty method - can be extended with custom logic
    // Example: open modal, show details, navigate to page, etc.
  }

  // Click on items to select
  items.forEach((item, index) => {
    item.addEventListener('click', () => {
      handleCatalogItemClick(index, item);
      goToIndex(index);
    });
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
  }

  function stopAutoplay() {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
      autoplayInterval = null;
    }
    isPlaying = false;
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

  // Play-pause button removed

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

  // Telegram Bot Configuration
  // TODO: Replace with your actual bot token and chat ID
  // To get bot token: Create bot via @BotFather on Telegram
  // To get chat ID: Send message to your bot, then visit: https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates
  const TELEGRAM_BOT_TOKEN = '8258683759:AAHqj-B0jbISgCWAMQ1t_xpwqlAh8Nw5MoI';
  // Chat ID получателя заказов (человек, который должен получать заказы)
  // Чтобы получить chat_id другого человека:
  // 1. Этот человек должен отправить сообщение боту
  // 2. Откройте getUpdates и найдите его chat_id в ответе
  const TELEGRAM_CHAT_ID = '5034535540';

  // Send message to Telegram
  async function sendToTelegram(message, chatId = null) {
    if (!TELEGRAM_BOT_TOKEN || TELEGRAM_BOT_TOKEN === 'YOUR_BOT_TOKEN_HERE') {
      console.error('Telegram bot token not configured');
      return false;
    }

    const targetChatId = chatId || TELEGRAM_CHAT_ID;
    
    if (!targetChatId || targetChatId === 'YOUR_CHAT_ID_HERE') {
      console.error('Telegram chat ID not configured');
      return false;
    }

    try {
      const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
      
      const requestBody = {
        chat_id: targetChatId,
        text: message,
        parse_mode: 'HTML',
      };
      
      console.log('Sending to Telegram:', { chat_id: targetChatId, message_length: message.length });
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      
      if (response.ok && data.ok) {
        console.log('Message sent to Telegram successfully to chat:', targetChatId);
        return true;
      } else {
        console.error('Telegram API error:', data);
        
        // Provide helpful error messages
        if (data.error_code === 400 && data.description?.includes('chat not found')) {
          console.error('Chat not found. Please check:');
          console.error('1. Человек, которому нужно отправлять заказы, должен отправить сообщение боту');
          console.error('2. Получите его chat_id: https://api.telegram.org/bot' + TELEGRAM_BOT_TOKEN + '/getUpdates');
          console.error('3. Найдите в ответе "chat":{"id":XXXXX} для этого человека');
          console.error('4. Обновите TELEGRAM_CHAT_ID на его chat_id');
        }
        
        return false;
      }
    } catch (error) {
      console.error('Error sending to Telegram:', error);
      return false;
    }
  }

  // Format order data for Telegram
  function formatOrderMessage(formData) {
    // Get form values by ID or name
    const nameInput = document.getElementById('order-name');
    const phoneInput = document.getElementById('order-phone');
    const emailInput = document.getElementById('order-email');
    const sizeInput = document.getElementById('order-size');
    const colorInput = document.getElementById('order-color');
    const quantityInput = document.getElementById('order-quantity');
    const addressInput = document.getElementById('order-address');
    const messageInput = document.getElementById('order-message');

    const name = (nameInput?.value || formData.get('name') || '').trim() || 'Не указано';
    const phone = (phoneInput?.value || formData.get('phone') || '').trim() || 'Не указано';
    const email = (emailInput?.value || formData.get('email') || '').trim() || 'Не указано';
    const size = (sizeInput?.value || formData.get('size') || '').trim() || 'Не указано';
    const color = (colorInput?.value || formData.get('color') || '').trim() || 'Не указано';
    const quantity = (quantityInput?.value || formData.get('quantity') || '').trim() || 'Не указано';
    const address = (addressInput?.value || formData.get('address') || '').trim() || 'Не указано';
    const message = (messageInput?.value || formData.get('message') || '').trim() || 'Нет комментария';

    const orderMessage = `<b>🆕 Новый заказ плитки</b>

<b>👤 Контактная информация:</b>
• Имя: ${name}
• Телефон: ${phone}
• Email: ${email || 'Не указан'}

<b>📦 Детали заказа:</b>
• Размер плитки: ${size}
• Цвет (COLOR Mix): ${color}
• Количество: ${quantity} м²
• Адрес доставки: ${address || 'Не указан'}

<b>💬 Комментарий:</b>
${message}

<b>🕐 Время заказа:</b>
${new Date().toLocaleString('ru-BY', { 
  timeZone: 'Europe/Minsk',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit'
})}`;

    // Validate that message is not empty
    if (!orderMessage || orderMessage.trim().length === 0) {
      console.error('Formatted message is empty');
      return 'Новый заказ плитки\n\nОшибка: данные формы не получены.';
    }

    return orderMessage.trim();
  }

  // Form submission
  async function handleSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const submitButton = form.querySelector('.submit-btn');
    
    // Disable submit button to prevent double submission
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = translations[currentLang].formSubmit || 'Отправка...';
    }

    try {
      // Format and send message to Telegram
      const message = formatOrderMessage(formData);
      
      // Validate message before sending
      if (!message || message.trim().length === 0) {
        console.error('Message is empty, cannot send to Telegram');
        alert('Ошибка: не удалось сформировать сообщение. Пожалуйста, проверьте заполнение формы.');
        return;
      }
      
      console.log('Sending message to Telegram:', message);
      const success = await sendToTelegram(message);

      if (success) {
        alert(translations[currentLang].formSubmit || 'Спасибо за заказ! Мы скоро свяжемся с вами.');
        form.reset();
      } else {
        alert('Произошла ошибка при отправке заказа. Пожалуйста, попробуйте позже или свяжитесь с нами по телефону.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Произошла ошибка при отправке заказа. Пожалуйста, попробуйте позже или свяжитесь с нами по телефону.');
    } finally {
      // Re-enable submit button
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = translations[currentLang]?.form?.submit || 'Отправить заказ';
      }
    }
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

  // Handle window resize for responsive behavior
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      updateCoverflow();
    }, 150);
  });

  window.addEventListener('app:language-change', (event) => {
    const nextLang = resolveLang(event?.detail?.lang || 'ru');
    if (nextLang === currentLang) return;
    currentLang = nextLang;
    imageData = translations[currentLang].imageData;
    updateTitleDescription();
  });
});
