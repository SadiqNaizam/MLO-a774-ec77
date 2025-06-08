import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  console.log("Rendering Footer");

  return (
    <footer className="bg-gray-100 border-t border-gray-200 py-6 text-center text-sm text-gray-600 ml-64"> {/* ml-64 to offset sidebar width */}
      <p>&copy; {currentYear} Your Company Name. All rights reserved.</p>
      {/* You can add more links or information here if needed */}
    </footer>
  );
};

export default Footer;