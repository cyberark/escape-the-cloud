import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
require('../fonts/Kingthings_Printingkit-webfont.css')

const H1 = withStyles({
	root: {
		fontFamily: 'KinggsPrintingkit',
		fontSize: 50,
		fontWeight: 100,
		color: '#1d1d1d',
		marginBottom: 35
	}
})(Typography)

export default H1
