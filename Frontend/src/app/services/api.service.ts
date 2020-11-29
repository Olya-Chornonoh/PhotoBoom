import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Paged } from '../models/paged';
import { Post } from '../models/post';
import { PostLike } from '../models/post-like';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  register(email: string, login: string, password: string): Observable<User> {
    return this.http.post<User>(environment.apiUrl + '/users', {
      email,
      login,
      password,
    });
  }

  searchUsers(login: string, limit: number = 10000, offset: number = 0): Observable<Paged<User>> {
    return this.http.get<Paged<User>>(environment.apiUrl + '/users', {
      params: {
        login,
        limit: limit.toString(),
        offset: offset.toString(),
      }
    });
  }

  getUser(userId: number): Observable<User> {
    return this.http.get<User>(environment.apiUrl + '/users/' + userId);
  }

  getAllPosts(limit: number = 10000, offset: number = 0): Observable<Paged<Post>> {
    return this.http.get<Paged<Post>>(environment.apiUrl + '/posts',{
      params:{
        limit: limit.toString(),
        offset: offset.toString(),
      }
    });
  }

  getPost(postId: number): Observable<Post>{
    return this.http.get<Post>(environment.apiUrl + '/posts/' + postId);
  }

  getPostsForUser(userId: number, limit: number = 10000, offset: number = 0): Observable<Paged<Post>> {
    return this.http.get<Paged<Post>>(environment.apiUrl + '/posts/users/' + userId, {
      params: {
        limit: limit.toString(),
        offset: offset.toString(),
      }
    });
  }

  getPostsForCurrentUser(): Observable<Paged<Post>> {
    return this.http.get<Paged<Post>>(environment.apiUrl + '/posts/users/me');
  }

  createPost(post: FormData): Observable<Post> {
    return this.http.post<Post>(environment.apiUrl + '/posts', post);
  }

  deletePost(postId: number): Observable<number> {
    return this.http.delete<number>(environment.apiUrl + '/posts/' + postId);
  }

  getAllComments(postId: number, limit: number = 10000, offset: number = 0): Observable<Paged<Comment>>{
    return this.http.get<Paged<Comment>>(environment.apiUrl + '/posts/' + postId + '/comments', {
      params:{
        limit: limit.toString(),
        offset: offset.toString(),
      }
    });
  }

  createComment(postId: number, comment: string): Observable<Comment>{
    return this.http.post<Comment>(environment.apiUrl + '/posts/' + postId + '/comments', {
      comment
    });
  }

  deleteComment(postId: number, commentId: number): Observable<number>{
    return this.http.delete<number>(environment.apiUrl + '/posts/' + postId + '/comments/' + commentId);
  }

  updateComment(postId: number, commentId: number, comment: string): Observable<Comment>{
    return this.http.put<Comment>(environment.apiUrl + '/posts/' + postId + '/comments/' + commentId, {
      comment,
    });
  }

  createLike(postId: number): Observable<PostLike> {
    return this.http.post<PostLike>(environment.apiUrl + '/posts/' + postId + '/likes', {});
  }

  deleteLike(postId: number, likeId: number): Observable<number> {
    return this.http.delete<number>(environment.apiUrl + '/posts/' + postId + '/likes/' + likeId);
  }
}
