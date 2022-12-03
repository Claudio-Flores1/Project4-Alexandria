const mongoose = require('mongoose')

const exhibitSchema = new mongoose.Schema(

	{
		name: {
			type: String,
			required: true
		},
		date: {
			type: String,
			required: true
		},
		info: {
			type: String,
			required: true
		},
		picture: {
			type: String,
		},
		artist: {
			type: String,
            required: true
		},
        museum: {
            type: String,
        },
	},
)
 

module.exports = mongoose.model('Exhibit', exhibitSchema)

