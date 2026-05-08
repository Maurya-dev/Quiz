const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');
const tryAgainBtn = document.querySelector('.tryAgain-btn');
const goHome = document.querySelector('.goHome');




startBtn.onclick = () => {   //ye arow function h jo ki addEventlistner click pe chal raha h per ase case me on.click zaruri h
    popupInfo.classList.add('active'); // popupinfo ki class me classlist.add ki help se ek aur class "active " add kar dega
    main.classList.add('active'); 
};

exitBtn.addEventListener('click', () => {   //ye arow function h jo ki addEventlistner click pe chal raha h 
    popupInfo.classList.remove('active');  // popupinfo ki class me classlist.remove ki help se yahi class "active " remove kar dega
    main.classList.remove('active');  
    
});

continueBtn.addEventListener('click', () => {   
    quizSection.classList.add('active'); 
    popupInfo.classList.remove('active');  // popupinfo ki class me classlist.remove ki help se yahi class "active " remove kar dega
    main.classList.remove('active');
    quizBox.classList.add('active'); 

    
    showQuestions(0);
    questionCounter(1);
    headerScore();
});

tryAgainBtn.onclick = () => {
    quizBox.classList.add('active');
    nextBtn.classList.remove  ('active'); 
    resultBox.classList.remove('active');
    
    questionCount = 0;
    questionNumb = 1;
    userSore = 0;
    showQuestions(questionCount);
    questionCounter(questionNumb);
    headerScore();
}

goHome.onclick = () => {
    quizSection.classList.remove('active');
    nextBtn.classList.remove  ('active'); 
    resultBox.classList.remove('active');
    
    questionCount = 0;
    questionNumb = 1;
    userSore = 0;
    showQuestions(questionCount);
    questionCounter(questionNumb);
    headerScore();
}


let questionCount = 0;
let questionNumb = 1;
let userSore = 0;

const nextBtn = document.querySelector('.next-btn');

nextBtn.onclick = () => {
    if (questionCount < question.length - 1) {
        questionCount++;
        showQuestions(questionCount);

        questionNumb++;
        questionCounter(questionNumb);

        nextBtn.classList.remove("active");
    }
    else{
        console.log('Prashn Pura hua');
        showResultBox();
    }
   
};

const optionList = document.querySelector('.option-list');

function showQuestions(index){
    const questionText = document.querySelector('.que-text');
    questionText.textContent = `${question[index].numb}. ${question[index].question}`;

    let optionTag = `<div class="option"><span>${question[index].option[0]}</span></div>
        <div class="option"><span>${question[index].option[1]}</span></div>
        <div class="option"><span>${question[index].option[2]}</span></div>
        <div class="option"><span>${question[index].option[3]}</span></div>`;


     optionList.innerHTML = optionTag;  
     
     const option = document.querySelectorAll('.option');
     for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", 'optionSelected(this)');
     }
};

function optionSelected(answer){
    let userAnswer = answer.textContent;
    let correctAnswer = question[questionCount].answer;
    let allOptions = optionList.children.length;
    
    if (userAnswer == correctAnswer) {
        console.log('Autar sahi h ');
        answer.classList.add('correct');
        userSore += 1;
        headerScore();
    }
    else{
        console.log('Autar sahi nhi h ');
        answer.classList.add('incorrect');

        for(let i = 0; i < allOptions; i++ ) {
            if (optionList.children[i].textContent == correctAnswer) {
                optionList.children[i].setAttribute('class', 'option correct');
        }

    }
    }

    for(let i = 0; i < allOptions; i++ ){
        optionList.children[i].classList.add('disabled');
    }

    nextBtn.classList.add('active');
}

function questionCounter(index){
    const questionTotal = document.querySelector('.que-total');
    questionTotal.textContent = `${index} of ${question.length} Question`
};

function headerScore() {
    const headerScoretext = document.querySelector('.header-score');
    headerScoretext.textContent = `Score: ${userSore} / ${question.length}`;
}

function showResultBox() {
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    const scoreText = document.querySelector('.score-text');
    scoreText.textContent = `Apka parinam ${userSore} out of ${question.length}`;


    const circularProgress = document.querySelector('.circular-progress');
    const progressValue = document.querySelector('.progress-value');
    let progressStartValue = -1;
    let progressEndValue = (userSore / question.length) * 100;
    let speed = 20;
    
    let progress = setInterval(() => {
        progressStartValue++;

        progressValue.textContent = `${progressStartValue}%`;
        circularProgress.style.background = `conic-gradient(#c00086 ${progressStartValue * 3.6}deg, rgba(255, 255, 255, .1) 0deg)`;

        if (progressStartValue == progressEndValue) {
            clearInterval(progress);
        }

    }, speed);
}