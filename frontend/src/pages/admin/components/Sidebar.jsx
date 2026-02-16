import { useState } from "react";
import { Users, ChevronDown, UserPlus, ShieldCheck } from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [openUsers, setOpenUsers] = useState(false);

  return (
    <aside className="w-64 min-h-screen border-r border-gray-200 px-3 py-4">
      {/* Título / Logo */}
      <div className="mb-6 px-2">
        <h2 className="text-lg font-semibold text-white">Admin Panel</h2>
      </div>

      {/* Menú */}
      <nav className="flex flex-col gap-1 text-sm">
        {/* Gestión de Usuarios */}
        <button
          onClick={() => setOpenUsers(!openUsers)}
          className="
            flex items-center justify-between px-3 py-2 rounded-lg
            text-white hover:bg-amber-100 hover:text-gray-600
            transition cursor-pointer
          "
        >
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5" />
            <span className="font-medium">Usuarios</span>
          </div>

          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              openUsers ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Submenú */}
        {openUsers && (
          <div className="ml-9 flex flex-col gap-1">
            <NavLink
              to="/admin/usuarios"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-md transition
                 ${
                   isActive
                     ? "bg-amber-200 text-amber-800"
                     : "text-white hover:bg-amber-100 hover:text-gray-600"
                 }`
              }
            >
              <Users className="w-4 h-4" />
              Listar usuarios
            </NavLink>

            <NavLink
              to="/admin/usuarios/crear"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-md transition
                 ${
                   isActive
                     ? "bg-amber-200 text-amber-800"
                     : "text-white hover:bg-amber-100 hover:text-gray-600"
                 }`
              }
            >
              <UserPlus className="w-4 h-4" />
              Crear usuario
            </NavLink>

            <NavLink
              to="/admin/roles"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-md transition
                 ${
                   isActive
                     ? "bg-amber-200 text-amber-800"
                     : "text-white hover:bg-amber-100 hover:text-gray-500"
                 }`
              }
            >
              <ShieldCheck className="w-4 h-4" />
              Roles y permisos
            </NavLink>
          </div>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
