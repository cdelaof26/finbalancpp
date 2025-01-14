import { host } from "./serverRute";

export default class Earnigns {
  constructor({ montoIngreso, fuente, categoriaIngreso }) {
    this.categoriaIngreso = categoriaIngreso;
    this.montoIngreso = montoIngreso;
    this.fuente = fuente;
  }

  validateEarning() {
    const errors = [];
    const enteros = /^[0-9]+$/;
    if (this.categoriaIngreso === "") {
      errors.push("El título es obligatorio.");
    }

    if (this.montoIngreso === null) {
      errors.push("El valor es obligatorio.");
    }

    if (this.montoIngreso === "0" || !enteros.test(this.montoIngreso)) {
      errors.push("El valor debe ser un numero mayor a 0.");
    }

    if (this.fuente === "") {
      errors.push("El color es obligatorio.");
    }
    if (this.fuente.length != 7) {
      errors.push("El color debe ser en formato hexadecimal.");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  async registerEarning() {
    try {
      const inputs = {
        categoriaIngreso: this.categoriaIngreso,
        montoIngreso: this.montoIngreso,
        fuente: this.fuente,
      };
      const response = await fetch(host + "earnings", {
        method: "POST",
        body: JSON.stringify(inputs),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Response.status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error en la función registerEarning:", error.message);
      throw error;
    }
  }
}
