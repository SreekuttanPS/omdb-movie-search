import React from "react";

    const HeroBanner: React.FC = () => (
      <section
        className="relative text-center py-12 bg-cover bg-center"
        style={{ backgroundImage: "url('/ironman-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div className="relative z-10">
          <h1 className="text-red-600 text-sm">MARVEL STUDIOS</h1>
          <h2 className="text-4xl font-bold">IRON MAN 4</h2>
          <p className="text-gray-400">THE NEXT NEUTRON</p>
          <div className="mt-4 space-x-4">
            <button className="bg-red-600 px-6 py-2 rounded-full hover:bg-red-700">PLAY</button>
            <button className="bg-gray-800 px-6 py-2 rounded-full hover:bg-gray-700">WATCH TRAILER</button>
          </div>
        </div>
      </section>
    );

    export default HeroBanner;