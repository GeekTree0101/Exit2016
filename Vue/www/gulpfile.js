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
    runSequence = require("run-sequence"),
    watch = require("gulp-watch"),
    livereload = require('gulp-livereload');
/**
 *   Watch Task Section
 */

gulp.task("watch", function() {

    livereload.listen();
    gulp.watch(["./app/**/*.js"], ["Vue:build"]);
    gulp.watch(["./app/**/*.vue"], ["Vue:build"]);
    gulp.watch(["./app/**/*.scss"], ["Vue:view"]);
})

/**
 *  Group Task Section
 */

gulp.task("Vue:start", function() { //App start

    return runSequence(["Vue:view", "Vue:build"], ["watch"]);

});

gulp.task("Vue:clean", function() { // All clean

    return runSequence(["cleanApp"]);
});

gulp.task("Vue:build", function() { // Gulp Module for ReactJS

    return runSequence(["webPack"]);

});

gulp.task("Vue:view", function() { // Gulp Module for AngularJS2

    return runSequence("sassBuild");

});


/**
 *  Unit Task Section 
 */


gulp.task("sassBuild", function(done) {

    return gulp.src("./css/styles.scss")
        .pipe(sassBuilder({}))
        .pipe(gulp.dest(function(file) {
            return file.base; //SVuee at present dir
        }))
        .pipe(livereload());

})


gulp.task("webPack", function(done) {

    return gulp.src("./")
        .pipe(run("npm run build"))
        .pipe(livereload());
})