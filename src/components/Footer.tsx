import React from "react";

const Footer: React.FC = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <footer className="text-center text-sm text-gray-500 py-4 border-t border-gray-800">
      <p>All Right Reserved &copy;{year} | MOVIEHUNTER | Sreekuttan P S</p>
    </footer>
  );
};

export default Footer;
