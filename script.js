
const DATA = [
    {
        question: "С помощью какого атрибута объединяются ячейки таблицы по горизонтали?",
        answers: [
            {
                id: '1',
                value: "colspan",
                correct: true,
            },
            {
                id: '2',
                value: "unity",
                correct: false,
            },
            {
                id: '3',
                value: "rowspan",
                correct: false,
            },
            {
                id: '4',
                value: "union",
                correct: false,
            }
        ]
    },
    {
        question: "Каких тегов в HTML не существует?",
        answers: [
            {
                id: '5',
                value: "Одиночных",
                correct: false,
            },
            {
                id: '6',
                value: "Тройных",
                correct: true,
            },
            {
                id: '7',
                value: "Парных",
                correct: false,
            },
        ]
    },
    {
        question: "С помощью какого тега нужно задавать подписи к полям формы?",
        answers: [
            {
                id: '8',
                value: "id",
                correct: false,
            },
            {
                id: '8',
                value: "label",
                correct: true,
            },
            {
                id: '10',
                value: "field",
                correct: false,
            },
            {
                id: '11',
                value: "type",
                correct: false,
            },
        ]
    },
    {
        question: "С помощью какого атрибута можно задать текст для картинки, который будет отображен, если её не удастся загрузить?",
        answers: [
            {
                id: '12',
                value: "alt",
                correct: true,
            },
            {
                id: '13',
                value: "popup",
                correct: false,
            },
            {
                id: '14',
                value: "title",
                correct: false,
            },
            {
                id: '15',
                value: "caption",
                correct: false,
            },
        ]
    },
    {
        question: "С помощью какого тега создаются поля формы?",
        answers: [
            {
                id: '16',
                value: "field",
                correct: false,
            },
            {
                id: '17',
                value: "parameter",
                correct: false,
            },
            {
                id: '18',
                value: "form",
                correct: false,
            },
            {
                id: '19',
                value: "input",
                correct: true,
            },
        ]
    },
    {
        question: "С помощью какого тега в HTML создаются ссылки?",
        answers: [
            {
                id: '20',
                value: "i",
                correct: false,
            },
            {
                id: '21',
                value: "a",
                correct: true,
            },
            {
                id: '22',
                value: "b",
                correct: false,
            },
            {
                id: '23',
                value: "p",
                correct: false,
            },
        ]
    },
]


const quiz = document.getElementById('quiz');
const questions = document.getElementById('questions');
const results = document.getElementById('results');
const indicator = document.getElementById('indicator');
const restart = document.getElementById('restart');
const next = document.getElementById('next');
const resultsContainer = document.getElementById('results-container');
const quizContainer = document.getElementById('quiz-container');

let localResults = {};

const renderQuestions = (index) => {

    renderIndicator(index + 1);

    questions.dataset.currentStep = index;

    const renderAnswers = () => {
        return DATA[index].answers
            .map(answer => (
                `
                <li>
                        <label>
                            <input class="answer-input" type="radio" name=${index} value=${answer.id} />
                            <span>${answer.value}</span>
                        </label>
                </li>
            `
            ))
            .join('')
    }
    questions.innerHTML = `
            <div class="quiz-questions-item">
                <div class="quiz-questions-item__question">${DATA[index].question}</div>
                    <ul class="quiz-question-item__answers">${renderAnswers()}</ul>
            </div>
            `
}

const renderResults = () => {
    let content = ``;

    const getClassname = (answer, questionIndex) => {
        let classname = '';
        if (!answer.correct && answer.id === localResults[questionIndex]) {
            classname = 'answer--invalid';
        } else if (answer.correct) {
            classname = 'answer--valid';
        }
        return classname;
    }

    const getAnswers = (questionIndex) => {
        return DATA[questionIndex].answers
            .map(answer => (
                `<li class=${getClassname(answer, questionIndex)}>
                    ${answer.value}
                 </li>`
            ))
            .join('');
    }

    DATA.forEach((question, index) => {
        content += `
            <div class="quiz-results-item">
                <div class="quiz-results-item__question">${question.question}</div>
                    <ul class="quiz-results-item__answers">
                        ${getAnswers(index)}
                    </ul>
            </div>
        `
    })
    results.innerHTML = content;
}

const renderIndicator = (currentStep) => {
    indicator.innerHTML = `
    ${currentStep} / ${DATA.length}
    `
}

quizContainer.addEventListener('change', (e) => {
    //логика ответа
    if (e.target.classList.contains('answer-input')) {

        localResults[e.target.name] = e.target.value;
        next.disabled = false;
    }
})

quizContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-next')) {
        const nextStep = +questions.dataset.currentStep + 1;

        if (DATA.length === nextStep) {
            renderResults();
            quiz.classList.add('quiz--hidden')
            questions.classList.add('questions--hidden')
            indicator.classList.add('indicator--hidden')
            restart.classList.add('restart--visible')
            next.classList.add('next--hidden')
            resultsContainer.style.display = 'flex'
        } else {
            renderQuestions(nextStep)
        }

        next.disabled = true;
    }

    if (e.target.classList.contains('btn-restart')) {
        results.innerHTML = '';
        localResults = {};

        questions.classList.remove('questions--hidden')
        indicator.classList.remove('indicator--hidden')
        restart.classList.remove('restart--visible')
        next.classList.remove('next--hidden')
        quiz.classList.remove('quiz--hidden')
        resultsContainer.style.display = 'none'
        renderQuestions(0)
    }
})

renderQuestions(0)