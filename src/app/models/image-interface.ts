export interface ImageInterface {
  id: number;
  userId: number;
  name: string;
  url: string;
  isPrivate: boolean;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
