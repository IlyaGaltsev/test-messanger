const authMessages = {
  isUserNotFound: 'Проверьте правильность введённых данных',
  isEmptyName: 'Поле "имя" не заполнено',
  isBusyEmail: 'Данный логин уже используется',
  isEmptyEmail: 'Поле "логин" не заполнено',
  isEmptyPassword: 'Поле "пароль" не заполнено',
  isIncorrectPassword: 'Неверный пароль'
}

export const errorMessages = {
  ...authMessages,
  isNotAccessToken: 'access_token не был передан',
  faliedDecodeAccessToken: 'access_token не был расшифрован',
  isUserNotFoundInBase: 'Нет такого пользователя'
}
