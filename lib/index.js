import { directive as onClickOutside } from 'vue-on-click-outside';

import ContextMenu from './ContextMenu.vue';

let VueContextMenu = {
    /**
     * See ContextMenu.withOptions for a list of available options.
     */
    install(Vue, options) {
        Vue.component('context-menu', ContextMenu.withOptions(options));
        Vue.directive('on-click-outside', onClickOutside);
    },
};

export default VueContextMenu;
