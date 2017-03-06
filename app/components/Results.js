var React = require('react')
var PropTypes = React.PropTypes

var Results = React.createClass({
	propTypes: {
		results: PropTypes.array.isRequired,
		onArticleSave: PropTypes.func.isRequired
	},
	render: function() {
		return (
			<div className="row">
				<div className="col-sm-12">
					<div className="panel panel-default">
						<div className="panel-heading text-center">
							<h3 className="panel-title">Results</h3>
						</div>
						<div className="panel-body">

						{this.props.results.map(function(result, num) {
							return (
								<div key={num} className="well well-sm">
									<div className="row">
										<div className="col-sm-10"><a target="_blank" href={result.web_url}>{result.headline.main}</a></div>
										<div className="col-sm-2">
											<button 
												data-title={result.headline.main}
												data-published={result.pub_date}
												data-url={result.web_url}
												onClick={this.props.onArticleSave} 
												className="btn btn-sm btn-block btn-primary">Save</button>
										</div>
									</div>
								</div>
							)
						}.bind(this))}
							
						</div>
					</div>
				</div>
			</div>
		)
	}
})

module.exports = Results