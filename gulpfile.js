// adapt code and on top of Chart.js

var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var insert = require('gulp-insert');
var streamify = require('gulp-streamify');
var replace = require('gulp-replace');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var collapse = require('bundle-collapser/plugin');
var package = require('./package.json');
var karma = require('gulp-karma');
var argv = require('yargs').argv;
var jsdoc = require('gulp-jsdoc3');

var srcDir = './src/';
var outDir = './dist/';

var header = "/*!\n" +
	" * Playbasis.js\n" +
	" * https://www.playbasis.com/\n" +
	" * Version: {{ version }}\n" +
	" *\n" +
	" * Copyright 2016 Wasin Thonkaew\n" +
	" * Released under the MIT license\n" +
	" * https://github.com/playbasis/native-sdk-js/blob/master/LICENSE.md\n" +
	" */\n";

var preTestFiles = [
];

var testFiles = [
	'./test/*.js'
];

/**
 * Tasks
 */
gulp.task('build', buildTask);
gulp.task('unittest', unittestTask);
gulp.task('unittestFull', unittestFullTask);
gulp.task('doc', docTask);

function startTest() {
	return [].concat(preTestFiles).concat([
			'./src/**/*.js',
			'./test/mockContext.js'
		]).concat(
			argv.inputs?
			argv.inputs.split(';'):
			testFiles
		);
}

function unittestTask() {
	return gulp.src(startTest())
		.pipe(karma({
			configFile: 'karma.conf.fast.js',
			action: 'run'
		}));
}

function unittestFullTask() {
	return gulp.src(startTest())
		.pipe(karma({
			configFile: 'karma.conf.js',
			action: 'run'
		}));
}

function buildTask() {
	var bundled = browserify('./src/playbasis.js', { standalone: 'Playbasis' })
		.plugin(collapse)
		.bundle()
		.pipe(source('Playbasis.js'))
		.pipe(insert.prepend(header))
		.pipe(streamify(replace('{{ version }}', package.version)))
		.pipe(gulp.dest(outDir))
		.pipe(streamify(uglify()))
		.pipe(insert.prepend(header))
		.pipe(streamify(replace('{{ version }}', package.version)))
		.pipe(streamify(concat('Playbasis.min.js')))
		.pipe(gulp.dest(outDir));

	return bundled;
}

function docTask(cb) {
	gulp.src(['README.md', './src/**/*.js'], {read: false})
		.pipe(jsdoc(cb));
}