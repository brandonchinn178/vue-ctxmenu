var path = require('path');
var fs = require('fs');
var compiler = require('vue-template-compiler');

var cmTemplatePath = path.resolve('./loader.js');
var cmTemplate = fs.readFile(cmTemplatePath);

/**
 * A loader for injecting a <context-menu> section into a Vue component.
 */
module.exports = function(source, map) {
    var renderCode = compiler.compile('<ul>' + source + '</ul>');
    var contextMenu = cmTemplate.replace('// RENDER CODE', renderCode.render);
    this.callback(null, contextMenu, map);
};
