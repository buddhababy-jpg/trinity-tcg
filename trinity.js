// TRINITY Alpha 0.1 helper script for TCG Arena.
// Intentionally minimal: combat, Break, Weakness, Quick-Plays and Burn are
// player-resolved in the first alpha. This script only assists Mana handling.

async function trinityGainMana() {
  const manaDeck = cards?.ManaDeck ?? [];
  const manaZone = cards?.ManaZone ?? [];
  const room = Math.max(0, 15 - manaZone.length);
  const amount = Math.min(3, room, manaDeck.length);

  if (amount <= 0) {
    functions.chatLog("cannot gain more Mana (Mana Zone is full or Mana Deck is empty)");
    return;
  }

  await functions.drawFromExtraDeck("ManaDeck", amount, false, "ManaZone");
  functions.chatLog("gained " + amount + " Mana");
}

async function trinityReadyMana() {
  const mana = cards?.ManaZone ?? [];
  if (!mana.length) return;
  await functions.updateCards(mana, { isTapped: false });
  functions.chatLog("readied Mana");
}

// Burn is deliberately manual in Alpha 0.1:
// 1) Select the required number of ALREADY-TAPPED Mana cards.
// 2) Move those Mana cards from ManaZone back to ManaDeck.
// 3) Resolve the activated effect.
//
// This preserves the exact design rule: Burn is an alternative to tapping
// fresh Mana, and only already-tapped Mana can be returned as Burn payment.
