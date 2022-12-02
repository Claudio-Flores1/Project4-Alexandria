const express = require('express')
const passport = require('passport')
const Exhibit = require('../models/exhibit')

const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404

const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })


const router = express.Router()

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
				exhibit.deleteOne()
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

module.exports = router
