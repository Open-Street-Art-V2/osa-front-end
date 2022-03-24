export type User = {
  id: number;
  email: string;
  firstname: string;
  name: string;
  favoriteCity?: string;
  birthDate: Date;
  role: string;
  createdAt: Date;
  blocked: boolean;
};
