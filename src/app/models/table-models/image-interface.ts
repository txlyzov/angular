export interface ImageFromDatabaseInterface {
  id: number;
  userId: number;
  name: string;
  url: string;
  isPrivate: boolean;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}
