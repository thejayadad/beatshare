export const unsplashSeed = (q: string, seed: number, size = 640) =>
  `https://source.unsplash.com/${size}x${size}/?${encodeURIComponent(q)}&sig=${seed}`;
