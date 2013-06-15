/*
 * grunt-migrate
 * Grunt task that wraps the NODE-MIGRATE module (https://github.com/visionmedia/node-migrate).
 *
 * Copyright (c) 2013 Travis McHattie, contributors
 * Licensed under the MIT license.
 * https://git.thinksolid.com/travis.mchattie/grunt-migrate/blob/master/LICENSE-MIT
 */

'use strict';

module.exports = function(grunt) {
    var _ = grunt.util._,
        methods = [],
        options = null,
        migrateBinPath = null;


    /**
     * Helper method to interface with the migrate bin file.
     * @param cmd Command that is going to be executed.
     */
    function run(cmd){

        var proc = require('child_process'),
            done = grunt.task.current.async(); // Tells Grunt that an async task is complete

        proc.exec(cmd,
            function(error, stdout, stderr){
                if(stderr){
                    grunt.log.writeln('ERROR: ' + stderr).error();
                }
                grunt.log.writeln(stdout);
                done(error);
            }
        );
    }

    /**
     * Migrate UP to either the latest migration file or to a migration name passed in as an argument.
     */
    function up(){
        console.log(grunt.target);
        var key = (grunt.option('name') || ""),
            label = ( key || "EMPTY"),
            cmd = (migrateBinPath + " up " + key).trim();

        grunt.log.write('Running migration "UP" [' + label + ']...').ok();
        run(cmd);
    }

    /**
     * Migrate DOWN to either the latest migration file or to a migration name passed in as an argument.
     */
    function down(){
        var key = (grunt.option('name') || ""),
            label = ( key || "EMPTY"),
            cmd = (migrateBinPath + " down " + key).trim();

        grunt.log.write('Running migration "DOWN" [' + label + ']...').ok();
        run(cmd);
    }

    /**
     * Migrate CREATE will create a new migration file.
     */
    function create(){
        var cmd = (migrateBinPath + " create " + grunt.option('name')).trim();

        grunt.log.write('Creating a new "MIGRATION" named "' + grunt.option('name') + '"...').ok();
        run(cmd);
    }

    grunt.registerMultiTask('migrate', 'Execute Migration Command', function() {

        options = this.options({
            directory : "./migrate",
            binaryPath : "./migrate"
        });

        migrateBinPath = options.binaryPath;

        methods.up = up;
        methods.down = down;
        methods.create = create;
        methods[this.target]();
    });
};