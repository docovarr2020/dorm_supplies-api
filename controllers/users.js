const User = require('../models/schemas/user')
const Item = require('../models/schemas/item')

exports.checkout = (req, res, next) => {

	// get access to the user
	User.findById(req.params.userId, (err, user) => {
		if(err) return next(err)
		if(!user) return res.sendStatus(404).send('No user with id ' + req.params.userId)


		let total = 0

		Item.findById(req.body.itemId, (err, item) => {
			if (err) return console.log("hello"); next(err)
			if (!item) return res.sendStatus(404).send('No item with id ' + req.params.itemId)
			if (item.quantity <= 0 || item.quantity < purchase.quantity) 
				return res.sendStatus(500).send("Item " + item.name + " is out of stock!")

			// add price of items to total cost
			total += (req.body.price * req.body.quantity)

			// update the item's data
			Item.findOneAndUpdate({ _id: item.id }, { quantity: (item.quantity - req.body.quantity)}, {}, (err, updatedItem) =>{
				if(err) return next(err)
				if(!updatedItem) return res.sendStatus(404).send('No item with id ' + item.id)
				transactDate = new Date(now)
				user.orders.push({items: [{_id: item.id, quantity: req.body.quantity, price: req.body.price}],
									purchasedDate: transactDate,
									isPaid: false})
				user.markModified('orders')
				user.save((err) => {
					if (err) return next(err)
					return res.json(user)
				})
			})

		})	
	})
}

/*
* ~~~~ C.R.U.D. Controllers ~~~~
*/

exports.createUser = (req, res, next) => {
	if (!req.body.email) {
		return res.status(400).send('Must provide email')
	}
	if (!req.body.password) {
		return res.status(400).send('Must provide valid password')
	}
	if (!req.body.address) {
		return res.status(400).send('Must provide a delivery address')
	}
	const userData = {
		email: req.body.email,
		hash: req.body.password,
		address: req.body.address
	}
	const newUser = new User(userData)
	newUser.save((err) => {
		if (err) return next(err)
		return res.json(newUser)
	})
}

exports.getAllUsers = (req, res, next) => {
	User.find({}, (err, users) => {
		if (err) return next(err)
		return res.json(users)
	})
}

exports.getUserById = (req, res, next) => {
	User.findById(req.params.userId, (err, user) => {
		if(err) return next(err)
		if(!user) return res.sendStatus(404).send('No user with id ' + req.params.userId)
		return res.json(user)
	})
}

exports.getUserByEmail = (req, res, next) => {
	User.findOne({email: req.params.email}, (err, user) => {
		if(err) return next(err)
		if(!user) return res.sendStatus(404).send('No user with email ' + req.params.email)
		return res.json(user)
	})
}

exports.updateUser = (req, res, next) => {
	User.findOneAndUpdate({ _id: req.params.userId }, req.body, {}, (err, user) =>{
		if(err) return next(err)
		if(!user) return res.sendStatus(404).send('No user with id ' + req.params.userId)
		return res.json(user)
	})
}
exports.deleteUser = (req, res, next) => {
	User.findByIdAndRemove(req.params.userId, (err, user) => {
		if(err) return next(err)
		if(!user) return res.sendStatus(404).send('No user with id ' + req.params.userId)
		return res.json(user)
	})
}












