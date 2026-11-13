import TiptapTagView from './components/TiptapTagView.vue';

window.kirbyTiptap ??= {};
window.kirbyTiptap.registry ??= { extensions: [], buttons: [], shortcuts: [] };

window.kirbyTiptap.registry.extensions.push({
    name: 'kirbytag',

    create({ tiptap, field, extensions }) {
        return extensions.kirbytag.extend({
            addOptions() {
                return {
                    ...this.parent?.(),
                    field
                };
            },

            addNodeView() {
                return tiptap.vue3.VueNodeViewRenderer(TiptapTagView);
            }
        });
    }
});

/**
 * Icons for alt text check in <k-tiptap-tag-alt />
 */
panel.plugin('hananils/tiptap-tags', {
    icons: {
        'alt-checked':
            '<path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM17.4571 9.45711L11 15.9142L6.79289 11.7071L8.20711 10.2929L11 13.0858L16.0429 8.04289L17.4571 9.45711Z"></path>',
        'alt-missing':
            '<path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 15V17H13V15H11ZM11 7V13H13V7H11Z"></path>'
    }
});
