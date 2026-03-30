import {
  Leaf,
  Sparkles,
  Brain,
  Music,
  Heart,
  Users,
  Sun,
  MessageCircle,
  Moon,
  Mic,
  Star,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Article } from "./mock";

export interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  host: string;
  description: string;
  icon: LucideIcon;
}

export interface ProgramCategory {
  id: string;
  title: string;
  description: string;
  host: string;
  hostRole: string;
  icon: LucideIcon;
  episodeCount: number;
  category: string;
}

export interface PodcastEpisode {
  id: string;
  title: string;
  program: string;
  host: string;
  description: string;
  duration: string;
  date: string;
  episodeNumber: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  initials: string;
  image: string;
}

export const DAILY_SCHEDULE: ScheduleItem[] = [
  {
    id: "sch-01",
    time: "06:00",
    title: "Meditación Matinal",
    host: "Carlos Ruiz",
    description:
      "Comienza tu día con prácticas de mindfulness y respiración consciente",
    icon: Leaf,
  },
  {
    id: "sch-02",
    time: "08:00",
    title: "Despierta tu Potencial",
    host: "Laura Sánchez",
    description:
      "Herramientas prácticas para el crecimiento personal y el autoconocimiento",
    icon: Sparkles,
  },
  {
    id: "sch-03",
    time: "10:00",
    title: "Ciencia y Conciencia",
    host: "Dr. Martín Torres",
    description:
      "Donde la ciencia moderna se encuentra con la sabiduría antigua",
    icon: Brain,
  },
  {
    id: "sch-04",
    time: "12:00",
    title: "Música para el Alma",
    host: "DJ Cosmic",
    description: "Selección de música ambient, mantras y sonidos sanadores",
    icon: Music,
  },
  {
    id: "sch-05",
    time: "14:00",
    title: "Psicología y Bienestar",
    host: "Ana Morales",
    description:
      "Explorando la mente para una vida más plena y equilibrada",
    icon: Heart,
  },
  {
    id: "sch-06",
    time: "16:00",
    title: "Historias de Transformación",
    host: "Varios invitados",
    description:
      "Testimonios reales de personas que han transformado su vida",
    icon: Users,
  },
  {
    id: "sch-07",
    time: "18:00",
    title: "Yoga y Movimiento Consciente",
    host: "María Luna",
    description: "Guías de práctica y filosofía del yoga para todos los niveles",
    icon: Sun,
  },
  {
    id: "sch-08",
    time: "20:00",
    title: "Diálogos Conscientes",
    host: "Panel de expertos",
    description:
      "Mesa redonda sobre espiritualidad y desarrollo humano",
    icon: MessageCircle,
  },
  {
    id: "sch-09",
    time: "22:00",
    title: "Sonidos para Dormir",
    host: "Sistema automático",
    description:
      "Paisajes sonoros, frecuencias binaurales y meditaciones para el descanso",
    icon: Moon,
  },
];

export const PROGRAM_CATEGORIES: ProgramCategory[] = [
  {
    id: "cat-01",
    title: "Despierta tu Potencial",
    description:
      "Un programa dedicado al crecimiento personal, donde exploramos herramientas prácticas de PNL, coaching ontológico y desarrollo de habilidades emocionales para alcanzar tu mejor versión.",
    host: "Laura Sánchez",
    hostRole: "Coach de vida y PNL Practitioner",
    icon: Sparkles,
    episodeCount: 47,
    category: "Desarrollo Personal",
  },
  {
    id: "cat-02",
    title: "Ciencia y Conciencia",
    description:
      "Exploramos los puentes entre la física cuántica, la neurociencia y las tradiciones espirituales. Cada episodio revela cómo la ciencia moderna valida la sabiduría antigua.",
    host: "Dr. Martín Torres",
    hostRole: "Físico cuántico y divulgador científico",
    icon: Brain,
    episodeCount: 35,
    category: "Ciencia",
  },
  {
    id: "cat-03",
    title: "Psicología y Bienestar",
    description:
      "Desde la psicología transpersonal hasta las terapias holísticas, ofrecemos herramientas para comprender tu mente y cultivar un bienestar integral y duradero.",
    host: "Ana Morales",
    hostRole: "Psicóloga clínica y terapeuta holística",
    icon: Heart,
    episodeCount: 42,
    category: "Psicología",
  },
  {
    id: "cat-04",
    title: "Meditaciones Guiadas",
    description:
      "Prácticas diarias de meditación adaptadas para principiantes y avanzados. Mindfulness, visualización creativa, meditación trascendental y técnicas de respiración.",
    host: "Carlos Ruiz",
    hostRole: "Instructor de meditación certificado",
    icon: Leaf,
    episodeCount: 120,
    category: "Meditación",
  },
  {
    id: "cat-05",
    title: "Diálogos Conscientes",
    description:
      "Entrevistas y mesas redondas con maestros espirituales, científicos y líderes de pensamiento que están transformando nuestra comprensión de la realidad.",
    host: "Panel de expertos",
    hostRole: "Diversos invitados especiales",
    icon: Mic,
    episodeCount: 28,
    category: "Entrevistas",
  },
  {
    id: "cat-06",
    title: "Historias de Transformación",
    description:
      "Relatos en primera persona de quienes han atravesado crisis existenciales, despertares espirituales y transformaciones profundas. Historias que inspiran y conectan.",
    host: "Varios invitados",
    hostRole: "Testimonios de la comunidad",
    icon: Star,
    episodeCount: 19,
    category: "Testimonios",
  },
];

