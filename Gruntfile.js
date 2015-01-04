module.exports = function(grunt) {

    var config = {};

    config.pkg = grunt.file.readJSON("package.json");

    config.clean =  {
        build : {
            src: ["build/", "temp/"]
        }
    };

    config.browserify = {
        build : {
            src: "src/app.js",
            dest: "build/js/main.js"
        },
        options: {
            watch: true,
            keepAlive: false,
            browserifyOptions: {
                debug: true
            }
        }
    };

    config.exorcise = {
        build: {
            files : {
                "build/js/main.js.map" : ["build/js/main.js"]
            }
        }
    };

    config.copy = {
        html: {
            src: ["**/*.html"],
            expand: true,
            dest: "build/",
            cwd: "html/"
        },
        jsLibs: {
            src: ["phaser*"],
            expand: true,
            dest: "build/js/lib",
            cwd: "bower_components/phaser/build"
        }
    };

    config.copy.build = {
        files : [
            config.copy.html,
            config.copy.jsLibs
        ]
    };

    config.connect = {
        build: {

        },
        options: {
            keepalive: true,
            base: "build"
        }
    };

    grunt.initConfig(config);

    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-exorcise");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-connect");

    grunt.registerTask("default", ["clean", "browserify", "exorcise"]);
    grunt.registerTask("build", ["clean:build", /*"copy:libs",*/ "browserify:build", "exorcise:build", "copy:build"]);

};