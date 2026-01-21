const API_URL = 'http://localhost:3000/api/posts';

export interface Post {
  id: number; 
  user_id: number;
  title: string;
  content: string;
  published: boolean;
  view_count: number;
  created_at: string;
  updated_at: string;
}

export const fetchAllPosts = async (): Promise<Post[]> => {
  let res = await fetch(API_URL);
  console.log('fetching for fetchAllPosts...');
  if (!res.ok) {
    throw new Error('Failed to fetch users');
  }
  return res.json();
};
