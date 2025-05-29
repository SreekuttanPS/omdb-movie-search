import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function FavouritesLink() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <Link
      to="/favourites"
      className={`inline-block text-white hover:text-red-500 hover:scale-105 transition-all duration-700 ${
        animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      }`}
    >
      FAVOURITES
    </Link>
  );
}

export default FavouritesLink;
