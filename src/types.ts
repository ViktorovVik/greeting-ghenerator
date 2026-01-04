export enum OccasionType {
  BIRTHDAY = "День Рождения",
  NEW_YEAR = "Новый Год",
}

// export const OccasionType = {
//   BIRTHDAY: "День Рождения",
//   NEW_YEAR:  "Новый Год",
// } as const;

// export type OccasionType = (typeof OccasionType) [keyof typeof OccasionType];

export enum ToneType {
  OFFICIAL = "Официальный",
  FRIENDLY = "Жружеский",
  HUMOROUS = "Юмористический",
  ROMANTIC = "Романтический",
  ADULT = "18+",
}

export type LanguageType = "Русский" | "Белорусский" | "English" | "Français" | "Español" | "Deautch";
