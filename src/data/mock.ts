import { Sparkles, Brain, Heart, Leaf } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Program {
  id: string;
  title: string;
  host: string;
  description: string;
  time: string;
  icon: LucideIcon;
  category: string;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
}

export interface Episode {
  id: string;
  title: string;
  description: string;
  duration: string;
  program: string;
  date: string;
}

export type EventType = "En Vivo" | "Masterclass" | "Retiro" | "Taller";

export interface UpcomingEvent {
  id: string;
  title: string;
  description: string;
  dateDay: string;
  dateMonth: string;
  type: EventType;
  coachName: string;
  coachImage: string;
  instagramHandle: string;
}

export const FEATURED_EPISODE: Episode = {
  id: "ep-001",
  title: "El camino del despertar interior",
  description:
    "Un viaje profundo hacia la comprensión de nuestra verdadera naturaleza. Exploramos las claves para iniciar un camino de autoconocimiento genuino y transformador.",
  duration: "45 min",
  program: "Despierta tu Potencial",
  date: "5 Mar 2026",
};

export const LATEST_PROGRAMS: Program[] = [
  {
    id: "prog-001",
    title: "Despierta tu Potencial",
    host: "Laura Sánchez",
    description: "Herramientas prácticas para el crecimiento personal",
    time: "08:00",
    icon: Sparkles,
    category: "Desarrollo Personal",
  },
  {
    id: "prog-002",
    title: "Ciencia y Conciencia",
    host: "Dr. Martín Torres",
    description:
      "Donde la ciencia moderna se encuentra con la sabiduría antigua",
    time: "10:00",
    icon: Brain,
    category: "Ciencia",
  },
  {
    id: "prog-003",
    title: "Psicología y Bienestar",
    host: "Ana Morales",
    description: "Explorando la mente para una vida más plena",
    time: "14:00",
    icon: Heart,
    category: "Psicología",
  },
  {
    id: "prog-004",
    title: "Meditaciones Guiadas",
    host: "Carlos Ruiz",
    description: "Prácticas diarias para la paz interior",
    time: "06:00",
    icon: Leaf,
    category: "Meditación",
  },
];

export const RECENT_ARTICLES: Article[] = [
  {
    id: "art-001",
    title: "El poder de la meditación matinal",
    excerpt:
      "Descubre cómo 10 minutos al amanecer pueden transformar tu día completo.",
    category: "Meditación",
    date: "4 Mar 2026",
    readTime: "5 min",
  },
  {
    id: "art-002",
    title: "Neurociencia del despertar",
    excerpt:
      "Lo que la ciencia moderna dice sobre los estados ampliados de consciencia.",
    category: "Ciencia",
    date: "2 Mar 2026",
    readTime: "8 min",
  },
  {
    id: "art-003",
    title: "Respiración consciente: guía práctica",
    excerpt:
      "Técnicas ancestrales de respiración respaldadas por la ciencia actual.",
    category: "Bienestar",
    date: "28 Feb 2026",
    readTime: "6 min",
  },
];

export const NOW_PLAYING = {
  program: "Meditaciones Guiadas",
  host: "Carlos Ruiz",
  nextProgram: "Despierta tu Potencial",
  nextTime: "08:00",
};

export type CoachCategory =
  | "Todos"
  | "Meditación"
  | "Yoga & Breathwork"
  | "Coaching Espiritual"
  | "Tarot & Astrología"
  | "Sanación Energética"
  | "Mindfulness";

export interface CoachReview {
  author: string;
  text: string;
  rating: number;
}

export interface CoachSocial {
  platform: "instagram" | "youtube" | "twitter" | "web" | "spotify";
  url: string;
}

export interface Coach {
  id: string;
  name: string;
  role: string;
  category: CoachCategory;
  bio: string;
  image: string;
  specialties: string[];
  history: string;
  socials: CoachSocial[];
  reviews: CoachReview[];
}

export const COACH_CATEGORIES: CoachCategory[] = [
  "Todos",
  "Meditación",
  "Yoga & Breathwork",
  "Coaching Espiritual",
  "Tarot & Astrología",
  "Sanación Energética",
  "Mindfulness",
];

