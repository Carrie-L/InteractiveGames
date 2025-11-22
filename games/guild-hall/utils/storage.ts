
import { UserProgress } from '../types';

const STORAGE_KEY = 'guild_progress_v1';

const INITIAL_PROGRESS: UserProgress = {
  level: 1,
  currentXp: 0,
  acceptedQuests: [],
  completedQuests: []
};

export const getProgress = (): UserProgress => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to parse guild progress", e);
    }
  }
  return INITIAL_PROGRESS;
};

export const saveProgress = (progress: UserProgress) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
};

export const acceptQuest = (questId: string) => {
  const progress = getProgress();
  if (!progress.acceptedQuests.includes(questId) && !progress.completedQuests.includes(questId)) {
    progress.acceptedQuests.push(questId);
    saveProgress(progress);
  }
  return progress;
};

export const completeQuest = (questId: string, xpGain: number) => {
  const progress = getProgress();
  if (!progress.completedQuests.includes(questId)) {
    progress.completedQuests.push(questId);
    progress.acceptedQuests = progress.acceptedQuests.filter(id => id !== questId);
    progress.currentXp += xpGain;
    
    // Simple leveling logic: Level = 1 + floor(XP / 1000)
    // Or distinct thresholds. Let's stick to simple thresholds for now.
    // Rank F(50)+E(80)+D(150) = 280.
    // Let's say every 500 XP is a level.
    progress.level = 1 + Math.floor(progress.currentXp / 500);
    
    saveProgress(progress);
  }
  return progress;
};
