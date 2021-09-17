<template>
    <BDropdownGroup>
        <BDropdownItemButton
            :disabled="!essentialDataLoaded"
            @click="() => randomize()"
        >
            <span class="fas fa-magic fas-in-button" aria-hidden="true"></span>
            Randomize
        </BDropdownItemButton>
        <BDropdownItemButton
            v-b-modal.randomizerSettings
            :disabled="!essentialDataLoaded"
        >
            <span class="fas fa-cogs fas-in-button" aria-hidden="true"></span>
            Randomizer Settings
            <BModal
                id="randomizerSettings"
                hide-footer
                modal-class="deck-tool__portal"
                title="Randomizer Settings"
            >
                <div class="form-group">
                    <h6>Randomization Strategy</h6>
                    <VSelect
                        v-model="strategy"
                        :options="strategies"
                        :clearable="false"
                        title="Randomization Strategy"
                    />
                </div>
                <div class="form-group">
                    <h6>Filter</h6>
                    <YgoFilter v-model="filter" :show-only="['sets']" />
                </div>
                <div class="form-group">
                    <h6>Card Type Category Weighting</h6>
                    <YgoRandomizerTypeWeighting
                        v-model="typeCategoryWeighting"
                    />
                </div>
            </BModal>
        </BDropdownItemButton>
    </BDropdownGroup>
</template>

<script lang="ts">
import { computed, defineComponent, readonly, ref } from "@vue/composition-api";
import type {
    CardFilter,
    DeckRandomizationService,
    Format,
    TypeCategoryWeighting,
} from "@yugioh-deck-tool/core";
import {
    createDefaultTypeCategoryWeighting,
    RandomizationStrategy,
    TYPES,
} from "@yugioh-deck-tool/core";
import { BDropdownGroup, BDropdownItemButton, BModal } from "bootstrap-vue";
import VSelect from "vue-select";
import { applicationContainer } from "../../../inversify.config";
import { DECK_REPLACE } from "../../../store/modules/deck";
import { useStore } from "../../../store/store";
import YgoFilter from "../../YgoFilter.vue";
import YgoRandomizerTypeWeighting from "./YgoRandomizerTypeWeighting.vue";

const deckRandomizationService =
    applicationContainer.get<DeckRandomizationService>(
        TYPES.DeckRandomizationService
    );

export default defineComponent({
    components: {
        YgoFilter,
        YgoRandomizerTypeWeighting,
        VSelect,
        BModal,
        BDropdownItemButton,
        BDropdownGroup,
    },
    props: {},
    emits: [],
    setup() {
        const strategies = readonly<RandomizationStrategy[]>(
            Object.values(RandomizationStrategy)
        );

        const strategy = ref<RandomizationStrategy>(
            RandomizationStrategy.ARCHETYPE_2
        );
        const filter = ref<CardFilter>({
            sets: [],
        });
        const typeCategoryWeighting = ref<TypeCategoryWeighting>(
            createDefaultTypeCategoryWeighting()
        );

        const store = useStore();

        const format = computed<Format | null>(() => store.state.format.active);

        const randomize = (): void => {
            const randomizedDeck = deckRandomizationService.randomize(
                strategy.value,
                {
                    filter: {
                        ...filter.value,
                        format: format.value,
                    },
                    typeCategoryWeighting: typeCategoryWeighting.value,
                }
            );
            store.commit(DECK_REPLACE, { deck: randomizedDeck });
        };

        const essentialDataLoaded = computed<boolean>(
            () => store.state.data.essentialDataLoaded
        );

        return {
            strategy,
            strategies,
            filter,
            typeCategoryWeighting,

            essentialDataLoaded,

            randomize,
        };
    },
});
</script>

<style lang="scss">
@import "~@yugioh-deck-tool/browser-common/src/styles/variables";
@import "~@yugioh-deck-tool/browser-common/src/styles/mixins";

.deck-tool__portal {
    .randomizer__btn-group {
        justify-content: space-between;
    }
}
</style>
