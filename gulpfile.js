/*
 * --->  Loading External Node.js Modules  <------
 */
var gulp = require('gulp');
// server, open browser
var connect = require('connect');
var connectLivereload = require('connect-livereload');
var opn = require('opn');
var gulpLivereload = require('gulp-livereload');
var coffee = require('gulp-coffee');
var clean = require('gulp-clean');
var imageop = require('gulp-image-optimization');

/*
 * ---------->  Main Config  <-------------
 */
var config = {

	// this is your local directory to become served as root,
  // e.g. `localhost:8080` should point to show `index.html` in that directory
	rootDir: './build',

  // any port to use for your local server
	servingPort: 8080,

	// the files you want to watch for changes for live reload
  // replace by any glob pattern matching your files
	filesToWatch: ['./build/**/*.{html,css,js}', '*.{html,css,js}', '!Gulpfile.js']
}

/*
 * ---------->  Gulp Tasks  <-------------
 */

// The default task - called when you run `gulp` from CLI
gulp.task('default', ['clean', 'watch', 'serve', 'move']);

// `gulp watch` task watching for file changes
gulp.task('watch', ['connect'], function () {

  // start livereload server (at the default port 35729)
  //   https://github.com/vohof/gulp-livereload#install
  gulpLivereload.listen();

  // watch for file changes
  gulp.watch(config.filesToWatch, function(file) {

    // get the changed file
    //   not needed here but useful for fine grained customizations
    gulp.src(file.path)

      // notify server about changes
      .pipe(gulpLivereload());
  });

	// watch for coffeescript file changes
	gulp.watch(['./src/coffee/**'], ['coffee']);
  gulp.watch(['./src/imported/**', './src/js/**', './src/**'], ['move']);
	//gulp.watch(['./src/imported/**'], ['images']);
});

// `gulp serve` task loading the URL in your browser
gulp.task('serve', ['connect'], function () {
  opn('http://localhost:' + config.servingPort);
});

// `gulp connect` task starting your server
gulp.task('connect', function(){

  // connect server for our files (unrelated to the livereload server)
  connect()

    // inject JavaScript into our page with `index.html` to listen for change notifications:
    //   <script src="//localhost:35729/livereload.js?snipver=1"></script>
    .use(connectLivereload())

    // specify the root directory for our connect server
    .use(connect.static(config.rootDir))

    // start the server at the given port
    //   now we can view our `index.html` in the root under `localhost:port`
    .listen(config.servingPort);
});

// Clean folder
gulp.task('clean', function(){
  return gulp.src(['build/*.html'], {read:false})
  .pipe(clean());
});

// Move files
gulp.task('move', function(){
  // the base option sets the relative root for the set of files,
  // preserving the folder structure
  gulp.src('src/*.html', {base: 'src'})
  .pipe(gulp.dest('build'));

	gulp.src('src/css/*.css', {base: 'src/css'})
  .pipe(gulp.dest('build/css'));

	gulp.src('src/js/**/*.js', {base: 'src/js'})
  .pipe(gulp.dest('build/js'));

	gulp.src('src/assets/**/*.*', {base: 'src/assets'})
  .pipe(gulp.dest('build/assets'));

	gulp.src('src/imported/**/*.*', {base: 'src/imported'})
	.pipe(gulp.dest('build/imported'));
});

// coffeescript
gulp.task('coffee', function() {
  gulp.src('src/coffee/**/*.coffee')
		.pipe(coffee())
    .pipe(gulp.dest('build/js'))
});

// image optimization
gulp.task('images', function(cb) {
    gulp.src(['src/imported/onepage/**/*.png']).pipe(imageop({
        optimizationLevel: 10,
        progressive: true,
        interlaced: true
    })).pipe(gulp.dest('build')).on('end', cb).on('error', cb);
});
