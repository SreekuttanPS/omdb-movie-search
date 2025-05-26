import LogoIcon from "assets/svg/LogoIcon";
import React from "react";
import { Link } from "react-router-dom";

    const Header: React.FC = () => (
      <header className="bg-black border-b border-gray-800 px-4 py-2 flex justify-between items-center">
        <Link to="/" className="text-red-600 font-bold text-xl flex items-center space-x-2">
          <LogoIcon className="w-6 h-6" />
          <span>MOVIEHUNTER</span>
        </Link>
        <nav className="space-x-6 text-sm font-semibold hidden md:block">
          <a href="#" className="text-white hover:text-red-500">MOVIES</a>
          <a href="#" className="text-white hover:text-red-500">SERIES</a>
          <a href="#" className="text-white hover:text-red-500">ACCOUNT</a>
          <a href="#" className="text-white hover:text-red-500">PREMIUM</a>
          <button className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded">SIGN UP</button>
        </nav>
      </header>
    );

    export default Header;