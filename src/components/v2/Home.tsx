import React from "react";
import Header from "components/v2/Header";
import HeroBanner from "components/v2/HeroBanner";
import Categories from "components/v2/Categories";
import MoviesList from "components/v2/MoviesList";
import Footer from "components/v2/Footer";

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <HeroBanner />
      <Categories />
      <MoviesList />
      <Footer />
    </>
  );
};

export default Home;
