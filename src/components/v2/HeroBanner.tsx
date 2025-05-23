import NextIcon from "assets/svg/NextIcon";
import PlayIcon from "assets/svg/PlayIcon";
import PreviosIcon from "assets/svg/PreviosIcon";
import { useRef, useState, useEffect, JSX } from "react";

type HeroBannerItem = {
  [key: number]: {
    title: string;
    content: string;
    image: string;
  };
};

const items: HeroBannerItem = {
  1: {
    title: "IRON MAN 4",
    content: "THE NEXT NEUTRON",
    image: "/src/assets/images/iron-man.webp",
  },
  2: {
    title: "DOCTOR STRANGE",
    content: "MULTIVERSE OF MADNESS",
    image: "/src/assets/images/dr-strange.webp",
  },
  3: {
    title: "BLACK PANTHER",
    content: "WAKANDA FOREVER",
    image: "/src/assets/images/black-panther.webp",
  },
};

export default function HeroBanner(): JSX.Element {
  const [current, setCurrent] = useState<number>(1);

  useEffect(() => {
    const interval = setInterval(() => {
      if (current === 3) {
        setCurrent(1);
      } else {
        setCurrent((prev) => prev + 1);
      }
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, [current]);

  return (
    <section className="flex justify-center items-center text-center bg-black">
      <div className="flex flex-col md:flex-row items-center md:items-start max-w-6xl mx-auto py-4 md:py-10">
        <div className="w-full md:w-64 md:h-40 h-90 flex-shrink-0">
          <img src={items[current].image} alt={items[current].title} loading="lazy" />
        </div>
        <div className="mt-4 md:mt-0 md:ml-6 w-full justify-center items-center flex-col">
          <div className="justify-center items-center flex flex-row">
            <div className="bg-red-600 font-[monospace] font-black text-lg">MARVEL</div>
          </div>
          <h2 className="text-4xl font-bold">{items[current].title}</h2>
          <p className="text-gray-400">{items[current].content}</p>
          <div className="mt-4 space-x-4">
            <div className="flex items-center flex-col md:flex-row justify-center gap-4">
              <button className="flex gap-2 bg-red-600 px-6 py-2 rounded-full hover:bg-red-700 hover:scale-102">
                PLAY
                <PlayIcon />
              </button>
              <button className="border border-white bg-transparent px-6 py-2 rounded-full hover:scale-102">
                WATCH TRAILER
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
