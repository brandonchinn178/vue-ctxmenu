module.exports = function(Component) {
    var mixin = {
        created: function() {
            this.contextMenu = null;
        },
        mounted: function() {
            this.contextMenu = this.$children.find(function(child) {
                return child.$options._isContextMenu;
            });
        },
    };

    Component.options.mixins = [mixin].concat(Component.options.mixins || []);

    var oldRender = Component.options.render;
    Component.options.render = function(h) {
        function getContents() {
            // RENDER CODE
        }
        var contents = getContents.call(this);
        return h('div', [
            h('context-menu', contents.children),
            oldRender.call(this, h),
        ]);
    };
};
