module.exports = {
	ID: new Attribute("storage", "long", "key auto"),
	product: new Attribute("relatedEntity", "Product", "Product"),
	order: new Attribute("relatedEntity", "Order", "Order"),
	total: new Attribute("calculated", "number"),
	quantity: new Attribute("storage", "long")
};