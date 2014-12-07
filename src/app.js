var lib = require("./lib.js");

lib.doSomething();

try {
    lib.doSomethingElse();
} catch (e) {
    console.warn(e.message);
}