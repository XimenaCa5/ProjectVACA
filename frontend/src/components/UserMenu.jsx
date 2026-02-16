import { useState, useRef, useEffect } from "react";
import { ChevronDown, LogOut, User } from "lucide-react";

const UserMenu = ({ userName = "Paula Carrillo", onLogout }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* Botón usuario */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 cursor-pointer"
      >
        {/* Avatar */}
        <div className="w-9 h-9 rounded-full bg-amber-500 flex items-center justify-center text-white font-semibold">
          {userName.charAt(0)}
        </div>

        {/* Nombre */}
        <span className="hidden md:block font-medium text-white">
          {userName}
        </span>

        <ChevronDown className="w-4 h-4 text-gray-500" />
      </button>

      {/* Menú desplegable */}
      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white border rounded-xl shadow-lg z-50">
          <ul className="py-2 text-sm text-gray-700">
            <li>
              <button
                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                onClick={() => {
                  setOpen(false);
                  // navegación a perfil
                }}
              >
                <User className="w-4 h-4" />
                Ver perfil
              </button>
            </li>

            <li className="border-t my-1"></li>

            <li>
              <button
                className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50"
                onClick={onLogout}
              >
                <LogOut className="w-4 h-4" />
                Cerrar sesión
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
