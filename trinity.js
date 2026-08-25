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
  // IMPORTANT:
  // Do not check cards.Deck here. TCG Arena does not expose the hidden
  // Main Deck through cards.Deck in this custom-control context, so that
  // check falsely reports an empty deck even when cards remain.

  if (typeof functions.drawFromDeck === "function") {
    try {
      await functions.drawFromDeck(1, "Hand");
      functions.chatLog("Drew 1 card.");
      return;
    } catch (error) {
      console.warn("TRINITY: drawFromDeck failed.", error);
    }
  }

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
      console.warn("TRINITY: drawFromExtraDeck for Main Deck failed.", error);
    }
  }

  if (typeof functions.draw === "function") {
    try {
      await functions.draw("Deck", 1, "Hand");
      functions.chatLog("Drew 1 card.");
      return;
    } catch (error) {
      console.warn("TRINITY: generic draw failed.", error);
    }
  }

  functions.chatLog(
    "DRAW 1 could not use this TCG Arena build's draw API. " +
    "The Main Deck itself is not empty."
  );
}
