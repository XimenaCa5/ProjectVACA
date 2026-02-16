export async function register(username, password, email ) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/register/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify({
      username,
      password,
      email
    })
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.detail || "Error al registrarse");
  }

  return res.json();
}
