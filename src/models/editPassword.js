import { host } from "./serverRute";
export default class Edit {
  constructor({ password, newPassword, confirmPassword, action }) {
    this.password = password;
    this.newPassword = newPassword;
    this.confirmPassword = confirmPassword;
    this.action = action;
  }

  validateData() {
    const errors = [];

    // Validar que todos los campos están completos
    if (!this.password) errors.push("La contraseña actual es requerida.");
    if (!this.newPassword) errors.push("La nueva contraseña es requerida.");
    if (!this.confirmPassword)
      errors.push("Confirmar contraseña es requerido.");

    // Validar que las contraseñas coincidan
    if (this.newPassword !== this.confirmPassword) {
      errors.push("La nueva contraseña y la confirmación no coinciden.");
    }
    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  async changePassword() {
    try {
      const inputs = this.getData();
      console.log("Datos enviados:", inputs); // Verifica que los datos estén correctamente definidos antes de enviarlos
      const response = await fetch(host, {
        method: "POST",
        body: JSON.stringify(inputs),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error durante el cambio de contraseña:", error);
      throw error;
    }
  }

  getData() {
    return {
      password: this.password, // Asegúrate de que `this.password` tenga un valor
      newPassword: this.newPassword, // Asegúrate de que `this.newPassword` tenga un valor
      action: this.action,
    };
  }

  setData({ password, newPassword, confirmPassword }) {
    if (password !== undefined) this.password = password;
    if (newPassword !== undefined) this.newPassword = newPassword;
    if (confirmPassword !== undefined) this.confirmPassword = confirmPassword;
  }
}
