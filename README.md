# TRINITY — TCG Arena Alpha 0.1

This folder is the first playable migration package for TRINITY.

## Included

- `gamefile.json` — board, deckbuilding, counters, sections, Break token, Quick-Play stack, Leader zone, Mana Deck and Mana Zone.
- `cards.json` — small placeholder test pool.
- `trinity.js` — minimal helper functions for gaining and readying Mana.
- `assets/` — placeholder SVG assets so the package can be hosted and loaded before final card art is ready.

## Current prototype rules

- 20 Life.
- 40-card Main Deck, max 3 copies per card.
- Exactly 1 Leader.
- Separate 15-card Mana Deck.
- Four Monster Slots.
- Opening hand: 5; draw 1 each turn.
- No attack on the first turn of the game.
- Monsters may be summoned upright (Attack Stance) or sideways (Defense Stance).
- Upright monsters defend using ATK.
- Sideways monsters defend using DEF.
- A monster must be upright to attack; after attacking, tap it into Defense Stance.
- An attack Breaks a monster when attacker ATK is greater than the target's active combat value.
- Broken monsters cannot protect Life. A later successful attack against the Broken monster destroys it.
- Quick-Play Spells may be activated during either player's turn.
- Mana enters 3 at a time, maximum 15 in the Mana Zone.
- Normal payment taps ready Mana.
- Burn payment: instead of tapping fresh Mana for an activated monster effect, return the required number of ALREADY-TAPPED Mana cards from the Mana Zone to the Mana Deck.
- Manifested Leaders permanently die if destroyed.

## Before hosting

Replace every occurrence of:

`__BASE_URL__`

with the public URL of this folder, **without a trailing slash**.

Example:

`https://raw.githubusercontent.com/YOURNAME/trinity-tcg/main/tcgarena`

Then `gamefile.json` should be reachable at something like:

`https://raw.githubusercontent.com/YOURNAME/trinity-tcg/main/tcgarena/gamefile.json`

Paste that public `gamefile.json` URL into TCG Arena's custom-game page.

## Important alpha note

TCG Arena's own documentation recommends validating the base game file before relying heavily on scripting. For Alpha 0.1, combat math, Break, Weakness/Resistance, Quick-Play timing and Burn payment are intentionally player-resolved. The script only assists Mana movement.

## First test

1. Host this folder publicly.
2. Replace `__BASE_URL__` in `gamefile.json` and `cards.json`.
3. Open the `gamefile.json` URL directly in a browser and confirm it returns raw JSON.
4. Paste that URL into TCG Arena.
5. Build a tiny test deck in the deck builder.
6. Confirm these in order: Leader zone → 4 Monster Slots → Mana Deck → Mana Zone → card tapping → Break token → Stack → Discard.
7. Only after the board renders correctly should we add more automation.

## Known items we still need to validate in TCG Arena

- How the custom `Leader` and `ManaDeck` deck categories are placed by the deck picker in the current production build.
- Whether `boardCardSelection` places the chosen Leader directly in the intended section or requires a small setup adjustment.
- Whether the four individual Monster sections feel better than a single four-card Field section.
- Whether Mana should be gained by button (current alpha) or automated on `onNewTurn` after the basic board is confirmed stable.
