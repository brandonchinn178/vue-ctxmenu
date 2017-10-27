<template>
    <ul
        v-show="!cmHide"
        v-on-click-outside="hide"
        :class="classes"
        :style="position"
    >
        <slot></slot>
    </ul>
</template>

<script>
import _ from 'lodash';

export default {
    _isContextMenu: true,
    _bootstrap: false,
    /**
     * Available options:
     *   - {boolean} bootstrap - true to add basic styling
     */
    withOptions(options) {
        options = _.defaults(options, {
            bootstrap: false,
        });

        this._bootstrap = options.bootstrap;

        return this;
    },
    updated() {
        if (!this.initClick) {
            // Whenever <li> is clicked, hide context menu
            let menuItems = _.filter(this.$slots.default, ['tag', 'li']);
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
            this.$emit('hide');
        },
    },
    computed: {
        classes() {
            return {
                'vue-context-menu': true,
                'vue-context-menu-bootstrap': this.$options._bootstrap,
            };
        },
    },
};
</script>

<style lang="scss">
    .vue-context-menu {
        position: absolute;
        z-index: 10000;
        list-style: none;
        margin-top: 0;
        margin-bottom: 0;
        padding-left: 0;
    }

    $border-style: 1px solid #aaa;
    $background: #f6f6f6;
    .vue-context-menu-bootstrap {
        border: $border-style;
        background: $background;
        li {
            padding: 5px 10px;
            border-bottom: $border-style;
            cursor: pointer;
            &:hover {
                background: lighten($background, 1);
            }
            &:last-child {
                border-bottom: none;
            }
        }
    }
</style>
