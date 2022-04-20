const validationMessages = {
  common: {
    missingUserId: 'UserId no encontrado',
    userNotfound: 'Usuario no encontrado',
    wrongCredentials: 'user/password incorrecto',
    required: 'Es requerido',
    numeric: 'Los valores ingresados deben ser numéricos.',
    error: {
      required: 'El campo :attribute es requerido',
      min: 'El :attribute debe contener al menos :min elementos ',
      max: 'La cantidad máxima de caracteres es :max',
      array: 'Debes enviar una variedad de emails',
      email: 'Cada uno debe ser un email',
      between: 'El valor ingresado debe encontrarse entre :min y :max',
      before: 'La fecha hasta no puede ser anterior a la fecha desde',
    },
  },
  user: {
    userNotExists: 'El usuario no existe',
    wrongPassword: 'El usuario o contraseña es incorrecto',
    errorHashing: 'Ocurrió un error generando el hash',
  }
};

export { validationMessages };
