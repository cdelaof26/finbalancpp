import { sendToBackend } from "./userService.js";
import User from "../models/user.js";

export const handleLogin = async ({ email, password }) => {
  const loginUser = new User({ email, password });
  // Enviar al back
  const response = await sendToBackend("login", loginUser.getData());
  if (response.success) {
    console.log("Inicio de sesión exitoso:", response.message);
    return true;
  }
  console.error("Error del servidor:", response.message);
};

export const handleRegistration = async ({
  username,
  email,
  password,
  confirmPassword,
}) => {
  const newUser = new User({ username, email, password, confirmPassword });
  // Enviar al back
  const response = await sendToBackend("register", newUser.getData());
  if (response.success) {
    console.log("Inicio de sesión exitoso:", response.message);
    return true;
  }
  console.error("Error del servidor:", response.message);
};
