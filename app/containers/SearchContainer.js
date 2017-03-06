var React = require('react')
var Search = require('../components/Search')
var nytHelper = require('../utils/nytHelper')

var SearchContainer = React.createClass({
	getInitialState: function() {
		return {
			topic: '',
			start: '',
			end: ''
		}
	},
	handleUpdateTopic: function(e) {
		this.setState({
			topic: e.target.value
		})
	},
	handleUpdateStart: function(e) {
		this.setState({
			start: e.target.value
		})
	},
	handleUpdateEnd: function(e) {
		this.setState({
			end: e.target.value
		})
	},
	handleSubmitSearch: function(e) {
		e.preventDefault()
		this.props.setTerms([this.state.topic, this.state.start, this.state.end])
		this.setState({
			topic: '',
			start: '',
			end: ''
		})
	},
	render: function() {
		return (
			<Search
			onSubmitSearch={this.handleSubmitSearch}
			onUpdateTopic={this.handleUpdateTopic}
			onUpdateStart={this.handleUpdateStart}
			onUpdateEnd={this.handleUpdateEnd} 
			topic={this.state.topic}
			start={this.state.start}
			end={this.state.end} />
		)
	}
})

module.exports = SearchContainer