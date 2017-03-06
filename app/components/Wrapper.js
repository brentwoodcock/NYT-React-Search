var React = require('react')

var SearchContainer = require('../containers/SearchContainer')
var ResultsContainer = require('../containers/ResultsContainer')
var SavedContainer = require('../containers/SavedContainer')

var nytHelper = require('../utils/nytHelper')

var Wrapper = React.createClass({
	getInitialState: function() {
		return {
			topic: '', 			// for search component
			start: '', 			// for search component
			end: '',    		// for search component
			searchResults: [],	// for results component		
			article: {			// from results component to save component
				title: '',
				published: '',
				url: ''
			},
			savedArticles: [],	// for saved component
			deleteArticle: {}	// for saved component
		}
	},
	// runs when the component first loads
	// pulls in saved articles from the database on load
	componentDidMount: function() {
		nytHelper.getSaved().then(function(response) {
			if (response.data !== this.state.savedArticles) {
				this.setState({
					savedArticles: response.data,
				})
			}
		}.bind(this))
	},
	// If the component changes (namely the state changes) (i.e. if a search is entered, article saved, or article deleted)
	componentDidUpdate: function(prevProps, prevState) {
		// checks with old state for search terms; if changed, query NYT for results and update result state to display
		if (prevState.topic == this.state.topic && prevState.start == this.state.start && prevState.end == this.state.end) {
			// does nothing if search terms haven't changed, otherwise query
		} else {
			nytHelper.getResults([this.state.topic, this.state.start, this.state.end])
				.then(function(results) {
					if (results.data.response.docs.slice(0,5) !== this.state.searchResults) {
						this.setState({
							searchResults: results.data.response.docs.slice(0,5)
						})
					}
				}.bind(this)) // binds are necessary to associate this with the context of the component rather than the function
		}

		// checks with old state for article state; if changed because an article was saved, post it to the database and update the view for saved articles by updating the state
		if (prevState.article.title == this.state.article.title) {
			// if state hasn't changed, do nothing
		} else {
			nytHelper.postSaved(this.state.article).then(function() {
				nytHelper.getSaved().then(function(response) {
					if (response.data !== this.state.savedArticles) {
						this.setState({
							savedArticles: response.data
						})
					}
				}.bind(this))
			}.bind(this))
		}

		// checks with old state for the deleted article info; if it's changed, run call to delete that article based on title; update saved articles so the deleted article is not displayed
		if (prevState.deleteArticle == this.state.deleteArticle) {
			// if state hasn't changed, do nothing
		} else {
			nytHelper.deleteSaved(this.state.deleteArticle).then(function() {
				nytHelper.getSaved().then(function(response) {
					if (response.data !== this.state.savedArticles) {
						this.setState({
							savedArticles: response.data
						})
					}
				}.bind(this))
			}.bind(this))
		}
	},
	// This function allows state from the search component to update the parent state, so the parent can query
	setTerms: function(terms) {
		this.setState({
			topic: terms[0],
			start: terms[1],
			end: terms[2]
		});
	},
	// allows state from the results component to update parent state so the parent can query the server to save article
	saveArticle: function(article) {
		this.setState({
			article: {
				title: article.title,
				published: article.published,
				url: article.url
			}
		})
	},
	// allows state from the saved component to update parent state so parent can query the server to remove article
	deleteArticle: function(article) {
		var index = article.index
		this.setState({
			deleteArticle: this.state.savedArticles[index]
		})
	},
	render: function() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-sm-8 col-sm-offset-2">
						<SearchContainer setTerms={this.setTerms} />
					</div>
				</div>
				<div className="row">
					<div className="col-sm-8 col-sm-offset-2">
						<ResultsContainer results={this.state.searchResults} saveArticle={this.saveArticle} />
					</div>
				</div>
				<div className="row">
					<div className="col-sm-8 col-sm-offset-2">
						<SavedContainer savedArticles={this.state.savedArticles} deleteArticle={this.deleteArticle} />
					</div>
				</div>								
			</div>
		)
	}
})

module.exports = Wrapper