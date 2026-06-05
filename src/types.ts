export type Language = "ru" | "en";

export interface FoodResult {
  foodName: string;
  calories: number;
  proteins: number;
  fats: number;
  carbs: number;
  portionEstimation: string;
  commentRu: string;
  commentEn: string;
}

export interface FAQItem {
  id: string;
  questionRu: string;
  questionEn: string;
  answerRu: string;
  answerEn: string;
}

export interface BadgeItem {
  id: string;
  nameRu: string;
  nameEn: string;
  descRu: string;
  descEn: string;
  iconEmoji: string;
  unlockedAtStreak: number;
  colorClass: string;
}

export interface FeatureItem {
  id: string;
  titleRu: string;
  titleEn: string;
  descRu: string;
  descEn: string;
  emoji: string;
}
