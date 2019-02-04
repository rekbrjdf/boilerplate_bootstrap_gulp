const { dest, src, series, parallel } = require('gulp')
const del = require('del')
const browserSync = require('browser-sync')
const watch = require('gulp-watch')

// file locations
const buildFolder = './build'
const srcFolder = './src'
const indexFile = `${srcFolder}/index.html`
const cssFiles = `${srcFolder}/styles/*.css`
const assestFiles = [
  `${srcFolder}/assets/*.ico`,
  `${srcFolder}/assets/*.svg`,
  `${srcFolder}/assets/*.jpg`,
  `${srcFolder}/assets/*.png`
]

// build files
const css = () => src(cssFiles).pipe(dest(buildFolder))
const html = () => src(indexFile).pipe(dest(buildFolder))
const assets = () => src(assestFiles).pipe(dest(buildFolder))

//watch files
const watchCss = () => watch(cssFiles, css)
const watchHtml = () => watch(indexFile, html)

// utils
const clean = () => del(buildFolder)
const devServer = () =>
  browserSync.init({
    server: buildFolder,
    files: [`${buildFolder}/**`]
  })

const build = series(clean, parallel(html, css, assets))
const watchFiles = parallel(watchCss, watchHtml)

exports.default = build
exports.build = build
exports.watch = series(build, parallel(devServer, watchFiles))
