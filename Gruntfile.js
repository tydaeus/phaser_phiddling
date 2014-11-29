module.exports = function(grunt)     {

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        clean: {
            build : {
                src: "build/"
            }
        }
    });

    grunt.loadNpmTasks(/*"grunt-browserify",*/ "grunt-contrib-clean");

    grunt.registerTask("foo", ["clean:build"]);
};