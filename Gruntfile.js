module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        versionIdentifier: '###ver###',
        banner: '// Measurement v<%= pkg.version %>\n' +
                '',

        sourcePath: 'src/',
        sourceFragments: [
            'unit-types.js',
            'units.js',
            'compound-units.js',
            'measurement.js',
            'factory.js',
        ],

        build: {
            debug: './build/out/measurement.js',
            min: './build/out/measurement.min.js'
        },
    });

    function getSource() {
        var src = grunt.config('sourcePath');
        var sources = [];
        
        var combinedSources = sources
            .concat(grunt.config('sourceFragments'))
            .map(function(filename) {
                return grunt.file.read('./' + grunt.config('sourcePath') + filename);
            }).join('');

        return combinedSources.replace(grunt.config('versionIdentifier'), grunt.config('pkg.version'));
    }

    function buildDebug(out) {
        var source = '';

        source += grunt.config('banner');
        source += '(function() {\n';
        source += getSource();
        source += '})();\n';

        grunt.file.write(out, source.replace(/\r\n/g, '\n'));
    }

    function buildMin(out, done) {
        var compiler = require('closure-compiler');
        var options = {
            compilation_level: 'ADVANCED_OPTIMIZATIONS',
            output_wrapper: '(function() {%output%})();'
        };

        compiler.compile(getSource(), options, function(err, stdout, stderr) {
            if (err) {
                grunt.log.error(err);
                done(false);
            } else {
                grunt.log.ok();
                grunt.file.write(out, (grunt.config('banner') + stdout).replace(/\r\n/g, '\n'));
                done(true);
            }
        });
    }

    grunt.registerMultiTask('build', 'Build', function() {
        if (!this.errorCount) {
            var output = this.data;

            switch (this.target) {

                case 'min':
                    buildMin(output, this.async());
                    break;

                case 'debug':
                    buildDebug(output);
                    break;
            }
        }

        return !this.errorCount;
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['build']);
}
