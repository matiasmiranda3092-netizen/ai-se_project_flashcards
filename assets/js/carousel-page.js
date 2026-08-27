import { getDeckByID } from "./decks.js";
import { renderCarouselView } from "./carousel.js";

const deckID = new URLSearchParams(window.location.search).get("deck");
const deck = getDeckByID(deckID);

if (deck) {
  renderCarouselView(deck);
} else {
  window.location.href = "./index.html";
}
