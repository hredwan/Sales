var result 	= {},
	_		= require('underscore');

/************************************************************************************
 |                                                                                  |
 |                                  Entity Methods                                  |
 | Examples:                                                                        |
 |          result.entityMethods.method = function ();                              |
 |                                                                                  |
 ************************************************************************************/

// Initialize the entityMethods object:
result.entityMethods = {};

/************************************************************************************
 |                                                                                  |
 |                            EntityCollection Methods                              |
 | Examples:                                                                        |
 |          result.collectionMethods.method = function ();                          |
 |                                                                                  |
 ************************************************************************************/

// Initialize the collectionMethods object:
result.collectionMethods = {};

/************************************************************************************
 |                                                                                  |
 |                                   Class Methods                                  |
 | Examples:                                                                        |
 |          result.methods.method = function ();                                    |
 |                                                                                  |
 ************************************************************************************/

// Initialize the methods object:
result.methods = {};

result.methods.buy = function buy(products){
	debugger;
	if(_.isArray(products) && sessionStorage.ID && products.length > 0){
		var order = new this({
			customer: sessionStorage.ID,
			date: new Date()
		});

		order.save();

		_.each(products, function(prod){
			new ds.Command({
				order: order,
				product: prod.id,
				quantity: prod.quantity
			}).save();
		});
	}
}
result.methods.buy.scope = 'public';

// Export the result object:
module.exports = result;