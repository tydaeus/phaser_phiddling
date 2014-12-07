module.exports = function(grunt)     {

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        clean: {
            build : {
                src: "build/"
            }
        },
        browserify: {
            build : {
                src: "src/app.js",
                dest: "build/main.js"
            },
            options: {
                watch: true,
                keepAlive: true
            }
        }
    });

    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks("grunt-contrib-clean");

    //grunt.registerTask("foo", ["clean"]);
    grunt.registerTask("default", ["clean", "browserify"]);
};