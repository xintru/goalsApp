import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
  },
  subgoalList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, 50%)',
    wordWrap: 'normal',
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
      marginLeft: '-1.5rem',
    },
  },
  listItem: {
    minWidth: 10,
  },
  subgoalListItem: {
    cursor: 'pointer',
  },
  subgoalHelperText: {
    textAlign: 'center',
  },
  addSubgoalButton: {
    margin: '1rem auto',
  },
  dialogTitle: {
    textAlign: 'center',
  },
  dialogContent: {
    minWidth: 220,
    minHeight: 60,
    textAlign: 'center',
  },
  dialogTextField: {
    width: '70%',
    margin: '0 auto',
  },
  dialogHelperText: {
    width: '80%',
    margin: '0.25rem auto 1rem',
  },
  dialogAddButton: {
    marginBottom: '0.5rem',
  },
}))

export default useStyles