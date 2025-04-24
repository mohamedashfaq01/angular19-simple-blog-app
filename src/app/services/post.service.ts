import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post.model';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostService {
  private readonly http = inject(HttpClient);
  // private readonly baseUrl = 'https://jsonplaceholder.typicode.com/posts';

  private readonly baseUrl = 'https://dummyjson.com/posts';

  // Using signals for state management
  posts = signal<Post[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  fetchPosts() {
    this.loading.set(true);
    this.error.set(null);

    this.http.get<{posts: Post[]}>(this.baseUrl)
      .pipe(
        tap({
          next: (response) => {
            console.log(response);
            this.posts.set(response.posts);
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