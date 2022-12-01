const express = require('express')
const passport = require('passport')
// const mongoose = require('mongoose')
const Exhibit = require('../models/exhibit')
// const Review = require('../models/review')

const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404
// const requireOwnership = customErrors.requireOwnership

const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })


const router = express.Router()

// INDEX
// GET
// router.get('/exhibits', (req, res, next) => {
// 	console.log("WORKING")
// 	console.log(mongoose.connection.db.listCollections().toArray((err, collection) => console.log(collection)))
// 	Exhibit.find()
// 		.then((exhibits) => {
// 			console.log("LOG", exhibits)
// 			res.status(200).json({ exhibits: exhibits })
// 		})
// 		.catch(next)
// })

// INDEX
// GET
router.get('/exhibits', requireToken, (req, res, next) => {
	console.log("WORKING")
	Exhibit.find()
		.then((exhibits) => {
			console.log(exhibits)
			return exhibits.map((exhibit) => exhibit.toObject())
		})
		.then((exhibits) => res.status(200).json({ exhibits: exhibits }))
		.catch(next)
})


// SHOW
// GET 
router.get('/exhibits/:id', requireToken, (req, res, next) => {
	Exhibit.findById(req.params.id)
		.then(handle404)
		.then(exhibit => {
			res.status(200).json({ exhibit: exhibit })
		})
		.catch(next)

})

// CREATE
// POST 
router.post('/exhibits', requireToken, (req, res, next) => {
	req.body.exhibit.owner = req.user.id

	Exhibit.create(req.body.exhibit)
		.then((exhibit) => {
			res.status(201).json({ exhibit: exhibit })
		})
		.catch(next)
})

// UPDATE
// PATCH 
router.patch('/exhibits/:id', requireToken, removeBlanks, (req, res, next) => {
	delete req.body.exhibit.owner

	Exhibit.findById(req.params.id)
		.then(handle404)
		.then((exhibit) => {
			// requireOwnership(req, exhibit)
			return exhibit.updateOne(req.body.exhibit)
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

// DESTROY
// DELETE 
router.delete('/exhibits/:id', requireToken, (req, res, next) => {
	Exhibit.findById(req.params.id)
		.then(handle404)
		.then((exhibit) => {
				// throw an error if current user doesn't own `example`
				// requireOwnership(req, exhibit)
				// delete the example ONLY IF the above didn't throw
				exhibit.deleteOne()
			// requireOwnership(req, exhibit)
			//Also delete reviews of exhibit
			// Review.deleteMany({ exhibit: exhibit.id })
			// 	.catch(next)
			// Exhibit.deleteOne()
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

module.exports = router
