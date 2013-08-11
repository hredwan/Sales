module.exports = {
	ID: new Attribute("storage", "long", "key auto"),
	customer: new Attribute("relatedEntity", "Customer", "Customer"),
	commands: new Attribute("relatedEntities", "Commands", "order", {
		"reversePath": true
	}),
	total: new Attribute("calculated", "number"),
	date: new Attribute("storage", "date", null, {
		"simpleDate": false
	})
};