module.exports = function(grunt) {

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
                dest: "build/js/main.js"
            },
            options: {
                watch: true,
                keepAlive: false,
                // this depends on the browser and browserify-shim config vars in package.json
                transform: ["browserify-shim"],
                browserifyOptions: {
                    debug: true
                }
            }
        },
        exorcise: {
            build: {
                files : {
                    "build/js/main.js.map" : ["build/js/main.js"]
                }
            }
        },
        copy: {
            build: {
                src : ["**/*.html"],
                expand: true,
                dest: "build/",
                cwd : "html/"
            }
        },
        connect: {
            build: {

            },
            options: {
                keepalive: true,
                base: "build"
            }
        }
    });

    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-exorcise");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-connect");

    grunt.registerTask("default", ["clean", "browserify", "exorcise"]);
    grunt.registerTask("build", ["clean:build", "browserify:build", "exorcise:build", "copy:build"]);
};