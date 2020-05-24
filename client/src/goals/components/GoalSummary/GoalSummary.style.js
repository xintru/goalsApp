import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
  },
  subgoalList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, 50%)',
  },
})

export default useStyles
