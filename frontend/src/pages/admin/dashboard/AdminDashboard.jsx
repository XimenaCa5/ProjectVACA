import React from "react";
import SearchBar from "../../../components/SearchBar";
import Logo from "../../../assets/logo_vaca.png";
import UserMenu from "../../../components/UserMenu";
import Sidebar from "../components/Sidebar";
import UsersTable from "../users/UsersTable";

export const AdminDashboard = () => {
  return (
    <div className="h-screen flex overflow-hidden">
      {/* SIDEBAR */}
      <aside className="w-64 h-screen border-r border-gray-500 bg-gray-900 flex flex-col items-start">
        {/* LOGO */}
        <img
          src={Logo}
          alt="Logo"
          className="px-3 py-3 h-20 rounded-3xl object-contain self-start"
        />
        <Sidebar />
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* NAVBAR */}
        <header className="h-14 border-b border-gray-500 flex items-center px-4">
          <SearchBar />
          <div className="ml-auto">
            <UserMenu />
          </div>
        </header>

        {/* CONTENT */}
        <main className="flex-1 overflow-y-auto p-4">
          <h2 className="text-lg font-semibold text-white mb-5">
            Gestión de Usuarios
          </h2>

          <UsersTable />
        </main>
      </div>
    </div>
  );
};
