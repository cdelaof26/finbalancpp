import { host } from "./serverRute";

export default class User {
  constructor({
    email,
    name = null,
    password,
    confirmPassword = null,
    phone = null,
    diviza,
  }) {
    this.email = email;
    this.name = name;
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.phone = phone;
    this.diviza = diviza;
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
        "La contraseña debe tener al menos un número, una letra minúscula, una mayúscula, un carácter especial y al menos 8 caracteres.",
      );
    }

    if (!validMode && this.password !== this.confirmPassword) {
      errors.push("Las contraseñas no coinciden.");
    }

    if (!validMode && !this.name) {
      errors.push("El nombre de usuario es obligatorio.");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  validateDataProfile() {
    const emailRegex = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i;
    const errors = [];

    if (this.name === "") {
      errors.push("El nombre de usuario es obligatorio.");
    }

    if (!emailRegex.test(this.email)) {
      errors.push("El correo electrónico no es válido.");
    }

    if (this.phone === "") {
      errors.push("El teléfono es obligatorio.");
    }
    if (this.phone.length != 10) {
      errors.push("El teléfono debe tener 10 números.");
    }
    if (!Number(this.phone)) {
      errors.push("El teléfono debe ser un número.");
    }

    if (this.diviza === "") {
      errors.push("La diviza es obligatoria.");
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

  async register() {
    try {
      const inputs = {
        name: this.name,
        email: this.email,
        password: this.password,
      };
      const response = await fetch(host + "auth/register", {
        method: "POST",
        body: JSON.stringify(inputs),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error en la función register:", error.message);
      throw error;
    }
  }

  async exist() {
    try {
      const inputs = { email: this.email, password: this.password };
      const response = await fetch(host + "auth/login", {
        method: "POST",
        body: JSON.stringify(inputs),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error en la función exist:", error.message);
      throw error;
    }
  }

  async logout() {
    try {
      const response = await fetch(host + "auth/logout", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error en la función logout:", error.message);
      throw error;
    }
  }
  async getSession() {
    try {
      const response = await fetch(host + "auth/me", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error en la función getSession:", error.message);
      throw error;
    }
  }

  async updatePassword(newPassword) {
    try {
      const inputs = {
        password: this.password,
        new_password: newPassword,
      };
      const response = await fetch(host + "auth/update-password", {
        method: "POST",
        body: JSON.stringify(inputs),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error en la función updatePassword:", error.message);
      throw error;
    }
  }

  async updateProfile() {
    try {
      const inputs = {
        email: this.email,
        name: this.name,
      };
      console.log(inputs);
      // phone: this.phone,
      // diviza: this.diviza,
      const response = await fetch(host + "auth/update-profile", {
        method: "POST",
        body: JSON.stringify(inputs),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error en la función updateProfile:", error.message);
      throw error;
    }
  }

  async getProfile() {
    try {
      const response = await fetch(host + "auth/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error en la función getProfile:", error.message);
      throw error;
    }
  }
}
