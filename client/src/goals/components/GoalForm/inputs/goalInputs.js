import { required, length } from '../../../../util/helpers/formValidation'

const goalInputs = [
  {
    id: 'title',
    label: 'Название',
    errorHint: 'Обязательное поле. Максимальная длина - 40 символов.',
    validators: [required, length({ max: 40 })],
    type: 'text',
  },
  {
    id: 'description',
    label: 'Описание',
    errorHint: 'Обязательное поле. Максимальная длина - 100 символов.',
    validators: [required, length({ max: 100 })],
    type: 'textarea',
  },
]

export default goalInputs
