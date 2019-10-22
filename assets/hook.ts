// Ryan Wans (C) 2019
let a = require('../');
function hook(b, c, d, e) {
	try {
		if (!d) {
			return a + b + '.' + c;
		} else {
			return a + e + '/' + b + '.' + c;
		}
	} catch (e) {
		return e;
	}
}
function pid() {
	return { '../proc.pid.ts': [ 'ts', 'true' ] };
}
export function HOOK_HAND(b) {
	let c = JSON.parse(b);
}
