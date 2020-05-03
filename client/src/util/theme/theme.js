import { createMuiTheme } from '@material-ui/core/styles'

const outerTheme = createMuiTheme({
  palette: {
    whiteBg: '#eee',
    primary: {
      main: '#673AB7',
      textColor: '#212121',
    },
    secondary: {
      main: '#FF5722',
      textColor: '#757575',
    },
  },
})

export default outerTheme
