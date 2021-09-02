

const questionText=document.querySelector(".question-text");
const optionBox=document.querySelector(".option-box");
const currentQuestionNum=document.querySelector(".current-question-num");
const nextQuestionBtn=document.querySelector(".next-question-btn");
const correctAnswers=document.querySelector(".correct-answers");
const seeResultBtn=document.querySelector(".see-result-btn");1
const quizHomeBox=document.querySelector(".quiz-home-box");
const quizBox=document.querySelector(".quiz-box");
const quizOverBox=document.querySelector(".quiz-over-box");
const playAgainQuizBtn=document.querySelector(".play-again-quiz-btn");
const goHomeBtn=document.querySelector(".go-home-btn");
const startQuizBtn=document.querySelector(".start-quiz-btn");
let Grade=0;
let questionIndex=0;
let score=0;
let number=0;
let myArray=[];
// questions and options 
myApp=[
    {
        question:'HTML is Referred to as...?',
        options:['Hypertext-Makeup-Language','Hypertext-Mock-Language','Hypertext-Markup-Language','Hypertest-Makeup-Language'],
        answer:2,
    },
    {
        question:'Which of These property used to set background color in CSS?...',
        options:['color','background-color','background color','none'],
        answer:1,
    },
    {
        question:'What is the appropiate HTML tag used in displaying largest headings?...',
        options:["headings",'head','h1', 'h6'],
        answer:2,
    },
    {
        question:'Which of these tags is used to make a list with numbers?...',
        options:['ol','List','ul','oi'],
        answer:0,
    },
    {
        question:'One of the following is the correct HTML tag to make a bold text?...',
        options:['b','bold','bb','bo'],
        answer:0,
    }

      ]

function load(){
    number++;
    questionText.innerHTML=myApp[questionIndex].question;
    createOptions();
    scoreBoard();
    currentQuestionNum.innerHTML=number + " / " + myApp.length;
}

function createOptions(){
    optionBox.innerHTML="";
    for(let i=0; i<myApp[questionIndex].options.length; i++){
       const option=document.createElement("div");
       option.innerHTML=myApp[questionIndex].options[i];
       option.classList.add("option");
       option.id=i;
       option.setAttribute("onclick","check(this)");
       optionBox.appendChild(option);
    }
}

function generateRandomQuestion(){
    const randomNumber=Math.floor(Math.random() * myApp.length);
    let hitDuplicate=0;
    if(myArray.length  == 0){
        questionIndex=randomNumber;
    }
    else{
        for(let i=0; i<myArray.length; i++){
            if(randomNumber == myArray[i]){
              
            hitDuplicate=1;
           } 
        }
        if(hitDuplicate == 1){
            generateRandomQuestion();
            return;
        }
        else{
          questionIndex=randomNumber;  
        }
    }
    myArray.push(randomNumber);
    console.log(myArray)
    load();
}

function check(ele){
    const id=ele.id;
    if(id==myApp[questionIndex].answer){
        ele.classList.add("correct");
        score++;
        scoreBoard();
    }
    else{
        ele.classList.add("wrong");
        for(let i=0; i<optionBox.children.length; i++){
            if(optionBox.children[i].id==myApp[questionIndex].answer){
                optionBox.children[i].classList.add("show-correct");
            }
        }
    }
    Grade++;
    disableOptions()
    showNextQuestionBtn();

    if(number == myApp.length){
        quizOver();
    }
}

function disableOptions(){
    for(let i=0; i<optionBox.children.length; i++){
        optionBox.children[i].classList.add("already-answered");
    }
}

function showNextQuestionBtn(){
    nextQuestionBtn.classList.add("show");
}

function hideNextQuestionBtn(){
    nextQuestionBtn.classList.remove("show");
}

function scoreBoard(){
    correctAnswers.innerHTML=score;
}

nextQuestionBtn.addEventListener("click", nextQuestion);

function nextQuestion(){
    questionIndex++;
    generateRandomQuestion();
    hideNextQuestionBtn();
}

function quizResult(){
     document.querySelector(".total-score").innerHTML=score;
}

function resetQuiz(){
     Grade=0;
    // questionIndex=0;
     score=0;
     number=0;
     myArray=[];
}

function quizOver(){
    nextQuestionBtn.classList.remove("show");
    seeResultBtn.classList.add("show");
}

seeResultBtn.addEventListener("click",()=>{
    quizBox.classList.remove("show");
    seeResultBtn.classList.remove("show");
    quizOverBox.classList.add("show"); 
    quizResult();   
})

playAgainQuizBtn.addEventListener("click",()=>{
    quizBox.classList.add("show");
    quizOverBox.classList.remove("show"); 
    resetQuiz();
    nextQuestion();
}) 

goHomeBtn.addEventListener("click",()=>{
    quizOverBox.classList.remove("show"); 
    quizHomeBox.classList.add("show");
    resetQuiz();

})

startQuizBtn.addEventListener("click",()=>{
    quizHomeBox.classList.remove("show");
    quizBox.classList.add("show");
    nextQuestion();
})

//window.onload=()=>{
    
//}





