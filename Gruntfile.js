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
                debug: true,
                fullPaths: false
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

    config.bump = {
        options: {
            //after bumping, update it so that the changelog task uses same version number
            updateConfigs: ['pkg'],

            // commit CHANGELOG.md as well
            commitFiles: ['package.json', 'CHANGELOG.md']
        }
    };

    grunt.initConfig(config);

    var tasks = [ "grunt-browserify", "grunt-contrib-clean", "grunt-exorcise", "grunt-contrib-copy",
        "grunt-contrib-connect", "grunt-bump", "grunt-conventional-changelog" ];
    
    for (var i = 0; i < tasks.length; i++) {
        grunt.loadNpmTasks(tasks[i]);
    }

    grunt.registerTask("default", ["clean", "browserify", "exorcise"]);
    grunt.registerTask("build", ["clean:build", "browserify:build", "exorcise:build", "copy:build"]);
    grunt.registerTask('notes', ['bump-only', 'changelog', 'bump-commit']);

};