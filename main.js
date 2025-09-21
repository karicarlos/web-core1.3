let swiperBrands;
let swiperDevices;
let swiperPrices;

const toggleButton = document.getElementById('toggleButton');
const brandsList = document.querySelector('.brands__list');

// === Функция: инициализация/обновление всех Swiper-ов и интерфейса ===
function initializeAll() {
  const screenWidth = window.innerWidth;

  // === МОБИЛЬНАЯ ВЕРСИЯ (≤ 767px) ===
  if (screenWidth <= 767) {
    // Убираем expand на мобильных
    if (brandsList) {
      brandsList.classList.remove('expand');
    }

    // === ИНИЦИАЛИЗАЦИЯ SWIPER ДЛЯ БРЕНДОВ (.swiper) ===
    const swiperContainer1 = document.querySelector('.swiper');
    const paginationEl1 = document.querySelector('.swiper-pagination');

    if (swiperContainer1 && paginationEl1) {
      if (!swiperBrands) {
        swiperBrands = new Swiper('.swiper', {
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
        console.log('✅ Swiper (бренды) инициализирован на мобильном устройстве');
      }
    } else {
      console.warn('Swiper (бренды): элементы не найдены');
    }

    // === ИНИЦИАЛИЗАЦИЯ SWIPER ДЛЯ ТЕХНИКИ (.swiper-second) ===
    const swiperContainer2 = document.querySelector('.swiper-second');
    const paginationEl2 = document.querySelector('.swipersec-pagination');

    if (swiperContainer2 && paginationEl2) {
      if (!swiperDevices) {
        swiperDevices = new Swiper('.swiper-second', {
          loop: false,
          slidesPerView: 1,
          spaceBetween: 10,
          autoplay: {
            delay: 3000,
            disableOnInteraction: false,
          },
          pagination: {
            el: '.swipersec-pagination',
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
        console.log('✅ Swiper (техника) инициализирован на мобильном устройстве');
      }
    } else {
      console.warn('Swiper (техника): элементы не найдены');
    }

    // === ИНИЦИАЛИЗАЦИЯ SWIPER ДЛЯ ЦЕН (.swiper-third) ===
    const swiperContainer3 = document.querySelector('.swiper-third');
    const paginationEl3 = document.querySelector('.swiper-pagination-third');

    if (swiperContainer3 && paginationEl3) {
      if (!swiperPrices) {
        swiperPrices = new Swiper('.swiper-third', {
          loop: false,
          slidesPerView: 1,
          spaceBetween: 15,
          autoplay: {
            delay: 4000,
            disableOnInteraction: false,
          },
          pagination: {
            el: '.swiper-pagination-third',
            clickable: true,
          },
          breakpoints: {
            640: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
            }
          },
          speed: 600,
        });
        console.log('✅ Swiper (цены) инициализирован на мобильном устройстве');
      }
    } else {
      console.warn('Swiper (цены): элементы не найдены');
    }

    // Скрываем кнопку "Показать все"
    if (toggleButton?.parentElement) {
      toggleButton.parentElement.style.display = 'none';
    }
  }

  // === ДЕСКТОПНАЯ ВЕРСИЯ (≥ 768px) ===
  else {
    // Уничтожаем Swiper для брендов
    if (swiperBrands) {
      swiperBrands.destroy(true, true);
      swiperBrands = null;
      console.log('✅ Swiper (бренды) уничтожен на десктопе');
    }

    // Уничтожаем Swiper для техники
    if (swiperDevices) {
      swiperDevices.destroy(true, true);
      swiperDevices = null;
      console.log('✅ Swiper (техника) уничтожен на десктопе');
    }

    // Уничтожаем Swiper для цен
    if (swiperPrices) {
      swiperPrices.destroy(true, true);
      swiperPrices = null;
      console.log('✅ Swiper (цены) уничтожен на десктопе');
    }

    // Показываем кнопку "Показать все"
    if (toggleButton?.parentElement) {
      toggleButton.parentElement.style.display = 'flex';
    }

    // Обновляем текст кнопки
    if (toggleButton && brandsList) {
      toggleButton.textContent = brandsList.classList.contains('expand')
        ? 'Скрыть'
        : 'Показать все';
    }
    // Обновляем текст кнопки
    if (toggleButton && devicesList) {
      toggleButton.textContent = devicesList.classList.contains('over')
        ? 'Скрыть'
        : 'Показать все';
    }
  }
}

// === Обработчик клика по кнопке "Показать все" ===
if (toggleButton && brandsList) {
  toggleButton.addEventListener('click', function () {
    brandsList.classList.toggle('expand');
    toggleButton.textContent = brandsList.classList.contains('expand')
      ? 'Скрыть'
      : 'Показать все';
  });
}
  // === Обработчик клика по кнопке "Показать все" ===
if (toggleButton && devicesList) {
  toggleButton.addEventListener('click', function () {
    brandsList.classList.toggle('over');
    toggleButton.textContent = devicesList.classList.contains('over')
      ? 'Скрыть'
      : 'Показать все';
  });
}

// === Запуск при загрузке и изменении размера окна ===
window.addEventListener('load', initializeAll);

window.addEventListener('resize', () => {
  clearTimeout(window.resizeTimeout);
  window.resizeTimeout = setTimeout(initializeAll, 150);
});