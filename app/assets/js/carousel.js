import { hexToString, removeColorClasses } from "./colors.js";

export function renderCarouselView(deck) {
  const carouselTitle = document.querySelector(".carousel__title");
  const carouselCard = document.querySelector(".carousel__card");
  const carouselCardText = document.querySelector(".carousel__card-text");
  const carouselBtnLeft = document.querySelector(".carousel__btn_type_left");
  const carouselBtnRight = document.querySelector(".carousel__btn_type_right");
  const carouselBtnFlip = document.querySelector(".carousel__btn_type_flip");

  let currentIndex = 0;
  let showingQuestion = true;

  function updateDisplay() {
    const currentCard = deck.cards[currentIndex];
    carouselTitle.textContent = `${deck.name} · ${currentIndex + 1}/${deck.cards.length}`;

    if (showingQuestion) {
      carouselCardText.textContent = currentCard.question;
      carouselCard.classList.remove("carousel__card_color_white");
    } else {
      carouselCardText.textContent = currentCard.answer;
      carouselCard.classList.add("carousel__card_color_white");
    }
    if (currentIndex === 0) {
      carouselBtnLeft.classList.add("carousel__btn_disabled");
    } else {
      carouselBtnLeft.classList.remove("carousel__btn_disabled");
    }

    if (currentIndex === deck.cards.length - 1) {
      carouselBtnRight.classList.add("carousel__btn_disabled");
    } else {
      carouselBtnRight.classList.remove("carousel__btn_disabled");
    }
  }

  function initializeCardColor() {
    removeColorClasses(carouselCard);
    carouselCard.classList.add(
      `carousel__card_color_${hexToString(deck.color)}`,
    );
  }

  carouselBtnLeft.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      showingQuestion = true;
      updateDisplay();
    }
  });

  carouselBtnRight.addEventListener("click", () => {
    if (currentIndex < deck.cards.length - 1) {
      currentIndex++;
      showingQuestion = true;
      updateDisplay();
    }
  });

  carouselBtnFlip.addEventListener("click", () => {
    showingQuestion = !showingQuestion;
    updateDisplay();
  });

  initializeCardColor();
  updateDisplay();
}
