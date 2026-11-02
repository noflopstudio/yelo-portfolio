
import {
  useEffect,
  useMemo,
  useState,
  createContext,
  useContext,
} from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  useLocation,
  Link,
} from "react-router-dom";

import "./App.css";

const LanguageContext = createContext(null);

function LanguageProvider({ children }) {
  const [lang, setLang] = useState(
    () => localStorage.getItem("lang") || "fr"
  );

  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }

  return context;
}

function Icon({ name, size = 22 }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  const icons = {
    code: (
      <>
        <path d="m8 8-4 4 4 4" />
        <path d="m16 8 4 4-4 4" />
        <path d="m14 4-4 16" />
      </>
    ),
    shield: (
      <>
        <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    message: (
      <>
        <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z" />
      </>
    ),
    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.7 1.7-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5v.2h-2.4v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1L8 17l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H6.7v-2.4h.2a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9L8 8.6l1.7-1.7.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5v-.2h2.4v.2a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.7 1.7-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.2V14h-.2a1.7 1.7 0 0 0-1.5 1Z" />
      </>
    ),
    globe: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18" />
        <path d="M12 3a15 15 0 0 1 0 18" />
        <path d="M12 3a15 15 0 0 0 0 18" />
      </>
    ),
    headset: (
      <>
        <path d="M3 13v-2a9 9 0 0 1 18 0v2" />
        <path d="M5 13h2v6H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2Z" />
        <path d="M19 13h-2v6h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2Z" />
        <path d="M17 19a5 5 0 0 1-5 2" />
      </>
    ),
    phone: (
      <>
        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7l.5 3a2 2 0 0 1-.6 1.7L7.2 10a16 16 0 0 0 6 6l1.6-1.8a2 2 0 0 1 1.7-.6l3 .5a2 2 0 0 1 1.5 2.8Z" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    location: (
      <>
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    monitor: (
      <>
        <rect x="3" y="4" width="18" height="13" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </>
    ),
    layers: (
      <>
        <path d="m12 3 9 5-9 5-9-5 9-5Z" />
        <path d="m3 12 9 5 9-5" />
        <path d="m3 16 9 5 9-5" />
      </>
    ),
  };

  return <svg {...common}>{icons[name] || icons.code}</svg>;
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="language-toggle">
      <button
        className={lang === "fr" ? "active" : ""}
        onClick={() => setLang("fr")}
        type="button"
      >
        FR
      </button>

      <button
        className={lang === "en" ? "active" : ""}
        onClick={() => setLang("en")}
        type="button"
      >
        EN
      </button>
    </div>
  );
}

function Navbar() {
  const { lang } = useLanguage();

  const labels =
    lang === "fr"
      ? {
          home: "Accueil",
          about: "À propos",
          services: "Services",
          projects: "Projets",
          pricing: "Tarifs",
          contact: "Contact",
        }
      : {
          home: "Home",
          about: "About",
          services: "Services",
          projects: "Projects",
          pricing: "Pricing",
          contact: "Contact",
        };

  const links = [
    ["/", labels.home],
    ["/about", labels.about],
    ["/services", labels.services],
    ["/projects", labels.projects],
    ["/pricing", labels.pricing],
    ["/contact", labels.contact],
  ];

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link to="/" className="brand">
          <span className="brand-name">Yelo Joel</span>
          <span className="brand-role">Développeur Full-Stack</span>
        </Link>

        <nav className="nav-links">
          {links.map(([path, label]) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/"}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <LanguageToggle />
      </div>
    </header>
  );
}

function Footer() {
  const { lang } = useLanguage();

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <Link to="/" className="footer-brand">Yelo Joel</Link>
          <p>Développeur Full-Stack</p>
        </div>

        <p className="footer-message">
          {lang === "fr"
            ? "Des solutions digitales pensées pour vos besoins."
            : "Digital solutions designed around your needs."}
        </p>

        <p className="copyright">
          © {new Date().getFullYear()} Yelo Joel —{" "}
          {lang === "fr" ? "Tous droits réservés." : "All rights reserved."}
        </p>
      </div>
    </footer>
  );
}

