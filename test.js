const quizData = [
    {
        question: "В какой области науки наиболее известен Д.И. Щербаков?",
        options: ["Геология и геохимия", "Физика", "Биология", "Химия"],
        correct: 0
    },
    {
        question: "В каком году родился Д.И. Щербаков?",
        options: ["1885", "1893", "1900", "1898"],
        correct: 1
    },
    {
        question: "В каком году он стал Героем Социалистического Труда?",
        options: ["1945", "1953", "1961", "1970"],
        correct: 1
    },
    {
        question: "Какой институт он возглавлял?",
        options: [
            "Институт физики Земли",
            "Институт минералогии, геохимии и кристаллохимии редких элементов",
            "Институт геологии рудных месторождений",
            "Институт вулканологии"
        ],
        correct: 1
    },
    {
        question: "Какую роль он играл в АН СССР?",
        options: [
            "Главный ученый секретарь",
            "Академик-секретарь Отделения геолого-географических наук",
            "Вице-президент",
            "Председатель Президиума"
        ],
        correct: 1
    },
    {
        question: "Какие регионы особенно интересовали Щербакова в научном плане?",
        options: ["Сибирь и Дальний Восток", "Средняя Азия и Казахстан", "Кавказ и Урал", "Европейская часть СССР"],
        correct: 1
    },
    {
        question: "Какой журнал он основал?",
        options: ["Геология и геофизика", "Геохимия", "Литология и полезные ископаемые", "Известия АН СССР"],
        correct: 1
    },
    {
        question: "За какие работы он получил Сталинскую премию?",
        options: [
            "За исследования радиоактивных элементов",
            "За открытие месторождений полезных ископаемых",
            "За учебник по общей геологии",
            "За создание геологической карты СССР"
        ],
        correct: 1
    },
    {
        question: "В каком году он был избран академиком АН СССР?",
        options: ["1939", "1946", "1953", "1960"],
        correct: 2
    },
    {
        question: "Какое образование получил Щербаков?",
        options: [
            "Московский университет",
            "Ленинградский горный институт",
            "Московская горная академия",
            "Новороссийский университет"
        ],
        correct: 1
    },
    {
        question: "Какой была его специализация в геологии?",
        options: [
            "Нефтяная геология",
            "Геология редких элементов",
            "Инженерная геология",
            "Палеонтология"
        ],
        correct: 1
    },
    {
        question: "Какой награды он НЕ получал?",
        options: ["Ленинская премия", "Сталинская премия", "Нобелевская премия", "Орден Ленина"],
        correct: 2
    },
    {
        question: "В какой организации он был вице-президентом?",
        options: [
            "Всесоюзное географическое общество",
            "Русское географическое общество",
            "Международный географический союз",
            "Международная ассоциация по геохимии"
        ],
        correct: 0
    },
    {
        question: "Какой вклад он внес в развитие минерально-сырьевой базы СССР?",
        options: [
            "Открытие алмазных месторождений",
            "Выявление месторождений редких элементов",
            "Разработка нефтяных месторождений Сибири",
            "Открытие крупных угольных бассейнов"
        ],
        correct: 1
    },
    {
        question: "В каком году умер Д.И. Щербаков?",
        options: ["1966", "1970", "1975", "1980"],
        correct: 0
    }
];

