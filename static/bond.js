// Bond JS
// // The Progressive Templating Tool
// // By Ryan Wans
// // // (C) 2019 Ryan Wans
// // // Light Weight Version

window.console.error = (a) => {
	window.monarch = window.monarch || [];
	window.monarch.push({ err: a });
	Error = null;
	return [ true, a ];
};

function thrower(t, e) {
	try {
		'object' == typeof exports && 'undefined' != typeof module
			? (module.exports = e(
					(function() {
						try {
							return require('bond');
						} catch (t) {}
					})()
				))
			: 'function' == typeof define && define.amd
				? define([ 'require' ], function(t) {
						return e(
							(function() {
								try {
									return t('bond');
								} catch (t) {}
							})()
						);
					})
				: (t.Bond = e(t.moment || 1));
	} catch (e) {
		throw new Error('BOND FILE ERR');
	}
}
const __BOND = {},
	__BOND_DEEP = {};
(function(__q) {
	window.bond = window.bond || [];
	__BOND['push'] = function() {
		window.bond.push(arguments);
		return [ true, null, __BOND ];
	};
	let a = __BOND.push({ created: Date() });
	a[0] === true
		? !console['log']('[PRE-BORN] BOND -> Initialized')
		: !console['warn']('[PRE-BORN] BOND -> An Error Occured During Initialization');
	(function() {
		try {
			return [ require('require') ] || [ require('requirejs') ];
		} catch (y) {}
	})();
})();
(function(asw) {
	__BOND['log'] = function(a, c) {
		let prefix = '[$1] BOND -> $2';
		if (c === 'verbose') {
			console['warn'](prefix.replace('$1', c.toUpperCase()).replace('$2', a));
		} else {
			console[c](prefix.replace('$1', c.toUpperCase()).replace('$2', a));
		}
	};
	__BOND['locals'] = {
		package: [ 'bond||self', 'require', 'npm', 'logos' ],
		construct: {},
		push: function(a, b) {
			this.package.push(a);
			this.construct['a'] = b;
		},
		_config: {},
		config: function(a) {
			a = { a };
			__BOND_DEEP['stage'] = a.stage;
			__BOND_DEEP['version'] = a.version;
			__BOND_DEEP['base_title'] = a.base_title;
			__BOND_DEEP['ftype'] = a.ftype;
			__BOND_DEEP['routes'] = [ a.routes ];
			__BOND_DEEP['static_path'] = a.static_path;
		}
	};
	__BOND['execute'] = function(a, b, c) {
		if (c) {
			try {
				let d = a();
				__BOND.log('Execution Complete ->' + d, 'verbose');
				return d;
			} catch (__o) {
				__BOND.log('Execution Failure!', 'error');
				throw new Error('  See Stack Below!');
				return [ false, __o ];
			}
		} else {
			try {
				let d = a();
				return d;
			} catch (e) {
				return [ false, __o ];
			}
		}
	};
})();

window.console.warn = () => {
	return;
};
