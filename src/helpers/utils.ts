export const generateRandomString = () =>
  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

export const baseUrl = `https://www.omdbapi.com/?apikey=${
  (import.meta as any).env.VITE_API_KEY
}&plot=full`;

export const getCurrentPath = (pathname: string) => {
  if (pathname?.includes("/series")) {
    return "series";
  } else if (pathname?.includes("/episode")) {
    return "episode";
  } else if (pathname?.includes("/movie")) {
    return "movie";
  } else return "";
};
