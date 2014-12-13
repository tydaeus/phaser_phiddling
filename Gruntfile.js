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
                keepAlive: false,
                browserifyOptions: {
                    debug: true
                }
            }
        },
        exorcise: {
            build: {
                files : {
                    "build/main.js.map" : ["build/main.js"]
                }
            }
        }
    });

    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-exorcise");

    //grunt.registerTask("foo", ["clean"]);
    grunt.registerTask("default", ["clean", "browserify", "exorcise"]);
    grunt.registerTask("build", ["clean:build", "browserify:build", "exorcise:build"]);
};