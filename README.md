# YuGiOh Deck Tool

> A tool to view deck prices, share and edit decks, create random decks and much more

## Introduction

A tool to view deck prices, share and edit decks, create random decks and much more.

Live version: <https://ygoprodeck.com/card-database/deck-prices/>.

## Development

### Directory Structure

-   `core` Shared business logic and communication with the [YGOProDeck API](https://db.ygoprodeck.com/api-guide/).
-   `ui` Shared UI logic/styling requiring a browser.
-   `application` Vue app source code.
-   `tooltip` Card tooltip.

### Modules

```text
        core                // Does not depend on browser
         ^
         |
         |
         ui                 // Depends on browser
        ^  ^
       /    \
      /      \
     /        \
application  tooltip        // Browser entry points

```

### Scripts

-   `serve` in _application_ to develop.
-   `build` in _application_ to build. Output from application/dist contains all required files.
