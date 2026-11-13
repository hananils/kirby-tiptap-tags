<template>
    <k-button :icon="type" class="k-tiptap-tag-toggle" @click="onToggle" />
</template>

<script>
export default {
    emits: ['click'],

    props: {
        type: String
    },

    methods: {
        onToggle(event) {
            event.stopPropagation();
            this.$emit('toggle');
        }
    }
};
</script>

<style>
.k-tiptap-tag-toggle {
    grid-row: 2 / 3;
    grid-column: 2 / 3;
    width: 2.25rem;
    height: 2.25rem;

    .k-button-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    }
}
</style>
