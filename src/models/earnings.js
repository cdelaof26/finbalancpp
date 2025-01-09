export default class Earnings {
    constructor({ earning = 0, modify = 0, discount = 0 }) {
        this.earning = earning; // Ingreso
        this.modify = modify;  // Modificación
        this.discount = discount; // Descuento
    }

    // Método para validar que un valor sea positivo
    static validatePositive(value, fieldName) {
        if (isNaN(value) || value <= 0) {
            return `${fieldName} debe ser un número positivo.`;
        }
        return null;
    }

    // Método para procesar los datos según el ingreso, modificación o descuento
    processTransaction() {
        const errors = [];

        if (this.earning > 0) {
            // Validar ingreso positivo
            const earningError = Earnings.validatePositive(this.earning, "El ingreso");
            if (earningError) errors.push(earningError);
            if (errors.length === 0) {
                return { type: "earning", amount: this.earning, message: "Ingreso añadido correctamente." };
            }
        } else if (this.modify > 0) {
            // Validar modificación positiva
            const modifyError = Earnings.validatePositive(this.modify, "La modificación");
            if (modifyError) errors.push(modifyError);
            if (errors.length === 0) {
                return { type: "modify", amount: this.modify, message: "Modificación realizada correctamente." };
            }
        } else if (this.discount > 0) {
            // Validar descuento positivo
            const discountError = Earnings.validatePositive(this.discount, "El descuento");
            if (discountError) errors.push(discountError);
            if (errors.length === 0) {
                return { type: "discount", amount: this.discount, message: "Descuento aplicado correctamente." };
            }
        } else {
            errors.push("Debes proporcionar un ingreso, modificación o descuento válido y positivo.");
        }

        return {
            isValid: errors.length === 0,
            errors,
        };
    }

    // Método para establecer nuevos datos
    setData({ earning, modify, discount }) {
        if (earning !== undefined) this.earning = earning;
        if (modify !== undefined) this.modify = modify;
        if (discount !== undefined) this.discount = discount;
    }

    // Método para obtener los datos actuales
    getData() {
        return {
            earning: this.earning,
            modify: this.modify,
            discount: this.discount,
        };
    }
}
