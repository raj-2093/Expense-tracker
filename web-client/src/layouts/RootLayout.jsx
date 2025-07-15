import React from "react";
import WebRoutes from "../routes/WebRoutes";
import Navbar from "../components/navbar/Navbar";

export default function RootLayout({children}) {
  return (
    <div>
      {/* Navbar */}
      <Navbar/>

      {/* Routes */}
      <WebRoutes />


      {/* Footer */}
    </div>
  );
}