export const COACHES: Coach[] = [
  {
    id: "coach-001",
    name: "Laura Sánchez",
    role: "Coach de Vida & Meditación",
    category: "Meditación",
    bio: "Más de 15 años guiando meditaciones y retiros de silencio en Latinoamérica y Europa.",
    image: "/coaches/coach_laura.png",
    specialties: ["Meditación Vipassana", "Retiros de Silencio", "Mindfulness"],
    history: "Laura descubrió la meditación Vipassana a los 22 años durante un viaje a Myanmar. Tras completar retiros de 30 y 60 días en Tailandia, India y España, se formó como instructora certificada en el Insight Meditation Society de Massachusetts. Ha facilitado más de 200 retiros en 14 países y es autora del libro «Silencio Interior: Una Guía Práctica». Su enfoque combina la tradición contemplativa con la psicología moderna para hacerla accesible a todo público.",
    socials: [
      { platform: "instagram", url: "https://instagram.com/laurasanchez.zen" },
      { platform: "youtube", url: "https://youtube.com/@laurameditaciones" },
      { platform: "web", url: "https://laurasanchez.com" },
    ],
    reviews: [
      { author: "María G.", text: "Laura transformó mi relación con el silencio. Sus retiros son una experiencia que cambia la vida.", rating: 5 },
      { author: "Pedro R.", text: "Después de años sin poder meditar, con Laura por fin encontré mi práctica. Infinitamente agradecido.", rating: 5 },
      { author: "Camila S.", text: "Su calidez y profundidad hacen que cada sesión sea un regalo para el alma.", rating: 5 },
    ],
  },
  {
    id: "coach-002",
    name: "Carlos Ruiz",
    role: "Instructor de Yoga & Pranayama",
    category: "Yoga & Breathwork",
    bio: "Formado en Rishikesh, India. Integra técnicas ancestrales de respiración con neurociencia moderna.",
    image: "/coaches/coach_carlos.png",
    specialties: ["Kundalini Yoga", "Pranayama", "Breathwork Holotrópico"],
    history: "Carlos viajó a India a los 25 años buscando respuestas y encontró su camino en el ashram de Parmarth Niketan en Rishikesh. Se certificó como profesor de Kundalini Yoga bajo la lineage de Yogi Bhajan y completó estudios avanzados de Pranayama con maestros en Varanasi. Al volver a Latinoamérica, fundó «Respira Consciente», un programa que ha formado a más de 500 instructores. Es investigador asociado en neurociencia respiratoria en la Universidad de Buenos Aires.",
    socials: [
      { platform: "instagram", url: "https://instagram.com/carlosruiz.yoga" },
      { platform: "youtube", url: "https://youtube.com/@respiraconsciente" },
      { platform: "spotify", url: "https://open.spotify.com/show/carlosruiz" },
    ],
    reviews: [
      { author: "Andrea L.", text: "Las clases de Carlos son una fusión perfecta entre ciencia y espiritualidad. Mi respiración cambió por completo.", rating: 5 },
      { author: "Jorge M.", text: "El mejor instructor de pranayama que he conocido. Su conocimiento es enciclopédico.", rating: 5 },
    ],
  },
  {
    id: "coach-003",
    name: "Marcela Díaz",
    role: "Astróloga & Tarotista",
    category: "Tarot & Astrología",
    bio: "Lectora intuitiva con 12 años de experiencia en carta astral evolutiva y tarot terapéutico.",
    image: "/coaches/coach_marcela.png",
    specialties: ["Astrología Evolutiva", "Tarot Marsella", "Numerología"],
    history: "Marcela heredó el don de la lectura intuitiva de su abuela, una reconocida tarotista en Colombia. Estudió astrología evolutiva con Jeffrey Wolf Green y se formó en Tarot de Marsella con Alejandro Jodorowsky. Su enfoque terapéutico integra la carta natal como herramienta de autoconocimiento profundo. Conduce el programa semanal «Estrellas y Señales» en Frecuencia Consciente, donde interpreta los tránsitos planetarios con un lenguaje accesible y práctico.",
    socials: [
      { platform: "instagram", url: "https://instagram.com/marcela.astros" },
      { platform: "twitter", url: "https://x.com/marcelastros" },
      { platform: "web", url: "https://marceladiaz.co" },
    ],
    reviews: [
      { author: "Sofía T.", text: "Mi lectura con Marcela fue reveladora. Puso en palabras lo que sentía y no podía expresar.", rating: 5 },
      { author: "Luis E.", text: "Increíble precisión y sensibilidad. No es astrología genérica, es profundamente personal.", rating: 5 },
      { author: "Diana P.", text: "El programa de radio es mi cita semanal sagrada. Marcela tiene un don único.", rating: 4 },
    ],
  },
  {
    id: "coach-004",
    name: "Dr. Martín Torres",
    role: "Coach Espiritual & Psicoterapeuta",
    category: "Coaching Espiritual",
    bio: "Psicólogo transpersonal especializado en el puente entre ciencia y espiritualidad.",
    image: "/coaches/coach_martin.png",
    specialties: ["Psicología Transpersonal", "PNL Espiritual", "Constelaciones"],
    history: "Martín es doctor en Psicología Transpersonal por el CIIS de San Francisco y máster en Constelaciones Familiares por el Instituto Hellinger de Alemania. Durante 10 años ejerció como psicólogo clínico antes de dedicarse al coaching espiritual. Su método «Puentes de Consciencia» combina terapia gestalt, PNL y prácticas contemplativas para facilitar transformaciones profundas. Ha acompañado a más de 3,000 personas en procesos de crecimiento personal.",
    socials: [
      { platform: "instagram", url: "https://instagram.com/dr.martintorres" },
      { platform: "youtube", url: "https://youtube.com/@cienciayconciencia" },
      { platform: "web", url: "https://drmartintorres.com" },
    ],
    reviews: [
      { author: "Roberto V.", text: "Martín tiene la rara habilidad de combinar rigor científico con profundidad espiritual.", rating: 5 },
      { author: "Elena K.", text: "Sus constelaciones familiares me ayudaron a sanar heridas que cargaba desde la infancia.", rating: 5 },
    ],
  },
  {
    id: "coach-005",
    name: "Ana Morales",
    role: "Terapeuta de Sanación Energética",
    category: "Sanación Energética",
    bio: "Maestra de Reiki Usui nivel III y terapeuta de cristales con enfoque holístico.",
    image: "/coaches/coach_ana.png",
    specialties: ["Reiki Usui", "Cristaloterapia", "Limpieza de Chakras"],
    history: "Ana inició su camino en la sanación energética tras una experiencia personal de salud que la medicina convencional no pudo resolver. Se formó como Maestra de Reiki Usui en Japón con la lineage directa de Mikao Usui. Posteriormente estudió cristaloterapia en el Crystal Academy of Advanced Healing Arts en Londres. Su consulta combina Reiki, cristales y aromaterapia en sesiones holísticas que han ayudado a cientos de personas a recuperar su equilibrio energético.",
    socials: [
      { platform: "instagram", url: "https://instagram.com/ana.sanacionluz" },
      { platform: "web", url: "https://anamorales.healing" },
    ],
    reviews: [
      { author: "Patricia M.", text: "Después de una sesión con Ana, sentí una paz que no experimentaba en años.", rating: 5 },
      { author: "Carlos H.", text: "Escéptico al principio, pero la experiencia habla por sí sola. Transformador.", rating: 4 },
      { author: "Lucia R.", text: "Ana tiene manos de ángel. Cada sesión es un antes y un después.", rating: 5 },
    ],
  },
  {
    id: "coach-006",
    name: "Diego Herrera",
    role: "Facilitador de Mindfulness",
    category: "Mindfulness",
    bio: "Certificado por el MIT en reducción de estrés basada en atención plena (MBSR).",
    image: "/coaches/coach_diego.png",
    specialties: ["MBSR", "Atención Plena", "Gestión del Estrés"],
    history: "Diego es ingeniero de sistemas reconvertido en facilitador de mindfulness. Tras sufrir burnout en el mundo tech, descubrió el programa MBSR de Jon Kabat-Zinn que transformó su vida. Se certificó directamente con el Center for Mindfulness de la Universidad de Massachusetts y posteriormente completó el programa de formación del MIT en neurociencia contemplativa. Ahora lleva el mindfulness a empresas, escuelas y hospitales en toda Latinoamérica con su programa «Presencia Digital».",
    socials: [
      { platform: "instagram", url: "https://instagram.com/diego.mindful" },
      { platform: "twitter", url: "https://x.com/diegomindful" },
      { platform: "spotify", url: "https://open.spotify.com/show/diegomindful" },
    ],
    reviews: [
      { author: "Fernanda A.", text: "Diego traduce el mindfulness al lenguaje cotidiano. Sus talleres corporativos son extraordinarios.", rating: 5 },
      { author: "Marcos L.", text: "Como fellow techie, su enfoque basado en evidencia me convenció al instante.", rating: 5 },
    ],
  },
  {
    id: "coach-007",
    name: "Valentina Ríos",
    role: "Instructora de Yoga Restaurativo",
    category: "Yoga & Breathwork",
    bio: "Especialista en yoga terapéutico y restaurativo para el equilibrio cuerpo-mente.",
    image: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&q=80&w=800",
    specialties: ["Yoga Restaurativo", "Yin Yoga", "Yoga Nidra"],
    history: "Valentina fue bailarina profesional durante 12 años antes de que una lesión la llevara al yoga restaurativo como rehabilitación. Lo que comenzó como terapia se convirtió en su vocación. Estudió con Judith Hanson Lasater (creadora del Yoga Restaurativo moderno) y con Sarah Powers en Yin Yoga. Su enfoque único integra la consciencia corporal del ballet con la quietud profunda del yin, creando clases que son a la vez elegantes y profundamente sanadoras.",
    socials: [
      { platform: "instagram", url: "https://instagram.com/valentina.yogaflow" },
      { platform: "youtube", url: "https://youtube.com/@valentinayoga" },
    ],
    reviews: [
      { author: "Isabel G.", text: "Las clases de Valentina son pura poesía en movimiento. Sales flotando.", rating: 5 },
      { author: "Tomás B.", text: "Nunca pensé que 'no hacer nada' pudiera ser tan transformador. Su Yoga Nidra es mágico.", rating: 5 },
      { author: "Laura C.", text: "Ideal para quienes buscan un yoga sin presión, solo presencia y amor.", rating: 5 },
    ],
  },
  {
    id: "coach-008",
    name: "Roberto Paz",
    role: "Guía de Meditación Trascendental",
    category: "Meditación",
    bio: "Instructor certificado de meditación trascendental y facilitador de ceremonias de cacao.",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800",
    specialties: ["Meditación Trascendental", "Ceremonias de Cacao", "Mantras"],
    history: "Roberto descubrió la Meditación Trascendental a los 19 años y desde entonces no ha dejado de practicar. Se formó como instructor certificado en Fairfield, Iowa, con la organización fundada por Maharishi Mahesh Yogi. Paralelamente, estudió con maestros indígenas en Guatemala y México el uso ceremonial del cacao como planta maestra. Sus ceremonias combinan mantras védicos con la tradición mesoamericana del cacao, creando un espacio único de conexión con lo sagrado.",
    socials: [
      { platform: "instagram", url: "https://instagram.com/roberto.pazinterior" },
      { platform: "youtube", url: "https://youtube.com/@robertopazmt" },
      { platform: "web", url: "https://robertopaz.com" },
    ],
    reviews: [
      { author: "Natalia W.", text: "La ceremonia de cacao con Roberto fue la experiencia más profunda de mi vida.", rating: 5 },
      { author: "Andrés Q.", text: "Su enseñanza de MT es clara, paciente y completamente transformadora.", rating: 5 },
    ],
  },
];

