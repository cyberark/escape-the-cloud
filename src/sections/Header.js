import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { authenticate, deauthenticate } from '../actions/index'

import { AppBar, Toolbar } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { H6 } from '../components'
import styles from '../styles/index'
import logo from '../img/cyberark-logo.svg'

class Header extends Component {
	render() {
		const { classes, user, deauthenticate } = this.props
		return (
			<Fragment>
				<AppBar position='static' className={classes.appBar}>
					<Toolbar style={{ justifyContent: 'space-between' }}>
						<div style={{ display: 'flex' }}>
							<img
								src={logo}
								alt='logo'
								style={{ marginRight: 20, cursor: 'pointer' }}
								onClick={() => this.props.push('/')}
							/>
							<H6
								variant='h6'
								style={{ color: '#ffffff', marginBottom: 0 }}
								noWrap>
								Cloud Escape Room
							</H6>
						</div>
						<div style={{ display: 'flex' }}>
							{user && user.authState && user.userId ? (
								<H6
									variant='h6'
									style={{
										color: '#ffba33',
										marginRight: 24,
										marginBottom: 0
									}}
									noWrap>
									Welcome, <strong>{user.userId}</strong>
								</H6>
							) : (
								''
							)}
							{user && user.authState && user.userId ? (
								<H6
									variant='h6'
									style={{
										color: '#ffffff',
										cursor: 'pointer',
										marginBottom: 0
									}}
									onClick={() => deauthenticate()}>
									Sign Out
								</H6>
							) : (
								''
							)}
						</div>
					</Toolbar>
				</AppBar>
			</Fragment>
		)
	}
}

Header.propTypes = {
	classes: PropTypes.object.isRequired
}

const mapStateToProps = state => {
	return {
		user: state.rootReducer.user
	}
}

function mapDispatchToProps(dispatch) {
	return {
		authenticate: () => dispatch(authenticate()),
		deauthenticate: () => dispatch(deauthenticate())
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(Header))
