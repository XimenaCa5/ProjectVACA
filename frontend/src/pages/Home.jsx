import React from "react";

export default function Home () {
  const token = localStorage.getItem("access_token");

  return (
    <div>
      <p className="text-white">{token ? token.substring(0, 20) + "..." : "No hay token"}</p>
    </div>
  );
}
