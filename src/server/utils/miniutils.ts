import crypto from "crypto";
import { cards, type allCard } from "../config/cards";

export const random = () => {
  return (
    (
      crypto.webcrypto as unknown as {
        getRandomValues: (input: Uint32Array) => number[];
      }
    ).getRandomValues(new Uint32Array(1))[0] /
    2 ** 32
  );
};

const reducedByNumbers = [...new Array(14)].map((_, idx) => idx);

export const pickRandomCard = (): allCard => {
  const idxReduced = Math.floor(random() * reducedByNumbers.length);
  const reducedNumber = reducedByNumbers[idxReduced];

  const idxCard = Math.floor(random() * (cards.length - reducedNumber));
  const card = cards[idxCard];

  // Prevent null card value
  if (!card) return pickRandomCard();
  return card;
};
