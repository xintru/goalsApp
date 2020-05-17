import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  FormHelperText,
  Button,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import useStyles from './GoalCustomization.style'

const SubGoalDialog = (props) => {
  const classes = useStyles()
  const { open, onClose, onChange, addSubgoal, newSubgoalName } = props
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle className={classes.dialogTitle}>
        Назовите ваш шаг:
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <form onSubmit={addSubgoal}>
          <TextField
            value={newSubgoalName}
            onChange={onChange}
            variant="outlined"
            inputProps={{ maxLength: 20 }}
            label="Название"
            className={classes.dialogTextField}
          />
          <FormHelperText
            className={classes.dialogHelperText}
            classes={{
              root: classes.subgoalHelperText,
            }}
          >
            Опишите свой дополнительный шаг. Максимальная длина - 20 символов.
          </FormHelperText>
          <Button
            disabled={!newSubgoalName.length}
            type="submit"
            variant="outlined"
            color="secondary"
            className={classes.dialogAddButton}
          >
            Добавить
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

SubGoalDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  addSubgoal: PropTypes.func.isRequired,
  newSubgoalName: PropTypes.string.isRequired,
}

export default SubGoalDialog
