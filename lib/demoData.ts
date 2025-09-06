export type BeatItem = {
  id: string;
  title: string;
  artist: string;
  bpm: number;
  price: string;
  cover: string;
  href: string;
  tags: string[];
  src: string; // audio preview
};

// rotate through /public/images/pic1..pic4 (change ext if yours are .png)
const coverFor = (i: number) =>
  `/pic${((i - 1) % 4) + 1}.png`;

export function demoBeats(total = 48): BeatItem[] {
  const titles = [
    "All Over Me",
    "ADL pt.16 | Yeat Type Beat x BNYX Type Beat",
    "side eye",
    "Off The Map",
    "Versace – Lil Uzi Vert Type Beat",
    "fakeclub",
  ];
  const artists = ["Skidot", "phyllis.prod", "Ray Offkey", "Alec Trevelyan", "15drtt"];
  const tagsPool = ["trap", "hip hop", "indie", "melodic", "guitar", "underground"];

  const items: BeatItem[] = [];
  for (let i = 1; i <= total; i++) {
    items.push({
      id: String(i),
      title: titles[i % titles.length],
      artist: artists[i % artists.length],
      bpm: 80 + (i % 70),
      price: i % 3 === 0 ? "FREE" : `$${(20 + (i % 15)).toFixed(2)}`,
      cover: coverFor(i),               // ← local image
      href: `/beat/${i}`,
      tags: Array.from({ length: 3 }, (_, k) => tagsPool[(i + k) % tagsPool.length]),
      src: `/audio/demo${(i % 3) + 1}.wav`, // your public audio files
    });
  }
  return items;
}
