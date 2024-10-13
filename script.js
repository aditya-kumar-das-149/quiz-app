const questions = [
    {
        question: "Which is largest animal in the world ?",
        answers: [
            { text: "Shark", correct: false },
            { text: "Blue whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false },
        ]
    },
    {
        question: "Which is the smallest continent in the world ?",
        answers: [
            { text: "Africa", correct: false },
            { text: "Asia", correct: false },
            { text: "Australia", correct: true },
            { text: "North America", correct: false },
        ]
    },
    {
        question: "What is the color of apple ?",
        answers: [
            { text: "Blue", correct: false },
            { text: "Green", correct: false },
            { text: "Black", correct: false },
            { text: "Red", correct: true },
        ]
    },
    {
        question: "What is H2O",
        answers: [
            { text: "Water", correct: true },
            { text: "Oil", correct: false },
            { text: "Petrol", correct: false },
            { text: "LPG", correct: false },
        ]
    },
];

const que = document.getElementById("question");
const ans = document.getElementById("ans-btn");
const nxt = document.getElementById("nxt-btn");

let currentquetsionindex = 0;
let score = 0;

function startquiz() {
    currentquetsionindex = 0;
    score = 0;
    nxt.innerHTML = "Next";
    showques();
}

function showques() {

    resetstate();
    let cq = questions[currentquetsionindex];
    let qn = currentquetsionindex + 1;
    que.innerHTML = qn + ". " + cq.question;



    cq.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        ans.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectanswer);

    });
}


function resetstate(){
    nxt.style.display = "none";
    while(ans.firstChild){
        ans.removeChild(ans.firstChild)
    }
}

function selectanswer(e){
    const selectedbtn = e.target;
    const iscorrect = selectedbtn.dataset.correct === "true";
    if(iscorrect){
        selectedbtn.classList.add("correct");
        score++;
    }
    else{
        selectedbtn.classList.add("incorrect");
    }
    Array.from(ans.children).forEach(button => {
        if(button.dataset.correct =="true"){
            button.classList.add("correct")
        }
        button.disabled = true;
    });
    nxt.style.display = "block";
}

function showscore(){
    resetstate();
    que.innerHTML = `Your scored ${score} out of ${questions.length}!`;
    nxt.innerHTML = "Play Again";
    nxt.style.display = "block";
}

function handlenxtbtn(){
    currentquetsionindex++;
    if(currentquetsionindex < questions.length){
        showques();
    }
    else{
        showscore();
    }
    
};

nxt.addEventListener("click", () => {
    if(currentquetsionindex < questions.length){
        handlenxtbtn();
    }
    else{
        startquiz();
    }
});

startquiz();