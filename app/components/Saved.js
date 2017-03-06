var React = require('react')
var PropTypes = React.PropTypes

var Saved = React.createClass({
	propTypes: {
		savedArticles: PropTypes.array.isRequired,
		onArticleDelete: PropTypes.func.isRequired
	},
	render: function() {
		return (
			<div className="panel panel-default">
				<div className="panel-heading text-center">
					<h3 className="panel-title">Saved Container</h3>
				</div>
				<div className="panel-body">

				{this.props.savedArticles.map(function(article, num) {
					return (
						<div key={num} className="well well-sm">
							<div className="row">
								<div className="col-sm-10"><a target="_blank" href={article.url}>{article.title}</a></div>
								<div className="col-sm-2">
									<button 
										// id="button1" 
										data-index={num}
										data-title={article.title}
										data-published={article.published}
										data-url={article.url}
										onClick={this.props.onArticleDelete} 
										className="btn btn-sm btn-block btn-danger">Delete</button>
								</div>
							</div>
						</div>
					)
				}.bind(this))}
				</div>
			</div>
		)
	}
})

module.exports = Saved