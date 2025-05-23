import React from "react";

    const movies = [
      {
        title: "INTERSTELLAR",
        image: "/interstellar.jpg",
        alt: "Interstellar",
        description:
          "A team of intergalactic explorers must pass through a wormhole and be trapped in a space-time dimension...",
        genre: "SCI-FI",
      },
      {
        title: "DIVERGENT",
        image: "/divergent.jpg",
        alt: "Divergent",
        description:
          "In a world divided into factions based on kindness, Tris realized she was divergent and wouldn’t fit anywhere...",
        genre: "SCI-FI",
      },
      {
        title: "DUNE",
        image: "/dune.jpg",
        alt: "Dune",
        description:
          "A mythical and emotional hero's journey, Dune tells the story of Paul Atreides...",
        genre: "SCI-FI",
      },
      {
        title: "GRAVITY",
        image: "/gravity.jpg",
        alt: "Gravity",
        description:
          "Engineer Dr. Ryan Stone on his first mission to space. Unexpectedly, he and astronaut Matt Kowalski...",
        genre: "SCI-FI",
      },
    ];

    const MoviesList: React.FC = () => (
      <section className="px-4 py-6 max-w-5xl mx-auto">
        <div className="text-sm text-gray-400 mb-2">
          Sci-Fi Movies | Design created by Aqsa Salman
        </div>
        <div className="flex space-x-2 mb-6">
          <button className="bg-gray-700 px-3 py-1 rounded-full text-xs">
            Recommended
          </button>
          <button className="bg-gray-700 px-3 py-1 rounded-full text-xs">
            Most Popular
          </button>
        </div>
        <div className="space-y-6">
          {movies.map((movie) => (
            <div className="flex space-x-4" key={movie.title}>
              <img
                src={movie.image}
                alt={movie.alt}
                className="w-40 h-24 object-cover rounded"
              />
              <div>
                <h3 className="text-lg font-bold">
                  {movie.title}
                  <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded ml-2">
                    {movie.genre}
                  </span>
                </h3>
                <p className="text-sm text-gray-300">{movie.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    );

    export default MoviesList;