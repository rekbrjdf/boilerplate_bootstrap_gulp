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
const merge = require('merge-stream');

// file locations
const buildFolder = './build';
const srcFolder = './src';
const options = {};
const indexFile = [
  
  `${srcFolder}/templates/components/*.html`, 
  `${srcFolder}/templates/components/**/*.html`, 
  `${srcFolder}/templates/pages/*.html`
];

const cssFiles = `${srcFolder}/styles/bootstrap.scss`;

const assestFiles = `${srcFolder}/assets/**/*`;

const handleError = err => {
  console.log(err.toString());
  this.emit('end');
};

// build files

const css_production = () => {
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
      .pipe(dest(`${buildFolder}/style`));
};

const css = () => {
  console.log("Build minified bootstrap");
  return src(cssFiles)
      .pipe(sourceMap.init())
      .pipe(sass())
      .pipe(prefix({
          cascade: false
      }))
      .pipe(cleanCSS({
          compatibility: "ie8"
      }))
      .pipe(rename("bootstrap.min.css"))
      .pipe(cssnano())
      .pipe(sourceMap.write("./"))
      .pipe(dest(`${buildFolder}/style`));
};

const scss_production = () => { 
  return src(cssFiles)
      .pipe(debug())
      .pipe(sass())
      .pipe(prefix({
          cascade: false
      }))
      .pipe(dest(`${buildFolder}/style`));
};

const html = () => {
  console.log("Building HTML in progress...");

  return merge(src(indexFile, {base:'src/templates'}), 
        src(`${srcFolder}/templates/*.html`, {base:'src/templates'})) 
        .pipe(rigger()).on('error', handleError)
        .pipe(dest(buildFolder))
};

const js = () => {
  console.log("Copy bootstrap javascript dependencies");
  return src([
          'node_modules/bootstrap/dist/js/bootstrap.js',
          'node_modules/jquery/dist/jquery.js',
          'node_modules/popper.js/dist/umd/popper.js'
        ])
        .pipe(dest(`${buildFolder}/js`));
};

const fonts = () => {
  console.log("Fetching woff fonts from google");
  return src(`${srcFolder}/assets/fonts/fonts.list`)
        .pipe(googleWebFonts(options))
        .pipe(debug())
        .pipe(dest(`${buildFolder}/fonts`));
};

const assets = () => {
  console.log("Copying assets from ./assets to dist");
  return src(assestFiles, {base:'src'})
        .pipe(dest(buildFolder));
};

const copy_img = () => {
  console.log("Copy img");
  return src([
            'node_modules/flag-icon-css/flags/4x3/*'
        ])
        .pipe(dest(`${buildFolder}/assets/img/flags/4x3/`));
};

//watch files
const watchCss = () => watch(`${srcFolder}/styles/**/*.{scss,sass}`, css);
const watchHtml = () => watch(indexFile, html);

// utils
const clean = () => del(buildFolder);

const devServer = () =>
  browserSync.init({
    server: `${buildFolder}`,
    files: [`${buildFolder}/**`]
  })

const buildProd = series(clean, parallel(fonts, html, scss_production, css_production, js, assets, copy_img))
const build = series(clean, parallel(fonts, html, scss_production, css, js, assets, copy_img))
const watchFiles = parallel(watchCss, watchHtml)

exports.default = buildProd
exports.buildProd = buildProd
exports.build = build
exports.watchProd = series(buildProd, parallel(devServer, watchFiles))
exports.watch = series(build, parallel(devServer, watchFiles))
