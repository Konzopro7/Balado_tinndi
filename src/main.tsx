import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  CirclePlay,
  Headphones,
  Mail,
  Menu,
  Mic2,
  MoveUpRight,
  Search,
  X,
} from "lucide-react";
import {
  brand,
  conceptCopy,
  episodes,
  hostBio,
  imageUrl,
  socials,
  type Episode,
} from "./data/site";
import "./styles.css";

const routeMap = [
  "/",
  "/balado",
  "/safietou-kane",
  "/episodes",
  "/videos",
  "/collaborations",
  "/contact",
];
const nav = [
  ["Le balado", "/balado"],
  ["Safiétou Kane", "/safietou-kane"],
  ["Épisodes", "/episodes"],
  ["Vidéos", "/videos"],
  ["Collaborations", "/collaborations"],
] as const;

function usePath() {
  const base = import.meta.env.BASE_URL;
  const currentRoute = () => {
    let pathname = window.location.pathname;
    if (base !== "/" && pathname.startsWith(base)) {
      pathname = `/${pathname.slice(base.length)}`;
    }
    return pathname.replace(/\/$/, "") || "/";
  };
  const [path, setPath] = useState(currentRoute);
  useEffect(() => {
    const pop = () => setPath(currentRoute());
    window.addEventListener("popstate", pop);
    return () => window.removeEventListener("popstate", pop);
  }, []);
  const go = (to: string) => {
    if (to !== path) {
      const destination = to === "/" ? base : `${base}${to.replace(/^\//, "")}`;
      history.pushState({}, "", destination);
      setPath(to);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  return { path, go };
}

function App() {
  const { path, go } = usePath();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Tout");
  const [modal, setModal] = useState<Episode | null>(null);
  const [formState, setFormState] = useState("");
  const [formBusy, setFormBusy] = useState(false);
  const modalCloseRef = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("shown");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.08 },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [path]);
  useEffect(() => {
    if (!modal) return;
    previousFocus.current = document.activeElement as HTMLElement;
    modalCloseRef.current?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "Tab") {
        const nodes = document.querySelectorAll<HTMLElement>(
          ".modal-dialog button, .modal-dialog a, .modal-dialog video[controls], .modal-dialog iframe",
        );
        const first = nodes[0],
          last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", key);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", key);
      document.body.style.overflow = "";
      previousFocus.current?.focus();
    };
  }, [modal]);
  const closeModal = () => setModal(null);
  const navigate = (to: string) => {
    go(to);
    setMenuOpen(false);
    setFormState("");
  };
  const filteredEpisodes = useMemo(
    () =>
      episodes.filter(
        (item) =>
          filter !== "Expressions en pulaar" &&
          (filter === "Tout" ||
            item.kind === filter ||
            (filter === "Teasers" && item.kind === "Teaser")) &&
          `${item.title} ${item.guest} ${item.summary}`
            .toLowerCase()
            .includes(search.toLowerCase()),
      ),
    [filter, search],
  );
  const page = routeMap.includes(path)
    ? path
    : path.startsWith("/episodes/")
      ? "/detail-episode"
      : path.startsWith("/invites/")
        ? "/detail-guest"
        : "/not-found";
  const detailEpisode = episodes.find(
    (item) => `/episodes/${item.slug}` === path,
  );

  useEffect(() => {
    setSearch("");
    setFilter("Tout");
  }, [page]);

  useEffect(() => {
    const titles: Record<string, [string, string]> = {
      "/": [
        "Balado Tinndi — Toute histoire mérite d’être contée",
        "Des voix, des parcours et des rencontres avec Safiétou Kane. Parce que toute histoire mérite d’être contée.",
      ],
      "/balado": [
        "Le balado — Balado Tinndi",
        "Découvrez le concept, la vision et les valeurs de Balado Tinndi.",
      ],
      "/safietou-kane": [
        "Safiétou Kane — Balado Tinndi",
        "Découvrez Safiétou Kane, présentatrice de Balado Tinndi, son parcours, son amour des mots et l’origine du balado.",
      ],
      "/episodes": [
        "Épisodes et invitées — Balado Tinndi",
        "Parcourez les épisodes et les rencontres de Balado Tinndi.",
      ],
      "/videos": [
        "Vidéos — Balado Tinndi",
        "Épisodes, bandes-annonces et expressions en pulaar de Balado Tinndi.",
      ],
      "/collaborations": [
        "Collaborations et partenariats — Balado Tinndi",
        "Proposez une collaboration, un partenariat ou une participation à Balado Tinndi.",
      ],
      "/contact": [
        "Contact — Balado Tinndi",
        "Écrivez à l’équipe de Balado Tinndi.",
      ],
      "/detail-episode": [
        `${detailEpisode?.title ?? "Épisode"} — Balado Tinndi`,
        detailEpisode?.summary ?? "Découvrez les épisodes de Balado Tinndi.",
      ],
      "/detail-guest": [
        "Hadjira Belkacem — Balado Tinndi",
        "Découvrez la rencontre avec Hadjira Belkacem dans Balado Tinndi.",
      ],
      "/not-found": ["Page introuvable — Balado Tinndi", "Page introuvable."],
    };
    const [title, description] = titles[page];
    document.title = title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", description);
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute("content", title);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute("content", description);
  }, [page, detailEpisode]);

  function onFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormState("");
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim(),
      email = String(data.get("email") || "").trim(),
      message = String(data.get("message") || "").trim();
    if (
      !name ||
      !email ||
      !message ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      setFormState("error");
      return;
    }
    const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT as
      string | undefined;
    if (endpoint) {
      setFormBusy(true);
      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data)),
      })
        .then((res) => {
          if (!res.ok) throw new Error();
          setFormState("sent");
        })
        .catch(() => setFormState("failed"))
        .finally(() => setFormBusy(false));
    } else {
      const subject = encodeURIComponent(
        `Balado Tinndi — ${String(data.get("type") || "Demande")}`,
      );
      const body = encodeURIComponent(
        `Nom : ${name}\nOrganisation : ${data.get("organization") || "—"}\nCourriel : ${email}\nType : ${data.get("type") || "Contact"}\n\n${message}`,
      );
      window.location.href = `mailto:${brand.email}?subject=${subject}&body=${body}`;
      setFormState("email");
    }
  }

  return (
    <>
      <a href="#contenu" className="skip-link">
        Aller au contenu
      </a>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <button
          className="brand-lockup"
          onClick={() => navigate("/")}
          aria-label="Balado Tinndi, accueil"
        >
          <span className="brand-mark">
            <img src={imageUrl("logo-tinndi.jpg")} alt="" />
          </span>
          <span className="brand-word">
            <b>tinndi</b>
            <small>BALADO · RÉCITS · RENCONTRES</small>
          </span>
        </button>
        <nav
          className={`main-nav ${menuOpen ? "open" : ""}`}
          aria-label="Navigation principale"
        >
          {nav.map(([label, href]) => (
            <button
              className={page === href ? "active" : ""}
              onClick={() => navigate(href)}
              key={href}
            >
              {label}
            </button>
          ))}
          <button
            className="mobile-cta"
            onClick={() => navigate("/collaborations")}
          >
            Proposer une collaboration <ArrowUpRight size={15} />
          </button>
        </nav>
        <button
          className="button button-small header-cta"
          onClick={() => navigate("/collaborations")}
        >
          Proposer une collaboration <ArrowUpRight size={15} />
        </button>
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      <main id="contenu" key={page} className="page-enter">
        {page === "/" && <Home navigate={navigate} onPlay={setModal} />}
        {page === "/balado" && <Balado navigate={navigate} />}
        {page === "/safietou-kane" && <Host navigate={navigate} />}
        {(page === "/episodes" || page === "/videos") && (
          <Library
            page={page}
            navigate={navigate}
            search={search}
            setSearch={setSearch}
            filter={filter}
            setFilter={setFilter}
            items={filteredEpisodes}
            onPlay={setModal}
          />
        )}
        {page === "/collaborations" && (
          <ContactPage
            mode="collaborations"
            onSubmit={onFormSubmit}
            state={formState}
            busy={formBusy}
          />
        )}
        {page === "/contact" && (
          <ContactPage
            mode="contact"
            onSubmit={onFormSubmit}
            state={formState}
            busy={formBusy}
          />
        )}
        {page === "/detail-episode" && (
          <Detail item={detailEpisode} navigate={navigate} onPlay={setModal} />
        )}
        {page === "/detail-guest" && <GuestDetail navigate={navigate} />}
        {page === "/not-found" && (
          <section className="simple-page">
            <span className="eyebrow">404 · PAGE INTROUVABLE</span>
            <h1>Cette histoire reste à écrire.</h1>
            <button className="button" onClick={() => navigate("/")}>
              Revenir à l’accueil <ArrowRight size={16} />
            </button>
          </section>
        )}
      </main>
      <Footer navigate={navigate} />
      {modal && (
        <VideoModal item={modal} close={closeModal} closeRef={modalCloseRef} />
      )}
    </>
  );
}

