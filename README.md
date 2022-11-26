# Grid TinyMCE Plugin [![npm][npm-image]][npm-url]
[npm-image]: https://img.shields.io/npm/v/tinymce-plugin-codeblock.svg
[npm-url]: https://npmjs.org/package/tinymce-plugin-codeblock

This plugin allows you to use grid system in editor.

Supported css frameworks:
* Bootstrap 3
* Bootstrap 4
* Bootstrap 5
* Foundation CSS 5

## Demo

<a href="https://root913.github.io/tinymce-plugin-grid/demo/index.html">Demo</a>

## Installation

Just copy the contents of the  "dist" directory to plugins directory of your tinyMCE instalation.

See examples directories for more info.

## Useage

````
tinymce.init({
    selector: 'textarea',
    plugins: [
        'grid'
    ],
    toolbar: 'grid_insert',
    grid_preset: 'Bootstrap3'
});
````