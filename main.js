// === Swiper переменные ===
let swiperBrands;
let swiperDevices;
let swiperPrices;

// === Элементы для "Показать все" ===
const toggleButtonBrands = document.getElementById('toggleButtonBrands');
const toggleButtonDevices = document.getElementById('toggleButtonDevices');
const brandsList = document.querySelector('.brands__list');
const devicesList = document.querySelector('.repair-devices');

// === Функция: инициализация/обновление всех Swiper-ов и интерфейса ===
function initializeAll() {
  const screenWidth = window.innerWidth;

  if (screenWidth <= 767) {
    // Мобильная версия
    if (brandsList) brandsList.classList.remove('expand');
    if (devicesList) devicesList.classList.remove('over');

    // Инициализация Swiper'ов
    if (!swiperBrands && document.querySelector('.swiper')) {
      swiperBrands = new Swiper('.swiper', {
        loop: false,
        slidesPerView: 1,
        spaceBetween: 10,
        autoplay: { delay: 3000, disableOnInteraction: false },
        pagination: { el: '.swiper-pagination', clickable: true },
        breakpoints: { 640: { slidesPerView: 2, spaceBetween: 10 } },
        speed: 600,
      });
    }

    if (!swiperDevices && document.querySelector('.swiper-second')) {
      swiperDevices = new Swiper('.swiper-second', {
        loop: false,
        slidesPerView: 1,
        spaceBetween: 10,
        autoplay: { delay: 3000, disableOnInteraction: false },
        pagination: { el: '.swipersec-pagination', clickable: true },
        breakpoints: { 640: { slidesPerView: 2, spaceBetween: 10 } },
        speed: 600,
      });
    }

    if (!swiperPrices && document.querySelector('.swiper-third')) {
      swiperPrices = new Swiper('.swiper-third', {
        loop: false,
        slidesPerView: 1,
        spaceBetween: 15,
        autoplay: { delay: 4000, disableOnInteraction: false },
        pagination: { el: '.swiper-pagination-third', clickable: true },
        breakpoints: {
          640: { slidesPerView: 2, spaceBetween: 15 },
          1024: { slidesPerView: 3, spaceBetween: 20 }
        },
        speed: 600,
      });
    }

    // Скрываем кнопки "Показать все"
    if (toggleButtonBrands?.parentElement) toggleButtonBrands.parentElement.style.display = 'none';
    if (toggleButtonDevices?.parentElement) toggleButtonDevices.parentElement.style.display = 'none';

  } else {
    // Десктопная версия
    if (swiperBrands) { swiperBrands.destroy(true, true); swiperBrands = null; }
    if (swiperDevices) { swiperDevices.destroy(true, true); swiperDevices = null; }
    if (swiperPrices) { swiperPrices.destroy(true, true); swiperPrices = null; }

    // Показываем кнопки
    if (toggleButtonBrands?.parentElement) toggleButtonBrands.parentElement.style.display = 'flex';
    if (toggleButtonDevices?.parentElement) toggleButtonDevices.parentElement.style.display = 'flex';

    // Обновляем текст
    if (toggleButtonBrands && brandsList) {
      toggleButtonBrands.textContent = brandsList.classList.contains('expand') ? 'Скрыть' : 'Показать все';
    }
    if (toggleButtonDevices && devicesList) {
      toggleButtonDevices.textContent = devicesList.classList.contains('over') ? 'Скрыть' : 'Показать все';
    }
  }
}

// === Обработчики для "Показать все" ===
if (toggleButtonBrands && brandsList) {
  toggleButtonBrands.addEventListener('click', () => {
    brandsList.classList.toggle('expand');
    toggleButtonBrands.textContent = brandsList.classList.contains('expand') ? 'Скрыть' : 'Показать все';
  });
}

if (toggleButtonDevices && devicesList) {
  toggleButtonDevices.addEventListener('click', () => {
    devicesList.classList.toggle('over');
    toggleButtonDevices.textContent = devicesList.classList.contains('over') ? 'Скрыть' : 'Показать все';
  });
}

// === ОБЩИЙ ОБРАБОТЧИК DOM ===
document.addEventListener('DOMContentLoaded', () => {
  // --- Боковое меню ---
  const menuOpenBtn = document.querySelector('.menu-open-btn');
  const sidebar = document.querySelector('.sidebar');
  const sidebarCloseBtn = document.querySelector('.sidebar-close-btn');
  const overlay = document.querySelector('.overlay');

  function openSidebar() {
    if (sidebar) {
      sidebar.classList.add('open');
      sidebar.classList.add('side-menu');
    }
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    if (sidebar) {
      sidebar.classList.remove('open');
      sidebar.classList.remove('side-menu');
    }
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (menuOpenBtn) menuOpenBtn.addEventListener('click', openSidebar);
  if (sidebarCloseBtn) sidebarCloseBtn.addEventListener('click', closeSidebar);
  if (overlay) overlay.addEventListener('click', closeSidebar);

  // --- Форма обратной связи (чат) ---
  const messageOpenBtn = document.querySelector('.message-open-btn');
  const feedbackBlock = document.querySelector('.feedback');
  const feedbackCloseBtn = feedbackBlock?.querySelector('.button_close');

  if (messageOpenBtn && feedbackBlock) {
    messageOpenBtn.addEventListener('click', () => {
      feedbackBlock.classList.add('message-menu');
      document.body.style.overflow = 'hidden';
    });
  }

  if (feedbackCloseBtn && feedbackBlock) {
    feedbackCloseBtn.addEventListener('click', () => {
      feedbackBlock.classList.remove('message-menu');
      document.body.style.overflow = '';
    });
  }

  if (feedbackBlock) {
    feedbackBlock.addEventListener('click', (e) => {
      if (e.target === feedbackBlock) {
        feedbackBlock.classList.remove('message-menu');
        document.body.style.overflow = '';
      }
    });
  }

  // --- Форма "Заказать звонок" ---
  const callOpenBtn = document.querySelector('.call-open-btn');
  const callBlock = document.querySelector('.call-modal');
  const callCloseBtn = callBlock?.querySelector('.button_close');

  if (callOpenBtn && callBlock) {
    callOpenBtn.addEventListener('click', () => {
      callBlock.classList.add('call-menu');
      document.body.style.overflow = 'hidden';
    });
  }

  if (callCloseBtn && callBlock) {
    callCloseBtn.addEventListener('click', () => {
      callBlock.classList.remove('call-menu');
      document.body.style.overflow = '';
    });
  }

  if (callBlock) {
    callBlock.addEventListener('click', (e) => {
      if (e.target === callBlock) {
        callBlock.classList.remove('call-menu');
        document.body.style.overflow = '';
      }
    });
  }
});

// === Закрытие меню при ресайзе на десктоп ===
window.addEventListener('resize', () => {
  clearTimeout(window.resizeTimeout);
  window.resizeTimeout = setTimeout(() => {
    initializeAll();
    if (window.innerWidth >= 768) {
      const sidebar = document.querySelector('.sidebar');
      const overlay = document.querySelector('.overlay');
      if (sidebar?.classList.contains('open')) {
        sidebar.classList.remove('open');
        sidebar.classList.remove('side-menu');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    }
  }, 150);
});

// === Запуск при загрузке ===
window.addEventListener('load', initializeAll);