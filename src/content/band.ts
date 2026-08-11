export const band = {
  name: "告别宣言",
  tagline: "在最后的和弦里，说出所有未曾开口的话",
  englishName: "FAREWELL PROCLAMATION",
  description:
    "告别宣言成立于城市的边缘，是一支融合了 J-pop、日摇与独立电子音色的乐队。我们相信每一次告别都是一次重新开始，每一首歌都是一封写给自己、也写给听众的信。",
  story:
    "从地下排练室的第一声鼓点，到舞台上最后一个音符落下，告别宣言始终在用音乐记录那些无法被说出口的情绪。我们不追逐潮流，只忠于内心的声音。",
  contact: {
    email: "farewell.proclamation@example.com",
    weibo: "#",
    bilibili: "#",
    netease: "#",
  },
  social: {
    weibo: "#",
    bilibili: "#",
    netease: "#",
    xiaohongshu: "#",
  },
};

export type Member = {
  id: string;
  name: string;
  role: string;
  description: string;
  color: string;
};

export const members: Member[] = [
  {
    id: "tianjiu",
    name: "甜酒",
    role: "主唱",
    description:
      "声音如同深夜里的微光，既能撕裂沉默，也能温柔拥抱所有疲惫。她是乐队情绪的出口，把每一句歌词都唱成一次告白。",
    color: "#2563eb",
  },
  {
    id: "atsuka",
    name: "热风 ATSUKA",
    role: "主音吉他",
    description:
      "吉他是他的武器，也是他的语言。从尖锐的噪音墙到细腻的旋律线，他总能用音符勾勒出告别的温度。",
    color: "#38bdf8",
  },
  {
    id: "lazyjam",
    name: "LazyJAM",
    role: "节奏吉他",
    description:
      "节奏吉他是乐队的骨架，LazyJAM 用稳定的律动托起每一次情绪起伏，让 chaos 也有了秩序。",
    color: "#4db4ff",
  },
  {
    id: "ziyu",
    name: "鲻小鱼",
    role: "鼓手",
    description:
      "鼓点是他心跳的翻译。从密集如雨到稀疏如呼吸，他让时间本身也成为了乐队表达的一部分。",
    color: "#0ea5e9",
  },
  {
    id: "yixi",
    name: "乙烯",
    role: "键盘",
    description:
      "合成器与钢琴在她手中切换，用冷峻的电子音色与温暖的古典和声，编织出属于告别宣言的声景。",
    color: "#7dd3fc",
  },
  {
    id: "hudiesha",
    name: "蝴蝶纱",
    role: "贝斯",
    description:
      "低音是她存在的证明。不喧哗，却让整首歌拥有了重量与方向。她的贝斯线像一条暗河，静默却有力。",
    color: "#1d7fe8",
  },
];
