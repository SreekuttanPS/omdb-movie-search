import React from "react";
import Header from "components/v2/Header";
import Footer from "components/v2/Footer";
import HeroBanner from "components/v2/HeroBanner";
import { Outlet, useLocation } from "react-router-dom";
import HomeSection from "components/v2/HomeSection";

const Home: React.FC = () => {
  const location = useLocation();

  let currentPath = 'movie';
  if (location.pathname?.includes('/series')) {
    currentPath = 'series';
  } else if (location.pathname?.includes('/episode')) {
    currentPath = 'episode';
  }

  return (
    <>
      <Header />
      {!(location.pathname.includes('/info/')) ? <HeroBanner /> : null}
      {location.pathname === "/" ? <HomeSection /> : <Outlet context={currentPath} />}
      <Footer />
    </>
  );
};

export default Home;
