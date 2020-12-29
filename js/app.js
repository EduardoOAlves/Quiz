
// variables
const questionNumber = document.querySelector(".question-number")
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answersIndicatorContainer = document.querySelector(".answers-indicator");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");


// variables
let questionCounter = 0;
let currentQuestion;
let availableQuestion = [];
let availableOptions = [];
let correctAnswers = 0;
let attempt = 0;


//push the question into availableQuestion Array//
function setAvailableQuestion(){
    
    const totalQuestion = quiz.length;
    for(let i=0; i< totalQuestion; i++){
        availableQuestion.push(quiz[i])
    }
}

//set question number and question and option
function getNewQuestion(){

    //set question number
    questionNumber.innerHTML = "Question " + (questionCounter + 1) + "of" + quiz.length;

    //set question text
    //get random question
    const questionIndex =  availableQuestion[Math.floor(Math.random() * availableQuestion.length)];
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.q;

    //get position of 'questionIndex' from the available Option Array
    const index1= availableQuestion.indexOf(questionIndex);

    //remove the 'questionIndex' from the availableOptions Array so that question does not repeat
    availableQuestion.splice(index1,1);

    //set options
    //get the lengtn of options
    const optionLen = currentQuestion.options.length;
    for(let i=0; i<optionLen; i++){
        availableOptions.push(i);
    }
    optionContainer.innerHTML='';
    let animationDelay = 0.15;
    //create options in innerHTML
    for(let i=0; i<optionLen; i++){
        // random option
        const optionIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
        //get the position of 'optionIndex' from the availableQuestion 
        const index2 = availableOptions.indexOf(optionIndex);
        //remove the 'optionIndex' from the availableOptions,so that the options does not repeat
        availableOptions.splice(index2,1);
        const option = document.createElement("div");
        option.innerHTML = currentQuestion.options[optionIndex];
        option.id = optionIndex;
        option.style.animationDelay = animationDelay + 's';
        animationDelay = animationDelay + 0.15;
        option.className = "option";
        optionContainer.appendChild(option);
        option.setAttribute("onclick", "getResult(this)");
    }

    questionCounter++;
}

//get the result current attempt question
    function getResult(element){
      const id = parseInt(element.id);
      //get the answer by comparyng the id of clicked option
      if(id === currentQuestion.answer){
          //set the green color to the corret option
        element.classList.add("correct");
        // add the indicator to corret mark
        updateAnswerIndicator("correct");
        correctAnswers++;
      }else{
         //set the red color to the incorrect option
         element.classList.add('wrong');
         // add the indicator to wrong mark
        updateAnswerIndicator("wrong");
         //if the answer is incorrect the show the correct option by adding green color the correct option
         const optionLen = optionContainer.children.length;
         for(let i = 0; i<optionLen; i++){
            if(parseInt(optionContainer.children[i].id) === currentQuestion.answer){
                optionContainer.children[i].classList.add("correct");
            }
        }
         
    }
    attempt++;
    unclickableOptions();
}
//make all the options unclickable once the user select a option(RESTRICT THE USER TO CHANGE THE OPTION AGAIN)
function unclickableOptions(){
    const optionLen = optionContainer.children.length;
    for(let i = 0; i<optionLen; i++){
        optionContainer.children[i].classList.add("already-answered");
    }
}

function answerIndicator(){
    answersIndicatorContainer.innerHTML ='';
    const totalQuestion = quiz.length;
    for(let i=0; i<totalQuestion; i++){
        const indicator = document.createElement("div");
        answersIndicatorContainer.appendChild(indicator);
    }
}

function updateAnswerIndicator(markType){
    answersIndicatorContainer.children[questionCounter-1].classList.add(markType);
}

 function next(){
    if(questionCounter === quiz.length){
        quizOver();
    }else{
        getNewQuestion();
    }
 }

 function quizOver(){
   // hide quiz-box
   quizBox.classList.add("hide");
   //show result box
   resultBox.classList.remove("hide");
   quizResult();
 }

 //get th quiz result
 function quizResult(){
    resultBox.querySelector(".total-question").innerHTML = quiz.length;
    resultBox.querySelector(".total-attempt").innerHTML = attempt;
    resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
    resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;
    const percentage = (correctAnswers/quiz.length)*100;
    resultBox.querySelector(".percentage").innerHTML = percentage.toFixed() + "%";
    resultBox.querySelector(".total-score").innerHTML = correctAnswers + "/" + quiz.length;
 }

 function tryAgain(){
     // hide the result
    resultBox.classList.add("hide");
    // show the quizBox
    quizBox.classList.remove("hide");
    resetQuiz();
    startQuiz();

 }

function resetQuiz(){
    // variables
    questionCounter = 0;
    correctAnswers = 0;
    attempt = 0;
}

 function goToHome(){
    //hide result box
    resultBox.classList.add("hide");
    //show home bo
    homeBox.classList.remove("hide");
    resetQuiz();
 }
// ### STAR POINT ###

function startQuiz(){
    //hide home-box
    homeBox.classList.add("hide");
    //show quiz-box
    quizBox.classList.remove("hide");
   // first we will set all questions in availableQuestion Array
    setAvailableQuestion();
    // Second we will call getNewQuestion(); function
    getNewQuestion();
    // to create indicators of answer
    answerIndicator();
}

window.onload = function(){
    homeBox.querySelector(".total-question").innerHTML = quiz.length;
}