export const PODCAST_EPISODES: PodcastEpisode[] = [
  {
    id: "pod-01",
    title: "El camino del despertar interior",
    program: "Despierta tu Potencial",
    host: "Laura Sánchez",
    description:
      "Un viaje profundo hacia la comprensión de nuestra verdadera naturaleza y las claves del autoconocimiento.",
    duration: "45 min",
    date: "5 Mar 2026",
    episodeNumber: 47,
  },
  {
    id: "pod-02",
    title: "Física cuántica y consciencia",
    program: "Ciencia y Conciencia",
    host: "Dr. Martín Torres",
    description:
      "¿Puede la física cuántica explicar la consciencia? Exploramos las teorías más fascinantes.",
    duration: "52 min",
    date: "4 Mar 2026",
    episodeNumber: 35,
  },
  {
    id: "pod-03",
    title: "Liberando el apego emocional",
    program: "Psicología y Bienestar",
    host: "Ana Morales",
    description:
      "Técnicas prácticas para soltar aquello que nos ata y abrazar la libertad emocional.",
    duration: "38 min",
    date: "3 Mar 2026",
    episodeNumber: 42,
  },
  {
    id: "pod-04",
    title: "Meditación para la abundancia",
    program: "Meditaciones Guiadas",
    host: "Carlos Ruiz",
    description:
      "Una meditación guiada para abrir los canales de la abundancia en todas sus formas.",
    duration: "25 min",
    date: "2 Mar 2026",
    episodeNumber: 120,
  },
  {
    id: "pod-05",
    title: "Entrevista: El arte de vivir despierto",
    program: "Diálogos Conscientes",
    host: "Panel de expertos",
    description:
      "Conversación con el maestro zen Takeshi Yamada sobre la práctica del estar presente.",
    duration: "61 min",
    date: "1 Mar 2026",
    episodeNumber: 28,
  },
  {
    id: "pod-06",
    title: "De la crisis al despertar",
    program: "Historias de Transformación",
    host: "María García",
    description:
      "María nos cuenta cómo una enfermedad la llevó a descubrir su verdadero propósito de vida.",
    duration: "34 min",
    date: "28 Feb 2026",
    episodeNumber: 19,
  },
  {
    id: "pod-07",
    title: "El poder de la intención",
    program: "Despierta tu Potencial",
    host: "Laura Sánchez",
    description:
      "Cómo establecer intenciones claras puede transformar tu realidad cotidiana.",
    duration: "41 min",
    date: "27 Feb 2026",
    episodeNumber: 46,
  },
  {
    id: "pod-08",
    title: "Neuroplasticidad y meditación",
    program: "Ciencia y Conciencia",
    host: "Dr. Martín Torres",
    description:
      "Estudios recientes demuestran cómo la meditación transforma literalmente el cerebro.",
    duration: "48 min",
    date: "26 Feb 2026",
    episodeNumber: 34,
  },
  {
    id: "pod-09",
    title: "Sanando el niño interior",
    program: "Psicología y Bienestar",
    host: "Ana Morales",
    description:
      "Un viaje terapéutico para reconectar con nuestra esencia más pura y sanar heridas antiguas.",
    duration: "43 min",
    date: "25 Feb 2026",
    episodeNumber: 41,
  },
];

