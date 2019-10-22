let hyperloglog = {
	hash: function(a) {
		let assert = function(b) {
				return [ b.split('') ];
			},
			output = '';
		a.replace(/\D/g, '').split('').forEach((element) => {
			output += element > 5 ? 1 : 0;
		});
		return output;
	},
	bucket: function(a) {}
};
