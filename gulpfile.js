const { series, parallel } = require('gulp')
const gulp = require('gulp')
const concat = require('gulp-concat')
const cssmin = require('gulp-cssmin')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
const image = require('gulp-imagemin')
const stripJs = require('gulp-strip-comments')
const stripCss = require('gulp-strip-css-comments')
const htmlmin = require('gulp-htmlmin')
const babel = require('gulp-babel')
const browserSync = require('browser-sync').create()
const SASS = require('gulp-sass')(require('node-sass'))
const { pipe } = require('stdout-stream')
const { contains } = require('jquery')
const reload = browserSync.reload

function tarefasCSS(cb) {

    gulp.src([
        './node_modules/bootstrap/dist/css/bootstrap.css',
        './node_modules/@fortawesome/fontawesome-free/css/fontawesome.css',
        './vendor/jquery-ui/jquery-ui.css',
    ])
        .pipe(stripCss())                  //remove comentários
        .pipe(concat('libs.css'))        //mescla arquivos
        .pipe(cssmin())                    //unifica css
        .pipe(rename({ suffix: '.min' }))   //renomeia para libs.min.css / como ficará o novo "name"
        .pipe(gulp.dest('./dist/css'))     //cria em um novo diretorio
    cb()

}
function tarefasSASS(cb) {
    
    gulp.src('./src/scss/**/*.scss')
        .pipe(SASS()) // transforma o sass para css
        .pipe(gulp.dest('./dist/css')) 

    cb()
}
function tarefasJS(callback) {
    gulp.src([
        './node_modules/jquery/dist/jquery.js',
        './node_modules/bootstrap/dist/js/bootstrap.js',
        './node_modules/@fortawesome/fontawesome-free/js/fontawesome.js',
        // './vendor/owl/js/owl.js',
        './vendor/jquery_mask/jquery.mask.js',
        // './vendor/jquery-ui/jquery-ui.js',
        './src/js/custom.js',
    ])
        .pipe(babel({
            comments: false,
            presets: ['@babel/env']
        }))                    //remove comentários
        .pipe(concat('scripts.js'))         //mescla arquivos
        .pipe(uglify())                     //unifica js
        .pipe(rename({ suffix: '.min' }))    //renomeia para scripts.min.js
        .pipe(gulp.dest('./dist/js'))       //cria em um novo diretorio

    return callback()
}
function tarefasImagem(callback) {
    gulp.src('./src/images/**/*')
        .pipe(image({
            pngquant: true,
            optipng: false,
            zopflipng: true,
            jpegRecompress: false,
            mozjpeg: true,
            gifsicle: true,
            svgo: true,
            concurrent: 10,
            quiet: true
        }))
        .pipe(gulp.dest('./dist/images'))
    return callback()
}
// POC - Proof of Concept
function tarefasHTML(callback) {

    gulp.src('./src/**/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./dist'))

    return callback()

}
gulp.task('server', function () {

    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    })
    gulp.watch('./src/**/*').on('change', process) //repete o processo quando alterar algo em src
    gulp.watch('./src/**/*').on('change', reload)

})

function end(cb) {
    console.log("Tarefas finalizadas")
    return cb()
}

const process = series(tarefasHTML, tarefasJS, tarefasCSS, tarefasImagem, tarefasSASS, end)

exports.styles = tarefasCSS
exports.scripts = tarefasJS
exports.images = tarefasImagem
exports.SASS = tarefasSASS


exports.default = process