let swiper;
const toggleButton = document.getElementById('toggleButton');
const hiddenSlides = document.querySelectorAll('.hidden-slide');

// Функция управления Swiper и кнопкой
function initializeSwiper() {
  const screenWidth = window.innerWidth;

  // === Мобильная версия: ≤ 767px ===
  if (screenWidth <= 767) {
    // Показываем все скрытые слайды (чтобы Swiper их включил)
    hiddenSlides.forEach(slide => {
      slide.style.display = ''; // сбрасываем display
    });

    // Инициализируем Swiper, если ещё не создан
    if (!swiper) {swiper = new Swiper('.swiper', {
        loop: true,
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
          },// 768 и выше не нужен — Swiper отключается
        },
        speed: 600,
      });
      console.log('Swiper инициализирован');
    }

    // Скрываем кнопку на мобильных
    if (toggleButton) {
      toggleButton.parentElement.style.display = 'none';
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

    // Скрываем дополнительные слайды по умолчанию
    hiddenSlides.forEach(slide => {
      slide.style.display = 'none';
    });

    // Показываем контейнер с кнопкой
    if (toggleButton) {
      toggleButton.parentElement.style.display = 'block';
    }
  }
}
// === Обработчик клика по кнопке ===
if (toggleButton) {
  toggleButton.addEventListener('click', function () {
    const areHidden = hiddenSlides[0].style.display === 'none';

    if (areHidden) {
      // Показать все скрытые слайды
      hiddenSlides.forEach(slide => {
        slide.style.display = 'flex'; // или 'block', в зависимости от структуры
      });
      toggleButton.textContent = 'Скрыть';
    } else {
      // Скрыть слайды
      hiddenSlides.forEach(slide => {
        slide.style.display = 'none';
      });
      toggleButton.textContent = 'Показать все';
     }
  });
}
// Запуск при загрузке и изменении размера
window.addEventListener('load', initializeSwiper);
window.addEventListener('resize', initializeSwiper);
