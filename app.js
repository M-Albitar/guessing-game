// Main var game rules
let min = 1,
  max = 10,
  winning = createRandomNum(min, max),
  chances = 3;

// UI Elements
const minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessInput = document.querySelector("#guess-num"),
  guessBtn = document.querySelector("#guess-btn"),
  message = document.querySelector("#message"),
  game = document.querySelector("#game");

minNum.textContent = min;
maxNum.textContent = max;

// Play Again Event
game.addEventListener("mousedown", function (e) {
  const playAgain = document.querySelector(".page-reload");
  if (e.target === playAgain) {
    window.location.reload();
  }
});

// Btn Event
guessBtn.addEventListener("click", function () {
  // Get Guess Value
  const guessing = parseInt(guessInput.value);
  // console.log(winning);
  // Rules
  if (isNaN(guessing) || guessing < min || guessing > max) {
    // Validation
    showMessage(`اكتب رقم بين ${min} و ${max}`, "red");
    guessInput.value = "";
  } else if (guessing === winning) {
    gameOver(true, "green");
  } else if (guessing !== winning) {
    // showMessage(`Wrong guessing guess again`, "red");
    gameOver(false, "red");
    setTimeout(showMessage, 2000);
    chances -= 1;
    if (chances === 0) {
      showMessage(`انتهت المحاولات و ${winning} هو الرقم الصحيح ..`, "red");
      setTimeout(showMessage, 6000);
      guessInput.disabled = true;
      guessBtn.value = "العب تاني";
      guessBtn.className += "page-reload";
    }
  }
});

// Show Message
function showMessage(msg, color) {
  message.textContent = msg;
  message.style.color = color;
  guessInput.style.borderColor = color;
}

// Game Over Function
function gameOver(won, color) {
  if (won === true) {
    guessInput.disabled = true;
    showMessage(`${winning} هو الرقم الصحيح فعلا انت فزت مبرووك`, color);
    guessBtn.value = "العب تاني";
    guessBtn.className += "page-reload";
  }

  if (won === false) {
    showMessage(`تخمين خطأ حاول تاني`, color);
    guessInput.value = "";
  }
}

// Random Number Function
function createRandomNum(min, max) {
  return Math.floor(Math.random(min, max) * (max - min + 1) + min);
}
