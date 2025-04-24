import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post, PostsResponse } from '../models/post.model';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostService {
  private readonly http = inject(HttpClient);
  // private readonly baseUrl = 'https://jsonplaceholder.typicode.com/posts';

  private readonly baseUrl = 'https://dummyjson.com/posts';

  // Using signals for state management
  postsResponse = signal<PostsResponse | null>(null);
  posts = signal<Post[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  fetchPosts(skip = 0, limit = 10) {
    this.loading.set(true);
    this.error.set(null);

    this.http.get<PostsResponse>(`${this.baseUrl}?skip=${skip}&limit=${limit}`)
      .pipe(
        tap({
          next: (response) => {
            console.log(response);
            this.posts.set(response.posts);
            this.postsResponse.set(response); // Store full response
            console.log(this.posts());
            this.loading.set(false);
          },
          error: (err) => {
            console.log('error in fetching posts');
            this.error.set(err.message || 'Failed to fetch posts');
            this.loading.set(false);
          }
        })
      )
      .subscribe();
  }

  getPostById(id: number) {
    return this.http.get<Post>(`${this.baseUrl}/${id}`);
  }
}