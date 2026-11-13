<template>
    <k-tiptap-tag-view
        as="span"
        class="tiptap-kirbytag"
        :title="tag.title"
        data-drag-handle
        @mousedown="select"
        @click="edit"
    >
        <k-tiptap-tag-card
            v-if="isValid && isSingle && isImage && layout === 'cards'"
            v-bind="tag.props"
            :item="item"
            :hasAlt="hasAlt"
            :alt="!emptyAlt"
            tabindex="-1"
            draggable="false"
            @toggle="onToggle"
        />
        <k-tiptap-tag-item
            v-else-if="isSingle && isReference"
            v-bind="tag.props"
            :type="type"
            :hasAlt="isImage && hasAlt"
            :alt="!emptyAlt"
            tabindex="-1"
            draggable="false"
            @toggle="onToggle"
        />
        <k-tiptap-tag-inline
            v-else
            v-bind="tag.props"
            :href="tag.link"
            tabindex="-1"
            draggable="false"
        >
            <template v-if="$slots.default" #default><slot /></template>
        </k-tiptap-tag-inline>
    </k-tiptap-tag-view>
</template>

<script>
import { toRaw } from 'vue';
import { NodeViewWrapper, nodeViewProps } from '@tiptap/vue-3';
import TiptapTagCard from './TiptapTagCard.vue';
import TiptapTagItem from './TiptapTagItem.vue';
import Pill from '@kirby-tiptap/components/Pill.vue';
import { pill, target } from '@kirby-tiptap/utils/pill.ts';
import {
    parseKirbyTag,
    generateKirbyTag
} from '@kirby-tiptap/utils/kirbyTags.ts';

export default {
    components: {
        'k-tiptap-tag-view': NodeViewWrapper,
        'k-tiptap-tag-card': TiptapTagCard,
        'k-tiptap-tag-item': TiptapTagItem,
        'k-tiptap-tag-inline': Pill
    },

    props: nodeViewProps,

    computed: {
        tag() {
            const { endpoints, kirbytagAttributes } = this.extension.options;

            return pill(
                this.node.attrs.text,
                endpoints.model,
                kirbytagAttributes
            );
        },

        data() {
            return parseKirbyTag(this.node.attrs.text);
        },

        type() {
            return this.data['_type'];
        },

        isValid() {
            return this.tag.props.theme !== 'negative';
        },

        isImage() {
            return this.type === 'image';
        },

        isFile() {
            return this.type === 'file';
        },

        isPage() {
            return (
                this.type === 'link' && this.data.href?.startsWith('page://')
            );
        },

        isReference() {
            return this.isImage || this.isFile || this.isPage;
        },

        isSingle() {
            const pos = this.getPos();

            if (typeof pos !== 'number') {
                return null;
            }

            const $pos = this.editor.state.doc.resolve(pos);
            const paragraph = $pos.parent;

            if (paragraph.type.name !== 'paragraph') {
                return null;
            }

            return paragraph.childCount === 1 ? true : null;
        },

        layout() {
            if (this.isImage) {
                return this.data['_layout'] ?? this.extension.options.layout;
            }

            return 'list';
        },

        hasAlt() {
            const fields = this.extension.options.field?.files?.fields;

            return fields ? Object.keys(fields).includes('alt') : false;
        },

        emptyAlt() {
            return (
                !Object.keys(this.data).includes('alt') ||
                this.data.alt?.length === 0
            );
        }
    },

    data() {
        return {
            item: null,
            missing: false
        };
    },

    watch: {
        'node.attrs.text': {
            immediate: true,
            async handler(text) {
                if (!text || !this.isReference) {
                    return;
                }

                const { endpoints, kirbytagAttributes, layout } =
                    this.extension.options;
                let file = null;
                let item = null;

                file = target(text, endpoints.model, kirbytagAttributes);

                item =
                    (await this.$helper.items(file.endpoint, file.id, {
                        layout: 'cards',
                        image: JSON.stringify({ cover: false })
                    })) ?? null;

                if (this.node.attrs.text === text) this.item = item;
            }
        }
    },

    methods: {
        select() {
            this.editor
                .chain()
                .setNodeSelection(this.getPos())
                .focus(undefined, { scrollIntoView: false })
                .run();
        },

        edit(event) {
            if (event.metaKey || event.ctrlKey || event.shiftKey) return;
            event.preventDefault();
            this.editor
                .chain()
                .setNodeSelection(this.getPos())
                .editKirbytag()
                .run();
        },

        onToggle(event) {
            const { uuid, _type, _layout, ...attributes } = this.data;

            if (!_layout) {
                attributes['_layout'] =
                    this.layout === 'cards' ? 'list' : 'cards';
            }

            this.updateAttributes({
                text: generateKirbyTag('image', uuid, attributes)
            });

            this.select();
        }
    }
};
</script>

<style>
.tiptap-kirbytag {
    position: relative;
}

.tiptap-kirbytag .k-tiptap-tag {
    width: 100%;
}

.ProseMirror-focused .ProseMirror-selectednode .k-tiptap-tag,
:root:has(.k-dialog) .ProseMirror-selectednode .k-tiptap-tag {
    outline: var(--outline);
}

.tiptap span:has(.k-tiptap-tag) + .ProseMirror-trailingBreak {
    float: right;
}

.k-tiptap-tag a span {
    display: flex;
}
</style>
