import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  root: {
    height: '15rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  textField: {
    width: '100%',
  },
}))

export default useStyles
