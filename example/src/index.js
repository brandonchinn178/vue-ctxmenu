import Vue from 'vue';
import VueContextMenu from 'vue-ctxmenu';

import MyComponent from "./MyComponent.vue";

Vue.use(VueContextMenu);

let App = Vue.extend(MyComponent);
new App({
    el: "#app",
});