export const ALL_ARTICLES: Article[] = [
  {
    id: "art-001",
    title: "El poder de la meditación matinal",
    excerpt:
      "Descubre cómo 10 minutos al amanecer pueden transformar tu día completo y elevar tu energía.",
    category: "Meditación",
    date: "4 Mar 2026",
    readTime: "5 min",
  },
  {
    id: "art-002",
    title: "Neurociencia del despertar",
    excerpt:
      "Lo que la ciencia moderna dice sobre los estados ampliados de consciencia y su impacto neurológico.",
    category: "Ciencia",
    date: "2 Mar 2026",
    readTime: "8 min",
  },
  {
    id: "art-003",
    title: "Respiración consciente: guía práctica",
    excerpt:
      "Técnicas ancestrales de respiración respaldadas por la ciencia actual para tu bienestar diario.",
    category: "Bienestar",
    date: "28 Feb 2026",
    readTime: "6 min",
  },
  {
    id: "art-004",
    title: "Los 7 chakras: mapa del despertar",
    excerpt:
      "Una guía completa del sistema de chakras y cómo equilibrar tu energía a través de prácticas simples.",
    category: "Espiritualidad",
    date: "25 Feb 2026",
    readTime: "10 min",
  },
  {
    id: "art-005",
    title: "Alimentación consciente y energía vital",
    excerpt:
      "Cómo lo que comes afecta tu vibración energética y claves para una nutrición que eleve tu consciencia.",
    category: "Bienestar",
    date: "22 Feb 2026",
    readTime: "7 min",
  },
  {
    id: "art-006",
    title: "El silencio como maestro interior",
    excerpt:
      "En un mundo de ruido constante, redescubre el poder transformador del silencio y la soledad consciente.",
    category: "Meditación",
    date: "19 Feb 2026",
    readTime: "5 min",
  },
  {
    id: "art-007",
    title: "Sincronicidad: el lenguaje del universo",
    excerpt:
      "Jung y las coincidencias significativas. Aprende a leer las señales que la vida te envía cada día.",
    category: "Ciencia",
    date: "16 Feb 2026",
    readTime: "9 min",
  },
  {
    id: "art-008",
    title: "Relaciones conscientes: amar sin apego",
    excerpt:
      "Cómo construir vínculos profundos desde la libertad interior y el amor incondicional.",
    category: "Psicología",
    date: "13 Feb 2026",
    readTime: "6 min",
  },
  {
    id: "art-009",
    title: "Rituales matutinos para elevar tu frecuencia",
    excerpt:
      "Una rutina de mañana diseñada para conectar con tu propósito y comenzar el día con claridad.",
    category: "Desarrollo Personal",
    date: "10 Feb 2026",
    readTime: "4 min",
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "team-01",
    name: "Laura Sánchez",
    role: "Directora y Coach de Vida",
    bio: "Con más de 15 años de experiencia en coaching ontológico y PNL, Laura fundó Frecuencia Consciente con la visión de crear un espacio de transformación accesible para todos.",
    initials: "LS",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: "team-02",
    name: "Dr. Martín Torres",
    role: "Director Científico",
    bio: "Físico cuántico y divulgador, Martín conecta la ciencia de frontera con la espiritualidad, haciendo accesibles conceptos complejos para toda la audiencia.",
    initials: "MT",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: "team-03",
    name: "Ana Morales",
    role: "Psicóloga y Terapeuta",
    bio: "Especializada en psicología transpersonal y terapias holísticas, Ana guía a la audiencia en un viaje de autoconocimiento y sanación emocional.",
    initials: "AM",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    id: "team-04",
    name: "Carlos Ruiz",
    role: "Instructor de Meditación",
    bio: "Tras 10 años practicando en monasterios de Asia, Carlos trae la sabiduría contemplativa oriental en un formato práctico y adaptado a la vida moderna.",
    initials: "CR",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    id: "team-05",
    name: "María Luna",
    role: "Instructora de Yoga",
    bio: "Certificada en múltiples tradiciones de yoga, María integra movimiento, respiración y filosofía en sesiones que nutren cuerpo, mente y espíritu.",
    initials: "ML",
    image: "https://randomuser.me/api/portraits/women/90.jpg",
  },
];

export const CONTACT_SUBJECTS = [
  "Colaboración",
  "Patrocinio",
  "Prensa",
  "Sugerencia de programa",
  "Soporte técnico",
  "Otro",
] as const;
