 var React = require('react')
 var PropTypes = React.PropTypes

 var Search = React.createClass({
 	propTypes: {
 		onSubmitSearch: PropTypes.func.isRequired,
 		onUpdateTopic: PropTypes.func.isRequired,
 		onUpdateStart: PropTypes.func.isRequired,
 		onUpdateEnd: PropTypes.func.isRequired,
 		topic: PropTypes.string.isRequired,
 		start: PropTypes.string.isRequired,
 		end: PropTypes.string.isRequired
 	},
 	render: function() {
 		return (
			<div className="panel panel-default">
				<div className="panel-heading text-center">
					<h3 className="panel-title">Search</h3>
				</div>
				<div className="panel-body">

					<form onSubmit={this.props.onSubmitSearch}>
						<div className="form-group">
							<label>Topic</label>
							<input type="text" 
								className="form-control"
								id="searchTopic" 
								placeholder="Please enter a topic here..."
								onChange={this.props.onUpdateTopic}
								value={this.props.topic}
								type="text" />
						</div>
						<div className="form-group">
							<label>Start Year</label>
							<input type="number" 
								className="form-control"
								id="startYear"
								placeholder="Please enter a starting year..."
								onChange={this.props.onUpdateStart}
								value={this.props.start}
								type="text" />
						</div>
						<div className="form-group">
							<label>End Year</label>
							<input type="number" 
								className="form-control" 
								id="endYear"
								placeholder="Please enter an end year..."
								onChange={this.props.onUpdateEnd}
								value={this.props.end}
								type="text" />
						</div>
							<button type="submit" className="btn btn-block btn-success">Submit</button>
					</form>

				</div>
			</div>
 		)
 	}
 })

 module.exports = Search