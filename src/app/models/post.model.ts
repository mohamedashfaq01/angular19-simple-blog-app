// export interface Post {
//     id: number;
//     userId: number;
//     title: string;
//     body: string;
// }

export interface Post {
  id: number;
  title: string;
  body: string;
  userId?: number;
  tags?: string[];
  reactions?: Reactions;
}

export interface PostsResponse {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
}

export interface Reactions {
  likes: number;
  dislikes: number;
}


