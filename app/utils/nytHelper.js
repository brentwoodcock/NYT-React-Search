var axios = require('axios')

var apiKey = '88d7c2379a9c422e80de64853cd243b3'
// var queryString = 'https://api.nytimes.com/svc/search/v2/articlesearch.json'

var helpers = {
	// queries New York Times API; handles each combination of form entries regarding: topic, start year, end year
	// forces start to be Jan 1st and end to be Dec 31
	// only returns first page, first 10 hits
	getResults: function(params) {
		if (params[0].length > 0 && params[1].length == 0 && params[2].length == 0) {
			var queryString = 'https://api.nytimes.com/svc/search/v2/articlesearch.json'
			queryString += '?' + $.param({
				'api-key': apiKey,
				'q': params[0],
				'page': 0
			})
			return axios.get(queryString)
		} else if (params[0].length == 0 && params[1].length > 0 && params[2].length == 0) {
			var queryString = 'https://api.nytimes.com/svc/search/v2/articlesearch.json'
			queryString += '?' + $.param({
				'api-key': apiKey,
				'begin_date': params[1] + '0101',
				'page': 0
			})
			return axios.get(queryString)
		} else if (params[0].length == 0 && params[1].length == 0 && params[2].length > 0) {
			var queryString = 'https://api.nytimes.com/svc/search/v2/articlesearch.json'
			queryString += '?' + $.param({
				'api-key': apiKey,
				'end_date': params[2] + '1231',
				'page': 0
			})
			return axios.get(queryString)
		} else if (params[0].length > 0 && params[1].length > 0 && params[2].length == 0) {
			var queryString = 'https://api.nytimes.com/svc/search/v2/articlesearch.json'
			queryString += '?' + $.param({
				'api-key': apiKey,
				'q': params[0],
				'begin_date': params[1] + '0101',
				'page': 0
			})
			return axios.get(queryString)
		} else if (params[0].length > 0 && params[1].length == 0 && params[2].length > 0) {
			var queryString = 'https://api.nytimes.com/svc/search/v2/articlesearch.json'
			queryString += '?' + $.param({
				'api-key': apiKey,
				'q': params[0],
				'end_date': params[2] + '1231',
				'page': 0
			})
			return axios.get(queryString)
		} else if (params[0].length == 0 && params[1].length > 0 && params[2].length > 0) {
			var queryString = 'https://api.nytimes.com/svc/search/v2/articlesearch.json'
			queryString += '?' + $.param({
				'api-key': apiKey,
				'begin_date': params[1] + '0101',
				'end_date': params[2] + '1231',
				'page': 0
			})
			return axios.get(queryString)
		} else {
			var queryString = 'https://api.nytimes.com/svc/search/v2/articlesearch.json'
			queryString += '?' + $.param({
				'api-key': apiKey,
				'q': params[0],
				'begin_date': params[1] + '0101',
				'end_date': params[2] + '1231',
				'page': 0
			})
			return axios.get(queryString)
		}
	},
	// queries get route on server.js; makes call to MongoDB for data
	getSaved: function() {
		return axios.get('/api/saved')
	},
	// queries post route on server.js; updates MongoDB with new article
	postSaved: function(article) {
		return axios.post('/api/saved', {article: article})
	},
	// queries delete route on server.js; removes document from MongoDB
	// needed to use the expanded syntax to pass in the article data so we could search the DB for the title
	deleteSaved: function(article) {
		return axios({
			method: 'delete',
			url: '/api/saved',
			data: {
				article: article
			}
		})
	}
}

module.exports = helpers