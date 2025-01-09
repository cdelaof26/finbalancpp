export default class Budget {
    constructor({ name = null, amount }) {
        this.name = name;
        this.amount = amount;
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

    // Método para validar los datos del presupuesto
    validateData() {
        const errors = [];

        // Validar que el nombre no esté vacío
        const nameError = Budget.validateNotEmpty(this.name, "El nombre");
        if (nameError) errors.push(nameError);

        // Validar que la cantidad sea positiva
        const amountError = Budget.validatePositive(this.amount, "La cantidad");
        if (amountError) errors.push(amountError);

        return {
            isValid: errors.length === 0,
            errors,
        };
    }

    // Método para obtener los datos del presupuesto
    getData() {
        return {
            name: this.name,
            amount: this.amount,
        };
    }

    // Método para establecer nuevos datos del presupuesto
    setData({ name, amount }) {
        if (name !== undefined) this.name = name;
        if (amount !== undefined) this.amount = amount;
    }
}
