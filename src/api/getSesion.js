import { backendHostPort } from "@/api/host";
import User from "@/models/user";

export async function getSesion(email,password) {
  const loginUser = new User({ email, password });
    
  const response = await fetch(backendHostPort + "",{
     method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, ...data }),
  });
}
