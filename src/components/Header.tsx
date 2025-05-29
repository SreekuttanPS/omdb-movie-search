import LogoIcon from "assets/svg/LogoIcon";
import { isEmpty } from "helpers/utils";
import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "redux/redux-hooks";
import FavouritesLink from "components/FavouritesLink";

const Header: React.FC = () => {
  const favourites = useAppSelector(
    (state) => state.persistedState?.favourites?.present?.favourites
  );
  return (
    <header className="bg-black border-b border-gray-800 px-4 py-2 flex justify-between items-center">
      <Link
        to="/"
        className="text-red-600 font-bold text-xl flex items-center space-x-2 hover:scale-105 ease-in-out duration-500"
      >
        <LogoIcon className="w-6 h-6" />
        <span>MOVIEHUNTER</span>
      </Link>
      <div className="space-x-6 text-sm font-semibold hidden md:block">
        {!isEmpty(favourites) ? (
          <FavouritesLink />
        ) : null}
        {/* <button className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded">SIGN UP</button> */}
      </div>
    </header>
  );
};

export default Header;
