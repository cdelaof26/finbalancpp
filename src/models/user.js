import axios from "axios";
import { host } from "./serverRute";

export default class User {
  constructor({ email, password, username = null, confirmPassword = null }) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.action = null;
  }

  // Validar datos del usuario
  validateData(validMode) {
    const emailRegex = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i;
    const errors = [];
    const password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\s]).{8,}$/;

    if (!emailRegex.test(this.email)) {
      errors.push("El correo electrónico no es válido.");
    }

    if (!password.test(this.password) && !validMode) {
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

  setData(data, action) {
    if (typeof data === "object" && data !== null) {
      Object.keys(data).forEach((key) => {
        if (data[key] != null && this.hasOwnProperty(key)) {
          this[key] = data[key];
        }
      });
    }
    this.action = action;
  }

  getData() {
    return {
      username: this.username,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
      action: this.action,
    };
  }

  async register() {
    try {
      const inputs = this.getData();
      const response = await axios.post(host, inputs);
      return response.data;
    } catch (error) {
      console.error("Error durante el registro:", error);
      throw error;
    }
  }

  async exist() {
    try {
      const inputs = this.getData();
      const response = await axios.post(host, inputs);
      return response.data;
    } catch (error) {
      console.error("Error durante el inicio de sesion:", error);
      throw error;
    }
  }
}
