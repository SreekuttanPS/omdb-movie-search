export const generateRandomString = () => Math.random().toString(36).substring(2, 15)
 + Math.random().toString(36).substring(2, 15);

export const a = 1;

export const baseUrl = `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_API_KEY}&plot=full`;
