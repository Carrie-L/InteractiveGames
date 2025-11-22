
export type QuestRank = 'F' | 'E' | 'D' | 'C' | 'B' | 'A' | 'S' | 'SS' | 'SSS';

export interface Quest {
  id: string;
  rank: QuestRank;
  title: string; // Fantasy title
  subTitle: string; // Real Codelab title
  description: string;
  xp: number;
  codelabUrl: string;
  requirements: string[];
}

export interface UserProgress {
  level: number;
  currentXp: number;
  acceptedQuests: string[]; // Quest IDs
  completedQuests: string[]; // Quest IDs
}
