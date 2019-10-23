import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import styles from '../styles'
import { YellowButton, H1, H6 } from '../components'
import smart from '../img/smart.svg'

class Smart extends Component {
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
					<H1 align='center'>So you think you are smart?</H1>
					<img
						src={smart}
						alt='smart'
						style={{
							display: 'block',
							marginLeft: 'auto',
							marginRight: 'auto',
							marginTop: 65,
							marginBottom: 65
						}}
					/>
					<H6 variant='h6' paragraph align='center'>
						Come on, don't play dirty. Instead of "Hacking" url addresses, try
						to focus on what's really important.
					</H6>
					<div className={classes.heroButtons}>
						<YellowButton
							variant='contained'
							color='primary'
							onClick={() => this.props.history.goBack()}>
							Back
						</YellowButton>
					</div>
				</div>
			</div>
		)
	}
}

Smart.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Smart)
