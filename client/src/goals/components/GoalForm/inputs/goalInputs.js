import { required, length } from '../../../../util/helpers/formValidation'

const goalInputs = [
  {
    id: 'title',
    label: 'Название',
    errorHint: 'Обязательное поле',
    validators: [required, length({ max: 40 })],
    type: 'text',
  },
  {
    id: 'description',
    label: 'Описание',
    errorHint: 'Обязательное поле',
    validators: [required, length({ max: 100 })],
    type: 'textarea',
  },
]

export default goalInputs
