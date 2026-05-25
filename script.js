// Массив с данными о работах
const works = [
    {
        title: "Гобелен «Ночь»",
        image: "images/works/noch.jpg.jpg"
    },
    {
        title: "Гобелен «Облако»",
        image: "images/works/oblako.jpg.jpg"
    },
    {
        title: "«Лошадка» гобелен",
        image: "images/works/loshadka.jpg.jpg"
    },
    {
        title: "Вышивка «Цветок»",
        image: "images/works/ofw30.jpg.jpg"
    },
    {
        title: "Гобелен «Ангел и собаки»",
        image: "images/works/lKm11.jpg.jpg"
    }
];

// === 1.5. АВАТАР ===
function renderAvatar() {
    const avatarContainer = document.getElementById('avatarContainer');
    
    if (!avatarContainer) return;
    
    // Пробуем разные варианты имени файла
    const avatarPath = "images/avatar.jpg.jpg";  // ← поменяй на своё имя
    
    // Создаём элемент картинки
    const img = document.createElement('img');
    img.src = avatarPath;
    img.alt = "Фото Кати";
    
    // Добавляем класс для стилей (опционально)
    img.classList.add('avatar-image');
    
    // Очищаем контейнер и вставляем картинку
    avatarContainer.innerHTML = '';
    avatarContainer.appendChild(img);
}

// Функция, которая создаёт галерею
function renderGallery() {
    const galleryContainer = document.getElementById('gallery');
    
    // Если контейнера нет — просто выходим, не падаем
    if (!galleryContainer) {
        console.log('Контейнер #gallery не найден, пропускаем инициализацию галереи');
        return;
    }
    
    if (works.length === 0) {
        galleryContainer.innerHTML = '<p style="text-align:center;">Скоро здесь появятся фотографии работ...</p>';
        return;
    }
    
    galleryContainer.innerHTML = '';
    
    works.forEach(work => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery__item';
        
        galleryItem.innerHTML = `
            <img src="${work.image}" alt="${work.title}">
            <div class="gallery__overlay">${work.title}</div>
        `;
        
        galleryItem.addEventListener('click', () => {
            alert(`Открыть работу: ${work.title}`);
        });
        
        galleryContainer.appendChild(galleryItem);
    });
}

  try {
        renderAvatar();          // ← добавить эту строку
    } catch (error) {
        console.warn("Аватар не загружен:", error.message);
    }

// === 2. БАННЕР COOKIE ===
function initCookieBanner() {
    const cookieConsent = document.getElementById('cookieConsent');
    const acceptBtn = document.getElementById('acceptCookies');
    
    // Если баннера нет на странице — выходим
    if (!cookieConsent || !acceptBtn) {
        console.log('Баннер cookie не найден на странице');
        return;
    }
    
    // Проверяем, было ли уже согласие
    if (localStorage.getItem('cookieConsent') === 'true') {
        cookieConsent.style.display = 'none';
        return;
    }
    
    // Навешиваем обработчик на кнопку
    acceptBtn.addEventListener('click', () => {
        cookieConsent.style.display = 'none';
        localStorage.setItem('cookieConsent', 'true');
    });
}

// === 3. ЗАПУСК ВСЕГО ПРИ ЗАГРУЗКЕ СТРАНИЦЫ ===
document.addEventListener('DOMContentLoaded', () => {
    // Безопасный запуск галереи
    try {
        renderGallery();
    } catch (error) {
        console.warn("Галерея не инициализирована:", error.message);
    }

    // Безопасный запуск баннера
    try {
        initCookieBanner();
    } catch (error) {
        console.error("Ошибка баннера cookie:", error.message);
    }
});