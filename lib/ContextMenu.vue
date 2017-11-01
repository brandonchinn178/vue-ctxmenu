<template>
    <ul
        v-show="!cmHide"
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
    mounted() {
        document.body.appendChild(this.$el);
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
            listener: null,
        };
    },
    methods: {
        open(e) {
            // click off of any existing context menus
            if (this.cmHide) {
                document.documentElement.click();
            }

            this.cmHide = false;
            this.position.left = e.pageX;
            this.position.top = e.pageY;

            // register click off
            if (_.isNull(this.listener)) {
                this.listener = e => {
                    if (!this.$el.contains(e.target)) {
                        this.hide();
                    }
                };
                document.documentElement.addEventListener('click', this.listener, false);
            }
        },
        hide() {
            this.cmHide = true;

            // unregister click off
            document.documentElement.removeEventListener('click', this.listener, false);
            this.listener = null;

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
