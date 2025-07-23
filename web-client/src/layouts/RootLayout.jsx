import React from "react";
import WebRoutes from "../routes/WebRoutes";
import Navbar from "../components/navbar/Navbar";
import { useLocation } from "react-router-dom";

export default function RootLayout({ children }) {
  const location = useLocation();
  return (
    <div>
      {/* Navbar */}

      {!(
        location.pathname.includes("login") ||
        location.pathname.includes("signup")
      ) && <Navbar />}

      <div className="min-h-[calc(100vh-65px)] relative routes-wrapper">
        {/* Routes */}
        <WebRoutes />
      </div>

      {/* Footer */}
    </div>
  );
}
