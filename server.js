var express = require('express')
var bodyParser = require('body-parser')
var exphbs = require('express-handlebars')
var logger = require('morgan')
var mongoose = require('mongoose')
var SavedArticles = require('./app/models/savedArticles')
var Promise = require('bluebird')

mongoose.Promise = Promise


// Sets up the Express App
// =============================================================
var app = express()
var PORT = process.env.PORT || 3000


// Sets up the Express app to handle data parsing
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.text())
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))


// handles web versus local DB connection
if (process.env.MONGODB_URI) {
	mongoose.connect(process.env.MONGODB_URI)
} else {
	mongoose.connect('mongodb://localhost/nyt')
}

var db = mongoose.connection

db.on('error', function(err) {
  console.log('Mongoose Error: ', err)
})

db.once('open', function() {
  console.log('Mongoose connection successful.')
})



// Serve static content for the app from the 'public' directory in the application directory.
app.use(express.static(process.cwd() + '/dist'))

// serves index.html
app.get('/', function(req, res) {
	res.send('./dist/index.html')
})

// pulls first 5 saved articles from the database and sorts by published date
app.get('/api/saved', function(req, res) {
	SavedArticles.find({}).sort([
			['published', 'descending']
		]).limit(5).exec(function(err, doc) {
			if (err) {
				console.log(err);
			}
			else {
				res.send(doc);
			}
		})
})

// adds new article to the database; need to convert date from string to date
app.post('/api/saved', function(req, res) {
	SavedArticles.create({
		title: req.body.article.title,
		published: Date.parse(req.body.article.published),
		url: req.body.article.url
	}, function(err) {
		if (err) {
			console.log(err);
		}
		else {
			res.send("Saved Search");
		}
	})
})

// deletes document from database based on title match
app.delete('/api/saved', function(req, res){
	SavedArticles.findOne({title: req.body.article.title}, function(err, doc) {
		if(err) {
			console.log(err)
		} else {
			doc.remove()
			res.send(doc)
		}
	})
})



app.listen(PORT, function () {
	console.log('App listening on PORT ' + PORT)
})