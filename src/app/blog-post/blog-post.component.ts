import { Component, inject } from '@angular/core';
import { PostService } from '../services/post.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TruncatePipe } from '../pipes/truncate.pipe';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [CommonModule, RouterModule, TruncatePipe],
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.scss'
})
export class BlogPostComponent {
  postService = inject(PostService);

  // post-list.component.ts
  currentPage = 1;
  itemsPerPage = 10;

  isLastPage(): boolean {
    const res = this.postService.postsResponse();
    return res ? res.skip + res.limit >= res.total : true;
  }

  loadPage(page: number) {
    this.currentPage = page;
    const skip = (page - 1) * this.itemsPerPage;
    this.postService.fetchPosts(skip, this.itemsPerPage);
  }

  ngOnInit() {
    this.postService.fetchPosts();
  }

}
