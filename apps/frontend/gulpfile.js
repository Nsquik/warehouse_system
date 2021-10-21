import gulp from 'gulp';
import postcss from 'gulp-postcss';
import cssnano from 'cssnano';
import terser from 'gulp-terser';
import browsersync from 'browser-sync';
import concat from 'gulp-concat';
import { createProxyMiddleware } from 'http-proxy-middleware';

const apiProxy = createProxyMiddleware('/api', {
  target: 'http://localhost:8080/',
  changeOrigin: true,
});

const paths = {
  scripts: {
    src: 'app/js/*.js',
    dest: 'dist/scripts/',
    all: 'app/js/**/*.js',
  },
  css: {
    main: 'app/css/main.css',
    src: 'app/css/*.css',
    dest: 'dist/styles/',
    all: 'app/css/**/*.css',
  },
  html: {
    baseDir: 'app/pages/',
    src: 'app/pages/*.html',
    dest: 'dist/html/',
    index: './src/pages/index.html',
  },
};

// css Task
function cssTask() {
  return gulp
    .src(paths.css.all, { sourcemaps: true })
    .pipe(concat('style.css'))
    .pipe(postcss([cssnano()]))
    .pipe(gulp.dest('dist', { sourcemaps: '.' }));
}

// JavaScript Task
function jsTask() {
  return gulp
    .src(paths.scripts.all, { sourcemaps: true })
    .pipe(terser())
    .pipe(gulp.dest('dist', { sourcemaps: '.' }));
}

// Browsersync Tasks
function browsersyncServe(cb) {
  browsersync.init({
    cors: true,
    port: 5000,
    server: {
      middleware: [apiProxy],
      baseDir: '.',
      index: paths.html.index,
    },
    serveStatic: [paths.html.baseDir],
    serveStaticOptions: {
      extensions: ['html'],
    },
  });

  cb();
}

function browsersyncReload(cb) {
  browsersync.reload();
  cb();
}

// Watch Task
function watchTask() {
  gulp.watch('*.html', browsersyncReload);
  gulp.watch(
    [paths.css.all, paths.scripts.all],
    gulp.series(cssTask, jsTask, browsersyncReload)
  );
}

// Default Gulp task
gulp.task('default', gulp.series(cssTask, jsTask, browsersyncServe, watchTask));
