import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-white py-4 mt-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">STAY STRONG</h3>
            <p className="text-sm text-gray-400">Tu compañero para alcanzar tus metas de fitness</p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <p className="text-sm text-gray-400">
              &copy; {currentYear} STAY STRONG. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;