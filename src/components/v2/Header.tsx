import LogoIcon from "assets/svg/LogoIcon";
import React from "react";
import { Link } from "react-router-dom";

    const Header: React.FC = () => (
      <header className="bg-black border-b border-gray-800 px-4 py-2 flex justify-between items-center">
        <Link to="/" className="text-red-600 font-bold text-xl flex items-center space-x-2 hover:scale-105 ease-in-out duration-500">
          <LogoIcon className="w-6 h-6" />
          <span>MOVIEHUNTER</span>
        </Link>
        <div className="space-x-6 text-sm font-semibold hidden md:block">
          <Link to="/" className="inline-block text-white hover:text-red-500 hover:scale-105 ease-in-out duration-300">FAVOURITES</Link>
          <button className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded">SIGN UP</button>
        </div>
      </header>
    );

    export default Header;