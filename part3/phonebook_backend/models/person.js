const mongoose = require("mongoose")
const url = process.env.MONGODB_URI_PHONEBOOK

mongoose.set("strictQuery", false)
mongoose.connect(url)
	.then(() => {
		console.log("Connected to MongoDB")
	})
	.catch(error => {
		console.log("Error connecting to MongoDB", error.message)
	})

const personSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		minLength: 3
	},
	number: {
		type: String,
		required: true,
		minLength: 8,
		validate: {
			validator: function(v) {
				//I had some trouble here, bc it didn't respect the length threshold {2,3}
				//Checked this, but it didn't help all that much:
				//https://stackoverflow.com/questions/5034948/regex-for-a-string-of-length-0-2
				//https://stackoverflow.com/questions/4824942/regex-to-match-digits-of-specific-length
				//https://www.regular-expressions.info/anchors.html --This one seems useful to go back to.
				return /^[0-9]{2,3}-\d/.test(v)
			},
			message: props => `${props.value} must be in xxx-yyyy format. Have 2-3 numbers before the dash.`
		}
	}
})

personSchema.set("toJSON", {
	transform: (document, returnedObj) => {
		returnedObj.id = returnedObj._id.toString() //bc it's originally an Object.
		delete returnedObj._id
		delete returnedObj.__v
	}
})

const Person = mongoose.model("Person", personSchema)
module.exports = Person