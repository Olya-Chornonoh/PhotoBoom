import { User } from './user';

export interface Post {
  id: number;
  link: string;
  description: string;
  User: User;
  likes_count: number;
  comment_count: number;
}
