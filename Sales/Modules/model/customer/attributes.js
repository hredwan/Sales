module.exports = {
	ID: new Attribute("storage", "long", "key auto"),
	firstname: new Attribute("storage", "string", "btree"),
	lastname: new Attribute("storage", "string", "btree"),
	fullname: new Attribute("calculated", "string"),
	phoneNumber: new Attribute("storage", "string"),
	image: new Attribute("storage", "image"),
	email: new Attribute("storage", "string", "btree", {
		unique: true
	}),
	login: new Attribute("storage", "string", "btree", {
		unique: true
	}),
	password: new Attribute("calculated", "string"),
	ha1key: new Attribute("storage", "string", {
		scope: 'publicOnServer'
	}),
	address: new Attribute("storage", "string"),
	orders: new Attribute("relatedEntities", "Orders", "customer", {
		"reversePath": true
	})
};