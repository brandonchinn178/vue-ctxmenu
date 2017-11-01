import ContextMenu from './ContextMenu.vue';

let VueContextMenu = {
    /**
     * See ContextMenu.withOptions for a list of available options.
     */
    install(Vue, options) {
        Vue.component('context-menu', ContextMenu.withOptions(options));
    },
};

export default VueContextMenu;
