<template>
    <span class="k-tiptap-tag k-tiptap-tag-item" :data-theme="theme">
        <a
            :href="href"
            data-layout="list"
            tabindex="-1"
            contenteditable="false"
        >
            <k-image-frame v-if="image.src" v-bind="image" />
            <k-icon-frame v-else v-bind="image" />

            <span>
                {{ text }}
                <k-tiptap-tag-alt v-if="hasAlt && isValid" :alt="alt" />
            </span>
        </a>
        <k-tiptap-tag-toggle
            v-if="isValid"
            type="expand"
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
        href: String,
        image: Object,
        type: String,
        text: String,
        theme: String,
        hasAlt: Boolean,
        alt: Boolean
    },

    computed: {
        isImage() {
            return this.type === 'image';
        },

        isValid() {
            return this.theme !== 'negative';
        }
    }
};
</script>

<style>
.k-tiptap-tag-item {
    display: flex;
    align-items: center;
    box-shadow: inset 0 0 1px 0 rgba(0 0 0 / 10%);
    border-radius: var(--rounded);
    background-color: light-dark(var(--color-gray-150), var(--color-gray-800));
    /* max-width: 50rem; */
    overflow: clip;

    &[data-theme='negative'] {
        background-color: light-dark(
            var(--theme-color-300),
            var(--theme-color-850)
        );

        figure {
            background-color: light-dark(
                var(--theme-color-350),
                var(--theme-color-800)
            );
        }

        svg {
            color: var(--theme-color-icon);
        }
    }

    a {
        display: flex;
        flex-grow: 1;

        figure {
            flex-shrink: 0;
            width: 2.25rem;
        }
    }

    span {
        flex-grow: 1;
        padding: 0.45rem;
        min-height: 2.25rem;
    }

    figure {
        width: 2.25rem;
        height: 2.25rem;
    }
}

.tiptap p:has(.k-tiptap-tag-item) + p:has(.k-tiptap-tag-item) {
    margin-block-start: calc(-1.5em + 2px) !important;
}
</style>
