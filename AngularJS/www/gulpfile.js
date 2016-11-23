/**
 * 
 *    AngularJS2 X Vert.X gulp build system
 *    
 *    provider : Ha Hyeonsu
 *    update : 2016.11.23
 * 
 *    copyright(c) 2016 MIRO internet of things team
 */



/**
 *  Import Gulp module
 * 
 */
var gulp = require("gulp"),
    sassBuilder = require("gulp-sass"),
    run = require("gulp-exec"),
    jadeBuild = require('gulp-jade'),
    runSequence = require("run-sequence"),
    watch = require("gulp-watch"),
    remove = require("del"),
    flatten = require("gulp-flatten");
/**
 *   Watch Task Section
 */

gulp.task("watch", function() {

    gulp.watch(["./app/**/*.ts"], ["AV:build"]);
    gulp.watch(["./app/**/*.scss"], ["AV:view"]);
    gulp.watch(["./app/**/*.jade"], ["AV:view"]);
})

/**
 *  Group Task Section
 */

gulp.task("AV:start", function() { //App start

    return runSequence(["AV:view", "AV:build"], ["watch"]);

});

gulp.task("AV:clean", function() { // All clean

    return runSequence(["cleanApp"]);
});

gulp.task("AV:build", function() { // Gulp Module for ReactJS

    return runSequence(["webPack"]);

});

gulp.task("AV:view", function() { // Gulp Module for AngularJS2

    return runSequence(["sassBuild", "jadeBuild"]);

});


/**
 *  Unit Task Section 
 */


gulp.task("sassBuild", function(done) {

    return gulp.src("./css/styles.scss")
        .pipe(sassBuilder({}))
        .pipe(gulp.dest(function(file) {
            return file.base; //Save at present dir
        }))

})


gulp.task("webPack", function(done) {

    return gulp.src("./js")
        .pipe(run("webpack"));
})

gulp.task('jadeBuild', function() {
    gulp.src('app/**/*.jade')
        .pipe(jadeBuild({}))
        .pipe(flatten()) // remove dir
        .pipe(gulp.dest('template'));
});


gulp.task("cleanApp", function(done) {

    remove("./js/app.bundle.js");
    remove("./css/styles.css");
    remove("./template/*");

    return "done";
})