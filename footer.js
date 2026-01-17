const scrollConfig = {
    speed: 30, // пикселей в секунду
    pauseOnHover: true, // остановка при наведении
    direction: 'right', // направление: 'left' или 'right'
};

function createHorizontalScroll(config = scrollConfig) {
    const footer = document.getElementById('fin');

    if (!footer) {
        console.error('Элемент с id="fin" не найден');
        return;
    }

    // Сохраняем оригинальные стили футера
    const originalFooterStyle = footer.style.cssText;

    // Создаем обертку для контента футера
    const wrapper = document.createElement('div');
    wrapper.className = 'footer-scroll-wrapper';

    // Перемещаем все элементы .finfo внутрь wrapper
    const finfoElements = Array.from(footer.querySelectorAll('.finfo'));
    finfoElements.forEach(el => {
        wrapper.appendChild(el.cloneNode(true));
    });

    // Дублируем контент для бесшовной анимации
    finfoElements.forEach(el => {
        wrapper.appendChild(el.cloneNode(true));
    });

    // Очищаем футер и добавляем wrapper
    footer.innerHTML = '';
    footer.appendChild(wrapper);

    // Восстанавливаем оригинальные стили футера
    footer.style.cssText = originalFooterStyle;

    // Добавляем только необходимые стили для анимации
    const style = document.createElement('style');
    style.textContent = `
        #fin {
            overflow: hidden;
            white-space: nowrap;
            position: relative;
        }
        
        .footer-scroll-wrapper {
            display: inline-flex;
            animation: scrollFooter linear infinite;
            animation-direction: ${config.direction === 'right' ? 'reverse' : 'normal'};
            padding: 0;
            height: 100%;
        }
        
        @keyframes scrollFooter {
            0% {
                transform: translateX(0);
            }
            100% {
                transform: translateX(-50%);
            }
        }
        
        /* Сохраняем оригинальные стили .finfo */
        .finfo {
            display: flex;
        }
    `;
    document.head.appendChild(style);

    // Обновление длительности анимации
    function updateAnimation() {
        const wrapperWidth = wrapper.scrollWidth / 2; // делим на 2, так как контент дублирован
        const duration = wrapperWidth / config.speed;
        wrapper.style.animationDuration = `${duration}s`;
    }

    // Пауза при наведении
    if (config.pauseOnHover) {
        wrapper.addEventListener('mouseenter', () => {
            wrapper.style.animationPlayState = 'paused';
        });

        wrapper.addEventListener('mouseleave', () => {
            wrapper.style.animationPlayState = 'running';
        });
    }

    // Инициализация
    setTimeout(() => {
        updateAnimation();
        window.addEventListener('resize', updateAnimation);
    }, 100);
}

// Использование
document.addEventListener('DOMContentLoaded', () => {
    createHorizontalScroll();
});