export interface Journey {
  id: string;
  name: string;
  description: string;
  status: 'draft' | 'active' | 'completed';
  createdAt: string;
  updatedAt: string;
  stages: Stage[];
  personaIds: string[];
  coverImage?: string;
}

export interface Stage {
  id: string;
  name: string;
  order: number;
  touchpoints: Touchpoint[];
}

export interface Touchpoint {
  id: string;
  name: string;
  description: string;
  insights: {
    userNeeds: string[];
    painPoints: string[];
    opportunities: string[];
  };
  userEmotion: {
    score: number; // 1-5
    comment: string;
  };
  metrics: {
    satisfaction: number;
    effort: number;
    completion: number;
  };
  feedback: Feedback[];
  image?: string;
}

export interface Feedback {
  id: string;
  content: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  source: string;
  date: string;
}