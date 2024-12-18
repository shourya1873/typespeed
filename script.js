const typingText = document.querySelector('.typing-text p')
const challengeComplete = document.querySelector('.challenge-completed')
const inputField = document.querySelector('.wrapper .input-field')
const time = document.querySelector('.time span b')
const mistakes = document.querySelector('.mistake span')
const wpm = document.querySelector('.wpm span')
const cpm = document.querySelector('.cpm span')
const btn = document.querySelector('button')
const wpmScore = document.querySelector('.wpm-score')
const cpmScore = document.querySelector('.cpm-score')
//set value
let timer;
let maxTime = 60;let timeLeft = maxTime;
let charIndex = 0;
let mistake = 0;
let isTyping = false;
let wpmVal = 0;
let cpmVal = 0;

function loadParagraph() {
    const paragraph = ["Avoid daydreaming about the years to come.", "You are the most important person in your whole life.", "Always be true to who you are, and ignore what other people have to say about you.", "Always be true to who you are, and ignore what other people have to say about you.", "Only demonstrate your strength when it’s really required.", "Subscribe to Drop X Out"];
    const randomIndex = Math.floor(Math.random()* paragraph.length);

    typingText.innerHTML = '';
    for(const char of paragraph[randomIndex]) {
        typingText.innerHTML +=`<span>${char}</span>`;
    }
    typingText.querySelectorAll('span')[0].classList.add('active')
    document.addEventListener('keydown', () => inputField.focus())
    typingText.addEventListener("click", () => {
        inputField.focus()
    })
}

function initTyping() {
    const char = typingText.querySelectorAll('span');
    const typedChar = inputField.value.charAt(charIndex);
    if(charIndex < char.length && timeLeft > 0) {

        if(!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }

        if(char[charIndex].innerText === typedChar) {
            char[charIndex].classList.add('correct')
        } else {
            mistake++;
            char[charIndex].classList.add('incorrect')
        }
        charIndex++;
        cpmVal = charIndex - mistake;
        mistakes.innerText = mistake
        if(charIndex == char.length) {
            challengeCompleted();
        } else {
            char[charIndex].classList.add('active')
            cpm.innerText = cpmVal;
        }
    } else {
        clearInterval(timer)
    }
}

function challengeCompleted() {
    typingText.style.display = 'none';
    wpmScore.innerText = wpmVal;
    cpmScore.innerText = cpmVal;
    challengeComplete.style.display = 'block'
    timeLeft = 0;
    time.innerText = timeLeft;
    wpm.innerText = 0;
    cpm.innerText = 0;
}

function initTimer() {
    if(timeLeft > 0) {
        timeLeft--;
        time.innerText = timeLeft;
        wpmVal = Math.round(((charIndex - mistake) / 5) / (maxTime - timeLeft)*60);
        wpm.innerText = wpmVal;
    } else {
        clearInterval(timer);
    }
}

function reset() {
    typingText.style.display = 'block';
    challengeComplete.style.display = 'none'
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    time.innerText = timeLeft;
    inputField.value = '';
    charIndex = 0;
    mistake = 0;
    isTyping = false;
    wpm.innerText = 0;
    cpm.innerText = 0;
    mistake.innerText = 0;
}

inputField.addEventListener("input", initTyping);
btn.addEventListener("click", reset)

loadParagraph();