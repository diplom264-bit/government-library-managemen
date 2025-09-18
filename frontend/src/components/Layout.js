import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-blue-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-xl font-bold">Government Library Management</h1>
            <button
              onClick={handleLogout}
              className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="flex">
        <aside className="w-64 bg-white shadow-md min-h-screen">
          <nav className="mt-8">
            <Link
              to="/dashboard"
              className={`block px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 ${
                isActive('/dashboard') ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : ''
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/books"
              className={`block px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 ${
                isActive('/books') ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : ''
              }`}
            >
              Books
            </Link>
            <Link
              to="/employees"
              className={`block px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 ${
                isActive('/employees') ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : ''
              }`}
            >
              Employees
            </Link>
            <Link
              to="/transactions"
              className={`block px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 ${
                isActive('/transactions') ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : ''
              }`}
            >
              Issue/Return
            </Link>
            <Link
              to="/reports"
              className={`block px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 ${
                isActive('/reports') ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : ''
              }`}
            >
              Reports
            </Link>
          </nav>
        </aside>

        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;