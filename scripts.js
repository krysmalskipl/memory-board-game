const images = [
  "img1.jpg",
  "img2.jpg",
  "img3.jpg",
  "img4.jpg",
  "img5.jpg",
  "img6.jpg",
  "img7.jpg",
  "img8.jpg",
  "img9.jpg",
  "img10.jpg",
  "img11.jpg",
  "img12.jpg",
  "img13.jpg",
  "img14.jpg",
  "img15.jpg",
  "img16.jpg",
  "img17.jpg",
  "img18.jpg",
  "img19.jpg",
  "img20.jpg",
  "img21.jpg",
  "img22.jpg",
  "img23.jpg",
  "img24.jpg",
  "img25.jpg",
];
const board = document.querySelector(".board");
const movesOutput = document.querySelector(".moves");
const modal = document.querySelector(".modal");
const modalContainer = modal.querySelector(".modal-container");
let moves = 0;

const randomize = (slicedCards) => {
  slicedCards.sort(() => Math.random() - 0.5);
  return slicedCards;
};

const generateBoard = () => {
  console.info("Creating Board...");
  board.innerHTML = "";
  modal.classList.add("hidden");
  slicedCards = randomize(images);
  slicedCards = images.slice(0, 8);
  imagesOnBoard = slicedCards.concat(slicedCards);
  imagesOnBoard.forEach((img) => {
    board.innerHTML += `<div class="card untoggled" data-name="${img.slice(
      0,
      -4
    )}" style="order:${Math.floor(Math.random() * 77)}">
            <img class="front" src="./img/${img}"/>
            <div class="back">?</div>
            </div>`;
  });
  const toggledCards = document.querySelectorAll(".card");
  // setTimeout(() =>
  toggledCards.forEach((card) => {
    card.classList.add("untoggled");
    card.classList.remove("toggled");
    const cards = document.querySelectorAll(".untoggled");
    cards.forEach((card) => {
      card.addEventListener("click", checkCards);
    });
  });
  const cards = document.querySelectorAll(".untoggled");
  cards.forEach((card) => {
    card.addEventListener("click", checkCards);
  });
};

function checkCards(e) {
  e.target.parentElement.classList.add("toggled");
  e.target.parentElement.classList.remove("untoggled");
  const toggledCards = document.querySelectorAll(".toggled");
  console.log(`toggled:${toggledCards.length}`);
  if (toggledCards.length === 2) {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      card.removeEventListener("click", checkCards);
    });
    const first = toggledCards[0];
    const second = toggledCards[1];
    console.log(`First: ${first}`);
    console.log(`Second: ${second}`);

    if (first.dataset.name === second.dataset.name) {
      setTimeout(
        () =>
          toggledCards.forEach((card) => {
            card.classList.remove("toggled");
            card.classList.add("discovered");
          }),
        400
      );
      const cards = document.querySelectorAll(".untoggled");
      setTimeout(
        () =>
          cards.forEach((card) => {
            card.addEventListener("click", checkCards);
          }),
        1000
      );
      checkWin();
    } else {
      setTimeout(
        () =>
          toggledCards.forEach((card) => {
            card.classList.add("untoggled");
            card.classList.remove("toggled");
            const cards = document.querySelectorAll(".untoggled");
            cards.forEach((card) => {
              card.addEventListener("click", checkCards);
            });
          }),
        1000
      );
      checkWin();
    }
    moves++;
  } else {
    return;
  }
  console.log(moves);
}

const checkWin = () => {
  const untoggledCards = document.querySelectorAll(".untoggled");
  console.log(untoggledCards);
  if (untoggledCards.length === 0) {
    modal.classList.remove("hidden");
    modalContainer.innerHTML = `<h1>YOU WON! 🔥</h1>
        <h2>Total moves: ${moves}</h2>
        <button class="reset-game">Restart game</button>`;
    const btnRestart = document.querySelector(".reset-game");
    btnRestart.addEventListener("click", generateBoard);
  }
};

generateBoard();
