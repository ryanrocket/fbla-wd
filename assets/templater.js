/*
    Templater by Ryan Wans
    (C) 2019
    Licensed under the MIT License
*/

const TEMP = {
	eventQue: {},
	upperContent: {},
	number: 0,
	add: function(urls, div) {
		this.eventQue[number] = {};
		this.eventQue[number]['u'] = urls;
		this.eventQue[number]['_target'] = div;
		this.number++;
	},
	get: function(url) {
		var a = new XMLHttpRequest();
		a.open('GET', a, true);
		return a.responseText;
	},
	upper: function() {
		let a = Object.keys(this.eventQue),
			i = 0;
		for (i = 0; i < a; i++) {}
	}
};