function generateQuiz() {
    const container = document.getElementById('tst');

    quizData.forEach((quizItem, index) => {
        // Создаем контейнер для вопроса
        const questionBlock = document.createElement('div');
        questionBlock.className = 'question-block';
        questionBlock.dataset.questionIndex = index;

        // Создаем элемент вопроса
        const questionElement = document.createElement('h3');
        questionElement.className = 'question';
        questionElement.textContent = `${index + 1}. ${quizItem.question}`;
        questionBlock.appendChild(questionElement);

        // Создаем контейнер для вариантов ответа
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'options-container';

        // Создаем элемент для отображения результата
        const resultElement = document.createElement('div');
        resultElement.className = 'result';
        resultElement.style.display = 'none';

        // Создаем варианты ответа
        quizItem.options.forEach((option, optionIndex) => {
            const optionId = `q${index}_option${optionIndex}`;

            const optionWrapper = document.createElement('div');
            optionWrapper.className = 'option-wrapper';

            const radioInput = document.createElement('input');
            radioInput.type = 'radio';
            radioInput.id = optionId;
            radioInput.name = `question_${index}`;
            radioInput.value = optionIndex;

            // Добавляем обработчик события для немедленной проверки
            radioInput.addEventListener('change', function () {
                checkAnswerImmediately(index, optionIndex, resultElement);
            });

            const label = document.createElement('label');
            label.htmlFor = optionId;
            label.textContent = option;

            optionWrapper.appendChild(radioInput);
            optionWrapper.appendChild(label);
            optionsContainer.appendChild(optionWrapper);
        });

        questionBlock.appendChild(optionsContainer);
        questionBlock.appendChild(resultElement);

        // Добавляем блок в контейнер
        container.appendChild(questionBlock);
    });

    // Создаем кнопку проверки результатов (опционально)
    const checkButton = document.createElement('button');
    checkButton.id = 'check-results';
    checkButton.textContent = 'Показать итоговые результаты';
    checkButton.addEventListener('click', showFinalResults);

    const resultSummary = document.createElement('div');
    resultSummary.id = 'result-summary';
    resultSummary.style.display = 'none';

    container.appendChild(checkButton);
    container.appendChild(resultSummary);
}

function checkAnswerImmediately(questionIndex, selectedOptionIndex, resultElement) {
    const quizItem = quizData[questionIndex];
    const isCorrect = selectedOptionIndex === quizItem.correct;

    if (isCorrect) {
        resultElement.textContent = '✓ Правильно!';
        resultElement.className = 'result correct';
    } else {
        resultElement.textContent = `✗ Неверно. Правильный ответ: ${quizItem.options[quizItem.correct]}`;
        resultElement.className = 'result incorrect';
    }

    resultElement.style.display = 'block';

    // Обновляем визуальное состояние радио-кнопок
    updateRadioButtonsStyle(questionIndex, selectedOptionIndex, quizItem.correct);
}

function updateRadioButtonsStyle(questionIndex, selectedIndex, correctIndex) {
    const questionBlock = document.querySelector(`[data-question-index="${questionIndex}"]`);
    const allOptions = questionBlock.querySelectorAll('.option-wrapper');

    // Сначала сбросим все стили
    allOptions.forEach(wrapper => {
        wrapper.classList.remove('selected-correct', 'selected-incorrect', 'correct-answer');
    });

    // Помечаем выбранный вариант
    if (selectedIndex === correctIndex) {
        allOptions[selectedIndex].classList.add('selected-correct');
    } else {
        allOptions[selectedIndex].classList.add('selected-incorrect');
        // Показываем правильный ответ
        allOptions[correctIndex].classList.add('correct-answer');
    }
}

function showFinalResults() {
    let correctAnswers = 0;
    let answeredQuestions = 0;

    quizData.forEach((quizItem, index) => {
        const questionBlock = document.querySelector(`[data-question-index="${index}"]`);
        const selectedOption = questionBlock.querySelector(`input[name="question_${index}"]:checked`);

        if (selectedOption) {
            answeredQuestions++;
            const selectedValue = parseInt(selectedOption.value);
            if (selectedValue === quizItem.correct) {
                correctAnswers++;
            }
        }
    });

    const resultSummary = document.getElementById('result-summary');
    resultSummary.innerHTML = `
        <h3>Итоговые результаты:</h3>
        <p>Правильных ответов: ${correctAnswers} из ${answeredQuestions} (отвечено на ${answeredQuestions} из ${quizData.length} вопросов)</p>
        <p>Процент правильных ответов: ${answeredQuestions > 0 ? Math.round((correctAnswers / answeredQuestions) * 100) : 0}%</p>
        <p>Общая полнота ответов: ${Math.round((answeredQuestions / quizData.length) * 100)}%</p>
    `;
    resultSummary.style.display = 'block';
}

