// src/components/Layout.jsx
import Navigation from './Navigation';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <div className="flex-grow bg-gray-50">
        {children}
      </div>
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Fitness Tracker - Todos los derechos reservados</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;