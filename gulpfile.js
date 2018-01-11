var gulp       	 = require('gulp'), // Подключаем Gulp
	browserSync  = require('browser-sync'), // Подключаем Browser Sync
	del          = require('del'), // Подключаем библиотеку для удаления файлов и папок
	autoprefixer = require('gulp-autoprefixer'),// Подключаем библиотеку для автоматического добавления префиксов
	concat       = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
	cssnano      = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
	rename       = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
	sass         = require('gulp-sass'), //Подключаем Sass пакет,
	uglify       = require('gulp-uglifyjs'); // Подключаем gulp-uglifyjs (для сжатия JS)

gulp.task('browser-sync', function() { // Создаем таск browser-sync
	browserSync({ // Выполняем browserSync
		server: { // Определяем параметры сервера
			baseDir: 'app', // Директория для сервера - app
		},
		notify: false // Отключаем уведомления
	})
});

gulp.task('sass', function(){ // Создаем таск Sass
	return gulp.src('app/sass/style.sass') // Берем источник
		.pipe(sass({outputStyle: 'nested'}).on('error', sass.logError)) // Преобразуем Sass в CSS посредством gulp-sass
		.pipe(autoprefixer(['last 5 versions'], { cascade: false })) // Создаем префиксы
		.pipe(gulp.dest('app/css')) // Выгружаем результат в папку app/css
});

gulp.task('css-libs', ['sass'], function() {
	return gulp.src('app/css/style.css') // Выбираем файл для минификации
		.pipe(concat('style.min.css')) // Собираем их в кучу в новом файле libs.min.js
		.pipe(cssnano()) // Сжимаем
		.pipe(gulp.dest('app/css')) // Выгружаем в папку app/css
		.pipe(browserSync.reload({stream: true})); // Обновляем CSS на странице при изменении
});

gulp.task('scripts', function() {
	return gulp.src([ // Берем все необходимые библиотеки
		'app/libs/jquery/dist/jquery.js',
		'app/libs/owl.carousel/dist/owl.carousel.js',
		'app/libs/page-scroll-to-id/jquery.malihu.PageScroll2id.js',
		'app/libs/fancybox/dist/jquery.fancybox.js',
		'app/libs/scroll/src/jquery.scroolly.js',
		'app/libs/jquery-smooth-scroll/jquery.smooth-scroll.js',
		'app/js/main.js'
		])
		.pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
		.pipe(uglify()) // Сжимаем JS файл
		.pipe(gulp.dest('app/js')) // Выгружаем в папку app/js
		.pipe(browserSync.reload({stream: true})); // Обновляем CSS на странице при изменении
});

gulp.task('watch', ['browser-sync', 'css-libs', 'scripts'], function() {
	gulp.watch('app/sass/**/*.sass', ['css-libs']) // Наблюдение за sass файлами в папке sass
	gulp.watch('app/*.html', browserSync.reload) // Наблюдение за HTML файлами в корне проекта
	gulp.watch('app/js/main.js', ['scripts']);   // Наблюдение за JS файлами в папке js
});

gulp.task('clean', function() {
	return del.sync('dist');// Удаляем папку dist перед сборкой
});


gulp.task('build', ['clean', 'sass', 'css-libs', 'scripts'], function() {

	var buildCss = gulp.src('app/css/style.min.css')
	.pipe(gulp.dest('dist/css'))

	var buildFonts = gulp.src('app/fonts/**/*') // Переносим шрифты в продакшен
	.pipe(gulp.dest('dist/fonts'))

	var buildJs = gulp.src('app/js/libs.min.js') // Переносим скрипты в продакшен
	.pipe(gulp.dest('dist/js'))

	var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
	.pipe(gulp.dest('dist'));

});


gulp.task('default', ['watch']);
