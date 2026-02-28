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
  poster?: string;
  overview?: string;
  rulebookUrl?: string;
}

export const CULTURAL_EVENTS: Event[] = [
  {
    id: "tone-of-titans",
    name: "Tone of Titans",
    track: "cultural",
    type: "solo",
    icon: "🎤",
    description: "A solo singing competition where voices clash for supremacy. Showcase your vocal prowess.",
    prize: "₹10,000"
  },
  {
    id: "bandwars",
    name: "Bandwars",
    track: "cultural",
    type: "team",
    icon: "🎸",
    description: "The ultimate battle for musical supremacy showcasing synergy, stage presence, and raw talent.",
    prize: "₹25,000",
    overview: "The ultimate battle for musical supremacy where bands of all genres—from rock and fusion to metal—showcase their synergy, stage presence, and raw talent. The competition follows a two-phase format, starting with a national-level online video screening (Max 2 mins). Selected bands then proceed to the live finale on campus, where they are given a 20-minute slot to demonstrate their technical proficiency, coordination, and originality before a live audience and a panel of judges.\n\nGENERAL INFORMATION:\nFormat: Team participation (Team of 3 to 6 members)\nDuration: 15 minutes total (5 min setup + 10 min performance)\nEligibility: Open to all\nMode: Offline"
  },
  {
    id: "solo-dance",
    name: "Solo Dance Competition",
    track: "cultural",
    type: "solo",
    icon: "🕺",
    description: "A captivating solo dance competition where individual performers express talent, emotion, and creativity.",
    prize: "₹10,000",
    overview: "A captivating solo dance competition where individual performers express talent, emotion, and creativity through powerful choreography, precise technique and confident stage presence, aiming to mesmerise judges and audience alike.\n\nClub – Manthan"
  },
  {
    id: "beat-brawl",
    name: "Beat Brawl",
    track: "cultural",
    type: "team",
    icon: "👯",
    description: "A vibrant group dance competition where teams showcase synchronised choreography, creativity, and stage presence.",
    prize: "₹25,000",
    overview: "A vibrant group dance competition where teams showcase synchronised choreography, creativity, and stage presence, blending music and movement to captivate the audience and impress judges with energy, coordination, and expression.\n\nClub – Manthan"
  },
  {
    id: "emo-splash",
    name: "Emo Splash",
    track: "cultural",
    type: "solo",
    icon: "🎨",
    description: "Participants will pick one random slip with a theme, medium, and form to create artwork. Test your creativity and spontaneity!",
    prize: "₹10,000",
    overview: "The Solo Art Event. Participants will pick one random slip at the venue. Each slip will contain a theme, medium, and form, and the artwork must be created strictly according to it. Test your creativity and spontaneity! Artwork will be judged on the basis of the level of creativity and adherence to the theme."
  },
  {
    id: "family-feud",
    name: "Family Feud",
    track: "cultural",
    type: "team",
    icon: "👨‍👩‍👧‍👦",
    description: "Compete in a knockout-style tournament predicting the most popular community answers to fictional debates.",
    prize: "₹20,000",
    overview: "Participants compete in a knockout-style tournament based on the classic Family Feud format, focusing entirely on movies, anime, gaming, and literature. Teams must navigate fast-paced survey rounds to identify the most popular community answers to fictional debates and tropes. Winners are determined by their ability to predict the consensus on iconic characters, transformations, and lore within the allotted time.\n\nFictoria"
  },
  {
    id: "shutter-showdown",
    name: "Shutter Showdown",
    track: "cultural",
    type: "solo",
    icon: "📸",
    description: "An artistic photography event showing off technical and visual storytelling skills.",
    prize: "₹10,000+",
    overview: "An artistic photography event that gives people a chance to show off their technical and visual storytelling skills. People are encouraged to use their cameras to capture special moments, points of view, and feelings. The event is all about writing, clarity, creativity, and originality. We look at how well each entry tells a story, how well it looks, and how well it is presented overall. The best entries are chosen based on their total performance."
  },
  {
    id: "mela-quiz",
    name: "Mela Quiz",
    track: "cultural",
    type: "team",
    icon: "🎡",
    description: "A lively mix of sports, entertainment, brands, festivals, movies, music, and pop culture.",
    prize: "₹20,000",
    overview: "A lively mix of sports, entertainment, brands, festivals, movies, music, and pop culture; turning everyday conversations and interests into fun, competitive trivia."
  },
  {
    id: "fashion-fiesta",
    name: "Fashion Fiesta",
    track: "cultural",
    type: "solo",
    icon: "👗",
    description: "A lively celebration of style, confidence, and self-expression on the runway.",
    prize: "₹30,000",
    overview: "A Fashion Fiesta is not just a ramp walk—it’s a lively celebration of style, confidence, and self-expression. Participants step onto the runway to showcase different looks, from beautiful traditional outfits to bold modern styles, each telling its own story. It’s a space where individuality shines, and every walk reflects personality, grace, and attitude. With upbeat music, bright lights, and a cheering crowd, the whole atmosphere feels exciting and full of energy.\n\nDuration: 2-3h\nEligibility: Open to all.\nRounds : 2 ramp walk and 1 general questions round."
  },
  {
    id: "sansad-samvaad",
    name: "Sansad Samvaad: The Political Paradigm",
    track: "cultural",
    type: "team",
    icon: "🏛️",
    description: "A team-based, multi-round event diving deep into the world of Indian politics, governance, and public affairs.",
    prize: "₹20,000",
    overview: "LitCom Presents: “Sansad Samvaad : The Political Paradigm” Under the banner of Shaswat 2026 — IIPE’s Techno-Cultural Fest\n\n“Sansad Samvaad : The Political Paradigm” is a team-based, multi-round event that dives deep into the world of Indian politics, governance, and public affairs. From witty quizzes to journalistic reporting and an intense moot court face-off — this competition tests participants’ intellect, awareness, articulation, and presence of mind.\n\nGENERAL INFORMATION:\nFormat: Team participation (Team of 3 members)\nDuration: 2 hours\nEligibility: Open to all irrespective of their Institute\nMode: Offline"
  },
];

