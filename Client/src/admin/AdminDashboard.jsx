import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // modern icons
import "../css/admin/layout.css";

const AdminDashboard = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="layout-container">
      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <h2 className="logo">{isOpen ? "TaskFlow Admin" : "TM"}</h2>
          <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <nav className="sidebar-links">
          <Link to="createUser">Create User</Link>
          <Link to="assignTask">Assign Task</Link>
          <Link to="see-report">View Reports</Link> 
          <Link to="viewUsers">View Users</Link>
          <Link to="contacts">All Contact Leads</Link>

        </nav>
      </aside>

      {/* Main content */}
      <main className="content-area">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;