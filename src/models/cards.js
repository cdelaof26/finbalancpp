import { host } from "./serverRute";

export async function getCard() {
  try {
    const response = await fetch(host + "auth/get-card", {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Response status: ${localStorage}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error en la función getSession:", error.message);
    throw error;
  }
}
