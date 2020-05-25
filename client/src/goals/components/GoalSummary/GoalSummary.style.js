import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
  },
  subgoalList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, 50%)',
  },
  description: {
    margin: '10px 0',
  }
})

export default useStyles
