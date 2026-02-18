import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { getUsers } from "./service/users.api";

export default function UsersTable({ onEdit, onDelete }) {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUsers() {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
    console.log("onEdit recibido:", onEdit, typeof onEdit);
  }, []);

  if (loading) return <p>Cargando usuarios...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <table className="w-full border border-gray-600 text-sm text-white">
      <thead className="bg-gray-800">
        <tr>
          <th className="border px-3 py-2">ID</th>
          <th className="border px-3 py-2">Usuario</th>
          <th className="border px-3 py-2">Email</th>
          <th className="border px-3 py-2">Activo</th>
          <th className="border px-3 py-2">Staff</th>
          <th className="border px-4 py-2 text-center">Acciones</th>
        </tr>
      </thead>

      <tbody>
        {users.map((user) => (
          <tr key={user.id} className="hover:bg-gray-700">
            <td className="border px-3 py-2">{user.id}</td>
            <td className="border px-3 py-2">{user.username}</td>
            <td className="border px-3 py-2">{user.email}</td>
            <td className="border px-3 py-2">{user.is_active ? "Sí" : "No"}</td>
            <td className="border px-3 py-2">{user.is_staff ? "Sí" : "No"}</td>
            {/* ACCIONES */}
            <td className="border px-4 py-2">
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => onEdit(user.id)}
                  className="text-blue-600 hover:text-blue-800 cursor-pointer"
                >
                  <Pencil size={16} />
                </button>

                <button
                  onClick={() => onDelete(user.id)}
                  className="text-red-600 hover:text-red-800 cursor-pointer"
                  title="Eliminar"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
