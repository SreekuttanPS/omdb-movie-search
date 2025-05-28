import React from "react";
import Header from "components/Header";
import Footer from "components/Footer";
import HeroBanner from "components/HeroBanner";
import { Outlet, useLocation } from "react-router-dom";
import HomeSection from "components/HomeSection";

const Home: React.FC = () => {
  const location = useLocation();

  return (
    <>
      <Header />
      {!(location.pathname.includes('/info/')) ? <HeroBanner /> : null}
      {location.pathname === "/" ? <HomeSection /> : <Outlet />}
      <Footer />
    </>
  );
};

export default Home;
