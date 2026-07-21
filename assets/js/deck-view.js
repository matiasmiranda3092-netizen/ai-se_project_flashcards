import { hexToString, removeColorClasses } from "./colors.js";

const deckViewSection = document.querySelector("#deck-view");

function createDeckCardEl(cardData, deckColor, index) {
  const template = document.querySelector("#deck-card-template").content;
  const cardEl = template.querySelector(".card").cloneNode(true);
  cardEl.querySelector(".card__title").textContent = cardData.question;
  cardEl.querySelector(".card__count").textContent = `Card ${index + 1}`;

  const colorName = hexToString((deckColor || "").toLowerCase()) || "default";
  removeColorClasses(cardEl);
  cardEl.classList.add(`card_color_${colorName}`);

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
