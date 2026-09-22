export type InstagramPost = {
  title: string;
  href: string;
  cover: string;
  coverAlt: string;
};

export const instagramPosts: InstagramPost[] = [
  {
    title: "Lula: democracia não pode ficar refém de vazamentos seletivos",
    href: "https://www.instagram.com/reel/Dc2Gv5ls-NJ/",
    cover: "/videos/reel-1.jpg",
    coverAlt: "Capa do reel do Corredor 61 sobre Lula e o Banco Master",
  },
  {
    title: "Renan Santos: não vou desistir da disputa presidencial",
    href: "https://www.instagram.com/reel/Dcue9b0MGdH/",
    cover: "/videos/reel-2.jpg",
    coverAlt: "Capa do reel do Corredor 61 com Renan Santos",
  },
  {
    title: "Flávio Bolsonaro: vou respeitar o resultado das urnas",
    href: "https://www.instagram.com/reel/Dcnv22PuEDM/",
    cover: "/videos/reel-3.jpg",
    coverAlt: "Capa do reel do Corredor 61 com Flávio Bolsonaro",
  },
];
