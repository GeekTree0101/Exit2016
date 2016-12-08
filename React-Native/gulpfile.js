var gulp = require("gulp"),
    watch = require("gulp-watch"),
    run = require("gulp-exec");

gulp.task("watch", function() {

    gulp.watch(["./app/**/*.scss"], ["stylesheet"]);
});

gulp.task("stylesheet", function() {

    return gulp.src("./")
        .pipe(run("react-native-css -i ./app/stylesheet/android.core.scss -o ./android.style.js"))

});