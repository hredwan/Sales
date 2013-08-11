
WAF.onAfterInit = function onAfterInit() {// @lock
	var ns = _ns || {};
	
// @region namespaceDeclaration// @startlock
	var documentEvent = {};	// @document
// @endregion// @endlock
	function center(container){
		$$(container).center({center : 'h'});
		$(window).resize(function(){
			$$(container).center({center : 'h'});
		});
	}
	
	(function(ns){
		var baseFolder = '/components/customer/';
		
		ns.Forms = {
			openDialog: function(path){
				var res = baseFolder;
				switch(path){
					case 'viewProduct':
						res += 'productDetails';
						break;
					default:
						return false;
				}
				
				$$('dialogCompo').loadComponent({
					path: res + '.waComponent',
					onSuccess: function(){
						$$('mainDialog').displayDialog();
					}
				});
			}
		};
	})(ns);
// eventHandlers// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		center('content');
		center('mainDialog');
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
// @endregion
};// @endlock
