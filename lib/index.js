import { directive as onClickOutside } from "vue-on-click-outside";

import ContextMenu from './ContextMenu.vue';

let VueContextMenu = {
    install(Vue, options) {
        Vue.component('context-menu', ContextMenu);
        Vue.directive('on-click-outside', onClickOutside);
    },
};

export default VueContextMenu;
