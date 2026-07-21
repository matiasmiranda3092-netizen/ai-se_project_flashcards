import { decks } from "./decks.js";
import { hexToString, removeColorClasses } from "./colors.js";
import { renderDeckView } from "./deck-view.js";
import { renderCarouselView } from "./carousel.js";

const homeSection = document.querySelector("#home");
const deckViewSection = document.querySelector("#deck-view");
const carouselSection = document.querySelector("#carousel");
const notFoundSection = document.querySelector("#not-found");

let currentDeck = null;

function createCardEl(cardData) {
  const template = document.querySelector("#card-template").content;
  const cardEl = template.querySelector(".card").cloneNode(true);
  cardEl.querySelector(".card__title").textContent = cardData.name;
  cardEl.querySelector(".card__count").textContent =
    `${cardData.cards.length} cards`;
  cardEl.querySelector(".card__link").href = `#decks/${cardData.id}`;

  const deleteBtn = cardEl.querySelector(".card__btn_type_delete");
  deleteBtn.addEventListener("click", () => {
    cardEl.remove();
  });

  const colorName =
    hexToString((cardData.color || "").toLowerCase()) || "default";
  removeColorClasses(cardEl);
  cardEl.classList.add(`card_color_${colorName}`);

  return cardEl;
}

function renderHomeCards() {
  const cardList = homeSection.querySelector(".gallery__list");
  cardList.innerHTML = "";

  decks.forEach((item) => {
    cardList.append(createCardEl(item));
  });
}

function renderHomeView() {
  homeSection.style.display = "block";
  deckViewSection.style.display = "none";
  carouselSection.style.display = "none";
  notFoundSection.style.display = "none";
}

function renderDeckPage(deck) {
  homeSection.style.display = "none";
  deckViewSection.style.display = "block";
  carouselSection.style.display = "none";
  notFoundSection.style.display = "none";
  renderDeckView(deck);
}

function renderCarouselPage(deck) {
  homeSection.style.display = "none";
  deckViewSection.style.display = "none";
  carouselSection.style.display = "flex";
  notFoundSection.style.display = "none";
  renderCarouselView(deck);
}

function renderNotFoundView() {
  homeSection.style.display = "none";
  deckViewSection.style.display = "none";
  carouselSection.style.display = "none";
  notFoundSection.style.display = "flex";
}

function router() {
  const hash = window.location.hash.slice(1) || "home";
  const [route, id] = hash.split("/");
  const deck = decks.find((item) => item.id === id);

  if (!route || route === "home") {
    currentDeck = null;
    renderHomeView();
  } else if (route === "carousel" && deck) {
    currentDeck = deck;
    renderCarouselPage(deck);
  } else if ((route === "deck" || route === "decks") && deck) {
    currentDeck = deck;
    renderDeckPage(deck);
  } else {
    currentDeck = null;
    renderNotFoundView();
  }
}

function handleDeckLinkClick(event) {
  const link = event.target.closest("a.card__link");
  if (!link) return;

  const href = link.getAttribute("href") || "";
  if (!href.startsWith("#decks/")) return;

  const id = href.replace("#decks/", "");
  currentDeck = decks.find((item) => item.id === id) || null;
}

function handleDeckAction(event) {
  if (!currentDeck) return;

  const practiceButton = event.target.closest(".gallery__practice-btn");
  if (practiceButton) {
    window.location.hash = `#carousel/${currentDeck.id}`;
    return;
  }
}

document.body.addEventListener("click", handleDeckLinkClick);
document.body.addEventListener("click", handleDeckAction);

window.addEventListener("DOMContentLoaded", () => {
  renderHomeCards();
  router();
});
window.addEventListener("hashchange", router);
