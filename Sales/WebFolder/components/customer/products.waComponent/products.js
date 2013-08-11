﻿
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'teachers';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		
		function matrixToArray(matrix) {
		    return matrix.substr(7, matrix.length - 8).split(', ');
		}
		
		var
		dataSource 	= sources.product,
		categoryDS	= sources[getHtmlId('category')];
		
		getHtmlObj('container1').searchW({
			datasource: dataSource,
			callback: function(){
				var category = categoryDS.getCurrentElement(),
					params = [waf.wildchar + $(this).val() + waf.wildchar],
					query = 'name = :1';
				
				if(category && category.getKey()){
					params.push(category.getKey());
					query += ' and category.ID = :2';
				}
				dataSource.query(query,{
					params: params
				});
			}
		});
		
		categoryDS.all({
			onSuccess: function(e){
				e.dataSource.select(-1);
			}
		});
		
		document.getElementById(getHtmlId('matrix1')).onselectstart = function(){
			return false;
		}
		
		// Drag and drop
		var
		$products	= $('#' + getHtmlId('matrix1') + ' .waf-matrix-element'),
		$cart		= getHtmlObj('dataGrid1'),
		cartSource	= $comp.sources.cart;
		
		function addCurrentProduct(){
			var curElement = dataSource.getCurrentElement();
			if(curElement){
				for(var i = 0, prod; prod = $comp.sourcesVar.cart[i]; i++){
					if(curElement.getKey() == prod.id){
						prod.quantity = typeof(prod.quantity) == 'number'? prod.quantity + 1: 1;
						cartSource.sync();
						return;
					}
				}
				
				$comp.sourcesVar.cart.push({
					id: curElement.getKey(),
					name: curElement.name.getValue(),
					quantity: 1,
					price: curElement.price.getValue()
				});
				cartSource.sync();
			}
		}
				
		$cart.droppable({
		    drop: function(){
		        addCurrentProduct();
		    }
		});
		
		$products.liveDraggable({
		    start: function(e, ui){
		    	var $el = $('#clone-' + ui.helper.data('ref') + '-' + ui.helper.data('area')),
		    		pos = matrixToArray($el.css("-webkit-transform"));
		    		
		    	$(ui.helper).css("margin-left", -parseInt(pos[4]));
                $(ui.helper).css("margin-top", -parseInt(pos[5]));
		    },
		    appendTo: "body",
		    cursor: 'move',
		    cursorAt: { left: 5 },
		    scroll: false,
		    helper: "clone",
		    zIndex: 888888
		});
	// @region namespaceDeclaration// @startlock
	var button2 = {};	// @button
	var cartEvent = {};	// @dataSource
	var container4 = {};	// @container
	var button1 = {};	// @button
	var combobox1 = {};	// @combobox
	var image2 = {};	// @image
	var matrix1 = {};	// @matrix
	// @endregion// @endlock

	// eventHandlers// @lock

	button2.click = function button2_click (event)// @startlock
	{// @endlock
		ds.Order.buy($comp.sourcesVar.total);
	};// @lock

	cartEvent.onCollectionChange = function cartEvent_onCollectionChange (event)// @startlock
	{// @endlock
		var total = 0;
		for(var i = 0, prod; prod = $comp.sourcesVar.cart[i]; i++){
			total += prod.price*prod.quantity;
		}
		
		$comp.sourcesVar.total = total + ' $';
		$comp.sources.total.sync();
	};// @lock

	container4.dblclick = function container4_dblclick (event)// @startlock
	{// @endlock
		_ns.Forms.openDialog('addProduct');
	};// @lock

	button1.click = function button1_click (event)// @startlock
	{// @endlock
		categoryDS.select(-1);
		dataSource.all();
		getHtmlObj('container1').searchW('clear')
	};// @lock

	combobox1.change = function combobox1_change (event)// @startlock
	{// @endlock
		if(!this.source.getCurrentElement()){
			return false;
		}
		else if(!this._inited){
			this._inited = true;
			return false;
		}
		
		dataSource.query('category.ID = ' + this.getValue());
	};// @lock

	image2.click = function image2_click (event)// @startlock
	{// @endlock
		dataSource.removeCurrent();
	};// @lock

	matrix1.onChildrenDraw = function matrix1_onChildrenDraw (event)// @startlock
	{// @endlock
		var $elem = $(event.htmlObject);
		
		dataSource.category.load({
			onSuccess: function(e){
				if(e.entity){
					$elem.find('.color.waf-matrix-clone').css({
						'background-color' : e.entity.color.getValue()
					});
				}
			}
		});
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_button2", "click", button2.click, "WAF");
	WAF.addListener(this.id + "_cart", "onCollectionChange", cartEvent.onCollectionChange, "WAF");
	WAF.addListener(this.id + "_container4", "dblclick", container4.dblclick, "WAF");
	WAF.addListener(this.id + "_button1", "click", button1.click, "WAF");
	WAF.addListener(this.id + "_combobox1", "change", combobox1.change, "WAF");
	WAF.addListener(this.id + "_image2", "click", image2.click, "WAF");
	WAF.addListener(this.id + "_matrix1", "onChildrenDraw", matrix1.onChildrenDraw, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
