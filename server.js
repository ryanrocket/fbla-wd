// RYAN WANS 2019 (C)
const lib = {},
	plugins = [ 'express', 'fs', 'cookie-parser', 'chalk', 'path', 'body-parser', 'socket.io' ],
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
console['log']("MESSAGE: ALL ASSETS BINDED!")

lib['app'].use(lib['cookie-parser']());
lib['app'].use(lib['body-parser'].json()); // to support JSON-encoded bodies
lib['app'].use(
	lib['body-parser'].urlencoded({
		// to support URL-encoded bodies
		extended: true
	})
);

let io = new lib['socket.io']();

// universal
lib['app'].use(function(req, res, next) {
	res.cookie('_stmp', Date.now());
	res.header('qued', Date.now());
	res.header('X-RWAPI', '^3.6.3 REV');
	res.header('server', 'Monarch Airlines Webserver')
	res.header('X-Powered-By', 'Monarch Airlines Webserver')
	res.header('X-Transfer-AWS', '{from: LOADBALANCER, code: 2736ah187hs6as92h8s4672h89s4')
	console['log']("MESSAGE: RECEIVED HIT WITH UUID "+Date.now())
	next();
});

lib['app'].get('/api/app.scss', function(req, res) {
	res.sendFile('./public/app.scss', { root: __dirname });
});
lib['app'].get('/api/app.css.map', function(req, res) {
	res.sendFile('./public/app.css.map', { root: __dirname });
});
lib['app'].get('/api/app.css', function(req, res) {
	res.sendFile('./public/app.css', { root: __dirname });
});
lib['app'].get('/api/templater.js', function(req, res) {
	res.sendFile('./assets/templater.js', { root: __dirname });
});
lib['app'].get('/api/monarch.live.js', function(req, res) {
	res.sendFile('./assets/monarch.live.js', { root: __dirname });
});
lib['app'].get('/api/monarch.cold.js', function(req, res) {
	res.sendFile('./assets/monarch.cold.js', { root: __dirname });
});
lib['app'].get('/api/void.ts', function(req, res) {
	res.sendFile('./assets/void.ts', { root: __dirname });
});

lib['app'].get('/view/*', function(req, res) {
	let a = req.path.split('/')[2];
	try {
		res.sendFile('./views/' + a, { root: __dirname });
	} catch (e) {
		res.end(rwportal(404));
	}
});
lib['app'].get('/static/*', function(req, res) {
	let a = req.path.split('/')[2];
	try {
		res.sendFile('./static/' + a, { root: __dirname });
	} catch (e) {
		res.end(rwportal(404));
	}
});
lib['app'].post('/api/book', function(req, res) {
	let gg = req.body;
	let l = gg.date.split(','),
		g = [];
	l.forEach((element) => {
		g.push(element.split('/')[0]);
	});
	let durr = Math.max.apply(null, g) - Math.min.apply(null, g) + 1;
	res.cookie('cartvalue', gg);
	res.redirect(
		'/cart?rt=' +
			gg.roundtrip +
			'&dep=' +
			gg.dep +
			'&arr=' +
			gg.arr +
			'&pass=' +
			gg.pass +
			'&promo=' +
			gg.promo +
			'&dur=' +
			durr
	);
});

// 404 handlr
lib['app'].get('/*', function(req, res) {
	console['log']("MESSAGE: USER DRAFTED 404 ERR ON "+req.path)
	res.sendFile('./public/index.htm', { root: __dirname });
});

lib['app'].listen(9000, () => {
	console['log']('-- -- MONARCH AIRLINES WEBSERVER -- --\nVERSION: v3.1\nBUILD: 12908\nRUNNING PORT 9000\n[->] RUNNING VERBOSE MODE\n-- -- -- -- -- -- -- -- -- -- -- -- --');
});
