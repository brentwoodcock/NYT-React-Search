var React = require('react')

var Main = React.createClass({
	render: function() {
		return (
			<div className="main-container">
				<nav className="navbar navbar-default navbar-fixed-top">
					<div className="container text-center">
						<h2>NYT React Search</h2>
					</div>
				</nav>
				{this.props.children}
			</div>
		)
	}
})

module.exports = Main