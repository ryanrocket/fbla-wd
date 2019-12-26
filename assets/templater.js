/*
    Templater by Ryan Wans
    (C) 2019
    Licensed under the MIT License

    LIGHTWEIGHT VERSION
*/

window.templater = window.templater || [];

const TEMP = {
	eventQue: {},
	upperContent: {},
	number: 0,
	add: function(urls, div, opts) {
		// Added Feature: Template Prioritizing
		this.eventQue[opts.priority] = {};
		this.eventQue[opts.priority]['u'] = urls;
		this.eventQue[opts.priority]['_target'] = div;
		this.eventQue[opts.priority]['opts'] = opts;
		this.number++;
	},
	get: function(url) {
		var a = new XMLHttpRequest();
		a.open('GET', url, false);
		a.send(null);
		return a.responseText;
	},
	// i love you :)
	upper: function() {
		let a = Object.keys(this.eventQue),
			i = 0;
		for (i = 0; i < a.length; i++) {
			let ff = this.get(this.eventQue[a[i]].u);
			if (ff.split('<')[1].split('>')[0].split(' ')[0] !== 'div') {
				console['warn']('[Templater] The requested view/template did not start with a <div> element!');
				this.upperContent[i] = [
					'<h2><strong>Content Load Failed: See Console!</strong></h2>',
					this.eventQue[a[i]]._target
				];
				console.log('|' + ff.split('<')[1].split('>')[0].split(' ')[0] + '|');
				console.log(ff.split('<')[1].split('>')[0].split(' ')[0] !== 'div');
				console.log(ff.split('<')[1].split('>')[0].split(' ')[0] !== 'nav');
			} else {
				this.upperContent[i] = [ ff, this.eventQue[a[i]]._target ];
			}
		}
		return this.upperContent;
	},
	repl: function() {
		let a = this.upper(),
			i;
		for (i = 0; i < Object.keys(a).length; i++) {
			let b = document.querySelectorAll(a[i][1]),
				c;
			for (c = 0; c < b.length; c++) {
				b[c].innerHTML = a[i][0];
				window.templater.push(a[i][1]);
			}
		}
	},
	created: function(f) {
		document.addEventListener('DOMContentLoaded', () => {
			try {
				f();
			} catch (e) {
				throw new Error('Parameter is not a function!');
			}
		});
	},
	truify: (a) => {
		return a === 1 ? a : ~a;
	},
	gTitle: (dd) => {
		let a = window.location.pathname.split('/');
		let b = a[a.length - 1].split('');
		let c = b[0].toUpperCase();
		b[0] = c;
		window.document.title = dd + b.join('');
	},
	force: (aa, b) => {
		let c = +b();
		let id = Date.now();
		document.cookie = aa.lr + '=mT' + id + '-()';
		window.templater.push(aa.lr + id);
		if (aa.ret) {
			return [ aa.vals, true, c ];
		} else {
			return [ false ];
		}
	}
};
