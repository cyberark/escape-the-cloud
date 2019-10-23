const bgImage = require('../img/bg-image-small.png')

const styles = theme => ({
	main: {
		backgroundColor: '#ffba00'
		// height: 'calc(100vh - 128px)'
	},
	appBar: {
		position: 'relative',
		paddingLeft: 25,
		paddingRight: 25,
		backgroundColor: '#1d1d1d'
	},
	icon: {
		marginRight: theme.spacing.unit * 2
	},
	heroUnit: {
		backgroundImage: `url(${bgImage})`,
		backgroundPosition: 'right',
		backgroundRepeat: 'no-repeat',
		height: '100%'
	},
	heroContent: {
		paddingLeft: 50,
		maxWidth: 700,
		padding: `70px 0 ${theme.spacing.unit * 6}px`
	},
	heroButtons: {
		marginTop: theme.spacing.unit * 4
	},
	layout: {
		width: 'auto',
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
		[theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
			width: 1100,
			marginLeft: 'auto',
			marginRight: 'auto'
		}
	},
	cardGrid: {
		padding: `${theme.spacing.unit * 8}px 0`
	},
	card: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column'
	},
	cardMedia: {
		paddingTop: '56.25%' // 16:9
	},
	cardContent: {
		flexGrow: 1
	},
	footer: {
		backgroundColor: '#1d1d1d',
		paddingLeft: 50,
		paddingTop: 20,
		paddingBottom: 20
	}
})

export default styles
