async function trinityGainMana() {
  const manaZone = cards.ManaZone ?? [];
  const manaDeck = cards.ManaDeck ?? [];

  // Hard limit: never have more than 15 Mana in the Mana Zone.
  const availableSpace = Math.max(0, 15 - manaZone.length);

  if (availableSpace <= 0) {
    functions.chatLog("Mana Zone is already at the 15 Mana limit.");
    return;
  }

  if (manaDeck.length <= 0) {
    functions.chatLog("No Mana remains in the Mana Deck.");
    return;
  }

  // Gain up to 3, but never exceed the Mana Zone cap
  // or the number of cards remaining in ManaDeck.
  const amount = Math.min(3, availableSpace, manaDeck.length);

  await functions.drawFromExtraDeck(
    "ManaDeck",
    amount,
    false,
    "ManaZone"
  );

  game.data.TrinityControls.manaTurns += 1;

  functions.chatLog(
    "Gained " + amount + " Mana. Mana Zone: " +
    (manaZone.length + amount) + "/15."
  );
}


async function trinityReadyMana() {
  const mana = cards.ManaZone ?? [];

  if (mana.length <= 0) {
    return;
  }

  await functions.updateCards(
    mana,
    {
      isTapped: false
    }
  );

  functions.chatLog("Mana readied.");
}
