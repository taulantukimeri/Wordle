document.addEventListener("keydown", addLetter);

const keyword = "apple";
const rows = document.querySelectorAll(".row");
const rowsLength = rows.length;
const rowLength = rows[0].children.length;
let activeRow = 0;
let activeLetter = 0;
let keywordCharacters;

function addLetter({ keyCode, key }) {
  if ((keyCode == 8 || keyCode == 46) && activeLetter > 0) {
    // Delete/Backspace keyCode
    rows[activeRow].children[activeLetter - 1].innerText = "";
    rows[activeRow].children[activeLetter - 1].classList.remove("active");
    --activeLetter;
  }
  if (keyCode >= 65 && keyCode <= 90 && activeLetter < rowLength) {
    // a-z(A-Z) keycode
    rows[activeRow].children[activeLetter].innerText = key.toUpperCase();
    rows[activeRow].children[activeLetter].classList.add("active");
    ++activeLetter;
  }
  if (keyCode == 13 && activeRow < rowsLength) {
    // Enter keycode

    if (activeLetter >= rowLength) {
      validateWord(activeRow);
      activeLetter = 0;
      if (activeRow == rowLength) {
        document.removeEventListener("keydown", addLetter);
        return;
      }
      ++activeRow;
    }
  }
}

function validateWord(row) {
  const results = [];

  Array.from(rows[row].children).forEach((element, i) => {
    results[i] = validateLetter(element, i);
  });

  if (results.every((x) => x)) {
    document.removeEventListener("keydown", addLetter);
    document.querySelector("#result").innerText = "You got it!";
  }
}

function validateLetter(letter, i) {
  if (keyword.toUpperCase().charAt(i) == letter.innerText) {
    letter.classList.add("correct");
    return true;
  } else if (keyword.toUpperCase().includes(letter.innerText)) {
    letter.classList.add("misplaced");
    return false;
  } else {
    letter.classList.add("wrong");
    return false;
  }
}
