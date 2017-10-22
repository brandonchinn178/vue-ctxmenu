# Vue Context Menu

A node module that implements context menus in Vue using custom blocks.

## Background

In making my Vue project, I wanted to be able to create custom context menus
(right-click menus) without putting it into the template. To me, a context menu
is relevant to the entire component and shouldn't actually go into the template.
So I wanted to use a custom block to specify a context menu for the component as
a whole.

However, there were no libraries available to specify context menus in a custom
block; they always needed to be in the template, referenced by the `ref` keyword.
This project attempts to solve this.

I also did not like the default styling of other implementations' context menus,
so apart from the bare minimum to make context menus work, there is no styling
on the context menu.

## Installation

`npm install vue-ctxmenu --save-dev`

## Usage

See the `example/` directory.

Basically, you need to run the following steps:
1. In your main entrypoint: `Vue.use(VueContextMenu)`
2. Add `"context-menu": require('vue-ctxmenu/loader')` to your webpack config
3. Style the `.vue-context-menu` class
4. Add a `<context-menu>` block in any `.vue` file
