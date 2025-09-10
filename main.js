let swiper;
const toggleButton = document.getElementById('toggleButton');
const allItems = document.querySelectorAll('.brands__item'); // Все карточки
const originalItems = Array.from(allItems).slice(0, 8); // Первые 8
const hiddenRepeats = document.querySelectorAll('.brands__item.hidden'); // Последние 4 — повторы (должны иметь класс .hidden)

// === Основная адаптивная логика ===
function handleResponsiveLayout() {
  const width = window.innerWidth;

  // === 1. Мобильный: ≤ 767px → Swiper ===
  if (width <= 767) {// Показываем все карточки для Swiper
    allItems.forEach(item => {
      item.style.display = 'flex';
    });

    // Инициализируем Swiper
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
        },breakpoints: {
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
        },
        speed: 600,
      });
      console.log('Swiper инициализирован');
    }

    // Скрываем кнопку
    const linksAll = toggleButton?.parentElement;
    if (linksAll) {
      linksAll.style.display = 'none';
    }
  }// === 2. Планшет: 768px ≤ width < 1120px ===
  else if (width >= 768 && width < 1120) {
    // Уничтожаем Swiper
    if (swiper) {
      swiper.destroy(true, true);
      swiper = null;
    }

    // Показываем только первые 6 карточек
    allItems.forEach((item, i) => {
      item.style.display = i < 6 ? 'flex' : 'none';
    });

    // Показываем кнопку
    const linksAll = toggleButton?.parentElement;
    if (linksAll) {
      linksAll.style.display = 'block';
    }
    toggleButton.textContent = 'Показать все';
  }
  // === 3. Десктоп: ≥ 1120px ===
  else {
    if (swiper) {
      swiper.destroy(true, true);
      swiper = null;
    }

    // Показываем первые 8 карточек, скрываем повторы
    allItems.forEach((item, i) => {
      if (i < 8) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });

    // Убедимся, что повторы (с классом .hidden) скрыты
    hiddenRepeats.forEach(item => {
      item.style.display = 'none'; });

    const linksAll = toggleButton?.parentElement;
    if (linksAll) {
      linksAll.style.display = 'block';
    }
    toggleButton.textContent = 'Показать все';
  }
}

// === Обработчик кнопки "Показать все" / "Скрыть" ===
if (toggleButton && allItems.length > 0) {
  toggleButton.addEventListener('click', function () {
    const width = window.innerWidth;

    if (width <= 767) return; // На мобильных ничего не делаем

    const firstRepeat = hiddenRepeats.length > 0 ? hiddenRepeats[0] : null;if (width >= 768 && width < 1120) {
      // Планшет: показать/скрыть все карточки
      const isAllVisible = allItems[6].style.display !== 'none';

      if (!isAllVisible) {
        allItems.forEach(item => {
          item.style.display = 'flex';
        });
        toggleButton.textContent = 'Скрыть';
      } else {
        allItems.forEach((item, i) => {
          item.style.display = i < 6 ? 'flex' : 'none';
        });
        toggleButton.textContent = 'Показать все';
      }
    }

    else if (width >= 1120) {
      // Десктоп: показать/скрыть только 4 повтораconst isHidden = firstRepeat ? 
        (firstRepeat.style.display === 'none' || getComputedStyle(firstRepeat).display === 'none') : 
        true;

      hiddenRepeats.forEach(item => {
        item.style.display = isHidden ? 'flex' : 'none';
      });

      toggleButton.textContent = isHidden ? 'Скрыть' : 'Показать все';
    }
  });
}

// === Запуск при загрузке и ресайзе ===
window.addEventListener('load', () => {
  handleResponsiveLayout();
});

window.addEventListener('resize', () => {clearTimeout(window.resizeTimeout);
  window.resizeTimeout = setTimeout(handleResponsiveLayout, 100);
});