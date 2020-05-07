import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  root: {
    position: 'absolute',
    left: '50%',
    transform: 'translate(-50%, 0)',
    top: 20,
  },
  centerVertically: {
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
}))

export default useStyles
