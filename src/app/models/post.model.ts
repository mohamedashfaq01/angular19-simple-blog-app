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
    reactions?: number;
  }
  
//   export interface Post {
//     posts: PostDetails[];
//     total: number;
//     skip: number;
//     limit: number;
//   }
  