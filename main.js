// === Swiper переменные ===
let swiperBrands;
let swiperDevices;
let swiperPrices;

// === Элементы для "Показать все" ===
const toggleButtonBrands = document.getElementById('toggleButtonBrands'); // ← исправлено!
const toggleButtonDevices = document.getElementById('toggleButtonDevices'); // ← исправлено!
const brandsList = document.querySelector('.brands__list');
const devicesList = document.querySelector('.repair-devices'); // ← добавлено

// === Функция: инициализация/обновление всех Swiper-ов и интерфейса ===
function initializeAll() {
  const screenWidth = window.innerWidth;

  if (screenWidth <= 767) {
    // Мобильная версия
    if (brandsList) brandsList.classList.remove('expand');
    if (devicesList) devicesList.classList.remove('over');

    // Инициализация Swiper'ов (бренды)
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

    // Swiper для техники
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

    // Swiper для цен
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

// === УПРАВЛЕНИЕ БОКОВЫМ МЕНЮ ===
// Ищем элементы ТОЛЬКО после полной загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
  const menuOpenBtn = document.querySelector('.menu-open-btn');
  const sidebar = document.querySelector('.sidebar');
  const sidebarCloseBtn = document.querySelector('.sidebar-close-btn');
  const overlays = document.querySelectorAll('.overlay');
  const overlay = overlays.length > 0 ? overlays[0] : null; // берём первый

  // Открыть меню
  function openSidebar() {
    if (sidebar) sidebar.classList.add('open');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // Закрыть меню
  function closeSidebar() {
    if (sidebar) sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Назначаем обработчики
  if (menuOpenBtn) {
    menuOpenBtn.addEventListener('click', openSidebar);
  }

  if (sidebarCloseBtn) {
    sidebarCloseBtn.addEventListener('click', closeSidebar);
  }

  if (overlay) {
    overlay.addEventListener('click', closeSidebar);
  }
});

// === Закрытие меню при ресайзе на десктоп ===
window.addEventListener('resize', () => {
  clearTimeout(window.resizeTimeout);
  window.resizeTimeout = setTimeout(() => {
    initializeAll();
    // Закрываем меню, если ширина ≥ 768
    if (window.innerWidth >= 768) {
      const sidebar = document.querySelector('.sidebar');
      const overlay = document.querySelector('.overlay');
      if (sidebar?.classList.contains('open')) {
        sidebar.classList.remove('open');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    }
  }, 150);
});

// === Запуск при загрузке ===
window.addEventListener('load', initializeAll);