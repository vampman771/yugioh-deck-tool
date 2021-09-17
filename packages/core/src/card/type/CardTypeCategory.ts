import { deepFreeze } from "lightdash";

/**
 * @see CardType
 */
export enum CardTypeCategory {
    MONSTER = "Monster",
    SPELL = "Spell",
    TRAP = "Trap",
    SKILL = "Skill",
}

const CARD_TYPE_CATEGORY_ARR = Object.values(CardTypeCategory);
deepFreeze(CARD_TYPE_CATEGORY_ARR);
export { CARD_TYPE_CATEGORY_ARR };
