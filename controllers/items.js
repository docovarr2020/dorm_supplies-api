const Item = require('../models/schemas/item')

/*
* ~~~~ C.R.U.D. Controllers ~~~~
*/

exports.createItem = (req, res, next) => {
	if (!req.body.name) {
		return res.status(400).send('Must provide name')
	}
	if (!req.body.price) {
		return res.status(400).send('Must provide valid price')
	}
	if (!req.body.quantity) {
		return res.status(400).send('Must provide valid quantity')
	}
	const itemData = {
		name: req.body.name,
		price: req.body.price,
		quantity: req.body.quantity
	}
	const newItem = new Item(itemData)
	newItem.save((err) => {
		if (err) return next(err)
		return res.json(newItem)
	})
}

exports.getAllItems = (req, res, next) => {
	Item.find({}, (err, items) => {
		if (err) return next(err)
		return res.json(items)
	})
}

exports.getItemById = (req, res, next) => {
	Item.findById(req.params.itemId, (err, item) => {
		if(err) return next(err)
		if(!item) return res.sendStatus(404).send('No item with id ' + req.params.itemId)
		return res.json(item)
	})
}

// Gets all the items that are currently in stock
exports.getStockedItems = (req, res, next) => {
	Item.find({
		$and: [
			{ quantity: { $exists: true} },
			{ quantity: { $gt: 0} }
		]
	})
}


exports.updateItem = (req, res, next) => {
	Item.findOneAndUpdate({ _id: req.params.itemId }, req.body, {}, (err, item) =>{
		if(err) return next(err)
		if(!item) return res.sendStatus(404).send('No item with id ' + req.params.itemId)
		return res.json(item)
	})
}
exports.deleteItem = (req, res, next) => {
	Item.findByIdAndRemove(req.params.itemId, (err, item) => {
		if(err) return next(err)
		if(!item) return res.sendStatus(404).send('No item with id ' + req.params.itemId)
		return res.json(item)
	})
}