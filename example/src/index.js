import Vue from 'vue';
import VueContextMenu from 'vue-ctxmenu';

import MyComponent from './MyComponent.vue';

Vue.use(VueContextMenu);

// let App = Vue.extend(MyComponent);
let App = Vue.extend({
    components: {MyComponent},
    template: '<div><my-component/><my-component/></div>'
});
new App({
    el: '#app',
});
