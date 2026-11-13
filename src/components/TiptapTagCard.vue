<template>
    <span class="k-tiptap-tag k-tiptap-tag-card" :data-theme="theme">
        <a
            :href="href"
            :data-layout="layout"
            tabindex="-1"
            contenteditable="false"
        >
            <template v-if="item?.image || item?.url">
                <k-item-image v-if="layout === 'list'" :image="item.image" />
                <img v-else :src="item.url" />
            </template>

            <span>
                {{ text }}
                <k-tiptap-tag-alt v-if="hasAlt" :alt="alt" />
            </span>
        </a>
        <k-tiptap-tag-toggle
            v-if="isValid"
            type="collapse"
            @toggle="$emit('toggle')"
        />
    </span>
</template>

<script>
import TiptapTagAlt from './TiptapTagAlt.vue';
import TiptapTagToggle from './TiptapTagToggle.vue';

export default {
    components: {
        'k-tiptap-tag-alt': TiptapTagAlt,
        'k-tiptap-tag-toggle': TiptapTagToggle
    },

    emits: ['click'],

    props: {
        item: Object,
        layout: String,
        href: String,
        image: Object,
        type: String,
        text: String,
        theme: String,
        caption: String,
        hasAlt: Boolean,
        alt: Boolean
    },

    computed: {
        isValid() {
            return this.theme !== 'negative';
        }
    }
};
</script>

<style>
.k-tiptap-tag-card {
    display: grid;
    grid-template-rows: min-content min-content;
    grid-template-columns: auto 2.25rem;
    box-shadow: inset 0 0 1px 0 rgba(0 0 0 / 10%);
    border-radius: var(--rounded);
    background-color: light-dark(var(--color-gray-150), var(--color-gray-800));
    max-width: 50rem;
    overflow: clip;

    a {
        grid-row: 1 / 3;
        grid-column: 1 / 3;

        img {
            filter: brightness(0.975);
            border-bottom: 1px solid rgb(0 0 0 / 0.025);
            width: 100%;
        }

        span {
            display: block;
            margin-right: 2.25rem;
            padding: 0.45rem;
            min-height: 2.25rem;
        }
    }
}
</style>