function Home() {
  const { lang } = useLanguage();
  const fr = lang === "fr";

  const content = {
    badge: fr
      ? "Disponible pour de nouvelles missions freelance"
      : "Available for new freelance projects",
    title: fr
      ? "Des idées qui deviennent des solutions digitales."
      : "Turning ideas into digital solutions.",
    description: fr
      ? "Je conçois et développe des sites web, des applications web et des logiciels de gestion adaptés aux besoins des entreprises."
      : "I design and develop websites, web applications and management software adapted to business needs.",
    projects: fr ? "Voir mes projets" : "View my projects",
    pricing: fr ? "Voir les tarifs" : "View pricing",
    why: fr ? "Pourquoi travailler avec moi ?" : "Why work with me?",
    cards: [
      {
        icon: "message",
        title: fr ? "Écoute et compréhension" : "Listening and understanding",
        text: fr
          ? "Je prends le temps de comprendre votre activité, vos besoins et vos objectifs avant de proposer une solution."
          : "I take time to understand your business, needs and goals before proposing a solution.",
      },
      {
  icon: "code",
  title: fr ? "Développement moderne" : "Modern development",
  text: fr
    ? "Des solutions conçues avec des technologies modernes : React, JavaScript, HTML5, CSS3, Node.js, Express.js, Supabase, PostgreSQL, Git, GitHub, Vite, Firebase et Electron."
    : "Solutions built with modern technologies: React, JavaScript, HTML5, CSS3, Node.js, Express.js, Supabase, PostgreSQL, Git, GitHub, Vite, Firebase and Electron.",
},
      {
        icon: "shield",
        title: fr ? "Qualité et suivi" : "Quality and follow-up",
        text: fr
          ? "Une attention portée à la fiabilité, à la clarté du code et au suivi après la livraison."
          : "A focus on reliability, clear code and follow-up after delivery.",
      },
    ],
  };

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-content">
            <div className="availability">
              <span className="availability-dot" />
              {content.badge}
            </div>

            <p className="eyebrow">DÉVELOPPEMENT WEB & LOGICIEL</p>

            <h1>
              Yelo <span>Joel</span>
            </h1>

            <h2>{content.title}</h2>

            <p className="hero-description">{content.description}</p>

            <div className="hero-actions">
              <Link to="/projects" className="btn btn-primary">
                {content.projects}
                <Icon name="arrow" size={18} />
              </Link>

              <Link to="/pricing" className="btn btn-outline">
                {content.pricing}
              </Link>
            </div>

            <div className="hero-points">
              <div>
                <span className="icon-circle"><Icon name="shield" /></span>
                <div>
                  <strong>{fr ? "Qualité" : "Quality"}</strong>
                  <small>{fr ? "Travail soigné" : "Careful work"}</small>
                </div>
              </div>

              <div>
                <span className="icon-circle"><Icon name="clock" /></span>
                <div>
                  <strong>{fr ? "Organisation" : "Organization"}</strong>
                  <small>{fr ? "Étapes définies" : "Clear project steps"}</small>
                </div>
              </div>

              <div>
                <span className="icon-circle"><Icon name="headset" /></span>
                <div>
                  <strong>{fr ? "Accompagnement" : "Support"}</strong>
                  <small>{fr ? "Suivi du projet" : "Project follow-up"}</small>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-visual-card">
              <div className="visual-photo">
              <img
              src="/yelo-joel.jpeg"
              alt="Yelo Joel - Développeur Full-Stack"
              />
              </div>
              <p className="visual-label">FULL-STACK DEVELOPER</p>
              <h3>React · JavaScript · HTML5 · CSS3</h3>
              <h3>Node.js · Express.js · Supabase · PostgreSQL</h3>
              <h3>Git · GitHub · Vite · Firebase · Electron</h3>
              <div className="visual-line" />
              <p>
                {fr
                  ? "Des solutions utiles, adaptées à votre activité."
                  : "Useful solutions adapted to your business."}
              </p>
            </div>
            <div className="visual-decoration visual-decoration-one" />
            <div className="visual-decoration visual-decoration-two" />
          </div>
        </div>
      </section>

      <section className="section trust-section">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">{fr ? "MES ENGAGEMENTS" : "MY COMMITMENTS"}</p>
            <h2>{content.why}</h2>
            <p>
              {fr
                ? "Une collaboration claire, organisée et orientée vers vos objectifs."
                : "A clear, organized collaboration focused on your goals."}
            </p>
          </div>

          <div className="trust-grid">
            {content.cards.map((card) => (
              <article className="trust-card" key={card.title}>
                <span className="icon-circle"><Icon name={card.icon} /></span>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}

            <article className="commitment-card">
              <span className="icon-circle"><Icon name="shield" /></span>
              <h3>{fr ? "Mon engagement" : "My commitment"}</h3>
              <p>
                {fr
                  ? "Votre satisfaction est une priorité. Chaque projet est suivi avec sérieux, communication et transparence."
                  : "Your satisfaction matters. Every project is handled with care, communication and transparency."}
              </p>
              <strong>Yelo Joel</strong>
            </article>
          </div>
        </div>
      </section>

      <ServicesPreview />
      <ProjectsPreview />
      <PricingPreview />
      <ContactPreview />
    </>
  );
}

function About() {
  const { lang } = useLanguage();
  const fr = lang === "fr";

  const points = fr
    ? [
        "Comprendre le besoin avant de commencer le développement.",
        "Définir les fonctionnalités et les étapes du projet.",
        "Présenter l'avancement et échanger régulièrement.",
        "Tester la solution avant sa livraison.",
        "Prévoir un accompagnement selon les besoins convenus.",
      ]
    : [
        "Understand the requirements before development starts.",
        "Define features and project stages.",
        "Share progress and communicate regularly.",
        "Test the solution before delivery.",
        "Provide support according to agreed needs.",
      ];

  return (
    <PageHero
      eyebrow={fr ? "QUI SUIS-JE ?" : "WHO AM I?"}
      title={fr ? "À propos de moi" : "About me"}
      description={
        fr
          ? "Je suis Yelo Joel, développeur Full-Stack freelance. J'accompagne les entreprises et les porteurs de projets dans la création de solutions numériques adaptées à leurs activités."
          : "I am Yelo Joel, a freelance Full-Stack developer. I help businesses and project owners build digital solutions adapted to their activities."
      }
    >
      <div className="about-grid">
        <div className="about-card">
          <span className="icon-circle"><Icon name="code" /></span>
          <h2>{fr ? "Mon domaine" : "My field"}</h2>
          <p>
          {fr
          ? "Je développe des sites web, des applications web et des logiciels de gestion sur mesure pour aider les entreprises à digitaliser leurs activités, simplifier leur gestion et gagner en efficacité."
          : "I develop websites, web applications and custom management software to help businesses digitize their activities, simplify management and improve efficiency."}
         </p>
        </div>

        <div className="about-card">
          <span className="icon-circle"><Icon name="layers" /></span>
          <h2>{fr ? "Ma méthode de travail" : "My working method"}</h2>
          <ul className="check-list">
            {points.map((point) => (
              <li key={point}>
                <Icon name="check" size={18} />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>

       <div className="tech-stack">
       <span>React</span>
       <span>JavaScript</span>
      <span>HTML5</span>
      <span>CSS3</span>
      <span>Node.js</span>
      <span>Express.js</span>
      <span>Supabase</span>
      <span>PostgreSQL</span>
      <span>Git</span>
      <span>GitHub</span>
      <span>Vite</span>
     <span>Firebase</span>
     <span>Electron</span>
     </div>

      <p className="confidentiality-note">
        {fr
          ? "Certains logiciels réalisés pour des clients restent confidentiels et ne sont donc pas présentés publiquement."
          : "Some software developed for clients is confidential and therefore cannot be displayed publicly."}
      </p>
    </PageHero>
  );
}

function getServices(fr) {
  return [
    {
  icon: "settings",
  title: fr ? "Logiciels de gestion sur mesure" : "Custom management software",
  text: fr
    ? "Je conçois des logiciels de gestion adaptés aux réalités de votre entreprise pour centraliser vos opérations, simplifier le travail quotidien et mieux suivre votre activité."
    : "I develop management software tailored to your business needs to centralize operations, simplify daily work and improve business tracking.",
  details: fr
    ? [
        "Gestion des stocks et inventaires",
        "Gestion des ventes et facturation",
        "Suivi des paiements et de la caisse",
        "Gestion des mouvements de stock",
        "Tableaux de bord et rapports d'activité",
        "Gestion des utilisateurs et des accès",
        "Analyse et conception personnalisée",
        "Tests, installation et accompagnement"
      ]
    : [
        "Stock and inventory management",
        "Sales and invoicing management",
        "Payment and cash management",
        "Stock movement management",
        "Dashboards and business reports",
        "User and access management",
        "Analysis and custom design",
        "Testing, installation and support"
      ],
      },
      {
       icon: "globe",
       title: fr ? "Sites web et applications web" : "Websites and web applications",
       text: fr
    ? "Je conçois des sites web et des applications modernes, rapides et adaptés aux mobiles pour présenter votre activité, développer votre présence en ligne et proposer des services numériques à vos utilisateurs."
    : "I build modern, fast and mobile-friendly websites and web applications to showcase your business, strengthen your online presence and provide digital services to your users.",
        details: fr
     ? [
        "Sites vitrines professionnels",
        "Sites web dynamiques et interactifs",
        "Plateformes et applications web sur mesure",
        "Interfaces modernes et mobiles",
        "Formulaires et fonctions sur mesure",
        "Connexion aux bases de données",
        "Intégration de paiements en ligne",
        "Mise en ligne et configuration du domaine",
        "Tests et optimisation"
      ]
    : [
        "Professional business websites",
        "Dynamic and interactive websites",
        "Custom platforms and web applications",
        "Modern, mobile-friendly interfaces",
        "Custom forms and features",
        "Database integration",
        "Online payment integration",
        "Deployment and domain setup",
        "Testing and optimization"
      ],
      },
      {
        icon: "headset",
         title: fr ? "Maintenance et accompagnement" : "Maintenance and support",
         text: fr
    ? "J'assure le suivi technique de vos sites web, applications et logiciels afin de préserver leur bon fonctionnement, corriger les anomalies et les faire évoluer selon vos besoins."
    : "I provide technical support for your websites, applications and software to maintain proper operation, fix issues and help them evolve according to your needs.",
        details: fr
        ? [
        "Correction des bugs et anomalies",
        "Mises à jour techniques et fonctionnelles",
        "Surveillance du bon fonctionnement",
        "Amélioration des performances",
        "Vérification de la sécurité et des accès",
        "Sauvegarde et restauration des données",
        "Assistance technique à distance",
        "Ajout et amélioration de fonctionnalités",
        "Conseils et accompagnement selon accord"
      ]
    : [
        "Bug and issue fixing",
        "Technical and feature updates",
        "Monitoring proper operation",
        "Performance improvements",
        "Security and access checks",
        "Data backup and recovery",
        "Remote technical assistance",
        "Feature additions and improvements",
        "Guidance and support as agreed"
      ],
      },
      ];
      }

function Services() {
  const { lang } = useLanguage();
  const fr = lang === "fr";

  return (
    <PageHero
      eyebrow={fr ? "CE QUE JE PROPOSE" : "WHAT I OFFER"}
      title={fr ? "Mes services" : "My services"}
      description={
        fr
          ? "Des solutions numériques conçues pour répondre aux besoins concrets de votre entreprise."
          : "Digital solutions designed to meet your business needs."
      }
    >
      <ServiceCards />
    </PageHero>
  );
}

function ServiceCards() {
  const { lang } = useLanguage();
  const fr = lang === "fr";

  return (
    <div className="service-grid">
      {getServices(fr).map((service) => (
        <article className="service-card" key={service.title}>
          <span className="icon-circle"><Icon name={service.icon} /></span>
          <h3>{service.title}</h3>
          <p>{service.text}</p>
          <ul className="check-list">
            {service.details.map((detail) => (
              <li key={detail}>
                <Icon name="check" size={17} />
                {detail}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}

function ServicesPreview() {
  const { lang } = useLanguage();
  const fr = lang === "fr";

  return (
    <section className="section section-soft">
      <div className="container">
        <SectionTitle
          eyebrow={fr ? "MES COMPÉTENCES" : "MY EXPERTISE"}
          title={fr ? "Services" : "Services"}
          subtitle={
            fr
              ? "Des solutions sur mesure pour faire évoluer votre activité."
              : "Custom solutions to help your business grow."
          }
          link="/services"
          linkText={fr ? "Voir tous les services" : "View all services"}
        />
        <ServiceCards />
      </div>
    </section>
  );
}

function getProjects(fr) {
  return [
    {
    name: "Alliance Chrétienne",
    type: fr ? "Site de rencontres" : "Dating website",
    description: fr
    ? "Plateforme de rencontres chrétiennes permettant aux personnes de faire connaissance et de construire des relations sérieuses."
    : "A Christian dating platform where people can meet and build meaningful relationships.",
    url: "https://www.alliancechretienne.club",
    },
    {
      name: "Vite-Vendu",
      type: "Marketplace",
      description: fr
        ? "Marketplace pour offres commerciales."
        : "Marketplace for commercial offers.",
      url: "https://vite-vendu.com",
    },
  ];
}

function Projects() {
  const { lang } = useLanguage();
  const fr = lang === "fr";

  return (
    <PageHero
      eyebrow={fr ? "QUELQUES RÉALISATIONS" : "SELECTED WORK"}
      title={fr ? "Mes projets" : "My projects"}
      description={
        fr
          ? "Découvrez quelques projets présentables publiquement. Certains développements clients restent confidentiels."
          : "Explore selected projects that can be shared publicly. Some client developments remain confidential."
      }
    >
      <ProjectCards />
    </PageHero>
  );
}

function ProjectCards() {
  const { lang } = useLanguage();
  const fr = lang === "fr";

  return (
    <div className="project-grid">
      {getProjects(fr).map((project) => (
        <article className="project-card" key={project.name}>
          <div className="project-visual">
            <span className="icon-circle"><Icon name="monitor" size={34} /></span>
            <span className="project-type">{project.type}</span>
          </div>

          <div className="project-content">
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <a href={project.url} target="_blank" rel="noreferrer" className="text-link">
              {fr ? "Visiter le site" : "Visit website"}
              <Icon name="arrow" size={17} />
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}

function ProjectsPreview() {
  const { lang } = useLanguage();
  const fr = lang === "fr";

  return (
    <section className="section">
      <div className="container">
        <SectionTitle
          eyebrow={fr ? "PORTFOLIO" : "PORTFOLIO"}
          title={fr ? "Projets réalisés" : "Selected projects"}
          subtitle={
            fr
              ? "Quelques exemples de solutions numériques."
              : "A few examples of digital solutions."
          }
          link="/projects"
          linkText={fr ? "Voir tous les projets" : "View all projects"}
        />
        <ProjectCards />
      </div>
    </section>
  );
}



function getPrices(fr) {
  return [

    {
      title: fr ? "Site web simple" : "Simple website",
      subtitle: fr ? "Création sans agent IA" : "Website without AI agent",
      price: "60 000",
      details: fr
        ? [
            "Site vitrine professionnel",
            "Présentation des services",
            "Formulaire de contact",
            "Adaptation aux téléphones"
          ]
        : [
            "Professional showcase website",
            "Services presentation",
            "Contact form",
            "Mobile-friendly design"
          ],
      payment: fr ? "Prix de création" : "Development price",
    },
    {
      title: fr ? "Site web avec agent IA" : "Website with AI agent",
      subtitle: fr ? "Présence numérique intelligente" : "Intelligent digital presence",
      price: "150 000",
      details: fr
  ? [
      "Site vitrine ou site dynamique",
      "Agent IA intégré",
      "Assistant IA pour visiteurs",
      "Adaptation aux téléphones",
      "Domaine offert pendant 1 an",
      "Hébergement inclus"
    ]
  : [
      "Showcase or dynamic website",
      "Integrated AI agent",
      "AI visitor assistant",
      "Mobile-friendly design",
      "Free domain for 1 year",
      "Hosting included"
    ],
     payment: fr
  ? "Prix de création et d'hébergement"
  : "Development and hosting price",
    },

    {
      title: fr ? "Logiciel de gestion simple" : "Simple management software",
      subtitle: fr ? "Gestion et automatisation" : "Management and automation",
      price: "150 000",
      details: fr
        ? [
            "Gestion des stocks et inventaires",
            "Gestion de la caisse et des ventes",
            "Suivi de l'activité",
            "Solution adaptée à l'entreprise"
          ]
        : [
            "Stock and inventory management",
            "Cash and sales management",,
            "Business activity tracking",
            "Solution tailored to the business"
          ],
      payment: fr ? "Prix de création" : "Development price",
    },
    {
    title: fr ? "Logiciel de gestion avec IA" : "Management software with AI",
    subtitle: fr
    ? "Gestion intelligente et automatisation"
    : "Smart management and automation",
    price: "200 000",
     details: fr
    ? [
        "Gestion des stocks et inventaires",
        "Gestion de la caisse et des ventes",
        "Assistance intelligente par IA",
        "Automatisation selon les besoins",
        "Hébergement inclus"
      ]
    : [
        "Stock and inventory management",
        "Cash and sales management",,
        "Intelligent AI assistance",
        "Business automation",,
        "Hosting included"
      ],
    payment: fr
    ? "Prix de création et d'hébergement"
    : "Development and hosting price",
    },

    {
      title: fr ? "Site web + maintenance" : "Website + maintenance",
      subtitle: fr ? "Suivi technique et assistance" : "Technical support and assistance",
      price: "100 000",
      monthly: true,
      total: "300 000",
      duration: fr ? "Engagement minimum : 3 mois" : "Minimum commitment: 3 months",
      details: fr
        ? [
            "Corrections courantes",
            "Mises à jour techniques",
            "Surveillance et sécurité",
            "Assistance technique"
          ]
        : [
            "Routine fixes",
            "Technical updates",
            "Monitoring and security",
            "Technical assistance"
          ],
      payment: fr
        ? "Total sur 3 mois : 300 000 FCFA"
        : "Total for 3 months: 300,000 FCFA",
    },
    {
      title: fr ? "Logiciel + maintenance" : "Software + maintenance",
      subtitle: fr ? "Suivi technique et accompagnement" : "Technical support and guidance",
      price: "150 000",
      monthly: true,
      total: "600 000",
      duration: fr ? "Engagement minimum : 3 mois" : "Minimum commitment: 3 months",
      recommended: true,
      details: fr
        ? [
            "Corrections et améliorations",
            "Mises à jour et sécurité",
            "Assistance prioritaire",
            "Suivi technique continu"
          ]
        : [
            "Fixes and improvements",
            "Updates and security",
            "Priority support",
            "Continuous technical monitoring"
          ],
      payment: fr
        ? "Total sur 3 mois : 450 000 FCFA"
        : "Total for 3 months: 450,000 FCFA",
    },
  ];
}


function Pricing() {
  const { lang } = useLanguage();
  const fr = lang === "fr";

  return (
    <PageHero
      eyebrow={fr ? "OFFRES ET TARIFS" : "OFFERS AND PRICING"}
      title={fr ? "Des tarifs clairs" : "Clear pricing"}
      description={
        fr
          ? "Les tarifs sont indicatifs. Un devis précis est établi après analyse de votre besoin."
          : "Prices are indicative. A detailed quote is prepared after reviewing your requirements."
      }
    >
      <PricingCards />
      <p className="pricing-note">
        {fr
          ? "Le coût final dépend des fonctionnalités, du niveau de personnalisation et du périmètre convenu."
          : "The final cost depends on features, customization and the agreed project scope."}
      </p>
    </PageHero>
  );
}

function PricingCards() {
  const { lang } = useLanguage();
  const fr = lang === "fr";

  return (
    <div className="pricing-grid">
      {getPrices(fr).map((plan) => (
        <article
          className={`pricing-card ${plan.recommended ? "recommended" : ""}`}
          key={plan.title}
        >
          {plan.recommended && (
            <span className="recommended-label">
              {fr ? "Offre recommandée" : "Recommended offer"}
            </span>
          )}

          <span className="icon-circle"><Icon name="layers" /></span>
          <h3>{plan.title}</h3>
          <p className="pricing-subtitle">{plan.subtitle}</p>
          {plan.domainIncluded && (
           <div className="domain-badge">
         <span className="domain-icon">
         <Icon name="globe" size={14} />
         </span>
         {fr
         ? "Domaine offert pendant 1 an"
         : "Free domain for 1 year"}
         </div>
         )}

          <div className="price">
            <span>{fr ? "À partir de" : "Starting at"}</span>
            <strong>{plan.price} FCFA</strong>
            {plan.monthly && <small>{fr ? "/ mois" : "/ month"}</small>}
          </div>

          <ul className="check-list">
            {plan.details.map((detail) => (
              <li key={detail}>
                <Icon name="check" size={17} />
                {detail}
              </li>
            ))}
          </ul>

          <p className="payment-note">{plan.payment}</p>

          <Link to="/contact" className="btn btn-primary pricing-button">
            {fr ? "Demander un devis" : "Request a quote"}
            <Icon name="arrow" size={17} />
          </Link>
        </article>
      ))}
    </div>
  );
}

function PricingPreview() {
  const { lang } = useLanguage();
  const fr = lang === "fr";

  return (
    <section className="section section-soft">
      <div className="container">
        <SectionTitle
          eyebrow={fr ? "INVESTISSEMENT" : "INVESTMENT"}
          title={fr ? "Tarifs" : "Pricing"}
          subtitle={
            fr
              ? "Des tarifs indicatifs adaptés à la nature de votre projet."
              : "Indicative pricing based on your project."
          }
          link="/pricing"
          linkText={fr ? "Voir tous les tarifs" : "View all pricing"}
        />
        <PricingCards />
      </div>
    </section>
  );
}

function Contact() {
  const { lang } = useLanguage();
  const fr = lang === "fr";

  const whatsappPrefill = fr
  ? "Bonjour Monsieur Yelo Joel,\n\nJe vous contacte après avoir consulté votre portfolio. Je souhaiterais obtenir un devis pour la réalisation d'un projet numérique.\n\nMon besoin concerne : [précisez : logiciel de gestion, site web, application web ou maintenance].\n\nPourriez-vous, s'il vous plaît, me contacter afin que nous puissions échanger sur mon projet, vos propositions et les tarifs ?\n\nJe vous remercie pour votre disponibilité.\nCordialement."
  : "Hello Mr. Yelo Joel,\n\nI am contacting you after viewing your portfolio. I would like to request a quote for a digital project.\n\nMy request concerns: [please specify: management software, website, web application or maintenance].\n\nCould you please contact me so we can discuss my project, your proposals and pricing?\n\nThank you for your time.\nBest regards.";
  const whatsappLink =
    `https://wa.me/2250747064774?text=${encodeURIComponent(whatsappPrefill)}`;

  return (
    <PageHero
      eyebrow={fr ? "PARLONS DE VOTRE PROJET" : "LET'S TALK ABOUT YOUR PROJECT"}
      title={fr ? "Contact" : "Contact"}
      description={
        fr
          ? "Vous avez une idée, un besoin ou un projet ? Décrivez-le-moi et échangeons."
          : "Have an idea, a need or a project? Tell me about it and let's talk."
      }
    >
      <ContactCards whatsappLink={whatsappLink} />
    </PageHero>
  );
}

function ContactCards({ whatsappLink }) {
  const { lang } = useLanguage();
  const fr = lang === "fr";

  return (
    <div className="contact-grid">
      <article className="contact-main-card">
        <span className="icon-circle"><Icon name="message" size={28} /></span>
        <div className="availability availability-light">
          <span className="availability-dot" />
          {fr
            ? "Disponible pour de nouvelles missions freelance"
            : "Available for new freelance projects"}
        </div>

        <h2>Yelo Joel</h2>
        <p>
          {fr
            ? "Décrivez votre besoin en quelques lignes. Nous pourrons échanger sur les objectifs, les fonctionnalités et les prochaines étapes."
            : "Describe your needs in a few lines. We can discuss goals, features and next steps."}
        </p>

        <a href={whatsappLink} target="_blank" rel="noreferrer" className="btn btn-whatsapp">
          <Icon name="message" size={19} />
          {fr ? "Envoyer un message WhatsApp" : "Send a WhatsApp message"}
          <Icon name="arrow" size={18} />
        </a>
      </article>

      <article className="contact-details-card">
        <div className="contact-detail">
          <span className="icon-circle"><Icon name="phone" /></span>
          <div>
            <strong>{fr ? "Téléphone" : "Phone"}</strong>
            <a href="tel:+2250747064774">+225 0747064774</a>
          </div>
        </div>

        <div className="contact-detail">
          <span className="icon-circle"><Icon name="mail" /></span>
          <div>
            <strong>Email</strong>
            <a href="mailto:yelojoel1@gmail.com">yelojoel1@gmail.com</a>
          </div>
        </div>

        <div className="contact-detail">
          <span className="icon-circle"><Icon name="location" /></span>
          <div>
            <strong>{fr ? "Localisation" : "Location"}</strong>
            <p>Abidjan, Port-Bouët — Côte d'Ivoire</p>
          </div>
        </div>
      </article>
    </div>
  );
}

function ContactPreview() {
  const { lang } = useLanguage();
  const fr = lang === "fr";

  const whatsappPrefill = fr
  ? "Bonjour Monsieur Yelo Joel,\n\nJe vous contacte après avoir consulté votre portfolio. Je souhaiterais obtenir un devis pour la réalisation d'un projet numérique.\n\nMon besoin concerne : [précisez : logiciel de gestion, site web, application web ou maintenance].\n\nPourriez-vous, s'il vous plaît, me contacter afin que nous puissions échanger sur mon projet, vos propositions et les tarifs ?\n\nJe vous remercie pour votre disponibilité.\nCordialement."
  : "Hello Mr. Yelo Joel,\n\nI am contacting you after viewing your portfolio. I would like to request a quote for a digital project.\n\nMy request concerns: [please specify: management software, website, web application or maintenance].\n\nCould you please contact me so we can discuss my project, your proposals and pricing?\n\nThank you for your time.\nBest regards.";

  const whatsappLink =
    `https://wa.me/2250747064774?text=${encodeURIComponent(whatsappPrefill)}`;

  return (
    <section className="section">
      <div className="container">
        <SectionTitle
          eyebrow={fr ? "PRENONS CONTACT" : "GET IN TOUCH"}
          title={fr ? "Un projet en tête ?" : "Have a project in mind?"}
          subtitle={
            fr
              ? "Échangeons sur votre besoin et les solutions possibles."
              : "Let's discuss your needs and possible solutions."
          }
          link="/contact"
          linkText={fr ? "Tous les contacts" : "All contact details"}
        />
        <ContactCards whatsappLink={whatsappLink} />
      </div>
    </section>
  );
}

function PageHero({ eyebrow, title, description, children }) {
  return (
    <section className="page-section">
      <div className="container">
        <div className="page-heading">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        {children}
      </div>
    </section>
  );
}

function SectionTitle({ eyebrow, title, subtitle, link, linkText }) {
  return (
    <div className="section-title-row">
      <div className="section-heading">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>

      {link && (
        <Link to={link} className="text-link section-link">
          {linkText}
          <Icon name="arrow" size={17} />
        </Link>
      )}
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <ScrollToTop />

        <div className="app-shell">
          <Navbar />

          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}