export const TECHNICAL_EVENTS: Event[] = [
  {
    id: "kinetic-coding",
    name: "Kinetic Coding (CP)",
    track: "technical",
    type: "solo",
    icon: "💻",
    description: "Participants will face a series of challenging algorithmic and problem-solving tasks designed to test their coding speed, logical thinking, and optimization skills.",
    prize: "₹10,000",
    overview: "Participants will face a series of challenging algorithmic and problem-solving tasks designed to test their coding speed, logical thinking, and optimization skills. Each round will push contestants to think critically and implement efficient solutions under time pressure. Get ready to showcase your problem-solving mindset and compete with the best minds on campus! Submissions will be judged based on correctness, efficiency, and overall performance on the leaderboard."
  },
  {
    id: "fluidity",
    name: "Fluidity (Simulation)",
    track: "technical",
    type: "solo",
    icon: "🌊",
    description: "A simulation-based technical event. Perform meshing, set up the model, and run CFD simulations in Ansys.",
    prize: "₹10,000",
    overview: "A simulation-based technical event where participants are provided with a predefined geometry. They must perform meshing, set up the model, and run simulations accurately in the domain of CFD (Computational Fluid Dynamics) in Ansys. Scoring is stage-wise, based on mesh quality, setup accuracy, simulation results, and overall technical performance. Winners are determined by total points earned.\n\nClub Name: Simulation's Club"
  },
  {
    id: "fire",
    name: "Fire (FIPI)",
    track: "technical",
    type: "solo",
    icon: "🔥",
    description: "FIRE (Future Innovation for Resource Efficiency) is a flagship problem-solving and technical presentation challenge centered on 'Turning Waste into Energy'.",
    prize: "₹15,000",
    overview: "FIRE (Future Innovation for Resource Efficiency) is a flagship problem-solving and technical presentation challenge organized by FIPI–IIPE, centered on the theme “Turning Waste into Energy.” The event focuses on innovative solutions in energy recycling, waste-to-energy technologies, and sustainable future energy systems. Participants present technically sound, original, and feasible ideas that address real-world energy and resource efficiency challenges. The competition emphasizes subject analysis, innovation, research depth, and structured presentation within a defined time frame, encouraging forward-thinking solutions that contribute to a cleaner and more sustainable energy landscape.\n\nTheme: FIPI IIPE is Recycling Energy"
  },
  {
    id: "know-your-equipment",
    name: "Know your equipment (IIChE)",
    track: "technical",
    type: "team",
    icon: "⚙️",
    description: "Identify the name, working principle, and application of oil and gas equipment.",
    prize: "₹20,000",
    overview: "We will display images of equipment used in the oil and gas industry. Participants will be required to identify the name, working principle, and application of each piece of equipment to score points. Students from all branches can participate in this event, as it will include questions covering the entire oil and gas industry, including upstream, midstream, and downstream sectors.\n\nIIChE"
  },
  {
    id: "escape-room",
    name: "Escape room (SPE)",
    track: "technical",
    type: "team",
    icon: "🚪",
    description: "A multidisciplinary team event solving questions to get the code and escape the room.",
    prize: "₹20,000",
    overview: "an escape room kind off event, where multidisciplinary team of 4 students, solving questions requiring different discipline knowledge, will move further, getting the code and escaping the room. If you get stuck over a question, there are lifelines like call a friend etc. top 6 teams will be shortlisted from all participating teams via a rapid quiz consisting of common science knowledge.\n\nSPE"
  },
  {
    id: "the-wild-cat",
    name: "The Wild Cat (AAPG)",
    track: "technical",
    type: "team",
    icon: "🐅",
    description: "Shashwat's premier Oil and Gas case study showdown! Crack complex industry challenges and pitch game-changing solutions.",
    prize: "₹15,000",
    overview: "Ready to strike oil? Enter The Wild Cat, Shashwat's premier Oil and Gas case study showdown hosted by the AAPG IIPE Student Chapter! Crack complex industry challenges, craft masterful strategies, and pitch game-changing solutions to real-world energy dilemmas. Form a team of 3-4 members to compete. The high-stakes case goes live on Unstop a day prior. Strategize, innovate, and claim victory!\n\nDuration - 3 hrs\nEligibility - open to all"
  },
  {
    id: "roborush",
    name: "RoboRush",
    track: "technical",
    type: "team",
    icon: "🤖",
    description: "Participants design and build their own robo cars to compete in a high-speed obstacle race.",
    prize: "₹30,000",
    overview: "Participants design and build their own robo cars to compete in a high-speed obstacle race. Teams must complete the track within the allotted time, with winners decided by the fastest finish. Evaluation includes race performance (70 marks), code review (15 marks), and a technical presentation (15 marks).\n\nRobotics and Automation Club\nParineeth"
  },
  {
    id: "startup-sprint",
    name: "Startup Sprint",
    track: "technical",
    type: "team",
    icon: "🚀",
    description: "A fast-paced pitching challenge where ideas race against time and innovation meets execution.",
    prize: "₹30,000",
    overview: "Got a million-dollar idea running in your mind? Time to make it sprint! Startup Sprint is a fast-paced pitching challenge where ideas race against time and innovation meets execution. Participants get the chance to turn bold concepts into powerful pitches and convince the judges that their idea deserves the spotlight (and maybe the next big breakthrough title). From disruptive startups to smart problem-solving solutions, this event tests creativity, business sense, and presentation skills because in the startup world, it’s not just about having an idea, it’s about pitching it before the clock runs out!"
  },
  {
    id: "the-india-quiz",
    name: "The India quiz (Gen quiz)",
    track: "technical",
    type: "team",
    icon: "🇮🇳",
    description: "Explore India’s history, culture, polity, economy, geography, and current affairs in a fast-paced quiz.",
    prize: "₹20,000",
    overview: "Explore India’s history, culture, polity, economy, geography, and current affairs in a fast-paced quiz that tests your awareness of the nation’s past, present, and evolving future."
  },
  {
    id: "bizztech-quiz",
    name: "BizzTech quiz",
    track: "technical",
    type: "team",
    icon: "💼",
    description: "Dive into startups, companies, finance, innovations, and emerging technologies.",
    prize: "₹20,000",
    overview: "Dive into startups, companies, finance, innovations, and emerging technologies that shape today’s world, blending business knowledge with real-world tech awareness."
  },
  {
    id: "byteblitz",
    name: "ByteBlitz (Hackathon)",
    track: "technical",
    type: "team",
    icon: "⌨️",
    description: "Turn bold ideas into real products with intense coding, collaboration, and innovation in 48 hours.",
    prize: "₹24,000",
    overview: "Build fast. Break limits. 🚀\nJoin our hackathon to turn bold ideas into real products with intense coding, collaboration, and innovation in 48 hours.\n\nSemicolon"
  },
  {
    id: "subsurface-showdown",
    name: "Subsurface Showdown (EAGE)",
    track: "technical",
    type: "team",
    icon: "⚖️",
    description: "A high stakes bidding simulation to build the most profitable and well balanced portfolio.",
    prize: "TBA",
    overview: "A high stakes bidding simulation where teams analyze geological and economic data, assess risks and returns, and strategically compete in live auctions to build the most profitable and well balanced portfolio.\n\nClub - EAGE Student Chapter"
  },
];

export const ALL_EVENTS = [...CULTURAL_EVENTS, ...TECHNICAL_EVENTS];
