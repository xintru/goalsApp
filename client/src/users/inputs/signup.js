import { required, length, email } from '../../util/helpers/formValidation'

const signupInputs = [
  {
    id: 'username',
    label: 'Имя пользователя',
    errorHint: 'Обязательное поле.',
    validators: [required],
    type: 'text',
  },
  {
    id: 'email',
    label: 'Email',
    errorHint: 'Обязательное поле.',
    validators: [required, email],
    type: 'text',
  },
  {
    id: 'password',
    label: 'Пароль',
    errorHint: 'Длина пароля - 6 символов минимум.',
    validators: [required, length({ min: 6 })],
    type: 'password',
  },
  {
    id: 'confirmPassword',
    label: 'Подтверждение пароля',
    errorHint: 'Длина пароля - 6 символов минимум.',
    validators: [required, length({ min: 6 })],
    type: 'password',
  },
]

export default signupInputs

