export async function login(username, password) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include", 
    body: JSON.stringify({ username, password })
  });

  if (!res.ok) {
    throw new Error("Credenciales inválidas");
  }

  return res.json();
}