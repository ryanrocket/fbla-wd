// AirHook by Ryan Wans (C) 2019
// AirHook.JS | Serves As MiddleWare For AirHook

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
		return [ true ];
	},
	softCSS: function() {
		var soft =
			'.airhook {z-index: 99999999; color: black; background: white;}' +
			'.airhook-active {background: blue; font-weight: bold;}';
		return [ soft ];
	},
	pushEvent: function(event, id, outcome) {
		let elm = document.querySelector(id);
		elm.addEventListener(event, function() {
			outcome();
		});
		this.events.push([ event, id ]);
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
		__hydrogen__,
		____
	) {
		this.events.push(__events__, this);
		let caller_f = __abstraction__ + ':>:FORWARDED' || 'NONE:>:ANONYMOUS';
		__events__.forEach((element) => {
			this.memory.push(element);
		});
	}
};
