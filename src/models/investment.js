export default class Investment {
    constructor({ name = null, type, performance = null, term, amount }) {
        this.name = name;
        this.type = type;
        this.performance = performance; // Rendimiento
        this.term = term; // Plazo
        this.amount = amount; // Cantidad invertida
    }

    // Método para validar que un valor sea positivo
    static validatePositive(value, fieldName, errors) {
        if (isNaN(value) || value <= 0) {
            errors.push(`${fieldName} debe ser un número positivo.`);
        }
    }

    // Método para validar que un campo no esté vacío
    static validateNotEmpty(value, fieldName, errors) {
        if (!value || value.trim() === "") {
            errors.push(`${fieldName} no puede estar vacío.`);
        }
    }

    // Método para validar los datos de la inversión
    validateData() {
        const errors = [];
        
        // Validar que el nombre y el tipo no estén vacíos
        Investment.validateNotEmpty(this.name, "El nombre", errors);
        Investment.validateNotEmpty(this.type, "El tipo", errors);

        // Validar que el rendimiento, plazo y cantidad sean positivos
        Investment.validatePositive(this.performance, "El rendimiento", errors);
        Investment.validatePositive(this.term, "El plazo", errors);
        Investment.validatePositive(this.amount, "La cantidad", errors);

        return {
            isValid: errors.length === 0,
            errors
        };
    }

    // Método para obtener los datos de la inversión
    getData() {
        return {
            name: this.name,
            type: this.type,
            performance: this.performance,
            term: this.term,
            amount: this.amount,
        };
    }

    // Método para establecer nuevos datos de la inversión
    setData({ name, type, performance, term, amount }) {
        if (name !== undefined) this.name = name;
        if (type !== undefined) this.type = type;
        if (performance !== undefined) this.performance = performance;
        if (term !== undefined) this.term = term;
        if (amount !== undefined) this.amount = amount;
    }
}
