var React = require('react')
var Saved = require('../components/Saved')

var SavedContainer = React.createClass({
	handleArticleDelete: function(e) {
		e.preventDefault()

		var obj = {
			title: e.target.getAttribute('data-title'),
			published: e.target.getAttribute('data-published'),
			url: e.target.getAttribute('data-url'),
			index: e.target.getAttribute('data-index')
		}
		
		this.props.deleteArticle(obj)
	},
	render: function() {
		return (
			<Saved savedArticles={this.props.savedArticles} onArticleDelete={this.handleArticleDelete} />
		)
	}
})

module.exports = SavedContainer