let swiper;

const toggleButton = document.getElementById('toggleButton');
const brandsList = document.querySelector('.brands__list');

// === Инициализация / Уничтожение Swiper и управление интерфейсом ===
function initializeSwiper() {
  const screenWidth = window.innerWidth;

  // === Мобильная версия: ≤ 767px ===
  if (screenWidth <= 767) {
    // Удаляем класс expand — он не нужен в мобильной версии
    if (brandsList) {
      brandsList.classList.remove('expand');
    }

    // Проверяем наличие необходимых элементов Swiper
    const swiperContainer = document.querySelector('.swiper');
    const paginationEl = document.querySelector('.swiper-pagination');

    if (!swiperContainer || !paginationEl) {
      console.warn('Swiper: необходимые элементы (.swiper или .swiper-pagination) не найдены в DOM');
      return;
    }

    // Инициализируем Swiper, если ещё не создан
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
          // 768+ не указываем — Swiper на десктопе уничтожается
        },
        speed: 600,
      });
      console.log('✅ Swiper инициализирован');
    }

    // Скрываем кнопку "Показать все"
    if (toggleButton?.parentElement) {
      toggleButton.parentElement.style.display = 'none';
    }
  }

  // === Десктопная версия: ≥ 768px ===
  else {
    // Уничтожаем Swiper, если существует
    if (swiper) {
      swiper.destroy(true, true);
      swiper = null;
      console.log('✅ Swiper уничтожен');
    }

    // Показываем кнопку "Показать все"
    if (toggleButton?.parentElement) {
      toggleButton.parentElement.style.display = 'flex';
    }

    // Сбрасываем текст кнопки в соответствии с состоянием .expand
    if (toggleButton && brandsList) {
      toggleButton.textContent = brandsList.classList.contains('expand')
        ? 'Скрыть'
        : 'Показать все';
    }
  }
}

// === Обработчик клика по кнопке "Показать все" ===
if (toggleButton && brandsList) {
  toggleButton.addEventListener('click', function () {
    const hasExpand = brandsList.classList.toggle('expand');

    // Обновляем текст кнопки
    toggleButton.textContent = hasExpand ? 'Скрыть' : 'Показать все';
  });
}

// === Запуск при загрузке и изменении размера окна ===
window.addEventListener('load', initializeSwiper);

window.addEventListener('resize', () => {
  clearTimeout(window.resizeTimeout);
  window.resizeTimeout = setTimeout(initializeSwiper, 150);
});