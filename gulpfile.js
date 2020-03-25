const { dest, src, series, parallel } = require('gulp');
const del = require('del');
const rigger = require('gulp-rigger');
const browserSync = require('browser-sync');
const watch = require('gulp-watch'); 
const replace = require('gulp-string-replace');
const sass = require("gulp-sass");
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");
const prefix = require("gulp-autoprefixer");
const sourceMap = require("gulp-sourcemaps");
const googleWebFonts = require("gulp-google-webfonts");
const cssnano = require('gulp-cssnano');
const gulpCopy = require('gulp-copy'); 
const debug = require('gulp-debug');

// file locations
const buildFolder = './build';
const srcFolder = './src';
const options = {};
const indexFile = [
  `${srcFolder}/src/*.html`, 
  `${srcFolder}/src/components/*.html`, 
  `${srcFolder}/src/components/**/*.html`, 
  `${srcFolder}/src/pages/*.html`
];

const cssFiles = `${srcFolder}/styles/bootstrap.scss`;

const assestFiles = `${srcFolder}/assets/**/*`;

const handleError = err => {
  console.log(err.toString());
  this.emit('end');
};

// build files

const css = () => {
  console.log("Build minified bootstrap");
  return src(cssFiles)
      .pipe(sourceMap.init())
      .pipe(sass())
      .pipe(replace('/assets/img', '/assets/bootstrap-compiled/assets/img'))
      .pipe(prefix({
          cascade: false
      }))
      .pipe(cleanCSS({
          compatibility: "ie8"
      }))
      .pipe(rename("bootstrap.min.css"))
      .pipe(cssnano())
      .pipe(sourceMap.write("./"))
      .pipe(dest(`${buildFolder}/src/style`));
};

const html = () => {
  console.log("Building HTML in progress...");

  return src(indexFile, {base:'src'})
        .pipe(rigger()).on('error', handleError)
        .pipe(dest(buildFolder));
};

const js = () => {
  console.log("Copy bootstrap javascript dependencies");
  return src([
          'node_modules/bootstrap/dist/js/bootstrap.js',
          'node_modules/jquery/dist/jquery.js',
          'node_modules/popper.js/dist/umd/popper.js'
        ])
        .pipe(dest(`${buildFolder}/src/js`));
};

const fonts = () => {
  console.log("Fetching woff fonts from google");
  return src(`${srcFolder}/assets/fonts/fonts.list`)
        .pipe(googleWebFonts(options))
        .pipe(debug())
        .pipe(dest(`${buildFolder}/src/fonts`));
};

const assets = () => {
  console.log("Copying assets from ./assets to dist");
  return src(assestFiles)
        .pipe(gulpCopy(buildFolder));
};

const copy_img = () => {
  console.log("Copy img");
  return src([
            'node_modules/flag-icon-css/flags/4x3/*'
        ])
        .pipe(dest(`${buildFolder}/src/assets/img/flags/4x3/`));
};

//watch files
const watchCss = () => watch(`${srcFolder}/styles/**/*.{scss,sass}`, css);
const watchHtml = () => watch(indexFile, html);

// utils
const clean = () => del(buildFolder);

const devServer = () =>
  browserSync.init({
    server: `${buildFolder}/src`,
    files: [`${buildFolder}/**`]
  })

const build = series(clean, parallel(html, css, js, assets, copy_img))
const watchFiles = parallel(watchCss, watchHtml)

exports.default = build
exports.build = build
exports.watch = series(build, parallel(devServer, watchFiles))
