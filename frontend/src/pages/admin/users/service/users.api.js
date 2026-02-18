export async function getUsers() {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/`, {
    method: "GET",
    credentials: "include", // 👈 CLAVE
  });

  if (!res.ok) {
    throw new Error("No autorizado");
  }

  return res.json();
}


export async function updateUser(id, data) {
  const token = localStorage.getItem("access");

  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/users/${id}/`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    throw new Error("Error al actualizar usuario");
  }

  return res.json();
}
