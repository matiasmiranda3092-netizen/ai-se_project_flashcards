import { hexToString, removeColorClasses } from "./colors.js";

const deckViewSection = document.querySelector("#deck-view");

function createDeckCardEl(cardData, deckColor, index) {
  const template = document.querySelector("#deck-card-template").content;
  const cardEl = template.querySelector(".card").cloneNode(true);
  const titleEl = cardEl.querySelector(".card__title");
  const flipBtn = cardEl.querySelector(".card__btn_type_flip");
  const deleteBtn = cardEl.querySelector(".card__btn_type_delete");

  const colorName = hexToString((deckColor || "").toLowerCase()) || "default";
  removeColorClasses(cardEl);
  cardEl.classList.add(`card_color_${colorName}`);

  let showingQuestion = true;

  function updateCardState() {
    if (showingQuestion) {
      titleEl.textContent = cardData.question;
      cardEl.classList.remove("card_color_white");
      cardEl.classList.add(`card_color_${colorName}`);
    } else {
      titleEl.textContent = cardData.answer;
      cardEl.classList.remove(`card_color_${colorName}`);
      cardEl.classList.add("card_color_white");
    }
  }

  flipBtn.addEventListener("click", () => {
    showingQuestion = !showingQuestion;
    updateCardState();
  });

  deleteBtn.addEventListener("click", () => {
    cardEl.remove();
  });

  updateCardState();

  return cardEl;
}

export function renderDeckView(deck) {
  const title = deckViewSection.querySelector(".gallery__title");
  const cardList = deckViewSection.querySelector(".gallery__list");
  title.textContent = deck.name;
  cardList.innerHTML = "";

  deck.cards.forEach((cardData, index) => {
    cardList.append(createDeckCardEl(cardData, deck.color, index));
  });
}
