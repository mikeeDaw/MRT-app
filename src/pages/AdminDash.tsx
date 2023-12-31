import React from "react";
import { Navbar, Sidebar } from "../components/dashboard";

const AdminDash = () => {
  return (
    <>
      <div className="flex flex-col">
        <Navbar />
        <div className="flex">
          <Sidebar />
        </div>
      </div>
    </>
  );
};

export default AdminDash;
