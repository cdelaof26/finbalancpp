// const BASE_URL = "http://localhost/api.php";

export async function sendToBackend(action, data) {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, ...data }),
    });

    const result = await response.json();
    return result;
    return { success: false, message: "conexion exitosa" };
  } catch (error) {
    console.error("Error al comunicarse con el servidor:", error);
    return { success: false, message: "Error de conexión con el servidor." };
  }
}
