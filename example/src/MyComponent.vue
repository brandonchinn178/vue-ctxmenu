<template>
    <p @contextmenu.prevent="this.contextMenu.open($event)">Right click here</p>
</template>

<context-menu>
    <li v-if="foo" @click="doFoo">Foo</li>
    <li @click="doBar">Bar</li>
</context-menu>

<script>
export default {
    data: {
      foo: true,
    },
    methods: {
        doFoo: function() {
            console.log("foo");
        },
        doBar: function() {
            console.log("bar");
        },
    },
}
</script>

<style lang="scss">
    .vue-context-menu {
        list-style: none;
        li {
            cursor: pointer;
        }
    }
</style>
