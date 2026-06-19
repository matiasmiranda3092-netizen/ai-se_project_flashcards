import { renderCarouselView } from "./carousel.js";
import { decks } from "./decks.js";
import { hexToString, removeColorClasses } from "./colors.js";

const homeSection = document.querySelector("#home");
const carouselSection = document.querySelector("#carousel");
const notFoundSection = document.querySelector("#not-found");

function renderDeckEl(item) {
  const deckList = document.querySelector(".decks__list");
  const deckEl = createDeckEl(item);
  deckList.prepend(deckEl);
}

function createDeckEl(deckData) {
  const template = document.querySelector("#deck-template").content;
  const deckEl = template.querySelector(".deck").cloneNode(true);
  deckEl.querySelector(".deck__title").textContent = deckData.name;
  deckEl.querySelector(".deck__count").textContent =
    `${deckData.cards.length} cards`;
  deckEl.querySelector(".deck__link").href = `#carousel/${deckData.id}`;

  const deleteBtn = deckEl.querySelector(".deck__delete-btn");
  deleteBtn.addEventListener("click", () => {
    deckEl.remove();
  });

  const colorName =
    hexToString((deckData.color || "").toLowerCase()) || "default";
  removeColorClasses(deckEl);
  deckEl.classList.add(`deck_color_${colorName}`);

  return deckEl;
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
  renderDeckEl(item);
});
