// Ryan Wans 2019 (C)
const lib = {},
	plugins = [ 'express', 'fs', 'cookie-parser', 'chalk', 'path' ],
	commons = {
		assets: '../assets',
		public: '../public',
		useRelative: true
	},
	rpprefix = '[RW-PORTAL]';

var i = 0,
	app = lib['app'];

function rwportal(code) {
	return (
		rpprefix +
		' Return Code ' +
		code +
		'\n' +
		rpprefix +
		" Code Index: {404: 'Page Not Found', 403: 'Access Denied'}"
	);
}

for (i = 0; i < plugins.length; i++) {
	lib[plugins[i]] = require(plugins[i]);
}
try {
	lib['app'] = lib.express();
} catch (e) {
	throw new Error('Plugin Install Incomplete!');
}

// universal
lib['app'].use(function(req, res, next) {
	next();
});

lib['app'].get('/', function(req, res) {
	res.sendFile('./public/index.html', { root: __dirname });
});
lib['app'].get('/api/APPLICATION_SCSS', function(req, res) {
	res.sendFile('./public/app.scss', { root: __dirname });
});
lib['app'].get('/api/templater.js', function(req, res) {
	res.sendFile('./assets/templater.js', { root: __dirname });
});

// 404 handlr
lib['app'].get('/*', function(req, res) {
	res.end(rwportal(404));
});

lib['app'].listen(9000, () => {
	console['log']('LISTENING ON PORT 9000');
});
