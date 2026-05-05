export type WorkTile = {
  title: string;
  description: string;
  image: {
    src: string;
    width: number;
    height: number;
  };
};

export const workTiles: WorkTile[] = [
  {
    description: `Here are things`,
    title: `I've worked on`,
    image: {
      src: '/static/images/aphex-apps.webp',
      width: 600,
      height: 770,
    },
  },
  {
    description: 'I interned at',
    title: 'Bajaj Finserv Health',
    image: {
      src: '/static/images/project/CiCd.png',
      width: 600,
      height: 717,
    },
  },
  {
    description: `I built`,
    title: 'Phoenix Portal – LNMIIT',
    image: {
      src: '/static/images/project/Phoenix.png',
      width: 600,
      height: 554,
    },
  },
  {
    description: `I wrote`,
    title: 'Technical Blogs on Medium',
    image: {
      src: '/static/images/project/Medium.png',
      width: 600,
      height: 717,
    },
  },
];
