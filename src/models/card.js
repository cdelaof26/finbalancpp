export default class Card {
  constructor({ title = null, number, date, limit, type }) {
    this.title = title;
    this.number = number;
    this.type = type; // 1 = crédito, 2 = débito
    this.date = date; // Fecha de corte o fecha relacionada
    this.limit = limit; // Límite de crédito o saldo
  }

  // Método para validar que un valor sea positivo
  static validatePositive(value, fieldName) {
    if (isNaN(value) || value <= 0) {
      return `${fieldName} debe ser un número positivo.`;
    }
    return null;
  }

  // Método para validar que un campo no esté vacío
  static validateNotEmpty(value, fieldName) {
    if (!value || value.trim() === "") {
      return `${fieldName} no puede estar vacío.`;
    }
    return null;
  }

  // Método para validar los datos de la tarjeta
  validateData() {
    const errors = [];

    // Validar que el nombre no esté vacío
    const nameError = Card.validateNotEmpty(this.name, "El nombre");
    if (nameError) errors.push(nameError);

    // Validar que el número de tarjeta no esté vacío y sea numérico
    if (!this.number || isNaN(this.number)) {
      errors.push("El número de tarjeta es inválido.");
    }

    // Validar que el tipo de tarjeta sea válido (1 = crédito, 2 = débito)
    if (this.type !== 1 && this.type !== 2) {
      errors.push("El tipo de tarjeta debe ser 1 (crédito) o 2 (débito).");
    }

    // Validaciones específicas para tarjetas de crédito (type = 1)
    if (this.type === 1) {
      // Validar que la fecha de corte esté entre 1 y 31
      if (isNaN(this.date) || this.date < 1 || this.date > 31) {
        errors.push("La fecha de corte debe estar entre 1 y 31.");
      }

      // Validar que el límite de crédito sea positivo
      const limitError = Card.validatePositive(
        this.limit,
        "El límite de crédito",
      );
      if (limitError) errors.push(limitError);
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  // Método para obtener los datos de la tarjeta
  getData() {
    return {
      title: this.title,
      number: this.number,
      type: this.type,
      date: this.date,
      limit: this.limit,
    };
  }

  // Método para establecer nuevos datos en la tarjeta
  setData(name, number, date, limit, type) {
    if (name !== undefined) {
      this.title = title;
      console.log(this.name);
    }
    if (number !== undefined) this.number = number;
    if (type !== undefined) this.type = type;
    if (date !== undefined) this.date = date;
    if (limit !== undefined) this.limit = limit;
  }
}
