<template>
    <ul
        v-show="!cmHide"
        v-on-click-outside="hide"
        class="vue-context-menu"
        :style="position"
    >
        <slot></slot>
    </ul>
</template>

<script>
import _ from 'lodash';

export default {
    _isContextMenu: true,
    updated() {
        if (!this.initClick) {
            // Whenever <li> is clicked, hide context menu
            let menuItems = _.filter(this.$slots.default, ["tag", "li"]);
            _.each(menuItems, node => {
                let callbacks = node.data.on.click.fns;
                if (!_.isArray(callbacks)) {
                    callbacks = [callbacks];
                    node.data.on.click.fns = callbacks;
                }
                callbacks.push($event => this.hide());
            });
            this.initClick = true;
        }
    },
    data() {
        return {
            initClick: false,
            cmHide: true,
            position: {
                left: null,
                top: null,
            },
        };
    },
    methods: {
        open(e) {
            this.cmHide = false;

            // left/top relative to parent
            let box = this.$parent.$el.getBoundingClientRect();
            this.position.left = e.clientX - box.left;
            this.position.top = e.clientY - box.top;

            // TODO: smart position
        },
        hide() {
            this.cmHide = true;
        },
    },
};
</script>

<style>
    .vue-context-menu {
        position: absolute;
        z-index: 10000;
        margin: 0;
        padding: 0;
        background: white;
    }
</style>
