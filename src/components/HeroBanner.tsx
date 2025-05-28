import { useState, useEffect, JSX } from "react";

type HeroBannerItem = {
  [key: number]: {
    title: string;
    content: string;
    image: string;
    link: string;
  };
};

const items: HeroBannerItem = {
  1: {
    title: "IRON MAN 4",
    content: "THE NEXT NEUTRON",
    image: "/images/iron-man.webp",
    link: "https://youtu.be/pXzpNnWDPxc?si=QyvJwmcHiL_LNDiO",
  },
  2: {
    title: "DOCTOR STRANGE",
    content: "MULTIVERSE OF MADNESS",
    image: "/images/dr-strange.webp",
    link: "https://youtu.be/aWzlQ2N6qqg?si=7MUpGabqR25DyPHH",
  },
  3: {
    title: "BLACK PANTHER",
    content: "WAKANDA FOREVER",
    image: "/images/black-panther.webp",
    link: "https://youtu.be/_Z3QKkl1WyM?si=B_StmfkwA3zuknqz",
  },
  4: {
    title: "SPIDER-MAN",
    content: "INTO THE SPIDER-VERSE",
    image: "/images/spiderman.webp",
    link: "https://youtu.be/g4Hbz2jLxvQ?si=2Dy5pv9RShz6O_uw",
  },
  5: {
    title: "THOR",
    content: "THE DARK WORLD",
    image: "/images/thor.webp",
    link: "https://youtu.be/npvJ9FTgZbM?si=Jpbp5nK3FrhIjNq-",
  },
};

export default function HeroBanner(): JSX.Element {
  const [current, setCurrent] = useState<number>(1);

  const onLinkClick = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (current === 5) {
        setCurrent(1);
      } else {
        setCurrent((prev) => prev + 1);
      }
    }, 5000);
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
              <button
                className="border border-white bg-transparent px-6 py-2 rounded-full hover:scale-102"
                onClick={() => onLinkClick(items[current].link)}
              >
                WATCH TRAILER
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
