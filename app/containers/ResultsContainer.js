var React = require('react')
var Results = require('../components/Results')

var ResultsContainer = React.createClass({
	handleArticleSave: function(e) {
		e.preventDefault()
		
		var obj = {
			title: e.target.getAttribute('data-title'),
			published: e.target.getAttribute('data-published'),
			url: e.target.getAttribute('data-url')
		}

		this.props.saveArticle(obj)
	},
	render: function() {
		return (
			<Results results={this.props.results} onArticleSave={this.handleArticleSave} />
		)
	}
})

module.exports = ResultsContainer