export const UPCOMING_EVENTS: UpcomingEvent[] = [
  {
    id: "ev-001",
    title: "Yoga Nidra para el sueño profundo",
    description: "Sesión en vivo de 60 minutos para liberar tensiones y preparar cuerpo y mente para un descanso reparador.",
    dateDay: "15",
    dateMonth: "MAR",
    type: "En Vivo",
    coachName: "Valentina Ríos",
    coachImage: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&q=80&w=800",
    instagramHandle: "valentina.yogaflow",
  },
  {
    id: "ev-002",
    title: "Mindfulness en la era digital",
    description: "Masterclass de 2 horas: técnicas basadas en evidencia para mantener la calma y la atención en el día a día.",
    dateDay: "22",
    dateMonth: "MAR",
    type: "Masterclass",
    coachName: "Diego Mendoza",
    coachImage: "/coaches/coach_diego.png",
    instagramHandle: "diego.mindful",
  },
  {
    id: "ev-003",
    title: "Retiro de silencio en la naturaleza",
    description: "Fin de semana de desconexión y meditación guiada en un entorno natural. Plazas limitadas.",
    dateDay: "05",
    dateMonth: "ABR",
    type: "Retiro",
    coachName: "Roberto Paz",
    coachImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800",
    instagramHandle: "roberto.pazinterior",
  },
  {
    id: "ev-004",
    title: "Ceremonia de cacao y mantras",
    description: "Taller vivencial que combina cacao ceremonial con práctica de mantras para abrir el corazón.",
    dateDay: "12",
    dateMonth: "ABR",
    type: "Taller",
    coachName: "Roberto Paz",
    coachImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800",
    instagramHandle: "roberto.pazinterior",
  },
];
