// navigation.js
// Навигация между табами и управление скоростью скролла

document.addEventListener('DOMContentLoaded', function () {
    // Навигация между табами
    const navButtons = document.querySelectorAll('.nav-button');
    const tabContents = document.querySelectorAll('.tab-content');

    navButtons.forEach(button => {
        button.addEventListener('click', function () {
            const tabId = this.getAttribute('data-tab');

            // Удаляем активный класс у всех кнопок и табов
            navButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-selected', 'false');
            });

            tabContents.forEach(content => {
                content.classList.remove('active');
                content.hidden = true;
            });

            // Добавляем активный класс текущей кнопке и табу
            this.classList.add('active');
            this.setAttribute('aria-selected', 'true');

            const activeTab = document.getElementById(tabId);
            if (activeTab) {
                activeTab.classList.add('active');
                activeTab.hidden = false;

                // Прокручиваем к началу при переключении таба
                activeTab.scrollTop = 0;
            }
        });
    });

    // Инициализация доступности для табов
    navButtons.forEach((button) => {
        button.setAttribute('role', 'tab');
        button.setAttribute('id', 'tab-' + button.getAttribute('data-tab'));
        button.setAttribute('aria-controls', button.getAttribute('data-tab'));

        if (button.classList.contains('active')) {
            button.setAttribute('aria-selected', 'true');
        } else {
            button.setAttribute('aria-selected', 'false');
        }
    });

    tabContents.forEach(content => {
        content.setAttribute('role', 'tabpanel');
        content.setAttribute('aria-labelledby', 'tab-' + content.id);
    });

    // Управление скоростью скролла
    const scrollSlider = document.getElementById('scrollSpeedSlider');
    const scrollValue = document.getElementById('scrollSpeedValue');
    let scrollMultiplier = 1;

    if (scrollSlider && scrollValue) {
        // Установка начального значения
        scrollMultiplier = parseFloat(scrollSlider.value);
        scrollValue.textContent = scrollMultiplier.toFixed(1) + '×';

        // Обработчик изменения слайдера
        scrollSlider.addEventListener('input', function () {
            scrollMultiplier = parseFloat(this.value);
            scrollValue.textContent = scrollMultiplier.toFixed(1) + '×';

            // Сохраняем в localStorage
            localStorage.setItem('scrollSpeed', scrollMultiplier);
        });

        // Загрузка сохранённой скорости
        const savedSpeed = localStorage.getItem('scrollSpeed');
        if (savedSpeed) {
            scrollMultiplier = parseFloat(savedSpeed);
            scrollSlider.value = scrollMultiplier;
            scrollValue.textContent = scrollMultiplier.toFixed(1) + '×';
        }

        // Кастомный обработчик колеса мыши для табов с контентом
        tabContents.forEach(content => {
            content.addEventListener('wheel', function (e) {
                // Проверяем, нужно ли обрабатывать событие
                if (this.scrollHeight > this.clientHeight) {
                    // Применяем множитель к скорости скролла
                    const scrollAmount = e.deltaY * scrollMultiplier;

                    // Прокручиваем элемент
                    this.scrollTop += scrollAmount;

                    // Предотвращаем стандартное поведение
                    e.preventDefault();
                }
            }, { passive: false });

            // Также обрабатываем события тачпада
            let touchStartY = 0;

            content.addEventListener('touchstart', function (e) {
                touchStartY = e.touches[0].clientY;
            }, { passive: true });

            content.addEventListener('touchmove', function (e) {
                if (this.scrollHeight > this.clientHeight) {
                    const touchY = e.touches[0].clientY;
                    const deltaY = (touchStartY - touchY) * 2;
                    const scrollAmount = deltaY * scrollMultiplier;

                    this.scrollTop += scrollAmount;
                    touchStartY = touchY;

                    e.preventDefault();
                }
            }, { passive: false });
        });

        // Клавиатурная навигация для слайдера
        scrollSlider.addEventListener('keydown', function (e) {
            if (e.key === 'ArrowUp' || e.key === 'ArrowRight') {
                scrollMultiplier = Math.min(5, scrollMultiplier + 0.1);
                this.value = scrollMultiplier;
                scrollValue.textContent = scrollMultiplier.toFixed(1) + '×';
                localStorage.setItem('scrollSpeed', scrollMultiplier);
            } else if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') {
                scrollMultiplier = Math.max(0.1, scrollMultiplier - 0.1);
                this.value = scrollMultiplier;
                scrollValue.textContent = scrollMultiplier.toFixed(1) + '×';
                localStorage.setItem('scrollSpeed', scrollMultiplier);
            }
        });
    }

    // Анимация наград при наведении
    const awardCards = document.querySelectorAll('.award-card');

    awardCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});