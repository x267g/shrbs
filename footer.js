// footer.js
// Анимации и эффекты для футера с наградами

document.addEventListener('DOMContentLoaded', function () {
    // Плавное появление наград при загрузке
    const awardCards = document.querySelectorAll('.award-card');

    awardCards.forEach((card, index) => {
        // Устанавливаем начальную прозрачность
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';

        // Запускаем анимацию с задержкой
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 + index * 100);
    });



    // Автоматическая прокрутка наград в футере (исправленная версия)
    const awardsFooter = document.querySelector('.awards-footer');
    let scrollInterval = null;
    let isScrollingForward = true;
    let isPaused = false;
    let isAtEnd = false;

    function startAutoScroll() {
        if (scrollInterval) return; // Уже запущено

        if (awardsFooter.scrollWidth > awardsFooter.clientWidth) {
            scrollInterval = setInterval(() => {
                if (isPaused) return;

                const scrollPosition = awardsFooter.scrollLeft;
                const maxScroll = awardsFooter.scrollWidth - awardsFooter.clientWidth;
                const isNearEnd = scrollPosition >= maxScroll - 1;
                const isNearStart = scrollPosition <= 1;

                if (isScrollingForward) {
                    // Прокручиваем вперёд
                    if (isNearEnd) {
                        // Достигли конца - меняем направление после паузы
                        isScrollingForward = false;
                        isAtEnd = true;
                        setTimeout(() => {
                            isAtEnd = false;
                        }, 1000); // Пауза в конце 1 секунда
                    } else {
                        awardsFooter.scrollLeft += 1;
                    }
                } else {
                    // Прокручиваем назад
                    if (isNearStart) {
                        // Достигли начала - меняем направление после паузы
                        isScrollingForward = true;
                        setTimeout(() => {
                            // Небольшая пауза в начале
                        }, 1000); // Пауза в начале 1 секунда
                    } else {
                        awardsFooter.scrollLeft -= 1;
                    }
                }
            }, 20); // Интервал 30ms для плавной прокрутки
        }
    }

    function stopAutoScroll() {
        if (scrollInterval) {
            clearInterval(scrollInterval);
            scrollInterval = null;
        }
    }

    function pauseAutoScroll() {
        isPaused = true;
    }

    function resumeAutoScroll() {
        isPaused = false;
    }

    // Управление автопрокруткой при взаимодействии пользователя
    awardsFooter.addEventListener('mouseenter', () => {
        pauseAutoScroll();
    });

    awardsFooter.addEventListener('mouseleave', () => {
        resumeAutoScroll();
    });

    // Останавливаем прокрутку при ручном скролле
    awardsFooter.addEventListener('wheel', () => {
        pauseAutoScroll();
        // Возобновляем через 3 секунды после ручного скролла
        setTimeout(resumeAutoScroll, 3000);
    });

    awardsFooter.addEventListener('touchstart', () => {
        pauseAutoScroll();
    });

    awardsFooter.addEventListener('touchend', () => {
        // Возобновляем через 3 секунды после касания
        setTimeout(resumeAutoScroll, 3000);
    });

    // Альтернативный вариант с requestAnimationFrame (более плавный)
    function smoothAutoScroll() {
        if (awardsFooter.scrollWidth <= awardsFooter.clientWidth) return;

        let lastTimestamp = 0;
        let direction = 1; // 1 = вперед, -1 = назад
        let isAnimating = true;
        let pauseUntil = 0;

        function animate(timestamp) {
            if (!isAnimating) return;

            if (!lastTimestamp) lastTimestamp = timestamp;
            const deltaTime = timestamp - lastTimestamp;
            lastTimestamp = timestamp;

            if (timestamp < pauseUntil) {
                requestAnimationFrame(animate);
                return;
            }

            const currentScroll = awardsFooter.scrollLeft;
            const maxScroll = awardsFooter.scrollWidth - awardsFooter.clientWidth;
            const speed = 0.1; // пикселей за миллисекунду

            if (direction === 1) {
                // Движение вперед
                if (currentScroll >= maxScroll - 1) {
                    // Достигли конца - меняем направление
                    direction = -1;
                    pauseUntil = timestamp + 1000; // Пауза 1 секунда
                } else {
                    awardsFooter.scrollLeft = currentScroll + (speed * deltaTime);
                }
            } else {
                // Движение назад
                if (currentScroll <= 1) {
                    // Достигли начала - меняем направление
                    direction = 1;
                    pauseUntil = timestamp + 1000; // Пауза 1 секунда
                } else {
                    awardsFooter.scrollLeft = currentScroll - (speed * deltaTime);
                }
            }

            requestAnimationFrame(animate);
        }

        // Запускаем анимацию
        requestAnimationFrame(animate);

        // Возвращаем функцию для остановки
        return () => {
            isAnimating = false;
        };
    }

    setTimeout(startAutoScroll, 2000);
});