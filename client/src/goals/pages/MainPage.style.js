import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: 'calc(100vh - 64px)',
    backgroundColor: theme.palette.white.main,
    color: theme.palette.primary.textColor,
  },
}))

export default useStyles
