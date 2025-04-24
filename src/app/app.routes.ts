import { Routes } from '@angular/router';
import { BlogPostComponent } from './blog-post/blog-post.component';
import { BlogPostDetailsComponent } from './blog-post-details/blog-post-details.component';

export const routes: Routes = [  
    { path: '', component: BlogPostComponent },
    { path: 'post/:id', component: BlogPostDetailsComponent }
];
