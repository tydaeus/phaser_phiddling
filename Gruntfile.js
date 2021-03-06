module.exports = function(grunt) {

    var exec = require('child_process').exec;

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
            commitFiles: ['package.json', 'CHANGELOG.md'],

            // what remote to push changes to
            pushTo: "origin"
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
    grunt.registerTask('notes', ['bump-only', 'changelog', 'git-add', 'git-push']);

    grunt.registerTask("git-push", "pushes current branch to server", function() {
        var done = this.async();
        grunt.log.writeln("starting push");

        exec('git push origin && git push origin --tags', function(err, stdout, stderr) {
            if (err) {
                grunt.fatal('Can not push to origin:\n  ' + stderr);
                done(false);
            } else {
                grunt.log.ok('Pushed to origin');
                done();
            }
        });
    });

    grunt.registerTask("git-add", "stages changes in git", function() {
        var done = this.async();
        grunt.log.writeln("Staging changes in git");

        exec("git add package.json CHANGELOG.md", function(err, stdout, stderr) {
            if (err) {
                grunt.fatal("Could not stage changes:\n " + stderr);
                done(false);
            } else {
                grunt.log.ok("Changes staged");
                done();
            }
        });
    });

};