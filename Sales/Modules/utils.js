﻿var result 		= {},	config 		= require('config'),	_			= require('underscore'),	randomStr 	= require('random-string');;result.extend = function extend(target, source) {    for (var prop in source)        if (prop in target)            extend(target[prop], source[prop]);        else            target[prop] = source[prop];    return target;};result.isCustomer = function is_customer(){	var curSession = currentSession();	return curSession.belongsTo(config.ROLES.CUSTOMER) && _.isUndefined(sessionStorage.ID);};result.generateRandomData = function generate_random_data(){	/*******************************************************	 * Init the data	 *******************************************************/	ds.Customer.remove();	ds.Category.remove();	ds.Product.remove();	/*******************************************************	 * Generate products	 *******************************************************/	var bPath = application.getFolder('path') + config.RESSOURCES_FOLDER_PATH + '/',		prod_folder	= Folder(bPath + 'photos/Products'),		files = [],		folder,		i;	for (i = prod_folder.folders.length; folder = prod_folder.folders[--i]; ) {		var cat = new ds.Category({				name: folder.name,				color: '#' + config.COLORS[_.random(0, config.COLORS.length - 1)]			}),			file,			j;		cat.save();		for (j = folder.files.length; file = folder.files[--j]; ) {			new ds.Product({				name: file.nameNoExt,				category: cat,				logo: loadImage(file.path),				price: _.random(100, 5000),				nb_remaining_items: _.random(10, 100)			}).save();		};	};	/*******************************************************	 * Generate customers	 *******************************************************/	var bCFolder = Folder(bPath + 'customers/');	for(i = 0; folder = bCFolder.folders[i] ; i++){		var isMale,			content,			list,			item,			imgFolder = Folder(folder.path + 'images/');		try{			content = loadText(folder.path + 'data.json');			list = JSON.parse(content);		}catch(e){			continue;		}		for (j = list.length; item = list[--j]; ) {			var customer = new ds.Customer(item);			if(typeof customer.password !== 'string'){				customer.password = randomStr({special: true});			}			customer.image = loadImage(imgFolder.files[j]);			customer.save();		};	}};module.exports = result;