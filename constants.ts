
export interface LevelConfig {
  pairs: number;
  time: number;
  gridCols: string;
}

export const ASSETS = [
  "https://cdn.shopify.com/s/files/1/0562/6016/5827/files/prdgy-confused-billa-oversized-half-shirt-prdgy-32227.png?v=1756841403",
  "https://cdn.shopify.com/s/files/1/0562/6016/5827/files/prdgy-titanblood-oversized-t-shirt-prdgy-16125.png?v=1756841090",
  "https://cdn.shopify.com/s/files/1/0562/6016/5827/files/prdgy-saree-not-sorry-oversized-tshirt-prdgy-76740.png?v=1763453366",
  "https://cdn.shopify.com/s/files/1/0562/6016/5827/files/PRDGY_Blocked_Forever_Oversized_T-Shirt.png?v=1766196824",
  "https://cdn.shopify.com/s/files/1/0562/6016/5827/files/PRDGY_Kidnep_Oversized_Sweatshirt.png?v=1763625649",
  "https://cdn.shopify.com/s/files/1/0562/6016/5827/files/prdgy-nazario-back-oversized-t-shirt-prdgy-49265.png?v=1756840676",
  "https://cdn.shopify.com/s/files/1/0562/6016/5827/files/prdgy-nsfwread-oversized-t-shirt-prdgy-93079.png?v=1756841118",
  "https://cdn.shopify.com/s/files/1/0562/6016/5827/files/prdgy-saaunp-back-oversized-t-shirt-prdgy-55999.png?v=1756840852",
  "https://cdn.shopify.com/s/files/1/0562/6016/5827/files/music-maniac-back-oversized-t-shirt-prdgy-50152.png?v=1756840336",
  "https://cdn.shopify.com/s/files/1/0562/6016/5827/files/prdgy-around-the-world-oversized-t-shirt-prdgy-33900.png?v=1756841248"
];

export const LEVELS: Record<number, LevelConfig> = {
  1: { pairs: 2, time: 20, gridCols: 'grid-cols-2' },
  2: { pairs: 4, time: 30, gridCols: 'grid-cols-2 md:grid-cols-4' },
  3: { pairs: 6, time: 40, gridCols: 'grid-cols-3 md:grid-cols-4' },
  4: { pairs: 8, time: 55, gridCols: 'grid-cols-4' },
  5: { pairs: 10, time: 75, gridCols: 'grid-cols-4 md:grid-cols-5' }
};

export const SOUNDS = {
  bgm: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // Smooth electronic loop
  flip: "https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3",
  match: "https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3",
  win: "https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3",
  fail: "https://assets.mixkit.co/active_storage/sfx/2578/2578-preview.mp3",
};
