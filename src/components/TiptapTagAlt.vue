<template>
    <strong :class="{ 'k-tiptap-tag-alt': true, missing: alt === false }">
        <k-icon type="alt-checked" v-if="alt === true" />
        <k-icon type="alt-missing" v-else />
        alt
    </strong>
</template>

<script>
export default {
    props: {
        alt: Boolean
    }
};
</script>

<style>
.k-tiptap-tag-alt {
    display: flex;
    margin-left: auto;
    border-radius: 2px;
    padding: 0.15em 0.4em 0.15em 0.3em;
    color: light-dark(var(--color-green-700), var(--color-green-500));
    font-weight: normal;
    font-size: var(--text-xs);
    text-transform: uppercase;

    &.missing {
        color: light-dark(var(--color-red-700), var(--color-red-500));
    }

    svg {
        margin-right: 0.3em;
    }
}
</style>
