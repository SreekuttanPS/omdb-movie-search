import LogoIcon from "assets/svg/LogoIcon";
import React from "react";
import Categories from "components/Categories";

const HomeSection: React.FC = () => {
  return (
    <>
      <Categories />
      <section className="flex flex-col items-center justify-center min-h-[30vh] md:min-h-[60vh] bg-black/75 bg-[url(/images/bg-gojo.webp)] bg-blend-multiply bg-cover bg-center bg-no-repeat">
        Welcome to &nbsp;
        <div className="text-red-600 font-bold text-xl flex items-center space-x-2">
          <LogoIcon className="w-6 h-6" />
          <span>MOVIEHUNTER</span>
        </div>
        <p>Select a category or search movies</p>
      </section>
    </>
  );
};

export default HomeSection;
