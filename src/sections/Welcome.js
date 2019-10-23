import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { BlackButton } from '../components'
import { H1, H6 } from '../components'
import styles from '../styles'

class Welcome extends Component {
	constructor() {
		super()
		this.state = {
			secretValue: null
		}
	}

	render() {
		const { classes, push, tasks } = this.props

		return (
			<div className={classes.heroUnit}>
				<div className={classes.heroContent}>
					<H1 style={{ color: '#ffffff', marginBottom: 30 }}>Welcome to</H1>
					<H1>CYBERARK CLOUD ESCAPE ROOM</H1>
					<H6 color='textSecondary' paragraph>
						{tasks['Task1']['Link']
							? 'During the missions, you visit the most anticipated AWS Services, entering the most dangerous places on the cloud, trying to prevent the enemy secret intelligence from decrypting and discovering sensitive information about our homeland, while staying under the radar. Are you ready to start? if so, press the Start button.'
							: "We haven't started yet, but while you're waiting for the challenge to start, you can play a nice, retro game"}
					</H6>
					<div className={classes.heroButtons}>
						{tasks['Task1']['Link'] ? (
							<BlackButton onClick={() => push('/task1')}>START >></BlackButton>
						) : (
							<BlackButton
								onClick={() => window.open('https://playsnake.org/')}>
								PLAY SNAKE >>
							</BlackButton>
						)}
					</div>
				</div>
			</div>
		)
	}
}

Welcome.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Welcome)
