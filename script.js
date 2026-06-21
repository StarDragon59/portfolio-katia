// Массив с данными о работах
const works = [
    {
        title: "Гобелен «Ночь»",
        image: "images/works/noch.jpg.jpg",
        details: "60×80 см, ручное ткачество, шерсть",
        story: "Создаёт ощущение тишины и глубины. Идеально для спальни или кабинета, где хочется уединения и покоя.",
        status: "Доступен для заказа"
    },
    {
        title: "Гобелен «Облако»",
        image: "images/works/oblako.jpg.jpg",
        details: "45×60 см, punch needle, хлопок",
        story: "Лёгкое и воздушное панно, которое наполняет комнату светом. Прекрасно смотрится в гостиной или детской.",
        status: "Продано"
    },
    {
        title: "«Лошадка» гобелен",
        image: "images/works/loshadka.jpg.jpg",
        details: "50×70 см, ручное ткачество, шерсть",
        story: "Динамичный и фактурный. Станет центром притяжения в прихожей или кабинете. Дарит ощущение движения и свободы.",
        status: "Доступен для заказа"
    },
    {
        title: "Вышивка «Цветок»",
        image: "images/works/ofw30.jpg.jpg",
        details: "30×30 см, punch needle, хлопок",
        story: "Камерная работа с нежной фактурой. Оживит небольшую стену или станет красивым подарком для близкого человека.",
        status: "Доступна для заказа"
    },
    {
        title: "Гобелен «Ангел и собаки»",
        image: "images/works/lKm11.jpg.jpg",
        details: "70×90 см, ручное ткачество, шерсть",
        story: "Сюжетная работа с глубоким смыслом. Защищает пространство и создаёт уют. Подойдёт для гостиной или домашней библиотеки.",
        status: "Продано"
    }
];

// === АВАТАР ===
function renderAvatar() {
    const avatarContainer = document.getElementById('avatarContainer');
    if (!avatarContainer) return;
    
    const img = document.createElement('img');
    img.src = "images/avatar.jpg";
    img.alt = "Фото Кати";
    img.classList.add('avatar-image');
    
    avatarContainer.innerHTML = '';
    avatarContainer.appendChild(img);
}

function renderGallery() {
    const galleryContainer = document.getElementById('gallery');
    if (!galleryContainer) {
        console.log('Контейнер #gallery не найден');
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
            <div class="gallery__info">
                <h4>${work.title}</h4>
                <p class="gallery__details">${work.details}</p>
                <p class="gallery__story">${work.story}</p>
                <span class="gallery__status ${work.status === 'Продано' ? 'status--sold' : 'status--available'}">${work.status}</span>
            </div>
        `;
        
        // ===== МОДАЛЬНОЕ ОКНО: ТОЛЬКО КАРТИНКА =====
        const img = galleryItem.querySelector('img');
        img.addEventListener('click', (e) => {
            e.stopPropagation();
            
            const modal = document.createElement('div');
            modal.className = 'modal';
            modal.innerHTML = `
                <span class="modal__close">&times;</span>
                <div class="modal__content">
                    <img src="${work.image}" alt="${work.title}" class="modal__image">
                </div>
            `;
            document.body.appendChild(modal);
            document.body.style.overflow = 'hidden';
            
            // Закрытие по крестику
            modal.querySelector('.modal__close').addEventListener('click', (e) => {
                e.stopPropagation();
                modal.remove();
                document.body.style.overflow = 'auto';
            });
            
            // Закрытие по клику на фон (на сам modal)
            modal.addEventListener('click', () => {
                modal.remove();
                document.body.style.overflow = 'auto';
            });
        });
        
        galleryContainer.appendChild(galleryItem);
    });
}

// === БАННЕР COOKIE ===
function initCookieBanner() {
    const cookieConsent = document.getElementById('cookieConsent');
    const acceptBtn = document.getElementById('acceptCookies');
    
    if (!cookieConsent || !acceptBtn) {
        console.log('Баннер cookie не найден');
        return;
    }
    
    if (localStorage.getItem('cookieConsent') === 'true') {
        cookieConsent.style.display = 'none';
        return;
    }
    
    acceptBtn.addEventListener('click', () => {
        cookieConsent.style.display = 'none';
        localStorage.setItem('cookieConsent', 'true');
    });
}

// === АНИМАЦИЯ ПРИ СКРОЛЛЕ ===
function handleScrollAnimations() {
    const animatedElements = document.querySelectorAll('.section, .service-card, .exhibition-block');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.01 });
    
    animatedElements.forEach(el => observer.observe(el));
}

// === ЗАПУСК ===
document.addEventListener('DOMContentLoaded', () => {
    try {
        renderAvatar();
    } catch (error) {
        console.warn("Аватар не загружен:", error.message);
    }
    
    try {
        renderGallery();
    } catch (error) {
        console.warn("Галерея не инициализирована:", error.message);
    }
    
    try {
        initCookieBanner();
    } catch (error) {
        console.error("Ошибка баннера cookie:", error.message);
    }
    
    setTimeout(handleScrollAnimations, 300);
});

console.log('✅ Скрипт запущен! Количество работ:', works.length);
