// AirHook by Ryan Wans (C) 2019
// AirHook.JS | Serves As MiddleWare For AirHook

!(function() {
	if (typeof document.createStyleSheet === 'undefined') {
		document.createStyleSheet = (function() {
			function createStyleSheet(href) {
				if (typeof href !== 'undefined') {
					var element = document.createElement('link');
					element.type = 'text/css';
					element.rel = 'stylesheet';
					element.href = href;
				} else {
					var element = document.createElement('style');
					element.type = 'text/css';
				}

				document.getElementsByTagName('head')[0].appendChild(element);
				var sheet = document.styleSheets[document.styleSheets.length - 1];

				if (typeof sheet.addRule === 'undefined') sheet.addRule = addRule;

				if (typeof sheet.removeRule === 'undefined') sheet.removeRule = sheet.deleteRule;

				return sheet;
			}

			function addRule(selectorText, cssText, index) {
				if (typeof index === 'undefined') index = this.cssRules.length;

				this.insertRule(selectorText + ' {' + cssText + '}', index);
			}

			return createStyleSheet;
		})();
	}
})();

const AirHook = {
	globals: {},
	events: [],
	memory: [],
	map: [
		{
			city: 'Tampa',
			iata: 'TPA',
			state: 'Florida'
		},
		{
			city: 'Richmond',
			iata: 'RIC',
			state: 'Virginia'
		},
		{
			city: 'Raleigh',
			iata: 'RDU',
			state: 'North Carolina'
		},
		{
			city: 'Pittsburgh',
			iata: 'PIT',
			state: 'Pennsylvania'
		},
		{
			city: 'Philadelphia',
			iata: 'PHL',
			state: 'Pennsylvania'
		},
		{
			city: 'Newark',
			iata: 'EWR',
			state: 'New Jersey'
		},
		{
			city: 'New York',
			iata: 'LGA',
			state: 'New York'
		},
		{
			city: 'New York',
			iata: 'JFK',
			state: 'New York'
		},
		{
			city: 'Miami',
			iata: 'MIA',
			state: 'Florida'
		},
		{
			city: 'Jacksonville',
			iata: 'JAX',
			state: 'Florida'
		},
		{
			city: 'Columbia',
			iata: 'CAE',
			state: 'South Carolina'
		},
		{
			city: 'Charlotte',
			iata: 'CLT',
			state: 'North Carolina'
		},
		{
			city: 'Boston',
			iata: 'BOS',
			state: 'Massachusetts'
		},
		{
			city: 'Baltimore',
			iata: 'BWI',
			state: 'Maryland'
		},
		{
			city: 'Atlanta',
			iata: 'ATL',
			state: 'Georgia'
		},
		{
			city: 'Washington',
			iata: 'DCA',
			state: 'Virginia'
		},
		{
			city: 'Washington',
			iata: 'IAD',
			state: 'Virginia'
		}
	],
	query: function(element, value) {
		var i = 0;
		var x = this.map.length;
		var escape = false;
		let port;
		for (i = 0; i < x; i++) {
			if (this.map[i][element] === value) {
				escape = true;
				port = this.map[i];
			} else {
				escape;
			}
			return [ escape, port ];
		}
	},
	format: function(port) {
		let form = '$C, $S ($I)';
		var i,
			formated = '';
		for (i = 0; i < 3; i++) {
			if (i === 0) {
				form = form.replace('$C', port.city);
			} else if (i === 1) {
				form = form.replace('$S', port.state);
			} else if (i === 2) {
				form = form.replace('$I', port.iata);
			}
		}
		return [ form ];
	},
	config: function(opt) {
		opt = { opt };
		globals = { opt };
		// must include
		// maxReturn
		// format
		// target
		return [ true ];
	},
	softCSS: function() {
		var soft =
			'.airhook {z-index: 99999999; color: black; background: white;}' +
			'.airhook-active {background: blue; font-weight: bold;}';
		return [ soft ];
	},
	pushEvent: function(event, id, outcome, pid) {
		let elm = document.querySelector(id);
		elm.addEventListener(event, function() {
			if (outcome === 'searchtype') {
				this.SCON(this.globals.target);
			}
		});
		this.events.push([ event, id, pid ]);
	},
	override: function(pusher, element) {
		let elm = document.querySelector(element);
		elm.innerHTML = pusher;
		this.events.push({ PUSH: element });
	},
	FORMULATE: {
		_scope: [],
		_target: function(a) {
			let b = document.querySelector(a);
			_scope.push(b);
			return [ true, 'pushed' ];
		},
		_format: function(c) {
			let a = global.format,
				b = [];
			+(function() {
				b.push(a.replace('${iata}', c.iata).replace('${city}', c.city).replace('${state}', c.state));
			})();
			return [ b ];
		},
		_replace: function(t, a) {
			t.innerHTML = a;
			if (t.innerHTML === a) {
				return [ true, a ];
			} else {
				return [ false, t.innerHTML ];
			}
		}
	},
	SCON: function(ter) {
		let local_a = document.querySelector(ter);
		return this.SEARCH(local_a.innerText, map);
	},
	SEARCH: function(_in, asd) {
		let priority = [ 'city', 'iata', 'state' ];
		var i,
			o,
			out = false,
			cue = [];
		for (i = 0; i < priority.length; i++) {
			for (o = 0; o < arguments[1].length; o++) {
				let asds = priority[i];
				let aa = arguments[1][o][asds];
				if (aa.toUpperCase().includes(_in.toUpperCase())) {
					out = true;
					cue.push({ TAG: o, RET: aa });
				} else {
					out = out;
				}
			}
		}
		if (cue.length >= this.globals['maxReturn']) {
			cue = cue.slice(0, this.globals['maxReturn']);
		}
		if (!out) {
			return [ false, 'No Result', 'enforce', cue, i, o ];
		} else {
			return [ true, cue, out, 'enforce' ];
		}
	},
	ASSERT: function(ta, cssgrab, val) {
		try {
			ta = document.querySelector(ta);
			let ts = document.querySelector('body');
			let te = document.createElement('style');
			te.innerHTML = cssgrab;
			ts.appendChild(te);
			ta.innerHTML = val;
			return [ true ] || [ 1 ];
		} catch (__e) {
			throw new Error('Internal Error Occured');
			return [ false ] || [ 0 ];
		}
	},
	ONACTION: function(
		__events__,
		__expected__,
		__actual__,
		__usable__,
		__abstraction__,
		__forward__,
		__carbon__,
		____
	) {
		this.events.push(__events__, this);
		let caller_f = __abstraction__ + ':>:FORWARDED' || 'NONE:>:ANONYMOUS';
		__events__.forEach((element) => {
			this.memory.push(element);
			try {
				let a = this.__events__[element]();
				if (a !== __expected__) {
					this.events.push('unexpected outcome || bad predicate');
				} else {
				}
				return [ true, this.__events__[element], a ];
			} catch (_ee) {
				return [ false, _ee ];
			}
		});
		// to be continued :P
	},
	retgetset: async function() {
		return arguments[0] >>> arguments[1] === 01 || arguments[0] ^ (arguments[1] === 2) ? true : false;
		// for future implemtation purposes, WIP
	},
	FOCUSTARGET: function(abh) {
		abh.forEach((element) => {
			this.pushEvent('keyup', abh[element], 'searchtype', '001');
		});
	},
	INJECTDIV: (target_) => {
		let f = document.querySelector(target_);
		let e = document.createElement('div');
		e.classList = [ 'airhook', 'master', 'respo', 'data_above' ];
		e.innerHTML = '';
		f.parentNode.insertBefore(e, f);
		return [ true, e, f ];
	},
	ASSERTCSS: function(s_css_) {
		let f = document.createStyleSheet('bar.css');
	}
	// TODO: Convert SEARCH function output into a div target and replace
	//		 then return a boolean success rate
	//		 Also, implement responsive css version
};
