export type Episode = {
  slug: string;
  title: string;
  guest: string;
  kind: "Épisode" | "Teaser";
  summary: string;
  image: string;
  publishedAt?: string;
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
    "Je m’appelle Safiétou Kane. Je suis une femme, une épouse, une maman et une coordonnatrice de 38 ans. Je suis née à Dakar, au Sénégal, et je suis la cadette d’une famille de cinq enfants.",
  paragraphs: [
    "J’ai étudié la sociologie à l’Université Cheikh Anta Diop de Dakar avant de m’installer à Montréal, en 2008, où j’ai rejoint ma sœur et sa famille. J’ai obtenu un baccalauréat en sociologie et cela fait treize ans que je travaille dans le milieu communautaire, un milieu qui rassemble les luttes et les causes sociales, des personnes, des programmes et de fortes convictions en faveur du changement à tous les niveaux de la société.",
    "Je suis passionnée de lecture et d’écriture. Cet amour des mots m’a été transmis par mon père, philosophe, professeur d’université et écrivain. J’ai écrit Sinthiel, paru il y a cinq ans, une histoire d’amour entre deux êtres que tout sépare, principalement la religion, mais aussi une découverte de pays, de cultures et de croyances différentes des leurs.",
    "J’ai toujours envie de coucher sur papier tout ce qui me passe par la tête, même si mes différentes responsabilités d’épouse, de mère, de sœur, d’amie et d’employée ne me permettent pas d’écrire autant que je le voudrais.",
    "L’idée du balado m’est venue de mon amour des lettres, des mots et des échanges. Un mot de ma langue maternelle, qui évoque à la fois l’histoire, l’imaginaire et le temps, m’a traversé l’esprit : Tinndi, qui signifie « les contes » en pulaar. Je me suis demandé ce que je pourrais en faire : un texte, une histoire, un roman, peut-être un jour.",
    "Chaque histoire, chaque vécu, chaque expérience peut être vu comme un conte, une envie de raconter, de partager et d’inspirer. Tinndi est ainsi devenu un espace où des hommes et des femmes, des jeunes et des moins jeunes, des personnes aimantes, inspirées et inspirantes, dévouées, curieuses et investies dans une mission, quelle qu’elle soit, viennent partager un bout de cette mission.",
    "Tinndi ira à la rencontre d’hommes et de femmes qui, à travers leurs vécus, leurs rêves et leurs aspirations, nous conteront une partie de leur histoire. Parce qu’à la fin, toute histoire mérite d’être contée.",
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
      "Arrivée au Québec il y a plus de quinze ans, Hadjira Belkacem s’engage auprès des familles musulmanes, des jeunes et de sa communauté.",
    image: imageUrl("episode-hajira.jpg"),
    publishedAt: "23 septembre 2026",
    videoUrl: "https://youtu.be/sV2q11Kh0QQ",
  },
  {
    slug: "bande-annonce",
    title: "Le voici! Le teaser du premier de votre Balado Tinndi",
    guest: "Safiétou Kane",
    kind: "Teaser",
    summary:
      "Dans ce teaser, Safiétou Kane présente son premier épisode et sa rencontre avec Hadjira Belkacem. Elles évoquent notamment le parcours d’Hadjira dans un secteur longtemps réservé aux hommes.",
    image: imageUrl("teaser-tinndi.jpg"),
    publishedAt: "12 septembre 2026",
    videoUrl: "https://youtu.be/OHH-kr6MnFA",
  },
];

export const socials: { label: string; href: string }[] = [];
