import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Post } from '../models/post.model';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-blog-post-details',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './blog-post-details.component.html',
  styleUrl: './blog-post-details.component.scss'
})
export class BlogPostDetailsComponent {
  route = inject(ActivatedRoute);
  postService = inject(PostService);
  post = signal<Post | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        this.loading.set(true);
        return this.postService.getPostById(id);
      })
    ).subscribe({
      next: (post) => {
        this.post.set(post);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.message || 'Failed to load post');
        this.loading.set(false);
      }
    });
  }

}
