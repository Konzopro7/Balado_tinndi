export type Episode = {
  slug: string;
  title: string;
  guest: string;
  kind: "Épisode" | "Bande-annonce";
  summary: string;
  image: string;
  videoUrl?: string;
};

export const brand = {
  name: "Balado Tinndi",
  host: "Safietou Kane",
  email: "tinndi17@outlook.com",
  tagline: "Parce que toute histoire mérite d’être contée.",
};

// Les textes de concept ci-dessous sont provisoires et doivent être validés par la cliente.
export const conceptCopy = {
  intro:
    "Tinndi ouvre un espace où les parcours se racontent avec nuance, attention et humanité.",
  vision:
    "Faire place à des récits qui rapprochent les générations et les communautés.",
  values: "Écoute, transmission et respect de chaque histoire.",
  topics:
    "Des rencontres autour des expériences, des cultures et des questions qui nous relient.",
};

// Compléter videoUrl après validation des liens publics de diffusion.
export const episodes: Episode[] = [
  {
    slug: "safietou-kane-recoit-hadjira-belkacem",
    title: "Safietou Kane reçoit Hadjira Belkacem",
    guest: "Hadjira Belkacem",
    kind: "Épisode",
    summary:
      "Une première conversation autour d’un parcours et d’une rencontre. Le résumé éditorial détaillé sera ajouté après validation.",
    image: "/images/episode-hajira.jpg",
  },
  {
    slug: "bande-annonce",
    title: "La bande-annonce de Tinndi",
    guest: "Safietou Kane",
    kind: "Bande-annonce",
    summary: "Un aperçu du balado et des voix qui s’y rencontrent.",
    image: "/images/episode-hajira.jpg",
  },
];

export const socials: { label: string; href: string }[] = [];
