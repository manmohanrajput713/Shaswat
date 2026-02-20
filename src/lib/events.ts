export type EventType = "solo" | "team";
export type Track = "cultural" | "technical";

export interface Event {
  id: string;
  name: string;
  track: Track;
  type: EventType;
  icon: string;
  description: string;
  prize?: string;
}

export const CULTURAL_EVENTS: Event[] = [
  { id: "tone-of-titans", name: "Tone of Titans", track: "cultural", type: "solo", icon: "🎤", description: "A solo singing competition where voices clash for supremacy. Showcase your vocal prowess.", prize: "₹5,000" },
  { id: "band-wars", name: "Band Wars", track: "cultural", type: "team", icon: "🎸", description: "Battle of the bands — bring your crew, instruments, and energy for the ultimate musical showdown.", prize: "₹10,000" },
  { id: "beat-brawl", name: "Beat Brawl", track: "cultural", type: "solo", icon: "🥁", description: "A high-energy beatboxing and rhythm competition. Drop the beat, win the throne.", prize: "₹3,000" },
  { id: "emo-splash", name: "Emo Splash", track: "cultural", type: "solo", icon: "🎨", description: "Expressive art meets emotion — paint your feelings on canvas in this live art battle.", prize: "₹3,000" },
  { id: "headshot-heroes", name: "Headshot Heroes", track: "cultural", type: "team", icon: "🎯", description: "Multiplayer FPS gaming tournament. Team up and dominate the competition.", prize: "₹8,000" },
  { id: "shutter-showdown", name: "Shutter Showdown", track: "cultural", type: "solo", icon: "📸", description: "A live photography challenge — capture the moment, tell a story, win hearts.", prize: "₹4,000" },
  { id: "fashion-fiesta", name: "Fashion Fiesta", track: "cultural", type: "solo", icon: "👗", description: "The runway is yours. Show off your style in this glam fashion showcase.", prize: "₹5,000" },
  { id: "movie-quiz", name: "Movie Quiz", track: "cultural", type: "team", icon: "🎬", description: "Think you know your cinema? Test your knowledge across genres, eras, and languages.", prize: "₹3,000" },
];

export const TECHNICAL_EVENTS: Event[] = [
  { id: "kinetic-coding", name: "Kinetic Coding", track: "technical", type: "solo", icon: "💻", description: "A fast-paced competitive programming event. Solve algorithmic challenges under pressure.", prize: "₹8,000" },
  { id: "general-quiz", name: "General Quiz", track: "technical", type: "team", icon: "🧠", description: "The ultimate battle of intellect spanning science, tech, current affairs, and beyond.", prize: "₹5,000" },
  { id: "mela-quiz", name: "Mela Quiz", track: "technical", type: "team", icon: "🎡", description: "A fun-filled interactive quiz format with rapid fire, visual rounds, and surprises.", prize: "₹3,000" },
  { id: "workshop", name: "Workshop", track: "technical", type: "solo", icon: "🔧", description: "Hands-on learning sessions with industry experts. Upskill and innovate.", prize: "Certificate" },
  { id: "case-study-1", name: "Case Study 1", track: "technical", type: "team", icon: "📊", description: "Analyze real-world business and tech problems. Present your solution to a panel of judges.", prize: "₹6,000" },
  { id: "case-study-2", name: "Case Study 2", track: "technical", type: "team", icon: "🔬", description: "An advanced case study track featuring complex engineering and strategy challenges.", prize: "₹6,000" },
];

export const ALL_EVENTS = [...CULTURAL_EVENTS, ...TECHNICAL_EVENTS];
