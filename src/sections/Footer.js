import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { H6 } from '../components'

class Footer extends Component {
	render() {
		const { classes } = this.props
		return (
			<footer className={classes.footer}>
				<H6
					variant='subtitle1'
					align='left'
					component='p'
					style={{ color: '#ffffff', fontSize: 14, marginBottom: 0 }}>
					Copyright © 2019 CyberArk Software Ltd. All rights reserved
				</H6>
			</footer>
		)
	}
}

Footer.propTypes = {
	classes: PropTypes.object.isRequired
}

export default Footer
