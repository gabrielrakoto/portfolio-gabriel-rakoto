/* Données neutres (non traduites) + dictionnaire de traduction complet FR/EN. */

const PROJECTS = [
  {
    id: "tbg",
    img: "assets/paysagement-pro.jpg",
    imgWebp: "assets/paysagement-pro.webp",
    url: "https://paysagementpro.vercel.app/",
  },
  {
    id: "kami",
    img: "assets/kami-auto-garage.jpg",
    imgWebp: "assets/kami-auto-garage.webp",
    url: "https://kami-auto-garage.vercel.app/",
  },
  {
    id: "lotus",
    img: "assets/lotus-imperial.jpg",
    imgWebp: "assets/lotus-imperial.webp",
    url: "https://lotusimperial.vercel.app/",
  },
  {
    id: "plomberie",
    img: "assets/plomberie-pro.jpg",
    imgWebp: "assets/plomberie-pro.webp",
    url: "https://designhandoffplomberiepro.vercel.app/",
  },
];

const SERVICES_META = [
  { num: "01", icon: "◈", pointColor: "#666666" },
  { num: "02", icon: "◎", pointColor: "#999999" },
  { num: "03", icon: "◉", pointColor: "#666666" },
];

const I18N = {
  fr: {
    nav: { home: "Accueil", projects: "Projets", services: "Services", contact: "Contact" },
    footer: {
      tagline: "Sites web sur mesure et SEO local pour propulser votre entreprise au Québec.",
      pages: "Pages",
      contactTitle: "Contact",
      privacy: "Politique de confidentialité",
    },
    hero: {
      badge: "SEO Local · Québec",
      titleMain: "Refonte & création de sites web, SEO local & Google My Business — ",
      titleAccent: "votre visibilité, c'est mon métier.",
      subtitle: "Gabriel Rakoto — Créateur de sites web & spécialiste SEO local pour les entreprises du Québec.",
      ctaLabel: "TRAVAILLONS ENSEMBLE",
      cardLine1: "PME QUÉBÉCOISES",
      cardLine2: "RÉSULTATS RÉELS.",
      cta: "Travaillons ensemble →",
    },
    aboutLabel: "À propos",
    about: {
      available: "Disponible",
      bio: "Passionné par le web et le marketing local, j'accompagne les PME québécoises à construire une présence en ligne qui génère de vrais résultats. Je m'occupe du site et du référencement — vous gagnez du temps et des clients.",
      values: ["Design web", "SEO Local", "Google My Business", "Québec"],
      stats: [
        { value: "10+", label: "Projets livrés" },
        { value: "3+", label: "Ans d'expérience" },
        { value: "100%", label: "Clients locaux" },
      ],
    },
    servicesLabel: "Services",
    projectsLabel: "Projets",
    seeServices: "Voir tous les services →",
    seeProjects: "Voir tous les projets",
    seeProject: "Voir le projet",
    visit: "Visiter →",
    projectsHero: "Réalisations.",
    servicesHero: "Ce que\nje fais.",
    ctaBanner: "Prêt à dominer\nGoogle dans\nvotre ville?",
    servicesCta: "Commencer",
    projectsCta: "Un projet en tête? Parlons-en et trouvons la meilleure approche pour votre entreprise.",
    contactLabel: "04 — Contact",
    privacyLabel: "05 — Confidentialité",
    privacy: {
      title: "Politique de\nconfidentialité.",
      updated: "Dernière mise à jour : 3 septembre 2026",
      sections: [
        {
          heading: "Introduction",
          paragraphs: [
            "La présente politique de confidentialité explique comment Gabriel Rakoto, travailleur autonome offrant des services de création de sites web et de référencement local (SEO) au Québec, recueille, utilise, conserve et protège les renseignements personnels des visiteurs et clients de ce site web (le « Site »).",
            "En utilisant ce Site, vous acceptez les pratiques décrites dans la présente politique, conformément à la Loi sur la protection des renseignements personnels dans le secteur privé (Loi 25) du Québec.",
          ],
        },
        {
          heading: "Responsable de la protection des renseignements personnels",
          paragraphs: [
            "Le responsable de la protection des renseignements personnels (RPRP) pour ce Site est Gabriel Rakoto, joignable à l'adresse courriel gabrielrakotor40@gmail.com.",
            "Pour toute question, demande ou plainte concernant vos renseignements personnels, vous pouvez communiquer directement avec le RPRP à cette adresse.",
          ],
        },
        {
          heading: "Renseignements personnels collectés",
          paragraphs: [
            "Formulaire de contact : lorsque vous remplissez le formulaire de contact du Site, nous recueillons votre nom, votre adresse courriel et le contenu de votre message.",
            "Statistiques de fréquentation : le Site utilise Umami, un outil d'analytique web respectueux de la vie privée, hébergé directement par le RPRP (aucune donnée transmise à un tiers). Umami ne dépose aucun témoin (cookie) et ne permet pas d'identifier individuellement les visiteurs : les adresses IP sont anonymisées et aucune donnée n'est conservée d'une visite à l'autre. Les données recueillies (pages visitées, provenance approximative, type d'appareil) sont agrégées et ne permettent pas de vous identifier personnellement.",
            "Le Site n'utilise aucun outil publicitaire ni témoin (cookie) de suivi publicitaire.",
            "Une seule donnée technique est conservée localement dans votre navigateur (stockage local, et non un témoin) : votre préférence de langue (français ou anglais), afin d'améliorer votre expérience lors de vos prochaines visites. Cette donnée reste sur votre appareil et n'est jamais transmise au RPRP.",
          ],
        },
        {
          heading: "Finalités de la collecte",
          paragraphs: [
            "Les renseignements recueillis via le formulaire de contact sont utilisés uniquement pour répondre à votre demande, discuter d'un projet potentiel et vous recontacter au sujet des services offerts.",
            "Aucun renseignement personnel n'est utilisé à des fins de sollicitation non liée à votre demande initiale, ni vendu, loué ou échangé à des tiers à des fins commerciales.",
          ],
        },
        {
          heading: "Consentement",
          paragraphs: [
            "Votre consentement explicite est requis avant l'envoi du formulaire de contact, au moyen d'une case à cocher dédiée. Vous pouvez retirer votre consentement en tout temps en communiquant avec le RPRP, sous réserve des obligations légales ou contractuelles en cours.",
          ],
        },
        {
          heading: "Conservation des renseignements",
          paragraphs: [
            "Les renseignements transmis via le formulaire de contact sont conservés dans la boîte courriel du RPRP pour la durée nécessaire à la gestion de la relation d'affaires, puis supprimés lorsqu'ils ne sont plus nécessaires aux fins pour lesquelles ils ont été recueillis.",
          ],
        },
        {
          heading: "Partage avec des tiers",
          paragraphs: [
            "Vos renseignements personnels ne sont partagés avec aucun tiers, sauf dans les cas suivants : obligation légale, ou recours à un fournisseur de services nécessaire à l'exploitation du Site (par exemple, un service d'hébergement web tel que Vercel ou Hostinger, ou un outil de prise de rendez-vous tel que Calendly, si vous choisissez de l'utiliser).",
            "Ces fournisseurs sont tenus de protéger la confidentialité des renseignements auxquels ils ont accès, dans la stricte mesure nécessaire à la fourniture de leurs services.",
          ],
        },
        {
          heading: "Mesures de sécurité",
          paragraphs: [
            "Le Site est servi via une connexion chiffrée (HTTPS). L'accès à la boîte courriel recevant les demandes de contact est protégé par un mot de passe et une authentification propre au RPRP. Aucune base de données de renseignements personnels n'est hébergée par ce Site.",
          ],
        },
        {
          heading: "Vos droits",
          paragraphs: [
            "Conformément à la Loi 25, vous disposez des droits suivants à l'égard de vos renseignements personnels : droit d'accès, droit de rectification, droit de retrait du consentement et droit à la portabilité, le cas échéant.",
            "Pour exercer l'un de ces droits, faites une demande écrite au RPRP à gabrielrakotor40@gmail.com. Une réponse vous sera fournie dans un délai de 30 jours suivant la réception de votre demande.",
          ],
        },
        {
          heading: "Droit de recours",
          paragraphs: [
            "Si vous estimez que vos droits n'ont pas été respectés, vous pouvez déposer une plainte auprès de la Commission d'accès à l'information du Québec (CAI) :",
          ],
        },
        {
          heading: "Modifications de la politique",
          paragraphs: [
            "Cette politique peut être mise à jour périodiquement, notamment si de nouveaux outils de collecte (par exemple, un outil d'analytique) sont ajoutés au Site. La date de dernière mise à jour est indiquée en haut de cette page.",
          ],
        },
      ],
    },
    services: [
      {
        title: "Site web professionnel",
        price: "500 $",
        desc: "Un site rapide, moderne et optimisé pour convertir vos visiteurs en clients.",
        points: [
          "Design sur mesure",
          "Responsive mobile-first",
          "Hébergement 1 an inclus",
          "Formulaire de contact optimisé",
          "SEO technique de base",
        ],
      },
      {
        title: "SEO Local + GMB",
        price: "150 $/mois",
        desc: "Apparaissez en tête des recherches locales et attirez plus de clients dans votre région.",
        points: [
          "Optimisation fiche GMB",
          "Citations locales (annuaires)",
          "Mots-clés géolocalisés",
          "Rapport mensuel détaillé",
          "Suivi du positionnement",
        ],
      },
      {
        title: "Site Web + SEO Local",
        price: "500 $ + 150 $/mois",
        desc: "Site professionnel et référencement local combinés pour dominer votre marché.",
        points: [
          "Tout inclus dans les 2 offres",
          "Priorité de support",
          "Stratégie de contenu local",
          "Analyse de la concurrence",
          "Suivi mensuel personnalisé",
        ],
      },
    ],
    projects: [
      {
        tag: "Réalisation",
        title: "Paysagement pro",
        niche: "Aménagement paysager · Québec, QC",
        desc: "Création du site web complet pour un paysagiste spécialisé en aménagement extérieur, embellissement de piscines et espaces de rêve dans la région de Québec.",
        services: ["Site web", "SEO Local", "GMB"],
      },
      {
        tag: "Réalisation",
        title: "Kami Auto Garage",
        niche: "Garage auto · Laval, QC",
        desc: "Refonte complète du site web et campagne SEO local pour un garage automobile indépendant.",
        services: ["Site web", "SEO Local", "GMB"],
      },
      {
        tag: "Réalisation",
        title: "Lotus Impérial",
        niche: "Restaurant philippin · Montréal, QC",
        desc: "Création du site web pour un restaurant de cuisine philippine familiale, avec menu en ligne et réservations.",
        services: ["Site web", "SEO Local", "GMB"],
      },
      {
        tag: "Réalisation",
        title: "Plomberie Pro",
        niche: "Plomberie · Québec, QC",
        desc: "Création du site web pour un plombier offrant un service d'urgence 24/7, avec demande de soumission en ligne.",
        services: ["Site web", "SEO Local", "GMB"],
      },
    ],
    contact: {
      title: "Parlons de\nvotre projet.",
      subtitle: "Décrivez votre projet et je vous réponds dans les 24 heures. Pas de prise de tête, juste une vraie conversation.",
      namePlaceholder: "Votre nom",
      emailPlaceholder: "Votre email",
      messagePlaceholder: "Parlez-moi de votre projet...",
      consentLabel: "J'accepte que mes renseignements soient utilisés pour me recontacter.",
      consentLinkLabel: "Voir la politique de confidentialité →",
      submit: "Envoyer →",
      calendly: "📅  Réserver un appel gratuit",
      orText: "ou",
      successTitle: "Message envoyé !",
      successMsg: "Je vous réponds dans les 24 heures.",
      emailLabel: "Email",
      phoneLabel: "Téléphone",
      linkedinLabel: "LinkedIn",
    },
  },
  en: {
    nav: { home: "Home", projects: "Projects", services: "Services", contact: "Contact" },
    footer: {
      tagline: "Custom websites and local SEO to grow your business in Quebec.",
      pages: "Pages",
      contactTitle: "Contact",
      privacy: "Privacy Policy",
    },
    hero: {
      badge: "Local SEO · Quebec",
      titleMain: "Website design, local SEO & Google My Business — ",
      titleAccent: "your visibility is my craft.",
      subtitle: "Gabriel Rakoto — Web creator & local SEO specialist for Quebec businesses.",
      ctaLabel: "LET'S WORK TOGETHER",
      cardLine1: "LOCAL BUSINESSES",
      cardLine2: "REAL RESULTS.",
      cta: "Let's work together →",
    },
    aboutLabel: "About",
    about: {
      available: "Available",
      bio: "Passionate about web and local marketing, I help Quebec SMEs build an online presence that generates real results. I handle the website and SEO — you save time and gain customers.",
      values: ["Web Design", "Local SEO", "Google My Business", "Québec"],
      stats: [
        { value: "10+", label: "Projects delivered" },
        { value: "3+", label: "Years of experience" },
        { value: "100%", label: "Local clients" },
      ],
    },
    servicesLabel: "Services",
    projectsLabel: "Projects",
    seeServices: "View all services →",
    seeProjects: "View all projects",
    seeProject: "View project",
    visit: "Visit →",
    projectsHero: "Projects.",
    servicesHero: "What\nI do.",
    ctaBanner: "Ready to rank first\non Google\nin your city?",
    servicesCta: "Get started",
    projectsCta: "Have a project in mind? Let's talk and find the best approach for your business.",
    contactLabel: "04 — Contact",
    privacyLabel: "05 — Privacy",
    privacy: {
      title: "Privacy\nPolicy.",
      updated: "Last updated: September 3, 2026",
      sections: [
        {
          heading: "Introduction",
          paragraphs: [
            "This privacy policy explains how Gabriel Rakoto, a self-employed provider of website creation and local SEO services in Quebec, collects, uses, retains and protects the personal information of visitors and clients of this website (the \"Site\").",
            "By using this Site, you accept the practices described in this policy, in accordance with Quebec's Act respecting the protection of personal information in the private sector (Law 25).",
          ],
        },
        {
          heading: "Person in charge of the protection of personal information",
          paragraphs: [
            "The person in charge of the protection of personal information for this Site is Gabriel Rakoto, reachable at gabrielrakotor40@gmail.com.",
            "For any question, request or complaint regarding your personal information, you may contact this person directly at the above address.",
          ],
        },
        {
          heading: "Personal information collected",
          paragraphs: [
            "Contact form: when you fill out the Site's contact form, we collect your name, email address and the content of your message.",
            "Traffic statistics: the Site uses Umami, a privacy-friendly web analytics tool self-hosted by the person in charge (no data is sent to a third party). Umami does not set any cookies and cannot individually identify visitors: IP addresses are anonymized and no data is retained across visits. The data collected (pages visited, approximate origin, device type) is aggregated and cannot be used to identify you personally.",
            "The Site does not use any advertising tool or advertising tracking cookie.",
            "One technical piece of information is stored locally in your browser (local storage, not a cookie): your language preference (French or English), to improve your experience on future visits. This data stays on your device and is never transmitted to the person in charge.",
          ],
        },
        {
          heading: "Purposes of the collection",
          paragraphs: [
            "Information collected through the contact form is used solely to respond to your request, discuss a potential project, and follow up with you about the services offered.",
            "No personal information is used for solicitation unrelated to your original request, nor sold, rented or exchanged with third parties for commercial purposes.",
          ],
        },
        {
          heading: "Consent",
          paragraphs: [
            "Your explicit consent is required before submitting the contact form, via a dedicated checkbox. You may withdraw your consent at any time by contacting the person in charge, subject to ongoing legal or contractual obligations.",
          ],
        },
        {
          heading: "Retention of information",
          paragraphs: [
            "Information submitted through the contact form is kept in the inbox of the person in charge for as long as necessary to manage the business relationship, then deleted once no longer needed for the purposes for which it was collected.",
          ],
        },
        {
          heading: "Sharing with third parties",
          paragraphs: [
            "Your personal information is not shared with any third party, except in the following cases: legal obligation, or use of a service provider necessary to operate the Site (for example, a web hosting service such as Vercel or Hostinger, or a scheduling tool such as Calendly, if you choose to use it).",
            "These providers are required to protect the confidentiality of the information they access, strictly to the extent necessary to provide their services.",
          ],
        },
        {
          heading: "Security measures",
          paragraphs: [
            "The Site is served over an encrypted (HTTPS) connection. Access to the inbox receiving contact requests is protected by a password and authentication specific to the person in charge. No personal information database is hosted by this Site.",
          ],
        },
        {
          heading: "Your rights",
          paragraphs: [
            "In accordance with Law 25, you have the following rights regarding your personal information: right of access, right of rectification, right to withdraw consent, and right to portability, where applicable.",
            "To exercise any of these rights, submit a written request to gabrielrakotor40@gmail.com. A response will be provided within 30 days of receiving your request.",
          ],
        },
        {
          heading: "Right of recourse",
          paragraphs: [
            "If you believe your rights have not been respected, you may file a complaint with the Commission d'accès à l'information du Québec (CAI):",
          ],
        },
        {
          heading: "Changes to this policy",
          paragraphs: [
            "This policy may be updated periodically, notably if new data-collection tools (such as an analytics tool) are added to the Site. The last update date is shown at the top of this page.",
          ],
        },
      ],
    },
    services: [
      {
        title: "Professional Website",
        price: "$500",
        desc: "A fast, modern website optimized to convert your visitors into customers.",
        points: [
          "Custom design",
          "Mobile-first responsive",
          "1-year hosting included",
          "Optimized contact form",
          "Basic technical SEO",
        ],
      },
      {
        title: "Local SEO + GMB",
        price: "$150/mo",
        desc: "Rank at the top of local searches and attract more customers in your area.",
        points: [
          "GMB profile optimization",
          "Local citations (directories)",
          "Geolocalized keywords",
          "Detailed monthly report",
          "Ranking tracking",
        ],
      },
      {
        title: "Website + Local SEO",
        price: "$500 + $150/mo",
        desc: "Professional website and local SEO combined to dominate your market.",
        points: [
          "Everything in both offers",
          "Priority support",
          "Local content strategy",
          "Competitor analysis",
          "Monthly personalized follow-up",
        ],
      },
    ],
    projects: [
      {
        tag: "Project",
        title: "Paysagement pro",
        niche: "Landscaping · Québec, QC",
        desc: "Full website creation for a landscaping specialist focused on exterior design, pool beautification and outdoor spaces in the Québec region.",
        services: ["Website", "Local SEO", "GMB"],
      },
      {
        tag: "Project",
        title: "Kami Auto Garage",
        niche: "Auto Garage · Laval, QC",
        desc: "Full website redesign and local SEO campaign for an independent auto garage.",
        services: ["Website", "Local SEO", "GMB"],
      },
      {
        tag: "Project",
        title: "Lotus Impérial",
        niche: "Filipino Restaurant · Montréal, QC",
        desc: "Website creation for a family-style Filipino restaurant, with online menu and reservations.",
        services: ["Website", "Local SEO", "GMB"],
      },
      {
        tag: "Project",
        title: "Plomberie Pro",
        niche: "Plumbing · Québec, QC",
        desc: "Website creation for a plumber offering 24/7 emergency service, with online quote requests.",
        services: ["Website", "Local SEO", "GMB"],
      },
    ],
    contact: {
      title: "Let's talk about\nyour project.",
      subtitle: "Describe your project and I'll get back to you within 24 hours. No fuss, just a real conversation.",
      namePlaceholder: "Your name",
      emailPlaceholder: "Your email",
      messagePlaceholder: "Tell me about your project...",
      consentLabel: "I agree that my information be used to contact me back.",
      consentLinkLabel: "See privacy policy →",
      submit: "Send →",
      calendly: "📅  Book a free call",
      orText: "or",
      successTitle: "Message sent!",
      successMsg: "I'll get back to you within 24 hours.",
      emailLabel: "Email",
      phoneLabel: "Phone",
      linkedinLabel: "LinkedIn",
    },
  },
};

const CONTACT_INFO = {
  email: "gabrielrakotor40@gmail.com",
  phoneDisplay: "581-979-2198",
  phoneHref: "tel:+15819792198",
  linkedinUrl: "https://www.linkedin.com/in/gabriel-rakoto-708b39351/",
  linkedinDisplay: "gabriel-rakoto",
  calendlyUrl: "https://calendly.com/gabriel-rakoto",
};
