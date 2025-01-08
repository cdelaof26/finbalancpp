
export default class User {
    constructor({ username = null, email, password, confirmPassword = null }) {
      this.username = username;
      this.email = email;
      this.password = password;
      this.confirmPassword = confirmPassword;
    }
  
    // Validar datos del usuario
    validateData(loginMode) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const errors = [];
  
      if (!emailRegex.test(this.email)) {
        errors.push("El correo electrónico no es válido.");
      }
  
      if (this.password.length < 6) {
        errors.push("La contraseña debe tener al menos 6 caracteres.");
      }
  
      if (!loginMode && this.password !== this.confirmPassword) {
        errors.push("Las contraseñas no coinciden.");
      }
  
      if (!loginMode && !this.username) {
        errors.push("El nombre de usuario es obligatorio.");
      }
  
      return {
        isValid: errors.length === 0,
        errors,
      };
    }

    // Simular enviar datos a la base de datos (puedes reemplazar esto con una solicitud real)
    async saveToDatabase() {
      // Aquí normalmente harías una llamada a tu API o base de datos
      try {
        const response = await fetch("https://your-api.com/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: this.username,
            email: this.email,
            password: this.password,
          }),
        });
  
        if (!response.ok) {
          throw new Error("Error al guardar los datos del usuario.");
        }
  
        const result = await response.json();
        return {
          success: true,
          data: result,
        };
      } catch (error) {
        return {
          success: false,
          message: error.message,
        };
      }
    }
  
    // Simular verificación de usuario (inicio de sesión)
    async verifyCredentials() {
      // Aquí normalmente harías una llamada a tu API o base de datos
      try {
        const response = await fetch("https://your-api.com/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
          }),
        });
  
        if (!response.ok) {
          throw new Error("Credenciales inválidas.");
        }
  
        const result = await response.json();
        return {
          success: true,
          data: result,
        };
      } catch (error) {
        return {
          success: false,
          message: error.message,
        };
      }
    }
  }
  
  const persona = new User({
    username: "ivan",
    email: "jaime@gmilcom",
    password: "pass",
    confirmPassword: "pass",
  });
  

console.log(persona.validateData(false))