import { renderCarouselView } from "./carousel.js";
import { decks } from "./decks.js";
import { hexToString, removeColorClasses } from "./colors.js";

const homeSection = document.querySelector("#home");
const carouselSection = document.querySelector("#carousel");
const notFoundSection = document.querySelector("#not-found");

function renderCardEl(item) {
  const cardList = document.querySelector(".gallery__list");
  const cardEl = createCardEl(item);
  cardList.prepend(cardEl);
}

function createCardEl(cardData) {
  const template = document.querySelector("#card-template").content;
  const cardEl = template.querySelector(".card").cloneNode(true);
  cardEl.querySelector(".card__title").textContent = cardData.name;
  cardEl.querySelector(".card__count").textContent =
    `${cardData.cards.length} cards`;
  cardEl.querySelector(".card__link").href = `#carousel/${cardData.id}`;

  const deleteBtn = cardEl.querySelector(".card__delete-btn");
  deleteBtn.addEventListener("click", () => {
    cardEl.remove();
  });

  const colorName =
    hexToString((cardData.color || "").toLowerCase()) || "default";
  removeColorClasses(cardEl);
  cardEl.classList.add(`card_color_${colorName}`);

  return cardEl;
}

function renderHomeView() {
  homeSection.style.display = "block";
  carouselSection.style.display = "none";
  notFoundSection.style.display = "none";
}

function renderNotFoundView() {
  homeSection.style.display = "none";
  carouselSection.style.display = "none";
  notFoundSection.style.display = "flex";
}

function router() {
  const hash = window.location.hash.slice(1) || "home";

  if (hash === "home") {
    renderHomeView();
  } else if (hash.startsWith("carousel/")) {
    const id = hash.split("/")[1];
    const deck = decks.find((deck) => deck.id === id);

    if (deck) {
      homeSection.style.display = "none";
      carouselSection.style.display = "flex";
      notFoundSection.style.display = "none";
      renderCarouselView(deck);
    } else {
      renderNotFoundView();
    }
  } else {
    renderNotFoundView();
  }
}

window.addEventListener("DOMContentLoaded", router);
window.addEventListener("hashchange", router);

decks.forEach((item) => {
  renderCardEl(item);
});
