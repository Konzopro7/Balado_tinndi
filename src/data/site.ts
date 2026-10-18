export type Episode = {
  slug: string;
  title: string;
  guest: string;
  kind: "Épisode" | "Teaser";
  summary: string;
  image: string;
  videoUrl?: string;
};

export const brand = {
  name: "Balado Tinndi",
  host: "Safiétou Kane",
  email: "tinndi17@outlook.com",
  tagline: "Parce que toute histoire mérite d’être contée.",
};

export const hostBio = {
  intro:
    "Je suis Safiétou Kane. À 38 ans, je suis une femme, une épouse, une maman et une coordonnatrice. Née à Dakar, au Sénégal, je suis la cadette d’une famille de cinq enfants.",
  paragraphs: [
    "J’ai étudié la sociologie à l’Université Cheikh Anta Diop de Dakar avant de m’installer à Montréal, en 2008, pour rejoindre ma sœur et sa famille. Je détiens un baccalauréat en sociologie et j’ai treize ans d’expérience dans le milieu communautaire, où se rencontrent les luttes sociales, les personnes, les programmes et la conviction qu’un changement est possible à tous les niveaux de la société.",
    "La lecture et l’écriture me passionnent. Cet amour des mots m’a été transmis par mon père, philosophe, professeur d’université et écrivain. J’ai écrit Sinthiel, un roman paru il y a cinq ans, qui raconte l’histoire d’amour de deux êtres que tout sépare, notamment la religion, et leur découverte d’autres pays, cultures et croyances.",
    "J’ai toujours envie de coucher sur papier ce qui me passe par la tête, même si mes responsabilités d’épouse, de mère, de sœur, d’amie et d’employée ne me laissent pas toujours le temps d’écrire autant que je le voudrais.",
  ],
};

export const imageUrl = (filename: string) =>
  `${import.meta.env.BASE_URL}images/${filename}`;

export const conceptCopy = {
  intro:
    "Tinndi est un espace de rencontre et de parole où des personnes partagent une part de leur mission, de leur vécu, de leurs rêves et de leurs aspirations.",
  vision:
    "Faire entendre des histoires qui inspirent et qui nous rapprochent, d’une génération et d’un parcours à l’autre.",
  values:
    "L’écoute, la curiosité, le partage et la transmission sont au cœur de Tinndi.",
  topics:
    "Des femmes et des hommes, des jeunes et des moins jeunes, viennent raconter leur expérience et la mission qui les anime.",
  origin:
    "Amoureuse des lettres, des mots et des échanges, Safiétou Kane a vu un mot de sa langue maternelle lui traverser l’esprit : Tinndi, qui signifie « les contes » en pulaar. Ce mot lui a donné envie de créer quelque chose — un texte, une histoire, un roman, peut-être. Puis une autre idée s’est imposée : chaque vécu, chaque expérience peut être un conte qu’on choisit de partager.",
  promise:
    "Tinndi part à la rencontre de personnes aimantes, inspirées, curieuses et investies dans une mission, quelle qu’elle soit. Elles viennent en raconter un morceau, parce que toute histoire mérite d’être contée.",
};

// Compléter videoUrl après validation des liens publics de diffusion.
export const episodes: Episode[] = [
  {
    slug: "safietou-kane-recoit-hadjira-belkacem",
    title: "Safiétou Kane reçoit Hadjira Belkacem",
    guest: "Hadjira Belkacem",
    kind: "Épisode",
    summary:
      "Une première conversation autour d’un parcours et d’une rencontre. Le résumé éditorial détaillé sera ajouté après validation.",
    image: imageUrl("episode-hajira.jpg"),
    videoUrl: "https://youtu.be/sV2q11Kh0QQ",
  },
  {
    slug: "bande-annonce",
    title: "Le voici! Le teaser du premier de votre Balado Tinndi",
    guest: "Safiétou Kane",
    kind: "Teaser",
    summary: "Le teaser de lancement de Balado Tinndi.",
    image: imageUrl("teaser-tinndi.jpg"),
    videoUrl: "https://youtu.be/OHH-kr6MnFA",
  },
];

export const socials: { label: string; href: string }[] = [];
