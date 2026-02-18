import { useEffect, useState } from "react";
import UsersTable from "./UsersTable";
import EditUserModal from "./EditUserModal";
import { getUsers, updateUser } from "./service/users.api";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  const handleEdit = (user) => {
    console.log("EDITAR:", user);
    setSelectedUser(user);
  };

  const handleSave = async (updatedUser) => {
    await updateUser(updatedUser.id, updatedUser);
    setSelectedUser(null);
    loadUsers();
  };

  return (
    <>
      <UsersTable
        users={users}
        onEdit={handleEdit} // ✅ SIN paréntesis
        onDelete={handleDelete}
      />

      <EditUserModal
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
        onSave={handleSave}
      />
    </>
  );
}
