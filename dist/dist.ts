export const prod = {
	version: '1.0.9',
	db: 'agile',
	dbLib: './pid.db.json',
	force: true
};

export const hook = () => {
	const a = {
		pkg: () => {},
		hty: (a) => {
			try {
				a();
				return [ true ];
			} catch (e) {
				return { e };
			}
		}
	};
};
