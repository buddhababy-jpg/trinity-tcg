async function trinityGainMana() {
  const manaZone = cards.ManaZone ?? [];
  const manaDeck = cards.ManaDeck ?? [];

  const availableSpace = Math.max(0, 15 - manaZone.length);

  if (availableSpace <= 0) {
    functions.chatLog("Mana Zone is already at the 15 Mana limit.");
    return;
  }

  if (manaDeck.length <= 0) {
    functions.chatLog("No Mana remains in the Mana Deck.");
    return;
  }

  const amount = Math.min(3, availableSpace, manaDeck.length);

  await functions.drawFromExtraDeck(
    "ManaDeck",
    amount,
    false,
    "ManaZone"
  );

  functions.chatLog(
    "Gained " + amount + " Mana. Mana Zone: " +
    (manaZone.length + amount) + "/15."
  );
}


async function trinityDrawOne() {
  const deck = cards.Deck ?? [];

  if (deck.length <= 0) {
    functions.chatLog("Main Deck is empty.");
    return;
  }

  // Prefer a dedicated main-deck API if this TCG Arena build exposes one.
  if (typeof functions.drawFromDeck === "function") {
    try {
      await functions.drawFromDeck(1, "Hand");
      functions.chatLog("Drew 1 card.");
      return;
    } catch (error) {
      console.warn("drawFromDeck failed; trying section draw.", error);
    }
  }

  // This helper is already used successfully by TRINITY for ManaDeck.
  // TCG Arena builds that allow arbitrary deck sections can also use it for Deck.
  if (typeof functions.drawFromExtraDeck === "function") {
    try {
      await functions.drawFromExtraDeck(
        "Deck",
        1,
        false,
        "Hand"
      );
      functions.chatLog("Drew 1 card.");
      return;
    } catch (error) {
      console.warn("drawFromExtraDeck(Deck) failed.", error);
    }
  }

  // Final compatibility attempts for builds exposing a generic draw helper.
  if (typeof functions.draw === "function") {
    try {
      await functions.draw("Deck", 1, "Hand");
      functions.chatLog("Drew 1 card.");
      return;
    } catch (error) {
      console.warn("Generic draw failed.", error);
    }
  }

  functions.chatLog(
    "Draw button could not access the Main Deck API. " +
    "Use the Main Deck context menu and report this message."
  );
}
