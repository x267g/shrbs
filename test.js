// test.js
// Тесты о Д.И. Щербакове

class TestSystem {
    constructor() {
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.userAnswers = [];
        this.score = 0;
        this.initialized = false;

        this.initializeElements();
        this.loadQuestions();
        this.setupEventListeners();
    }

    initializeElements() {
        this.questionsContainer = document.getElementById('questions-container');
        this.resultsContainer = document.getElementById('results-container');
        this.prevButton = document.getElementById('prev-button');
        this.nextButton = document.getElementById('next-button');
        this.currentQuestionElement = document.getElementById('current-question');
        this.totalQuestionsElement = document.getElementById('total-questions');
        this.currentScoreElement = document.getElementById('current-score');
        this.maxScoreElement = document.getElementById('max-score');
        this.progressFill = document.getElementById('progress-fill');
    }

    loadQuestions() {
        this.questions = [
            {
                id: 1,
                text: "В каком году родился Дмитрий Иванович Щербаков?",
                options: [
                    { id: 'a', text: "1893", correct: true },
                    { id: 'b', text: "1900", correct: false },
                    { id: 'c', text: "1885", correct: false },
                    { id: 'd', text: "1910", correct: false }
                ],
                explanation: "Дмитрий Иванович Щербаков родился 1 (13) февраля 1893 года в Санкт-Петербурге."
            },
            {
                id: 2,
                text: "Какой университет окончил Д.И. Щербаков?",
                options: [
                    { id: 'a', text: "Московский университет", correct: false },
                    { id: 'b', text: "Петербургский университет", correct: false },
                    { id: 'c', text: "Таврический университет", correct: true },
                    { id: 'd', text: "Казанский университет", correct: false }
                ],
                explanation: "Д.И. Щербаков окончил Петербургский университет в 1915 году."
            },
            {
                id: 3,
                text: "Кто был научным руководителем Д.И. Щербакова?",
                options: [
                    { id: 'a', text: "А.П. Карпинский", correct: true },
                    { id: 'b', text: "М.В. Ломоносов", correct: false },
                    { id: 'c', text: "И.М. Губкин", correct: false },
                    { id: 'd', text: "В.А. Обручев", correct: false }
                ],
                explanation: "Д.И. Щербаков был учеником выдающегося геолога А.П. Карпинского."
            },
            {
                id: 4,
                text: "Какую высшую награду СССР получил Д.И. Щербаков?",
                options: [
                    { id: 'a', text: "Орден Ленина", correct: true },
                    { id: 'b', text: "Орден Октябрьской Революции", correct: false },
                    { id: 'c', text: "Орден Дружбы народов", correct: false },
                    { id: 'd', text: "Орден «Знак Почёта»", correct: false }
                ],
                explanation: "Д.И. Щербаков был дважды награждён Орденом Ленина (в 1953 и 1963 годах)."
            },
            {
                id: 5,
                text: "За что Д.И. Щербаков получил Ленинскую премию?",
                options: [
                    { id: 'a', text: "За открытие новых месторождений нефти", correct: false },
                    { id: 'b', text: "За создание новой геологической карты СССР", correct: false },
                    { id: 'c', text: "За научные работы по металлогении", correct: true },
                    { id: 'd', text: "За педагогическую деятельность", correct: false }
                ],
                explanation: "Ленинскую премию Д.И. Щербаков получил в 1965 году за научные работы по металлогении и геохимии."
            },
            {
                id: 6,
                text: "В каком году Д.И. Щербаков стал академиком АН СССР?",
                options: [
                    { id: 'a', text: "1943", correct: false },
                    { id: 'b', text: "1953", correct: true },
                    { id: 'c', text: "1963", correct: false },
                    { id: 'd', text: "1973", correct: false }
                ],
                explanation: "Д.И. Щербаков был избран академиком АН СССР в 1953 году."
            },
            {
                id: 7,
                text: "Какой зарубежный университет присвоил Д.И. Щербакову почётную докторскую степень?",
                options: [
                    { id: 'a', text: "Йенский университет имени Ф. Шиллера", correct: true },
                    { id: 'b', text: "Сорбонна", correct: false },
                    { id: 'c', text: "Оксфордский университет", correct: false },
                    { id: 'd', text: "Гарвардский университет", correct: false }
                ],
                explanation: "Йенский университет имени Ф. Шиллера (ГДР) присвоил Д.И. Щербакову почётную докторскую степень в 1958 году."
            },
            {
                id: 8,
                text: "Какой минерал назван в честь Д.И. Щербакова?",
                options: [
                    { id: 'a', text: "Щербаковит", correct: true },
                    { id: 'b', text: "Дмитриевит", correct: false },
                    { id: 'c', text: "Щербаковскит", correct: false },
                    { id: 'd', text: "Щербит", correct: false }
                ],
                explanation: "В честь Д.И. Щербакова был назван минерал щербаковит."
            },
            {
                id: 9,
                text: "Какую военную награду получил Д.И. Щербаков в 1945 году?",
                options: [
                    { id: 'a', text: "Орден Красной Звезды", correct: true },
                    { id: 'b', text: "Орден Отечественной войны", correct: false },
                    { id: 'c', text: "Орден Славы", correct: false },
                    { id: 'd', text: "Медаль «За отвагу»", correct: false }
                ],
                explanation: "В 1945 году Д.И. Щербаков был награждён Орденом Красной Звезды."
            },
            {
                id: 10,
                text: "Какое направление геологии было основным в научной деятельности Д.И. Щербакова?",
                options: [
                    { id: 'a', text: "Геология рудных месторождений", correct: true },
                    { id: 'b', text: "Нефтяная геология", correct: false },
                    { id: 'c', text: "Инженерная геология", correct: false },
                    { id: 'd', text: "Палеонтология", correct: false }
                ],
                explanation: "Основным направлением научной деятельности Д.И. Щербакова была геология рудных месторождений, геохимия и минералогия."
            }
        ];

        this.totalQuestionsElement.textContent = this.questions.length;
        this.maxScoreElement.textContent = this.questions.length;
        this.userAnswers = new Array(this.questions.length).fill(null);
    }

