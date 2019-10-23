import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
require('../fonts/Kingthings_Printingkit-webfont.css')

const SPAN = withStyles({
	root: {
		fontFamily: 'KinggsPrintingkit',
		fontSize: 30,
		fontWeight: 100,
		color: '#1d1d1d'
	}
})(Typography)

export default SPAN
