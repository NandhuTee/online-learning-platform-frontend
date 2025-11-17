export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail?: string | null;
  isFree: boolean;
  price?: number | null;
}
//src/app/types/course.tsx