    setupEventListeners() {
        this.prevButton.addEventListener('click', () => this.showPreviousQuestion());
        this.nextButton.addEventListener('click', () => this.showNextQuestion());

        // Инициализация при загрузке страницы
        document.addEventListener('DOMContentLoaded', () => {
            this.showQuestion(0);
            this.initialized = true;
        });
    }

    showQuestion(index) {
        if (index < 0 || index >= this.questions.length) return;

        this.currentQuestionIndex = index;
        const question = this.questions[index];

        // Обновляем интерфейс
        this.currentQuestionElement.textContent = index + 1;

        // Рассчитываем прогресс
        const progress = ((index + 1) / this.questions.length) * 100;
        this.progressFill.style.width = `${progress}%`;

        // Обновляем кнопки навигации
        this.prevButton.disabled = index === 0;

        if (index === this.questions.length - 1) {
            this.nextButton.textContent = 'Завершить тест →';
            this.nextButton.classList.add('submit-button');
            this.nextButton.classList.remove('next-button');
        } else {
            this.nextButton.textContent = 'Далее →';
            this.nextButton.classList.remove('submit-button');
            this.nextButton.classList.add('next-button');
        }

        // Отображаем вопрос
        this.renderQuestion(question);
    }

    renderQuestion(question) {
        let html = `
            <div class="test-question" data-question-id="${question.id}">
                <div class="question-text">${question.text}</div>
                <div class="options-container">
        `;

        question.options.forEach(option => {
            const isSelected = this.userAnswers[this.currentQuestionIndex] === option.id;
            const selectedClass = isSelected ? 'selected' : '';

            html += `
                <label class="option-label ${selectedClass}" for="option-${question.id}-${option.id}">
                    <input type="radio" 
                           id="option-${question.id}-${option.id}" 
                           name="question-${question.id}" 
                           value="${option.id}" 
                           class="option-input"
                           ${isSelected ? 'checked' : ''}>
                    <span class="option-text">${option.text}</span>
                </label>
            `;
        });

        html += `
                </div>
                <div class="explanation" id="explanation-${question.id}">
                    ${question.explanation}
                </div>
            </div>
        `;

        this.questionsContainer.innerHTML = html;

        // Добавляем обработчики для вариантов ответа
        question.options.forEach(option => {
            const input = document.getElementById(`option-${question.id}-${option.id}`);
            input.addEventListener('change', (e) => this.selectAnswer(e.target.value));
        });

        // Показываем/скрываем объяснение в зависимости от состояния ответа
        this.updateQuestionFeedback();
    }

    selectAnswer(answerId) {
        this.userAnswers[this.currentQuestionIndex] = answerId;

        // Обновляем отображение выбранного варианта
        const labels = document.querySelectorAll('.option-label');
        labels.forEach(label => {
            const input = label.querySelector('input[type="radio"]');
            if (input && input.value === answerId) {
                label.classList.add('selected');
            } else {
                label.classList.remove('selected');
            }
        });

        // Обновляем счётчик правильных ответов
        this.updateScore();
    }

    updateScore() {
        this.score = 0;
        this.questions.forEach((question, index) => {
            const userAnswer = this.userAnswers[index];
            if (userAnswer) {
                const selectedOption = question.options.find(opt => opt.id === userAnswer);
                if (selectedOption && selectedOption.correct) {
                    this.score++;
                }
            }
        });

        this.currentScoreElement.textContent = this.score;
    }

