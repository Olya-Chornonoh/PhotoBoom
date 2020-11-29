import { Post } from './post';
import { User } from './user';

export interface Comment {
  id: number;
  User: User;
  Post: Post;
  comment: string;
}
