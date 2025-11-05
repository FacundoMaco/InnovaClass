export interface PedagogicalScore {
  empathy: number;
  assertiveness: number;
  inclusivity: number;
  conflictManagement: number;
}

export interface Option {
  id: number;
  text: string;
  score: PedagogicalScore;
  ramification: string;
  feedback: string;
}

export interface HotspotConfig {
  id: string;
  pitch: number;
  yaw: number;
  text: string;
}

export interface Interaction {
  id: string; // Corresponds to hotspot id
  title: string;
  context: string;
  options: Option[];
}

export interface Scenario {
  id: string;
  title: string;
  image: string;
  studentPersona: string;
  interactions: Interaction[];
  hotspots: HotspotConfig[];
}

// Fix: Add the missing Hotspot interface based on its usage in HotspotCard.tsx.
export interface Hotspot {
  id: string;
  text: string;
  confidence_score: number;
  type: string;
  pitch: number;
  yaw: number;
}
