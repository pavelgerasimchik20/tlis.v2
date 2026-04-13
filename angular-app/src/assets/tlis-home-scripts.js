document.addEventListener('DOMContentLoaded', () => {
  // Coverflow functionality (supports multiple tab panels)
  const catalogPanels = Array.from(document.querySelectorAll('.catalog-panel'));
  const catalogTabButtons = Array.from(document.querySelectorAll('.catalog-tab-btn'));
  const menuToggle = document.getElementById('menuToggle');
  const mainMenu = document.getElementById('mainMenu');
  const emailElement = document.querySelector('.contacts .email');
  const workingHoursElements = document.querySelectorAll('.contacts .working-hours');
  const sections = document.querySelectorAll('.section');
  const menuItems = document.querySelectorAll('.menu-item');
  const header = document.getElementById('header');
  const scrollToTopBtn = document.getElementById('scrollToTop');
  const themeToggle = document.getElementById('themeToggle');

  function syncHeaderHeightVar() {
    if (!header) return;
    const height = header.offsetHeight || 120;
    document.documentElement.style.setProperty('--header-current-height', `${height}px`);
  }

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
      imageDataByType: {
        colormix: [
          { title: 'COLOR Mix "Кафель"', description: 'COLOR Mix "Кафель"' },
          { title: 'COLOR Mix "Ракушечник"', description: 'COLOR Mix "Ракушечник"' },
          { title: 'COLOR Mix "Старая Италия"', description: 'COLOR Mix "Старая Италия"' },
          { title: 'COLOR Mix "Капучино new"', description: 'COLOR Mix "Капучино new"' },
          { title: 'COLOR Mix "Луговая трава"', description: 'COLOR Mix "Луговая трава"' },
          { title: 'COLOR Mix "Пламя"', description: 'COLOR Mix "Пламя"' },
          { title: 'COLOR Mix "Осенние листья"', description: 'COLOR Mix "Осенние листья"' }
        ],
        mono: [
          { title: 'Одноцветная "Белая"', description: 'Моковая карточка. Описание будет добавлено.' },
          { title: 'Одноцветная "Серая"', description: 'Моковая карточка. Описание будет добавлено.' },
          { title: 'Одноцветная "Красная"', description: 'Моковая карточка. Описание будет добавлено.' },
          { title: 'Одноцветная "Желтая"', description: 'Моковая карточка. Описание будет добавлено.' },
          { title: 'Одноцветная "Зеленая"', description: 'Моковая карточка. Описание будет добавлено.' },
          { title: 'Одноцветная "Синяя"', description: 'Моковая карточка. Описание будет добавлено.' },
          { title: 'Одноцветная "Коричневая"', description: 'Моковая карточка. Описание будет добавлено.' },
          { title: 'Одноцветная "Черная"', description: 'Моковая карточка. Описание будет добавлено.' }
        ],
        'white-cement': [
          { title: 'Одноцветная на белом цементе «Белая»', description: 'Моковая карточка. Описание будет добавлено.' },
          { title: 'Одноцветная на белом цементе «Красная»', description: 'Моковая карточка. Описание будет добавлено.' },
          { title: 'Одноцветная на белом цементе «Желтая»', description: 'Моковая карточка. Описание будет добавлено.' },
          { title: 'Одноцветная на белом цементе «Зеленая»', description: 'Моковая карточка. Описание будет добавлено.' },
          { title: 'Одноцветная на белом цементе «Синяя»', description: 'Моковая карточка. Описание будет добавлено.' },
          { title: 'Одноцветная на белом цементе «Коричневая»', description: 'Моковая карточка. Описание будет добавлено.' },
          { title: 'Тактильная плитка предупреждающая (ТП)', description: 'Моковая карточка. Описание будет добавлено.' },
          { title: 'Тактильная плитка направляющая (ТН)', description: 'Моковая карточка. Описание будет добавлено.' }
        ],
        border: [
          { title: 'Борт тротуарный', description: 'Моковая карточка. Описание будет добавлено.' },
          { title: 'Борт дорожный', description: 'Моковая карточка. Описание будет добавлено.' }
        ]
      },
      formSubmit: 'Спасибо за заказ! Мы свяжемся с вами в ближайшее время для уточнения деталей.',
      consentAlert: 'Для отправки заявки необходимо согласие на обработку персональных данных.'
    },
    be: {
      imageDataByType: {
        colormix: [
          { title: 'COLOR Mix "Кафля"', description: 'COLOR Mix "Кафля"' },
          { title: 'COLOR Mix "Ракавіннік"', description: 'COLOR Mix "Ракавіннік"' },
          { title: 'COLOR Mix "Старая Італія"', description: 'COLOR Mix "Старая Італія"' },
          { title: 'COLOR Mix "Капучына new"', description: 'COLOR Mix "Капучына new"' },
          { title: 'COLOR Mix "Лугавая трава"', description: 'COLOR Mix "Лугавая трава"' },
          { title: 'COLOR Mix "Полымя"', description: 'COLOR Mix "Полымя"' },
          { title: 'COLOR Mix "Восеньскія лісце"', description: 'COLOR Mix "Восеньскія лісце"' }
        ],
        mono: [
          { title: 'Аднаколерная "Белая"', description: 'Мокавая картка. Апісанне будзе дададзена.' },
          { title: 'Аднаколерная "Шэрая"', description: 'Мокавая картка. Апісанне будзе дададзена.' },
          { title: 'Аднаколерная "Чырвоная"', description: 'Мокавая картка. Апісанне будзе дададзена.' },
          { title: 'Аднаколерная "Жоўтая"', description: 'Мокавая картка. Апісанне будзе дададзена.' },
          { title: 'Аднаколерная "Зялёная"', description: 'Мокавая картка. Апісанне будзе дададзена.' },
          { title: 'Аднаколерная "Сіняя"', description: 'Мокавая картка. Апісанне будзе дададзена.' },
          { title: 'Аднаколерная "Карычневая"', description: 'Мокавая картка. Апісанне будзе дададзена.' },
          { title: 'Аднаколерная "Чорная"', description: 'Мокавая картка. Апісанне будзе дададзена.' }
        ],
        'white-cement': [
          { title: 'Аднаколерная на белым цэменце «Белая»', description: 'Мокавая картка. Апісанне будзе дададзена.' },
          { title: 'Аднаколерная на белым цэменце «Чырвоная»', description: 'Мокавая картка. Апісанне будзе дададзена.' },
          { title: 'Аднаколерная на белым цэменце «Жоўтая»', description: 'Мокавая картка. Апісанне будзе дададзена.' },
          { title: 'Аднаколерная на белым цэменце «Зялёная»', description: 'Мокавая картка. Апісанне будзе дададзена.' },
          { title: 'Аднаколерная на белым цэменце «Сіняя»', description: 'Мокавая картка. Апісанне будзе дададзена.' },
          { title: 'Аднаколерная на белым цэменце «Карычневая»', description: 'Мокавая картка. Апісанне будзе дададзена.' },
          { title: 'Тактыльная плітка папярэджальная (ТП)', description: 'Мокавая картка. Апісанне будзе дададзена.' },
          { title: 'Тактыльная плітка кіруючая (ТН)', description: 'Мокавая картка. Апісанне будзе дададзена.' }
        ],
        border: [
          { title: 'Борт тратуарны', description: 'Мокавая картка. Апісанне будзе дададзена.' },
          { title: 'Борт дарожны', description: 'Мокавая картка. Апісанне будзе дададзена.' }
        ]
      },
      formSubmit: 'Дзякуй за замову! Мы звяжамся з вамі ў бліжэйшы час для ўдакладнення дэталяў.',
      consentAlert: 'Для адпраўкі заяўкі неабходна згода на апрацоўку персанальных даных.'
    },
    zh: {
      imageDataByType: {
        colormix: [
          { title: 'COLOR Mix "瓷砖"', description: 'COLOR Mix "瓷砖"' },
          { title: 'COLOR Mix "贝壳石"', description: 'COLOR Mix "贝壳石"' },
          { title: 'COLOR Mix "古老意大利"', description: 'COLOR Mix "古老意大利"' },
          { title: 'COLOR Mix "卡布奇诺 new"', description: 'COLOR Mix "卡布奇诺 new"' },
          { title: 'COLOR Mix "草地"', description: 'COLOR Mix "草地"' },
          { title: 'COLOR Mix "火焰"', description: 'COLOR Mix "火焰"' },
          { title: 'COLOR Mix "秋叶"', description: 'COLOR Mix "秋叶"' }
        ],
        mono: [
          { title: '单色 "白色"', description: '占位卡片，后续补充描述。' },
          { title: '单色 "灰色"', description: '占位卡片，后续补充描述。' },
          { title: '单色 "红色"', description: '占位卡片，后续补充描述。' },
          { title: '单色 "黄色"', description: '占位卡片，后续补充描述。' },
          { title: '单色 "绿色"', description: '占位卡片，后续补充描述。' },
          { title: '单色 "蓝色"', description: '占位卡片，后续补充描述。' },
          { title: '单色 "棕色"', description: '占位卡片，后续补充描述。' },
          { title: '单色 "黑色"', description: '占位卡片，后续补充描述。' }
        ],
        'white-cement': [
          { title: '白水泥单色 "白色"', description: '占位卡片，后续补充描述。' },
          { title: '白水泥单色 "红色"', description: '占位卡片，后续补充描述。' },
          { title: '白水泥单色 "黄色"', description: '占位卡片，后续补充描述。' },
          { title: '白水泥单色 "绿色"', description: '占位卡片，后续补充描述。' },
          { title: '白水泥单色 "蓝色"', description: '占位卡片，后续补充描述。' },
          { title: '白水泥单色 "棕色"', description: '占位卡片，后续补充描述。' },
          { title: '白水泥 盲道警示砖 (TP)', description: '占位卡片，后续补充描述。' },
          { title: '白水泥 盲道行进砖 (TN)', description: '占位卡片，后续补充描述。' }
        ],
        border: [
          { title: '人行道路缘石', description: '占位卡片，后续补充描述。' },
          { title: '道路路缘石', description: '占位卡片，后续补充描述。' }
        ]
      },
      formSubmit: '感谢您的订单！我们会尽快与您联系以确认详细信息。',
      consentAlert: '提交订单前请勾选同意处理个人数据。'
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

  function isMobileView() {
    return window.innerWidth <= 768;
  }

  function createCoverflowController(panel) {
    const galleryType = panel.dataset.galleryType || 'colormix';
    const items = Array.from(panel.querySelectorAll('.coverflow-item'));
    const dotsContainer = panel.querySelector('.dots-container');
    const currentTitle = panel.querySelector('.current-title');
    const container = panel.querySelector('.coverflow-container');
    const prevBtn = panel.querySelector('.nav-button.prev');
    const nextBtn = panel.querySelector('.nav-button.next');
    if (!items.length || !dotsContainer || !currentTitle || !container) {
      return null;
    }

    let currentIndex = Math.floor(items.length / 2);
    let isAnimating = false;
    let autoplayInterval = null;
    const getImageData = () => translations[currentLang]?.imageDataByType?.[galleryType] || [];

    const goToIndex = (index) => {
      if (isAnimating || index === currentIndex) return;
      currentIndex = index;
      updateCoverflow();
    };

    dotsContainer.innerHTML = '';
    items.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.className = 'dot';
      dot.onclick = () => goToIndex(index);
      dotsContainer.appendChild(dot);
    });
    const dots = Array.from(dotsContainer.querySelectorAll('.dot'));

    function updateTitleDescription() {
      const imageData = getImageData();
      const currentData = imageData[currentIndex] || imageData[0];
      if (!currentData) return;
      currentTitle.textContent = currentData.title;
      currentTitle.style.animation = 'none';
      setTimeout(() => {
        currentTitle.style.animation = 'fadeIn 0.6s forwards';
      }, 10);
    }

    function updateCoverflow() {
      if (isAnimating) return;
      isAnimating = true;
      const isMobile = isMobileView();
      items.forEach((item, index) => {
        const isActive = index === currentIndex;
        item.classList.toggle('active', isActive);
        if (isMobile) {
          if (isActive) {
            item.style.display = 'block';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0) translateZ(0) rotateY(0deg) scale(1.5)';
            item.style.zIndex = '100';
          } else {
            item.style.display = 'none';
            item.style.opacity = '0';
          }
          return;
        }
        let offset = index - currentIndex;
        if (offset > items.length / 2) offset -= items.length;
        else if (offset < -items.length / 2) offset += items.length;
        const absOffset = Math.abs(offset);
        const sign = Math.sign(offset);
        let translateX = offset * 253;
        const translateY = -absOffset * 26;
        let translateZ = -absOffset * 200;
        let rotateY = -sign * Math.min(absOffset * 60, 60);
        let opacity = 1 - (absOffset * 0.2);
        let scale = 1 - (absOffset * 0.1);
        if (absOffset === 0) scale = 1.1;
        if (absOffset > 3) {
          opacity = 0;
          translateX = sign * 920;
        }
        item.style.display = 'block';
        item.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;
        item.style.opacity = opacity;
        item.style.zIndex = 100 - absOffset;
      });
      dots.forEach((dot, index) => dot.classList.toggle('active', index === currentIndex));
      updateTitleDescription();
      setTimeout(() => { isAnimating = false; }, 600);
    }

    function navigate(direction) {
      if (isAnimating) return;
      currentIndex += direction;
      if (currentIndex < 0) currentIndex = items.length - 1;
      else if (currentIndex >= items.length) currentIndex = 0;
      updateCoverflow();
    }

    function startAutoplay() {
      if (autoplayInterval) clearInterval(autoplayInterval);
      autoplayInterval = setInterval(() => {
        if (!panel.classList.contains('active')) return;
        currentIndex = (currentIndex + 1) % items.length;
        updateCoverflow();
      }, 4000);
    }

    items.forEach((item, index) => {
      const img = item.querySelector('img');
      const reflection = item.querySelector('.reflection');
      if (img && reflection) {
        img.onload = function() {
          this.parentElement?.classList.remove('image-loading');
          reflection.style.backgroundImage = `url(${this.src})`;
          reflection.style.backgroundSize = 'cover';
          reflection.style.backgroundPosition = 'center';
        };
        img.onerror = function() { this.parentElement?.classList.add('image-loading'); };
      }
      item.addEventListener('click', () => goToIndex(index));
    });

    prevBtn?.addEventListener('click', () => navigate(-1));
    nextBtn?.addEventListener('click', () => navigate(1));
    container.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') navigate(-1);
      if (e.key === 'ArrowRight') navigate(1);
    });

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
      if (Math.abs(currentX - touchStartX) > 10) e.preventDefault();
    }, { passive: false });
    container.addEventListener('touchend', (e) => {
      if (!isSwiping) return;
      touchEndX = e.changedTouches[0].screenX;
      touchEndY = e.changedTouches[0].screenY;
      const diffX = touchStartX - touchEndX;
      const diffY = touchStartY - touchEndY;
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 30) {
        navigate(diffX > 0 ? 1 : -1);
      }
      isSwiping = false;
    }, { passive: true });

    updateCoverflow();
    startAutoplay();
    return {
      panel,
      refresh: () => updateCoverflow(),
      updateText: () => updateTitleDescription()
    };
  }

  const galleryControllers = catalogPanels.map(createCoverflowController).filter(Boolean);

  catalogTabButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-tab-target');
      catalogTabButtons.forEach((b) =>
        b.classList.toggle('active', b.getAttribute('data-tab-target') === targetId)
      );
      catalogPanels.forEach((panel) => panel.classList.toggle('active', panel.id === targetId));
      setTimeout(() => galleryControllers.forEach((c) => c.refresh()), 20);
    });
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

    syncHeaderHeightVar();
  }

  window.addEventListener('scroll', updateActiveMenuItem);
  syncHeaderHeightVar();
  updateActiveMenuItem();

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
      
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      
      if (response.ok && data.ok) {
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

  /** Совпадает с `TACTILE_ORDER_SIZE_*` в `catalog-modal-data.ts` */
  function isTactileOrderSize(size) {
    const s = (size || '').trim();
    return s === '20.10.9-ТП' || s === '20.10.9-ТН';
  }

  /** Бордюр — маркировка как в форме заказа */
  function isBorderOrderSize(size) {
    const s = (size || '').trim();
    return s === 'БР100.20.8 тротуарный' || s === 'БР100.30.15 дорожный';
  }

  function isTrotuarBorderOrderSize(size) {
    return (size || '').trim() === 'БР100.20.8 тротуарный';
  }

  function isRoadBorderOrderSize(size) {
    return (size || '').trim() === 'БР100.30.15 дорожный';
  }

  const ROAD_BORDER_SHADE_RU =
    'по умолчанию стандартный серый; по спецзаказу — любой цвет (уточняйте у менеджера)';

  const ORDER_COLOR_GROUP_LABEL_RU = {
    colormix: 'COLOR Mix',
    mono: 'Одноцветная',
    'white-cement': 'Одноцветная на белом цементе'
  };

  // Format order data for Telegram
  function formatOrderMessage(formData) {
    // Get form values by ID or name
    const nameInput = document.getElementById('order-name');
    const phoneInput = document.getElementById('order-phone');
    const emailInput = document.getElementById('order-email');
    const sizeInput = document.getElementById('order-size');
    const colorGroupInput = document.getElementById('order-color-group');
    const colorInput = document.getElementById('order-color');
    const quantityInput = document.getElementById('order-quantity');
    const addressInput = document.getElementById('order-address');
    const messageInput = document.getElementById('order-message');

    const name = (nameInput?.value || formData.get('name') || '').trim() || 'Не указано';
    const phone = (phoneInput?.value || formData.get('phone') || '').trim() || 'Не указано';
    const email = (emailInput?.value || formData.get('email') || '').trim() || 'Не указано';
    const size = (sizeInput?.value || formData.get('size') || '').trim() || 'Не указано';
    const colorGroupRaw = (colorGroupInput?.value || formData.get('colorGroup') || '').trim();
    const colorRaw = (colorInput?.value || formData.get('color') || '').trim();

    let colorLine = '';
    let shadeLine = '';

    if (isTactileOrderSize(size)) {
      colorLine = 'не применимо (тактильная плитка)';
      shadeLine = 'не применимо (тактильная плитка)';
    } else if (isRoadBorderOrderSize(size)) {
      colorLine = 'дорожный борт';
      shadeLine = ROAD_BORDER_SHADE_RU;
    } else if (isTrotuarBorderOrderSize(size)) {
      colorLine = ORDER_COLOR_GROUP_LABEL_RU[colorGroupRaw] || colorGroupRaw || 'Не указано';
      shadeLine = colorRaw || 'Не указано';
    } else {
      colorLine = ORDER_COLOR_GROUP_LABEL_RU[colorGroupRaw] || colorGroupRaw || 'Не указано';
      shadeLine = colorRaw || 'Не указано';
    }
    const quantity = (quantityInput?.value || formData.get('quantity') || '').trim() || 'Не указано';
    const quantityUnit = isBorderOrderSize(size) ? 'м пог.' : 'м²';
    const address = (addressInput?.value || formData.get('address') || '').trim() || 'Не указано';
    const message = (messageInput?.value || formData.get('message') || '').trim() || 'Нет комментария';

    const orderMessage = `<b>🆕 Новый заказ плитки</b>

<b>👤 Контактная информация:</b>
• Имя: ${name}
• Телефон: ${phone}
• Email: ${email || 'Не указан'}

<b>📦 Детали заказа:</b>
• Размер плитки: ${size}
• Коллекция: ${colorLine}
• Оттенок / цвет: ${shadeLine}
• Количество: ${quantity} ${quantityUnit}
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
})}

Пользователь подтвердил согласие на обработку персональных данных (имя, номер телефона, адрес электронной почты) при отправке настоящей заявки; указанные данные могут использоваться исключительно для связи по целевому обращению о приобретении тротуарной плитки либо бортовой продукции, в соответствии с законодательством Республики Беларусь о защите персональных данных.`;

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

    const consentEl = document.getElementById('order-consent-pd');
    if (!consentEl?.checked) {
      alert(
        translations[currentLang]?.consentAlert ||
          translations.ru.consentAlert ||
          'Для отправки заявки необходимо согласие на обработку персональных данных.'
      );
      return;
    }

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
    
    // Light theme during day (after sunrise + buffer, before sunset - buffer)
    const isDay = now >= sunriseWithBuffer && now < sunsetWithBuffer;
    const theme = isDay ? 'light' : 'dark';
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

  // Handle window resize for responsive behavior
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      syncHeaderHeightVar();
      galleryControllers.forEach((controller) => controller.refresh());
    }, 150);
  });

  window.addEventListener('app:language-change', (event) => {
    const nextLang = resolveLang(event?.detail?.lang || 'ru');
    if (nextLang === currentLang) return;
    currentLang = nextLang;
    galleryControllers.forEach((controller) => controller.updateText());
  });
});
