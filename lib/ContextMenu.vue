<template>
    <ul
        v-if="!cmHide"
        v-on-click-outside="hide"
        class="vue-context-menu"
        :style="position"
    >
        <slot></slot>
    </ul>
</template>

<script>
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
            let offset = $(this.$parent.$el).offset();
            this.position.left = e.pageX - offset.left;
            this.position.top = e.pageY - offset.top;

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
    }
</style>