function Home({
  navigate,
  onPlay,
}: {
  navigate: (to: string) => void;
  onPlay: (item: Episode) => void;
}) {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="eyebrow-dot" /> UN ESPACE POUR LES HISTOIRES VRAIES
          </div>
          <h1>
            Parce que toute histoire <em>mérite d’être contée.</em>
          </h1>
          <p>
            Des voix, des parcours et des rencontres qui nous rapprochent.
            Bienvenue dans l’univers de Tinndi.
          </p>
          <div className="hero-actions">
            <button className="button" onClick={() => navigate("/episodes")}>
              Découvrir les épisodes <ArrowRight size={17} />
            </button>
            <button
              className="button button-quiet"
              onClick={() => navigate("/balado")}
            >
              Découvrir le balado <ArrowUpRight size={15} />
            </button>
          </div>
          <div className="hero-byline">
            <span className="byline-line" />
            <span>
              Un balado présenté par <b>Safiétou Kane</b>
            </span>
          </div>
        </div>
        <div className="hero-image-wrap">
          <img
            className="hero-image"
            src={imageUrl("episode-hajira.jpg")}
            alt="Safiétou Kane en conversation avec son invitée Hadjira Belkacem"
            fetchPriority="high"
          />
          <div className="hero-image-fade" />
          <div className="hero-image-label">
            <span className="label-icon">
              <Mic2 size={17} />
            </span>
            <div>
              <strong>Une voix. Une histoire.</strong>
              <small>Une rencontre à la fois.</small>
            </div>
          </div>
          <div className="hero-index">
            <span>01</span> / RENCONTRES
          </div>
          <div className="hero-sun" />
        </div>
        <div className="hero-bottom">
          <span>DES RÉCITS · DES RENCONTRES · TINNDI</span>
          <button
            onClick={() =>
              document
                .getElementById("univers")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            DÉFILER POUR EXPLORER <ArrowDown size={14} />
          </button>
        </div>
      </section>
      <section className="intro-section section-pad" id="univers">
        <div className="intro-ornament">
          <span>t</span>
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>
        <div className="intro-text reveal">
          <span className="eyebrow">L’UNIVERS TINNDI</span>
          <h2>
            Des conversations qui <em>laissent une trace.</em>
          </h2>
          <p>
            Chaque rencontre est une porte ouverte sur un parcours singulier.
            Ici, on prend le temps d’écouter, de comprendre et de transmettre.
          </p>
          <button className="text-link" onClick={() => navigate("/balado")}>
            En savoir plus sur le balado <ArrowUpRight size={15} />
          </button>
        </div>
        <div className="intro-aside reveal">
          <span className="aside-number">01</span>
          <p>
            Des récits intimes, des idées vivantes et des voix qui gagnent à
            être entendues.
          </p>
          <div className="waveform" aria-hidden="true">
            {Array.from({ length: 31 }, (_, i) => (
              <i
                key={i}
                style={
                  {
                    "--h": `${12 + Math.abs(Math.sin(i * 0.81)) * 37}px`,
                    "--delay": `${i * 18}ms`,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>
          <small>LE RYTHME DES RÉCITS</small>
        </div>
      </section>
      <HostTeaser navigate={navigate} />
      <section className="episodes-section section-pad">
        <div className="section-heading reveal">
          <div>
            <span className="eyebrow">À ÉCOUTER, À DÉCOUVRIR</span>
            <h2>
              Les premières <em>rencontres.</em>
            </h2>
          </div>
          <button className="text-link" onClick={() => navigate("/episodes")}>
            Tous les épisodes <ArrowRight size={16} />
          </button>
        </div>
        <div className="episode-grid">
          {episodes.slice(0, 2).map((item, i) => (
            <EpisodeCard
              key={item.slug}
              item={item}
              index={i}
              onOpen={() => item.videoUrl && onPlay(item)}
              navigate={navigate}
            />
          ))}
        </div>
      </section>
      <section className="pulaar-section section-pad">
        <div className="pulaar-visual reveal">
          <img src={imageUrl("episode-hajira.jpg")} alt="" loading="lazy" />
          <div className="pulaar-stamp">
            TINNDI
            <br />
            <span>PAROLE</span>
            <br />
            VIVANTE
          </div>
        </div>
        <div className="pulaar-copy reveal">
          <span className="eyebrow">UNE RUBRIQUE À VENIR</span>
          <h2>
            Les expressions
            <br />
            en <em>pulaar.</em>
          </h2>
          <p>
            Des mots qui portent une mémoire, une intention, un monde. Une série
            vidéo pour écouter, apprendre et transmettre la richesse du pulaar.
          </p>
          <span className="availability">
            <i /> La rubrique prend forme
          </span>
        </div>
      </section>
      <PartnershipBand navigate={navigate} />
    </>
  );
}

function HostTeaser({ navigate }: { navigate: (to: string) => void }) {
  return (
    <section className="host-strip">
      <div className="host-strip-photo">
        <img
          src={imageUrl("episode-hajira.jpg")}
          alt="Safiétou Kane, présentatrice de Balado Tinndi"
          loading="lazy"
        />
      </div>
      <div className="host-strip-copy reveal">
        <span className="eyebrow eyebrow-light">LA VOIX DE TINNDI</span>
        <h2>
          À l’écoute des autres,
          <br />
          <em>à la rencontre du monde.</em>
        </h2>
        <p>
          Safiétou Kane vous accueille dans un espace où chacun peut déposer son
          histoire, à son rythme.
        </p>
        <button
          className="button button-light"
          onClick={() => navigate("/safietou-kane")}
        >
          Rencontrer Safiétou <ArrowRight size={16} />
        </button>
      </div>
      <div className="host-strip-number">01 / PRÉSENTATION</div>
    </section>
  );
}

function EpisodeCard({
  item,
  index,
  onOpen,
  navigate,
}: {
  item: Episode;
  index: number;
  onOpen: () => void;
  navigate: (to: string) => void;
}) {
  return (
    <article
      className={`episode-card reveal ${index ? "episode-card-offset" : ""}`}
    >
      <button
        className={`episode-image ${item.kind === "Teaser" ? "episode-image-portrait" : ""}`}
        onClick={() =>
          item.videoUrl ? onOpen() : navigate(`/episodes/${item.slug}`)
        }
        aria-label={`Voir ${item.title}`}
      >
        <img
          src={item.image}
          alt={
            item.kind === "Teaser" ? "Visuel du teaser de Balado Tinndi" : ""
          }
          loading="lazy"
        />
        <span className="episode-tag">
          <i />
          {item.kind}
        </span>
        <span className="episode-play">
          {item.videoUrl ? <CirclePlay /> : <ArrowUpRight />}
        </span>
      </button>
      <div className="episode-card-body">
        <span className="episode-guest">AVEC {item.guest.toUpperCase()}</span>
        <h3>{item.title}</h3>
        <p>{item.summary}</p>
        <button
          className="text-link"
          onClick={() => navigate(`/episodes/${item.slug}`)}
        >
          Découvrir la fiche <ArrowRight size={14} />
        </button>
      </div>
    </article>
  );
}

function Balado({ navigate }: { navigate: (to: string) => void }) {
  return (
    <>
      <PageHero
        kicker="LE BALADO"
        title={
          <>
            Un lieu pour écouter,
            <br />
            <em>partager et transmettre.</em>
          </>
        }
        text={conceptCopy.intro}
        image={imageUrl("episode-hajira.jpg")}
      />
      <section className="values-grid section-pad">
        {[
          ["01", "Notre vision", conceptCopy.vision],
          ["02", "Nos valeurs", conceptCopy.values],
          ["03", "Les sujets", conceptCopy.topics],
        ].map(([number, title, text]) => (
          <article className="value-card reveal" key={number}>
            <span>{number}</span>
            <h2>{title}</h2>
            <p>{text}</p>
          </article>
        ))}
      </section>
      <section className="tinndi-story section-pad">
        <div className="tinndi-story-heading reveal">
          <span className="eyebrow">À L’ORIGINE DU NOM</span>
          <h2>
            Un mot, une langue,
            <br />
            <em>des histoires à transmettre.</em>
          </h2>
        </div>
        <div className="tinndi-story-copy reveal">
          <p>{conceptCopy.origin}</p>
          <p>{conceptCopy.promise}</p>
          <span className="tinndi-definition">
            <b>Tinndi</b>
            <i>nom, pulaar</i>
            <span>les contes</span>
          </span>
        </div>
      </section>
      <PartnershipBand navigate={navigate} />
    </>
  );
}

function Host({ navigate }: { navigate: (to: string) => void }) {
  return (
    <section className="host-page section-pad">
      <div className="host-page-image reveal">
        <img
          src={imageUrl("episode-hajira.jpg")}
          alt="Safiétou Kane en conversation avec Hadjira Belkacem"
        />
        <span className="host-image-note">SAFIÉTOU KANE · PRÉSENTATRICE</span>
      </div>
      <div className="host-page-copy reveal">
        <span className="eyebrow">LA PRÉSENTATRICE</span>
        <h1>
          Safiétou <em>Kane.</em>
        </h1>
        <p className="lead">{hostBio.intro}</p>
        <div className="host-bio-copy">
          {hostBio.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <button className="text-link" onClick={() => navigate("/episodes")}>
          Découvrir ses rencontres <ArrowRight size={15} />
        </button>
      </div>
    </section>
  );
}

function PageHero({
  kicker,
  title,
  text,
  image,
}: {
  kicker: string;
  title: React.ReactNode;
  text: string;
  image: string;
}) {
  return (
    <section className="page-hero section-pad">
      <div className="page-hero-copy reveal">
        <span className="eyebrow">{kicker}</span>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
      <div className="page-hero-image reveal">
        <img
          src={image}
          alt="Une conversation de Balado Tinndi"
          loading="lazy"
        />
        <div className="page-hero-caption">
          <Mic2 size={16} /> UNE RENCONTRE À LA FOIS
        </div>
      </div>
    </section>
  );
}

function Library({
  page,
  navigate,
  search,
  setSearch,
  filter,
  setFilter,
  items,
  onPlay,
}: {
  page: string;
  navigate: (to: string) => void;
  search: string;
  setSearch: (s: string) => void;
  filter: string;
  setFilter: (s: string) => void;
  items: Episode[];
  onPlay: (e: Episode) => void;
}) {
  const isVideos = page === "/videos";
  const filters = isVideos
    ? ["Tout", "Épisode", "Teasers", "Expressions en pulaar"]
    : ["Tout", "Épisode", "Teasers"];
  return (
    <section className="library-page section-pad">
      <div className="library-heading reveal">
        <span className="eyebrow">
          {isVideos ? "À VOIR, À ÉCOUTER" : "LE CATALOGUE TINNDI"}
        </span>
        <h1>
          {isVideos ? (
            <>
              Les histoires <em>en images.</em>
            </>
          ) : (
            <>
              Des voix à <em>rencontrer.</em>
            </>
          )}
        </h1>
        <p>
          {isVideos
            ? "Épisodes, bandes-annonces et expressions en pulaar : les vidéos de Tinndi, rassemblées."
            : "Retrouvez les épisodes et les personnes qui donnent vie aux conversations."}
        </p>
      </div>
      <div className="library-controls">
        <label className="search-field">
          <Search size={17} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un épisode ou une invitée"
            aria-label="Rechercher un épisode ou une invitée"
          />
        </label>
        <div className="filter-row" aria-label="Filtrer le catalogue">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={filter === f ? "selected" : ""}
              aria-pressed={filter === f}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      {items.length ? (
        <div className="episode-grid library-grid">
          {items.map((item, i) => (
            <EpisodeCard
              key={item.slug}
              item={item}
              index={i}
              onOpen={() => item.videoUrl && onPlay(item)}
              navigate={navigate}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <Search size={22} />
          <h2>
            {filter === "Expressions en pulaar"
              ? "Cette rubrique arrive bientôt."
              : "Aucun résultat pour cette recherche."}
          </h2>
          <p>
            {filter === "Expressions en pulaar"
              ? "Les vidéos seront ajoutées dès que les premiers liens de diffusion seront prêts."
              : "Essayez un autre mot ou choisissez un autre filtre."}
          </p>
          <button
            className="text-link"
            onClick={() => {
              setSearch("");
              setFilter("Tout");
            }}
          >
            Réinitialiser <ArrowRight size={14} />
          </button>
        </div>
      )}
      <div className="library-note">
        <span className="pending-dot" />
        <p>
          Le catalogue sera enrichi au fil des publications. Seuls les contenus
          validés apparaissent ici.
        </p>
      </div>
    </section>
  );
}

function Detail({
  item,
  navigate,
  onPlay,
}: {
  item?: Episode;
  navigate: (to: string) => void;
  onPlay: (e: Episode) => void;
}) {
  if (!item)
    return (
      <section className="simple-page">
        <span className="eyebrow">FICHE ÉPISODE</span>
        <h1>Cette rencontre arrive bientôt.</h1>
        <button className="button" onClick={() => navigate("/episodes")}>
          Retour aux épisodes <ArrowLeft size={16} />
        </button>
      </section>
    );
  return (
    <section className="detail-page section-pad">
      <button className="back-link" onClick={() => navigate("/episodes")}>
        <ArrowLeft size={15} /> Tous les épisodes
      </button>
      <div className="detail-layout">
        <div className="detail-image">
          <img src={item.image} alt="" />
          <button
            className="detail-image-action"
            onClick={() => (item.videoUrl ? onPlay(item) : undefined)}
            disabled={!item.videoUrl}
          >
            {item.videoUrl ? (
              <>
                <CirclePlay /> Voir la vidéo
              </>
            ) : (
              <>
                <Headphones /> Vidéo à venir
              </>
            )}
          </button>
        </div>
        <div className="detail-copy">
          <span className="eyebrow">{item.kind} · TINNDI</span>
          <h1>{item.title}</h1>
          <p className="lead">
            Avec <b>{item.guest}</b>
          </p>
          <button
            className="text-link guest-link"
            onClick={() => navigate("/invites/hadjira-belkacem")}
          >
            Découvrir l’invitée <ArrowUpRight size={14} />
          </button>
          <p>{item.summary}</p>
          <div className="pending-note">
            <span className="pending-dot" />
            <p>
              La date, la durée et le résumé final seront ajoutés lorsque ces
              informations seront confirmées.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function GuestDetail({ navigate }: { navigate: (to: string) => void }) {
  return (
    <section className="simple-page">
      <span className="eyebrow">INVITÉE · TINNDI</span>
      <h1>Hadjira Belkacem</h1>
      <div className="guest-bio-copy">
        <p>
          Algérienne d’origine, arrivée au Québec il y a plus de quinze ans,
          Hadjira Belkacem est éducatrice à la petite enfance de formation et
          s’engage à plusieurs niveaux de la société québécoise. Pionnière en
          matière d’arrangements funéraires, elle a fondé l’Association de la
          sépulture musulmane. L’organisme aide les personnes musulmanes
          décédées au Canada et au Québec à être enterrées dans leur pays
          d’accueil.
        </p>
        <p>
          L’association organise également des levées de fonds pour les
          rapatriements et apporte son aide dans différentes situations.
          Hadjira a aussi été propriétaire d’un service de garde à domicile.
          Passionnée par l’éducation à la petite enfance, elle a exercé pendant
          quinze ans avant de quitter ce métier à la suite de la loi
          provinciale interdisant le port du voile aux personnes en position
          d’autorité, notamment aux enseignantes et aux éducatrices. Elle
          continue aujourd’hui d’accompagner et de conseiller des éducatrices
          et d’autres actrices du milieu grâce à son expertise.
        </p>
        <p>
          Hadjira s’est ensuite tournée vers l’élevage avec sa ferme Niska, un
          projet auquel elle se dévoue avec des jeunes : gestion de fermettes
          et accueil du public les fins de semaine. Elle reste engagée dans
          les combats autour de l’injustice, des inégalités sociales, de la
          violence juvénile et des droits des minorités.
        </p>
      </div>
      <a
        className="button"
        href="https://youtu.be/sV2q11Kh0QQ"
        target="_blank"
        rel="noreferrer"
      >
        Découvrir l’épisode complet <ArrowUpRight size={16} />
      </a>
      <button
        className="text-link guest-back-link"
        onClick={() => navigate("/episodes/safietou-kane-recoit-hadjira-belkacem")}
      >
        Voir la fiche de l’épisode <ArrowRight size={15} />
      </button>
    </section>
  );
}

function ContactPage({
  mode,
  onSubmit,
  state,
  busy,
}: {
  mode: "contact" | "collaborations";
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  state: string;
  busy: boolean;
}) {
  const collab = mode === "collaborations";
  return (
    <section className="contact-page section-pad">
      <div className="contact-copy reveal">
        <span className="eyebrow">
          {collab ? "IMAGINONS LA SUITE" : "ÉCRIRE À TINNDI"}
        </span>
        <h1>
          {collab ? (
            <>
              Faisons place
              <br />à une <em>rencontre.</em>
            </>
          ) : (
            <>
              Chaque message
              <br />
              ouvre une <em>histoire.</em>
            </>
          )}
        </h1>
        <p>
          {collab
            ? "Vous représentez une entreprise, un organisme, ou vous aimeriez prendre part à une prochaine conversation? Parlons-en."
            : "Une question, une idée ou simplement l’envie de nous écrire? La boîte de réception de Tinndi est ouverte."}
        </p>
        <a href={`mailto:${brand.email}`} className="contact-email">
          <span>
            <Mail size={18} />
          </span>
          {brand.email}
          <ArrowUpRight size={16} />
        </a>
        <div className="media-kit-note">
          <span className="note-icon">
            <MoveUpRight size={17} />
          </span>
          <div>
            <b>Dossier média</b>
            <p>
              Disponible prochainement. Écrivez-nous pour toute demande de
              partenariat.
            </p>
          </div>
        </div>
      </div>
      <form className="contact-form reveal" onSubmit={onSubmit} noValidate>
        <div className="form-top">
          <span className="eyebrow">
            {collab ? "PROPOSER UNE COLLABORATION" : "FORMULAIRE DE CONTACT"}
          </span>
          <span className="form-required">* Champs obligatoires</span>
        </div>
        <label>
          Votre nom <i>*</i>
          <input
            required
            name="name"
            autoComplete="name"
            placeholder="Nom et prénom"
          />
        </label>
        <label>
          Organisation <span className="optional">Facultatif</span>
          <input
            name="organization"
            autoComplete="organization"
            placeholder="Entreprise ou organisme"
          />
        </label>
        <div className="form-two">
          <label>
            Votre courriel <i>*</i>
            <input
              required
              type="email"
              name="email"
              autoComplete="email"
              placeholder="nom@exemple.com"
            />
          </label>
          <label>
            Type de demande
            <select
              name="type"
              defaultValue={collab ? "Partenariat" : "Question"}
            >
              <option>Question</option>
              <option>Collaboration</option>
              <option>Partenariat</option>
              <option>Publicité</option>
              <option>Proposer une invitée</option>
              <option>Autre</option>
            </select>
          </label>
        </div>
        <label>
          Votre message <i>*</i>
          <textarea
            required
            name="message"
            rows={4}
            placeholder="Quelques mots pour nous mettre en contexte…"
          />
        </label>
        {state === "error" && (
          <p className="form-message form-error" role="alert">
            Vérifiez les champs obligatoires et l’adresse courriel.
          </p>
        )}
        {state === "failed" && (
          <p className="form-message form-error" role="alert">
            L’envoi n’a pas abouti. Vous pouvez écrire directement à{" "}
            {brand.email}.
          </p>
        )}
        {state === "sent" && (
          <p className="form-message form-success" role="status">
            <Check size={16} /> Votre message a été envoyé.
          </p>
        )}
        {state === "email" && (
          <p className="form-message" role="status">
            Votre application de courriel devrait s’ouvrir avec un brouillon.
            Aucun envoi n’est confirmé par ce site.
          </p>
        )}
        <button className="button form-submit" disabled={busy}>
          {busy ? "Envoi en cours…" : "Préparer le message"}{" "}
          <ArrowRight size={16} />
        </button>
        <p className="form-privacy">
          Sans service d’envoi configuré, ce formulaire prépare un courriel dans
          votre application.
        </p>
      </form>
    </section>
  );
}

function PartnershipBand({ navigate }: { navigate: (to: string) => void }) {
  return (
    <section className="partnership-band">
      <div className="partnership-inner reveal">
        <div>
          <span className="eyebrow eyebrow-light">
            ENTREPRISES · ORGANISMES · INVITÉ·ES
          </span>
          <h2>
            La prochaine histoire
            <br />
            <em>pourrait être la vôtre.</em>
          </h2>
        </div>
        <button
          className="button button-light"
          onClick={() => navigate("/collaborations")}
        >
          Parlons collaboration <ArrowUpRight size={16} />
        </button>
        <div className="band-decoration">
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>
      </div>
    </section>
  );
}

function Footer({ navigate }: { navigate: (to: string) => void }) {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <button className="footer-brand" onClick={() => navigate("/")}>
          <span className="footer-logo">
            <img src={imageUrl("logo-tinndi.jpg")} alt="" />
          </span>
          <span>
            <b>tinndi</b>
            <small>Parce que toute histoire mérite d’être contée.</small>
          </span>
        </button>
        <div className="footer-links">
          <div>
            <span>EXPLORER</span>
            {nav.slice(0, 4).map(([name, href]) => (
              <button key={href} onClick={() => navigate(href)}>
                {name}
              </button>
            ))}
          </div>
          <div>
            <span>NOUS JOINDRE</span>
            <button onClick={() => navigate("/collaborations")}>
              Collaborations
            </button>
            <button onClick={() => navigate("/contact")}>Contact</button>
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
          </div>
        </div>
        <div className="footer-note">
          Des histoires à écouter.
          <br />
          Des rencontres à garder.
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} BALADO TINNDI</span>
        <span>DES HISTOIRES À TRANSMETTRE</span>
        <div>
          {socials.map((s) => (
            <a key={s.label} href={s.href}>
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

function VideoModal({
  item,
  close,
  closeRef,
}: {
  item: Episode;
  close: () => void;
  closeRef: React.RefObject<HTMLButtonElement | null>;
}) {
  const embedUrl = item.videoUrl ? getYoutubeEmbedUrl(item.videoUrl) : null;
  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <section
        className="modal-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button
          ref={closeRef}
          className="modal-close"
          onClick={close}
          aria-label="Fermer le lecteur"
        >
          <X />
        </button>
        <div className="modal-video">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title={item.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : item.videoUrl ? (
            <video
              src={item.videoUrl}
              controls
              playsInline
              autoPlay
              aria-label={item.title}
            />
          ) : (
            <div className="video-pending">
              <CirclePlay size={48} />
              <span>La vidéo sera disponible ici</span>
            </div>
          )}
        </div>
        <div className="modal-caption">
          <span className="eyebrow">{item.kind} · TINNDI</span>
          <h2 id="modal-title">{item.title}</h2>
          <p>Avec {item.guest}</p>
        </div>
      </section>
    </div>
  );
}

function getYoutubeEmbedUrl(url: string) {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");
    let videoId: string | null = null;
    if (host === "youtu.be") videoId = parsed.pathname.slice(1);
    if (host === "youtube.com" || host === "m.youtube.com") {
      videoId = parsed.searchParams.get("v");
      if (!videoId && parsed.pathname.startsWith("/shorts/")) {
        videoId = parsed.pathname.split("/")[2] ?? null;
      }
    }
    if (!videoId || !/^[\w-]{11}$/.test(videoId)) return null;
    return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
  } catch {
    return null;
  }
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
