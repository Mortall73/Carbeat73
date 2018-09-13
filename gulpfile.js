'use strict';

let gulp = require("gulp"),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    mmq = require('gulp-merge-media-queries'),
    del = require('del');

const paths = {
    "html": "./*.html",
    "mainScss": "./scss/main.scss",
    "scss": "./scss/*.scss",
    "css": "./styles/"
};
const buldPaths = {
    "html": "./*.html",
    "css": "./styles/**/*.css",
    "images": "./images/**/*.*",
    "fonts": "./fonts/**/*.*",
    "js": "./js/**/*.js",
    "vendors": "./vendors/**/*.*"
}
gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: "./"
        },
        port: 8080,
        open: true,
        notify: false
    });
});

gulp.task('sass', function() {
    gulp.src(paths.mainScss)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 10 versions'],
        cascade: false
    }))
    .pipe(mmq({
        log: true
    }))
    .pipe(concat("all.css"))
    .pipe(gulp.dest(paths.css))
    .pipe( reload({ 
        stream: true 
    }) );
});

gulp.task('html', function() {
    gulp.src(paths.html)
    .pipe(reload({
        stream:true
    }));
});

gulp.task('watcher', function() {
    gulp.watch(paths.scss, ['sass']);
    gulp.watch(paths.html, ['html']);
});

gulp.task('default', ['watcher', 'browserSync']);

gulp.task('build', function() {
    //удалинеи папки перед новым созданием
    del("build").then(path => {
        console.log('Удаление директории:', path);
        gulp.src(buldPaths.html).pipe(gulp.dest("./build/"));
        gulp.src(buldPaths.css).pipe(gulp.dest("./build/styles/"));
        gulp.src(buldPaths.fonts).pipe(gulp.dest("./build/fonts/"));
        gulp.src(buldPaths.images).pipe(gulp.dest("./build/images/"));
        gulp.src(buldPaths.js).pipe(gulp.dest("./build/js/"));
        gulp.src(buldPaths.vendors).pipe(gulp.dest("./build/vendors/"));
        console.log('Создание новой директории:', path);
    });
    
});