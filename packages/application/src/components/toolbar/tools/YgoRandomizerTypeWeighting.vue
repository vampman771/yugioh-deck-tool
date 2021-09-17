<template>
    <div>
        <div v-for="typeCategory in typeCategories" :key="typeCategory">
            <input
                v-model="internalTypeCategoryWeighting[typeCategory]"
                type="number"
                min="0.0"
                max="1.0"
                step="0.05"
            />
        </div>
    </div>
</template>

<script lang="ts">
import type { PropType } from "@vue/composition-api";
import { defineComponent, reactive, readonly, ref } from "@vue/composition-api";
import type {
    TypeCategoryWeighting,
    CardTypeCategory,
} from "@yugioh-deck-tool/core";
import { CARD_TYPE_CATEGORY_ARR } from "@yugioh-deck-tool/core";
import { cloneDeep } from "lodash";

export default defineComponent({
    components: {},
    model: {
        prop: "typeCategoryWeighting",
        event: "change",
    },
    props: {
        typeCategoryWeighting: {
            required: true,
            type: Object as PropType<TypeCategoryWeighting>,
        },
    },
    emits: ["change"],
    setup(props, context) {
        const typeCategories = readonly<CardTypeCategory[]>(
            CARD_TYPE_CATEGORY_ARR
        );

        const internalTypeCategoryWeighting = reactive<TypeCategoryWeighting>(
            cloneDeep(props.typeCategoryWeighting)
        );

        const onUpdate = (): void =>
            context.emit("change", cloneDeep(internalTypeCategoryWeighting));

        return { typeCategories, internalTypeCategoryWeighting, onUpdate };
    },
});
</script>

<style lang="scss">
@import "~@yugioh-deck-tool/browser-common/src/styles/variables";
@import "~@yugioh-deck-tool/browser-common/src/styles/mixins";
</style>
