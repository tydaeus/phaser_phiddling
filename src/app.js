var lib = require("./lib.js");
var phaser = global.Phaser;

lib.doSomething();

try {
    lib.doSomethingElse();
} catch (e) {
    console.warn(e.message);
}

console.info("phaser is object: ", phaser instanceof Object);