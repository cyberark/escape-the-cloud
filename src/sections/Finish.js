import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { H1 } from '../components'
import { withStyles } from '@material-ui/core/styles'
import styles from '../styles'
import finish from '../img/finish.svg'

class Finish extends Component {
	constructor() {
		super()
		this.state = {
			secretValue: null
		}
	}

	render() {
		const { classes } = this.props

		return (
			<div className={classes.heroUnit}>
				<div className={classes.heroContent}>
					<H1 align='center'>
						Great Job!
						<br />
						You Made It!
					</H1>
					<img
						src={finish}
						alt='finish'
						style={{
							display: 'block',
							marginLeft: 'auto',
							marginRight: 'auto',
							marginTop: 65,
							marginBottom: 65
						}}
					/>
				</div>
			</div>
		)
	}
}

Finish.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Finish)
