export default class User {
  constructor({ username = null, email, password, confirmPassword = null }) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.confirmPassword = confirmPassword;
  }

  // Validar datos del usuario
  validateData(validMode) {
    const emailRegex = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i;
    const errors = [];
    const password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\s]).{8,}$/;

    if (!emailRegex.test(this.email)) {
      errors.push("El correo electrónico no es válido.");
    }

    if (!password.test(this.password)) {
      errors.push(
        "La contraseña debe tener al menos un número, una letra minúscula, una mayúscula, un carácter especial y al menos 8 caracteres."
      );
    }

    if (!validMode && this.password !== this.confirmPassword) {
      errors.push("Las contraseñas no coinciden.");
    }

    if (!validMode && !this.username) {
      errors.push("El nombre de usuario es obligatorio.");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  setData(data) {
    if (typeof data === "object" && data !== null) {
      Object.keys(data).forEach((key) => {
        if (data[key] != null && this.hasOwnProperty(key)) {
          this[key] = data[key];
        }
      });
    }
  }

  getData() {
    return {
      username: this.username,
      email: this.email,
      password: this.password,
    };
  }
}