// Добавляем CSS стили
const style = document.createElement('style');
style.textContent = `
    .question-block {
        margin-bottom: 30px;
        padding: 20px;
        border: 2px solid rgb(109, 106, 91);
        border-radius: 8px;
        background-color: rgba(160, 157, 141, 0.9);
        transition: all 0.3s ease;
        scroll-snap-align: start;
    }
    
    .question {
        margin-top: 0;
        margin-bottom: 15px;
        color: #333;
        font-size: 1.1em;
    }
    
    .options-container {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    
    .option-wrapper {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 12px;
        border-radius: 6px;
        transition: all 0.3s ease;
        background-color: white;
        border: 2px solid transparent;
        cursor: pointer;
        background:rgba(122, 119, 99, 0.9);
    }
    
    .option-wrapper:hover {
        background-color: rgba(139, 136, 114, 0.9);
        border-color: #e0e0e0;
    }
    
    .option-wrapper input[type="radio"] {
        margin: 0;
        cursor: pointer;
    }
    
    .option-wrapper label {
        cursor: pointer;
        font-size: 1em;
        flex-grow: 1;
        user-select: none;
    }
    
    /* Стили для выбранного правильного ответа */
    .option-wrapper.selected-correct {
        background-color: #e8f5e8;
        border-color: #4CAF50;
        color: #2e7d32;
    }
    
    .option-wrapper.selected-correct label {
        font-weight: bold;
        color: #2e7d32;
    }
    
    /* Стили для выбранного неправильного ответа */
    .option-wrapper.selected-incorrect {
        background-color: #ffebee;
        border-color: #f44336;
        color: #c62828;
    }
    
    .option-wrapper.selected-incorrect label {
        color: #c62828;
        text-decoration: line-through;
    }
    
    /* Стили для правильного ответа (когда выбрали неправильно) */
    .option-wrapper.correct-answer {
        background-color: #e8f5e8;
        border-color: #4CAF50;
        color: #2e7d32;
        animation: pulse 1.5s infinite;
    }
    
    .option-wrapper.correct-answer label {
        font-weight: bold;
        color: #2e7d32;
    }
    
    @keyframes pulse {
        0% { box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.4); }
        70% { box-shadow: 0 0 0 6px rgba(76, 175, 80, 0); }
        100% { box-shadow: 0 0 0 0 rgba(76, 175, 80, 0); }
    }
    
    .result {
        margin-top: 15px;
        font-weight: bold;
        padding: 12px;
        border-radius: 6px;
        display: none;
        animation: fadeIn 0.5s ease;
    }
    
    .result.correct {
        background-color: #e8f5e8;
        color: #2e7d32;
        border-left: 4px solid #4CAF50;
    }
    
    .result.incorrect {
        background-color: #ffebee;
        color: #c62828;
        border-left: 4px solid #f44336;
    }
    
    #check-results {
        padding: 12px 24px;
        color: #281c14;
        background-color: rgb(202, 180, 132);
        border: none;
        border-radius: 4px;
        font-size: 25px;
        cursor: pointer;
        margin-top: 20px;
        font-family: "Oswald", sans-serif;
        
        transition: background-color 0.3s;
    }
    
    #check-results:hover {
        background-color: rgb(192, 170, 122);
    }
    
    #result-summary {
        margin-top: 20px;
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 8px;
        background-color: #f8f9fa;
        animation: fadeIn 0.5s ease;
        scroll-snap-align: start;
        margin-bottom: 300px;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    /* Стиль для отключенных радио-кнопок после ответа */
    .question-block.answered input[type="radio"] {
        opacity: 0.7;
        cursor: not-allowed;
    }
    
    .question-block.answered .option-wrapper {
        cursor: default;
    }
    
    .question-block.answered .option-wrapper:hover {
        background-color: inherit;
        border-color: inherit;
    }
`;

document.head.appendChild(style);

// Инициализируем генератор вопросов
document.addEventListener('DOMContentLoaded', generateQuiz);