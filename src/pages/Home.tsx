import React from "react";
import Header from "components/v2/Header";
import Categories from "components/v2/Categories";
import Footer from "components/v2/Footer";
import HeroBanner from "components/v2/HeroBanner";
import { Outlet, useLocation } from "react-router-dom";
import HomeSection from "components/v2/HomeSection";

const Home: React.FC = () => {
  const location = useLocation();

  return (
    <>
      <Header />
      <HeroBanner />
      <Categories />
      {location.pathname === "/" ? <HomeSection /> : <Outlet context={location.pathname?.substring(1)} />}
      <Footer />
    </>
  );
};

export default Home;
