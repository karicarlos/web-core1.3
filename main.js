let swiper;

const toggleButton = document.getElementById('toggleButton');
const brandsList = document.querySelector('.brands__list');

function initializeSwiper() {
  const screenWidth = window.innerWidth;

  if (screenWidth <= 767) {
    if (brandsList) {
      brandsList.classList.remove('expand');
    }

    const swiperContainer = document.querySelector('.swiper');
    const paginationEl = document.querySelector('.swiper-pagination');

    if (!swiperContainer || !paginationEl) {
      console.warn('Swiper: необходимые элементы (.swiper или .swiper-pagination) не найдены в DOM');
      return;
    }

    if (!swiper) {
      swiper = new Swiper('.swiper', {
        loop: false,
        slidesPerView: 1,
        spaceBetween: 10,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        breakpoints: {
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
        },
        speed: 600,
      });
      console.log('✅ Swiper инициализирован на мобильном устройстве');
    }

    if (toggleButton?.parentElement) {
      toggleButton.parentElement.style.display = 'none';
    }
  } else {
    if (swiper) {
      swiper.destroy(true, true);
      swiper = null;
      console.log('✅ Swiper уничтожен на десктопе');
    }

    if (toggleButton?.parentElement) {
      toggleButton.parentElement.style.display = 'flex';
    }

    if (toggleButton && brandsList) {
      toggleButton.textContent = brandsList.classList.contains('expand')
        ? 'Скрыть'
        : 'Показать все';
    }
  }
}

// ✅ ИСПРАВЛЕННЫЙ ОБРАБОТЧИК КЛИКА — БЕЗ ОШИБОК!
if (toggleButton && brandsList) {
  toggleButton.addEventListener('click', function () {
    brandsList.classList.toggle('expand'); // ← КЛАСС ДОБАВЛЯЕТСЯ!
    toggleButton.textContent = brandsList.classList.contains('expand')
      ? 'Скрыть'
      : 'Показать все'; // ← ТЕКСТ МЕНЯЕТСЯ!
  });
}

window.addEventListener('load', initializeSwiper);

window.addEventListener('resize', () => {
  clearTimeout(window.resizeTimeout);
  window.resizeTimeout = setTimeout(initializeSwiper, 150);
});