let swiper;
const toggleButton = document.getElementById('toggleButton');
const hiddenSlides = document.querySelectorAll('.brands__item.hidden'); // Все скрытые карточки

// === Инициализация/уничтожение Swiper и управление кнопкой ===
function initializeSwiper() {
  const screenWidth = window.innerWidth;

  // === Мобильная версия: ≤ 767px ===
  if (screenWidth <= 767) {
    // Показываем все скрытые слайды (чтобы Swiper их включил)
    hiddenSlides.forEach(slide => {
      slide.style.display = 'flex'; // или 'block', но у тебя flex
    });

    // Инициализируем Swiper, если ещё не создан
    if (!swiper) {
      swiper = new Swiper('.swiper', {
        loop: false,
        slidesPerView: 1,spaceBetween: 10,
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
      console.log('Swiper инициализирован');
    }// Скрываем кнопку "Показать все" на мобильных
    const linksAll = toggleButton?.parentElement;
    if (linksAll) {
      linksAll.style.display = 'none';
    }
  }

  // === Десктопная версия: ≥ 768px ===
  else {
    // Уничтожаем Swiper, если он есть
    if (swiper) {
      swiper.destroy(true, true);
      swiper = null;
      console.log('Swiper уничтожен');
    }

    // Скрываем все скрытые карточки
    hiddenSlides.forEach(slide => {
      slide.style.display = 'none';
    });// Показываем кнопку
    const linksAll = toggleButton?.parentElement;
    if (linksAll) {
      linksAll.style.display = 'block';
    }

    // Сбрасываем текст кнопки
    if (toggleButton) {
      toggleButton.textContent = 'Показать все';
    }
  }
}

// === Обработчик клика по кнопке "Показать все" ===
if (toggleButton && hiddenSlides.length > 0) {
  toggleButton.addEventListener('click', function () {
    // Проверяем, скрыта ли хотя бы одна карточка
    const firstSlide = hiddenSlides[0];
    const isHidden =firstSlide.style.display === 'none' ||
      getComputedStyle(firstSlide).display === 'none';

    if (isHidden) {
      // Показываем все скрытые карточки
      hiddenSlides.forEach(slide => {
        slide.style.display = 'flex'; // важно: у тебя .brands__item использует flex
      });
      toggleButton.textContent = 'Скрыть';
    } else {
      // Скрываем обратно
      hiddenSlides.forEach(slide => {
        slide.style.display = 'none';
      });
      toggleButton.textContent = 'Показать все';
    }
  });
}// === Запуск при загрузке и изменении размера окна ===
window.addEventListener('load', initializeSwiper);

window.addEventListener('resize', () => {
  clearTimeout(window.resizeTimeout);
  window.resizeTimeout = setTimeout(initializeSwiper, 100);
});

