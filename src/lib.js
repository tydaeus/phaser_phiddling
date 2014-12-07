
function doSomething() {
    console.info("something done");
}

function doSomethingElse() {
    throw new Error("unable to do something else");
    console.info("Something else done");
}

console.info("lib.js loaded");

exports.doSomething = doSomething;
exports.doSomethingElse = doSomethingElse;