    updateQuestionFeedback() {
        const userAnswer = this.userAnswers[this.currentQuestionIndex];
        const question = this.questions[this.currentQuestionIndex];
        const explanation = document.getElementById(`explanation-${question.id}`);

        if (userAnswer) {
            const selectedOption = question.options.find(opt => opt.id === userAnswer);
            const labels = document.querySelectorAll('.option-label');

            labels.forEach(label => {
                const input = label.querySelector('input[type="radio"]');
                if (input) {
                    const option = question.options.find(opt => opt.id === input.value);
                    label.classList.remove('correct', 'incorrect');

                    if (option.correct) {
                        label.classList.add('correct');
                    } else if (input.value === userAnswer && !option.correct) {
                        label.classList.add('incorrect');
                    }
                }
            });

            explanation.classList.add('show');
        } else {
            explanation.classList.remove('show');
        }
    }

    showPreviousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.showQuestion(this.currentQuestionIndex - 1);
        }
    }

    showNextQuestion() {
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.showQuestion(this.currentQuestionIndex + 1);
        } else {
            this.finishTest();
        }
    }

    finishTest() {
        // Скрываем вопросы и кнопки навигации
        this.questionsContainer.style.display = 'none';
        this.prevButton.style.display = 'none';
        this.nextButton.style.display = 'none';

        // Показываем результаты
        this.showResults();
    }

    showResults() {
        const percentage = (this.score / this.questions.length) * 100;

        let message = '';
        let emoji = '';

        if (percentage >= 90) {
            message = 'Отлично! Вы прекрасно знаете биографию Д.И. Щербакова!';
            emoji = '🏆';
        } else if (percentage >= 70) {
            message = 'Хорошо! Вы хорошо знакомы с жизнью и деятельностью учёного.';
            emoji = '👍';
        } else if (percentage >= 50) {
            message = 'Удовлетворительно. Вы знаете основные факты о Д.И. Щербакове.';
            emoji = '📚';
        } else {
            message = 'Попробуйте ещё раз! Изучите материалы на этой странице.';
            emoji = '🔍';
        }

        let resultsHtml = `
            <div class="result-container">
                <h2 class="result-title">Результаты теста</h2>
                <div class="result-score">${this.score}/${this.questions.length}</div>
                <div class="result-message">${message} ${emoji}</div>
                
                <div class="result-details">
                    <h3>Детали результатов:</h3>
                    <p>Процент правильных ответов: <strong>${percentage.toFixed(1)}%</strong></p>
                    <p>Правильных ответов: <strong>${this.score}</strong></p>
                    <p>Неправильных ответов: <strong>${this.questions.length - this.score}</strong></p>
                </div>
                
                <button class="test-button restart-button" id="restart-button">Пройти тест ещё раз</button>
            </div>
        `;

        this.resultsContainer.innerHTML = resultsHtml;
        this.resultsContainer.style.display = 'block';

        // Добавляем обработчик для кнопки перезапуска
        document.getElementById('restart-button').addEventListener('click', () => this.restartTest());
    }

    restartTest() {
        // Сбрасываем тест
        this.currentQuestionIndex = 0;
        this.userAnswers = new Array(this.questions.length).fill(null);
        this.score = 0;

        // Скрываем результаты
        this.resultsContainer.style.display = 'none';
        this.resultsContainer.innerHTML = '';

        // Показываем вопросы и кнопки навигации
        this.questionsContainer.style.display = 'block';
        this.prevButton.style.display = 'flex';
        this.nextButton.style.display = 'flex';

        // Обновляем интерфейс
        this.currentScoreElement.textContent = '0';
        this.showQuestion(0);
        this.updateScore();
    }

    // Метод для инициализации теста при открытии вкладки
    init() {
        if (!this.initialized) {
            this.showQuestion(0);
            this.initialized = true;
        }
    }
}

// Создаём экземпляр тестовой системы
let testSystem = null;

// Инициализация теста при открытии соответствующей вкладки
document.addEventListener('DOMContentLoaded', function () {
    // Создаём систему тестов
    testSystem = new TestSystem();

    // Добавляем обработчик для кнопок навигации между вкладками
    const navButtons = document.querySelectorAll('.nav-button');
    navButtons.forEach(button => {
        button.addEventListener('click', function () {
            const tabId = this.getAttribute('data-tab');
            if (tabId === 'tests' && testSystem) {
                // Даём небольшой таймаут для отображения контента перед инициализацией теста
                setTimeout(() => {
                    testSystem.init();
                }, 100);
            }
        });
    });

    // Инициализируем тест, если сразу открыта вкладка "Тесты"
    if (document.querySelector('#tests').classList.contains('active')) {
        setTimeout(() => {
            testSystem.init();
        }, 100);
    }
});