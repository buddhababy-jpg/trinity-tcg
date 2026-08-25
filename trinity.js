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
