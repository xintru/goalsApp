import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
  },
  subgoalList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, 50%)',
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
      marginLeft: '-1.5rem',
    },
  },
  listItem: {
    minWidth: 15,
  },
  description: {
    margin: '10px 0',
  },
}))

export default useStyles
